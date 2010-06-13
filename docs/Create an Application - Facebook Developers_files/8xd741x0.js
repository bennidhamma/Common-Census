/*
HTTP Host: static.ak.fbcdn.net
Generated: April 21st 2010 10:36:44 AM PDT
Machine: 10.16.139.107
Locale: nu_ll
Path: js/developers/search_typeahead.js
*/

if (window.CavalryLogger) { CavalryLogger.start_js(["js\/developers\/search_typeahead.js"]); }

JX.behavior('developer-search-typeahead',function(a){var b=new JX.Typeahead(a);b.setNormalizer(function(c){return JX.Typeahead.normalize((''+c).replace(/[.:]+/g,' '));});b.listen('choose',function(c){JX.go(c.href);});});

if (window.Bootloader) { Bootloader.done(["js\/developers\/search_typeahead.js"]); }