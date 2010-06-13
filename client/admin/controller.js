function constructAdmin()
{
	$("#tabs").tabs();
	setupObjectEditor({
		model:'user',
		mapper: function(parent) {
			var model = {};
			model.name = parent.find('.name').val();
			var password = parent.find('.password').val();
			if( password != '' )
				model.plainTextPassword = password;
			model.roles = parent.find('input:checkbox:checked').serializeArray().map(function(v){return Number(v.value)});
			return model;
		},
		callback: function(container) {
			container.find('.edit-roles').click(function(){
				var parent = $(this).parent();
				var userRoles = $(this).parent().find('.user-roles');
				if( userRoles.is(':visible') )
				{
					userRoles.empty();
					userRoles.hide();
					return;
				}
				var model = $(this).parent().data('model');
				$.each( database.roles, function(i,v) {
					var checked = model != null && recordInList(model.roles, v.id) ? 'checked' : '';
					userRoles.append('<label><input name=role value=' + v.id + 
						' type=checkbox ' + checked + '>' + v.name + '</label>');
				});
				userRoles.show();
			});
			setupPublisherUserLink();
		}
			
	});
	
	setupObjectEditor({
		model:'role',
		mapper: function(parent){
			//need to map name and permissions.
			var model = parent.data('model') || {};
			model.name = parent.find('.name').val();
			model.permissions = parent.find('input:checkbox:checked').serializeArray().map(function(v){return Number(v.value)});
			return model;
		},
		callback: function(container) {
			//setup the edit-permissions handler.
			container.find('.edit-permissions').click(function() {
				//create a set of checkboxes, one for each permission.
				var rolePermissions = $(this).parent().find('.role-permissions');
				if( rolePermissions.is(':visible') )
				{
					rolePermissions.empty();
					rolePermissions.hide();
					return;
				}
				var model = $(this).parent().data('model');
				$.each( database.permissions, function(i,v) {
					var checked = model != null && recordInList(model.permissions, v.id) ? 'checked' : '';
					rolePermissions.append('<label><input name=permission value=' + v.id + 
						' type=checkbox ' + checked + '>' + v.name + '</label>');
				});
				rolePermissions.show();
			});
		}
	});
	
	setupObjectEditor({
		model:'permission',
		mapper: function(parent){
			return {'name':parent.find('.name').val()};
		}
	});
}

function setupPublisherUserLink()
{
	if( !database.users || !database.publishers )
	{
		return;
	}
	var selectUsers = $('select#userSelect');
	var selectPubs = $('select#publisherSelect');
	selectUsers.empty();
	$.each(database.users, function(i,v) {
		selectUsers.append('<option value=' + v.id + '>' + v.name + '</option>');
	});
}

function recordInList(list, id)
{
	var inList = false;
	$.each(list, function(i,v) { if( v.id == id || v == id) { inList = true; return false; } } );
	return inList;
}

var database = {};

function setupObjectEditor(args)
{
	//required args
	var model = args.model;
	var mapper = args.mapper;
	
	//optional args
	var plural = args.plural || model + 's';
	var callback = args.callback;
	var url = args.url || '/api/model/' + model + '/';
	var container = args.container || $('#'+model+'s');
	var list = container.find("#list");
	var template = new JTMLTemplate(list.find('script.item-template'));
	var fields = args.fields || '*';

	//empty out the list element
	list.show().empty();	
	//get the list of items for model type.
	
	var setupButtons = function(buttonContext) {
		buttonContext.find('.update').click(function() {
			var parent = $(this).parent();
			var payload = mapper(parent);
			$.rest.put(url + parent.find('.id').text() + '?fields=' + fields, payload);
		});
		buttonContext.find('.delete').click(function() {
			var parent = $(this).parent();
			$.rest._delete(url + parent.find('.id').text());
			parent.remove();
		});
	};
	
	$.rest.get(url + '?fields=' + fields, null, function(resp) {
		$.extend( database, resp );
		$.each( database[plural], function(i,v) {
			list.append(template.render(v));
			var last = list.children().last();
			last.data('model',v);
		});		
		setupButtons( list );
		if( callback )
			callback(container);
	});
	
	//setup the new form.
	container.find('.create').click(function(){
		var parent = $(this).parent();
		var payload = mapper(parent);
		$.rest.post(url, payload, function(data, textStatus, xhr) {
			$.extend( payload, data );
			list.append(template.render(payload));
			var last = list.children().last();
			last.data('model',payload);
			database[plural].push(payload);
			setupButtons(last);
			parent.find(':input').val('').removeAttr('selected').removeAttr('checked');
			if( callback )
				callback(last);
		});
	});
}
