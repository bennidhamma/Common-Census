var needCanonical;
var part;
var commentTemplate, userTemplate;
var partFields = JSON.stringify([
	'id',
	'name',
	'wholeCount',
	'canonical',
	{
		comments: ['id','title','body','date',{author:['id','name','facebookUid']}],
		owners: ['id','name','facebookUid']
	}
]);

function setupNeed()
{
	commentTemplate = new JTMLTemplate($('script#commentTemplate'));
	userTemplate = new JTMLTemplate($('script#userTemplate'));
	needCanonical = document.location.pathname.split('/')[2];
	$.rest.get('/api/model/part/search?fields=' + partFields + '&q=Canonical:' + escape(needCanonical), null, function(r) {
		part = r.parts[0];
		$('h1 span').html(part.name);
		document.title = part.name;
		updateCount();
		$.each(part.comments, function(i,v) {
			$('#comments').append(commentTemplate.render(v));
		});
		$.each(part.owners, function(i,v) {
			$('#users').append(userTemplate.render(v));
		});
		$('.timeago').timeago();
	});
	
	setupFacebook(setupCommentForm);
	
	//get facets.
	$.rest.get(
		'/api/model/userProfile/search',
		'?q=Need:{0}&facet=true&facetFields=Gender,Religion,Political,AgeRange&fields=*&count=0'.format(needCanonical), 
		function(resp) {
			$.each( resp.facets, showFacetDetails );
		}
	);
}

function showFacetDetails(key,facet) {
	var sum = facet.reduce( function(p,c) { return (p ? p.count : 0 )+c.count; }, 0 );
	var html = '<h3>{0}</h3><ol>'.format(key)

	$.each( facet, function(i,v) {
		html += '<li>{0} -- {1}%</li>'.format(v.value, ((v.count / sum )*100).toFixed(0) );
	});
	
	html += "</ol>";
	
	$('#stats').append(html);
}

function updateCount()
{
	$('h1 em.needCount').html( needCountString( part.wholeCount ) + ' this' );
}

function setupCommentForm()
{	
	setupProfileDialog();
	var haveNeed = $.grep( profile.whole.parts, function(p) { return p.canonical == part.canonical } ).length;
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
			//trigger a recount of wholeCount
			$.rest.put('/api/model/part/' + part.id, {wholeCount:-1});
			part.wholeCount--;
			updateCount();
		});
		return false;
	});
	
	$('a#addNeed').click(function() {
		$.rest.post('/api/model/whole/' + profile.whole.id + '/parts', { parts: [ part.id ] }, 
		function() {
			showHaveNeed();
			$.rest.put('/api/model/part/' + part.id, {wholeCount:-1});
			part.wholeCount++;
			updateCount();
		});
		return false;
	});
}

function setupProfileDialog()
{
	$('#needProfileDialog').dialog({
		width:900
	});
	$('select#needType').selectToUISlider({
		labels:3,
		labelSrc: 'text', 
	}).hide();
	$('select#metLevel').selectToUISlider({
		labels:3,
		labelSrc: 'text', 
	}).hide();
	$('select#metTime').selectToUISlider({
		labels:2,
		labelSrc: 'text', 
	}).hide();
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

