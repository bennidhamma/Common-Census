var fields = '*';
var start = 0;
var count = 10;

function setupHome()
{
	getNeeds();
	$('#moreNeeds').click(function() {
		start += count;
		getNeeds();
		return false;
	});
	
	$.address.change(function(event) {
		console.log(event);
		var v = event.value;
		console.log(v);
		if(event.pathNames.length && event.pathNames[0] != start )
		{
			start = new Number(event.pathNames[0]);
			getNeeds();
		}
	});
}

function getNeeds()
{
	$.rest.get('/api/model/part/search?fields={0}&q=Name:[* TO *]&sortBy={1}&start={2}&count={3}'
		.format(fields, 'WholeCount desc', start, count), null, renderNeeds );
}

function renderNeeds(resp)
{	
	var template = new JTMLTemplate($('script#partTemplate'));
	$('ol').empty().attr('start', start + 1);
	$.each( resp.parts, function(i,v) {
		$('ol').append(template.render(v));
	});

	if( start + count < resp.total )
		$('#moreNeeds').show();
	else
		$('#moreNeeds').hide();
	$.address.value( start + '' );
		
}
