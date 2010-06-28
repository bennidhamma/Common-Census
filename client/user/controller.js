var fields = '[id,name,link,facebookUid,{whole:[id,name,description,{parts:[id,name,canonical]}]}]';
var profile;
var getUserProfileCalled = false;

function getUserProfile(session)
{
	if( getUserProfileCalled ) return;
	getUserProfileCalled = true;
	$.rest.get('/api/model/userProfile/facebookUid/' + session.uid,'fields=' + fields, function(resp) {
		if( resp == null )
		{
			var data = {facebookUid:session.uid, accessToken:session.access_token,whole:{}};
			$.rest.post( '/api/model/userProfile/?fields=' + fields, data, function(newProfile) {
				profile = newProfile;
				setupList();
			});
		}
		else
		{
			profile = resp;
			setupList();
		}
	});
}

function setupList()
{
	var profileTemplate = new JTMLTemplate($('script#profileTemplate'));
	var partTemplate = new JTMLTemplate($('script#partTemplate'));
	$('div#main').append(profileTemplate.render(profile));
	
	$('#addPart').click(function() {
		var part = {name:$('input#newPartName').val()};
		$.rest.post('/api/model/whole/' + profile.whole.id + '/parts/', {parts:[part]}, function(response) {
			part.id = response.details[0].id;
			$('ol#wholeList').append(partTemplate.render({part:part}));
			$('input#newPartName').val('').focus();
		});
	});
	
	$('input[hint]').hint();

	$('ol#wholeList li a.remove').live('click', function() {
		var li = $(this).parents('li[partid]');
		var partid = li.attr('partid');
		var removeMessage = {parts:[partid]};
		$.rest._delete( '/api/model/whole/' + profile.whole.id + '/parts/', removeMessage, function(r) {
			li.slideUp('normal', function() { li.remove(); } );
			$.rest._delete('/api/model/part/' + partid, null, function(r) {			console.log('deleted part', r );
			});
		});
	});
	
	$('h1 div#wholeName').editable(function(value,settings) {
		$.rest.put('/api/model/whole/' + profile.whole.id + '?fields=*', {name:value} );
		return value;
	});
	
	if( profile.whole.description == null || profile.whole.description == '' )
	{
		$('p#wholeDescription').html('Click here to share a description of your essential life.');
	}
	
	$('p#wholeDescription').editable(function(value,settings) {
		$.rest.put('/api/model/whole/' + profile.whole.id + '?fields=*', {description:value} );
		return value;
	}, {
		type : 'textarea',
		submit: 'Save',
		cancel: 'Cancel',
		onblur: 'ignore'
	});
}


