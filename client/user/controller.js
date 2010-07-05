var userProfile;

function setupUser()
{
	var pathNames = document.location.pathname.split('/');
	if( pathNames.length <= 2 )
		setupFacebook(setupList);
	else
	{
		setupFacebook();
		$.rest.get('/api/model/userProfile/facebookUid/' + pathNames[2], 'fields=' + userProfileFields, function(resp) {
			userProfile = resp;
			setupList();
		});
	}
}

function setupList()
{
	var viewingSelf = ! userProfile;
	var profileToShow = userProfile || profile;
	var profileTemplate = new JTMLTemplate($('script#profileTemplate'));
	var partTemplate = new JTMLTemplate($('script#partTemplate'));
	$('div#main').append(profileTemplate.render(profileToShow));
	
	
	
	

	if( viewingSelf )
	{
		$('#addPart').click(function() {
			var part = {name:$('input#newPartName').val()};
			$.rest.post('/api/model/whole/' + profile.whole.id + '/parts/', {parts:[part]}, function(response) {
				part.id = response.details[0].id;
				$('ol#wholeList').append(partTemplate.render({part:part}));
				$('input#newPartName').val('').focus();
			});
		});
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
		$('input[hint]').hint();
	}
	else
	{
		$('#newPartForm').remove();
		$('ol#wholeList li a.remove').remove();
	}
}


