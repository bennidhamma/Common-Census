var needCanonical;
var part;
var commentTemplate;
var partFields = '[id,name,canonical,{comments:[id,title,body,date,{author:[id,name,facebookUid]}]}]';

function setupNeed()
{
	commentTemplate = new JTMLTemplate($('script#commentTemplate'));
	needCanonical = document.location.hash.substr(1);
	$.rest.get('/api/model/part/search?fields=' + partFields + '&q=Canonical:' + needCanonical, null, function(r) {
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
}

