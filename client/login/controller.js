function constructLogin()
{
	$("#submit").click(function() {
		var username = $("#username").val();
		var password = $("#password").val();
		$.rest.post( 
			"/api/login", 
			{username:username,password:password},
			function( data, textStatus, xhr) {
				console.log("logged in", data, textStatus, xhr);
			})
	});
}
