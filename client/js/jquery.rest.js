jQuery.rest = {
	get : function(url, data, callback, errorCallback) {
		jQuery.ajax({
			url: url,
			data: data,
			success: callback,
			error:errorCallback,
			dataType: 'json'
		});
	},
	put : function(url, data, callback, errorCallback) {
		jQuery.ajax({
			type:'PUT',
			url: url,
			data: JSON.stringify(data),
			success: callback,
			error:errorCallback,
			dataType: 'json'
		});
	},
	_delete : function(url, data, callback, errorCallback) {
		jQuery.ajax({
			type:'DELETE',
			url: url,
			data: data,
			success: callback,
			error:errorCallback,
			dataType: 'json'
		});
	},
	post : function(urlOrObject, data, success, error) {
		var args = {
			type : 'POST',
			dataType: 'json'	
		};
		if( $.isPlainObject( urlOrObject ) )
		{
			$.extend(args, urlOrObject);
		}
		else
		{
			args.url = urlOrObject;
			args.data = data;
			args.success = success;
			args.error = error;
			
		}
		args.data = JSON.stringify(args.data);
		jQuery.ajax(args);
	}
};

jQuery.fn.mapValues = function() {
	var object = {};
	var array = this.serializeArray();
	$.each( array, function(i,v) {
		if(object[v.name])
		{
			//this name is already in use.  store multiple values in an array.
			if( !$.isArray(object[v.name]) )
			{
				//convert scalar to array
				object[v.name] = [object[v.name]];
			}
			object[v.name].push(v.value);
		}
		else
			object[v.name] = v.value;
	});
	return object;
}

jQuery.fn.error = function(method) {
	switch(method)
	{
	case 'show':
		if( this.data('error') ) this.parent().parent().show(300);
		break;
	case 'hide':
		if( this.data('error') ) this.parent().parent().hide(300);
		break;
	default:
		if( ! this.data('error') )
		{
			this.prepend('<span style="float: left; margin-right: 0.3em;" class="ui-icon ui-icon-alert"></span><strong>Error:</strong> ')
				.wrap('<div class="ui-state-error ui-corner-all" style="padding: 0 .7em;">')
				.wrap('<div class="ui-widget">')
				.show(300)
				.data('error',true);
		}
		else
		{
			this.parent().parent().show(300);
		}
		break;
	}
}
