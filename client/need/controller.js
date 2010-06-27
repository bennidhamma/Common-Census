var needCanonical;
function setupNeed()
{
	needCanonical = document.location.hash.substr(1);
	$.rest.get('/api/model/part/search?q=Canonical:' + needCanonical + '&fields=*', null, function(r) {
		$('h1').html(r.parts[0].name);
	});
}
