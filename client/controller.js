$(function() {
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
});

function getUserProfile(session)
{
	console.log(session);
	$.rest.get('/api/model/userProfile/facebookUid/' + session.uid,'fields=*', function(resp) {
		if( resp == null )
		{
			var data = {facebookUid:session.uid, accessToken:session.access_token};
			$.rest.post( '/api/model/userProfile/?fields=*', data, function(newProfile) {
				console.log(newProfile);
			});
		}
	});
		
}
