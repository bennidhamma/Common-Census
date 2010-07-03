var userProfileFields =  '[id,name,link,facebookUid,{whole:[id,name,description,{parts:[id,name,canonical]}]}]';
var profile;
var getUserProfileCalled = false;

function setupFacebook(callback)
{
 	window.fbAsyncInit = function() {
         FB.init({appId: '100107273374268', status: true, cookie: true,
                 xfbml: true});
     	 FB.getLoginStatus(function(response) {
			  if (callback && response.session) {
				getUserProfile(callback, response.session);
				callback = null;
			  } else {
				console.log('not logged in.');
			  }
		 });
		 FB.Event.subscribe('auth.sessionChange', function(response) {
			if (callback && response.session) {
			  getUserProfile(callback, response.session);
			  callback = null;
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

function getUserProfile(callback, session)
{
	if( getUserProfileCalled ) return;
	getUserProfileCalled = true;
	$.rest.get('/api/model/userProfile/facebookUid/' + session.uid,'fields=' + userProfileFields, function(resp) {
		if( resp == null )
		{
			var data = {facebookUid:session.uid, accessToken:session.access_token,whole:{}};
			$.rest.post( '/api/model/userProfile/?fields=' + userProfileFields, data, function(newProfile) {
				profile = newProfile;
				callback();
			});
		}
		else
		{
			profile = resp;
			callback();
		}
	});
}

function needCountString(count)
{
	if( count == 1 ) return "1 person needs";
	else return count + ' people need';
}
