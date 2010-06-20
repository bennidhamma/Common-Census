var fields = '[id,name,link,facebookUid,{whole:[id,name,description,{parts:[id,name,description]}]}]';
var profile;

$(function() {
	setupFacebook();
});

function getUserProfile(session)
{
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
		});
	});
}

function setupFacebook()
{
 	window.fbAsyncInit = function() {
         FB.init({appId: '100107273374268', status: true, cookie: true,
                 xfbml: true});
     	 FB.getLoginStatus(function(response) {
			  if (response.session) {
				getUserProfile(response.session);
			  } else {
				console.log('not logged in.');
			  }
		 });
		 FB.Event.subscribe('auth.sessionChange', function(response) {
			if (response.session) {
			  getUserProfile(response.session);
			} else {
				console.log(response);
			}
		  });
      };
      (function() {
        var e = document.createElement('script');
        e.type = 'text/javascript';
        e.src = document.location.protocol +
          '//connect.facebook.net/en_US/all.js';
        e.async = true;
        document.getElementById('fb-root').appendChild(e);
      }());
}
