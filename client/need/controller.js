var needCanonical;
var part;
var commentTemplate;
var partFields = '[id,name,canonical,{comments:[id,title,body,date,{author:[id,name,facebookUid]}]}]';

function setupNeed()
{
	commentTemplate = new JTMLTemplate($('script#commentTemplate'));
	needCanonical = document.location.pathname.split('/')[2];
	$.rest.get('/api/model/part/search?fields=' + partFields + '&q=Canonical:' + escape(needCanonical), null, function(r) {
		$('h1').html(r.parts[0].name);
		document.title = r.parts[0].name;
		part = r.parts[0];
		$.each(part.comments, function(i,v) {
			$('#comments').append(commentTemplate.render(v));
		});
		$('.timeago').timeago();
	});
	
	setupFacebook(setupCommentForm);
}

function setupCommentForm()
{	
	var haveNeed = $.grep( profile.whole.parts, function(p) { return p.id == part.id } ).length;
	if( haveNeed )
	{
		showHaveNeed();
	}
	else
	{
		showDoesNotHaveNeed();
	}
	$('#commentForm').show().submit(function() {		
		return false;
	});
	
	$('#commentForm button#addComment').click(function() {
		var comment = {
			author: profile.id,
			title: $('#title').val(),
			body: $('#body').val()
		};
		$.rest.post('/api/model/part/' + part.id + '/comments', {comments:[comment]}, function(resp) {
			$.extend( comment, resp );
			var newItem = $(commentTemplate.render(comment));
			newItem.find('.timeago').timeago();
			$('#comments').append(newItem);
		});
	});
	
	$('a#removeNeed').click(function() {
		$.rest._delete('/api/model/whole/' + profile.whole.id + '/parts', { parts: [ part.id ] }, 
		function() {
			showDoesNotHaveNeed();
		});
		return false;
	});
	
	$('a#addNeed').click(function() {
		$.rest.post('/api/model/whole/' + profile.whole.id + '/parts', { parts: [ part.id ] }, 
		function() {
			showHaveNeed();
		});
		return false;
	});
}

function showHaveNeed()
{
	$('#haveNeed').show();
	$('#doesNotHaveNeed').hide();
}

function showDoesNotHaveNeed()
{
	$('#doesNotHaveNeed').show();
	$('#haveNeed').hide();
}

