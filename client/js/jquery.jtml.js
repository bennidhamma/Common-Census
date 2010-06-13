
// Define the template class.
function JTMLTemplate( template ){
	// Store the original content used for the template. For backwards
	// compatability, check to see if the passed-in template is a 
	// jQuery object. If it is, grab the html() out of it. Otherwise,
	// just use the given string value.
	this.template = ((typeof( template ) === "string") ? template : template.html());
	
	// Compile the template down into a self-executing function.
	// This will be used internally to other functions.
	// This is a STRING value.
	this.compiledTemplate = this.compile( 
		this.template
	);
};


// Define the template class methods.
JTMLTemplate.prototype = {
	
	// I compile the raw template markup into a function that
	// can be rendered many times with a given map.
	compile: function( markup ){
		var self = this;
		
		// These will be the placeholders for the Javascript
		// template constructs found in the markup.
		var jsConstructs = [];
	
		// Define the buffer that will be used to hold the 
		// rendering function definition.
		var functionParts = [
			"var __output = [];",
			"var __o = 0;"
		];
		
		// For IE, we need to strip out the line breaks so that we
		// don't get unterminated string values when we compile the
		// Function() object later on.
		markup = markup.replace( 
			new RegExp( "[\\r\\n]+", "g" ), 
			" "
		);
		
		// Replace out the render constructs from the markup
		// so that we can replace it later.
		markup = markup.replace(
			new RegExp( "<(/)?jtml:(\\w+)((?:[^>\"/]|\"[^\"]*\")*)/?>", "g" ),
			function( $0, $1, $2, $3 ){
			
				// Store the javascript render constructs.
				// Check to see if this is an open or close
				// tag.
				if ($1){
				
					// Close tag (we know because it started
					// with a slash).
					jsConstructs.push( 
						self.convertCloseTag( $2 )
					);
					
				} else {
				
					// Open tag.
					jsConstructs.push(
						self.convertOpenTag( $2, $3 )
					);
					
				}
				
				// Return the place holder.
				return( "__t" + (jsConstructs.length - 1) + "__" );
			}
		);
		
		// Replace the individual lines of the template with 
		// calls to the output writer. As we do this, we are
		// going to both escape quotes AND properly render 
		// the javascript rendering constructs.
		markup.replace(
			new RegExp( "^(.+)$", "gm" ),
			function( $0, $1 ){
				
				// Escape any double quotes in the current 
				// line - since this will be written to the 
				// output as an fn call, we need to escape
				// the string value.
				var line = $1.replace(
					new RegExp( "(\")", "g" ),
					"\\$1"
				);
				
				// Now, let's replace the value place-holders
				// with actual javascript variables.
				line = line.replace(
					new RegExp( "\\$\\{([^}]+)\\}", "g" ),
					function( $0, $1 ){
						
						// We need to stop the output buffer,
						// output the variable, and then re-
						// start the output buffer.
						//
						// We *must* wrap the output in parenthesis
						// so that any grouping will be executed
						// before the string values are concatenated.
						// This will allow the user to not have to 
						// use parenthesis in their embedded values.
						return(
							"\" + ( " +
							$1 + 
							" ) + \""								
						);								
					}
				);
				
				// Now, we need to replace the Javascript 
				// construct placeholders with actual JS flow
				// directives.
				line = line.replace(
					new RegExp( "__t(\\d+)__", "g" ),
					function( $0, $1 ){
						
						// We need to stop the output, run 
						// the Javacript, and then re-start
						// the output.
						return(
							"\"; " +
							jsConstructs[ parseInt( $1 ) ] +
							"; __output[ __o++ ] = \""									
						);								
					}
				);
				
				// Add the line of output to the template
				// render function.
				functionParts.push(
					"__output[ __o++ ] = \"" + line + "\";"
				);
			}
		);
		
		// At the end of the function, we need to join the
		// input and return the template markup.
		functionParts.push( 
			"return( __output.join( \"\\n\" ) );" 
		);
		
		// To see the funciton body:
		// -------------------------------------------------- //
		// console.log( "HERE................................" );
		// console.log( functionParts.join( "\r\n" ) );
		// -------------------------------------------------- //
		
		// Return the compiled function body.
		return( functionParts.join( "\n" ) );
	},
	
	
	// I convert close tags to their valid Javacript 
	// equivalent forms.
	convertCloseTag: function( tag ){
		// Check to see which tag we are dealing with.
		switch (tag){
			// Check for the IF tag.
			case "if":
				return( " } " );
				break;
				
			// Check for the LOOP tag.
			case "loop":
				return( " } " );
				break;
		
			// No appropriate tag could be matched.
			default:
				return( "/* Unknown CLOSE */" );
				break;
		}
	},
	
	
	// I convert open tags to their valid Javascript
	// equivalent forms.
	convertOpenTag: function( tag, metaData ){
		var attributes = this.parseMetaData( metaData );
		
		// Check to see which tag we are dealing with.
		switch (tag){
			// Check for ELSE tag.
			case "else":
				// Check to see if there is a test for this
				// else condition.
				if ("test" in attributes){
					
					// Else-if tag.
					return( " } else if ( " + attributes.test + " ){ " );
					
				} else {
				
					// Just a plain else.
					return( " } else { " );
				
				}
			
				break;
		
			// Check for IF tag.
			case "if":
				return( 
					" if ( " + attributes.test + " ){ "
				);
				break;
				
			// Check for INCLUDE tag.
			case "include":
				// When we include the template, we'll execute it as a self-executing
				// function so it can have its own variable space.
				return(
					"__output[ __o++ ] = (function(){ " +
						this.compile( $( attributes.template ).html() ) +
					" })();"
				);
			
				break;
				
			// Check for LOOP tag.
			case "loop":
				// Loop is a bit more complicated because
				// it can take a number of forms, each of
				// which requires a different implementation.
				if (attributes.collection){
					
					// We are in a collection loop. This can 
					// be either an array or an object.
					if (this.isArray( attributes.collection )){
					
						// Array loop.
						// Return a FOR loop with an index 
						// variable computed on each iteration.
						return(
							" for ( var __" + attributes.index + " = 0 ; __" + attributes.index + " < " + attributes.collection + ".length ; __" + attributes.index + "++ ) { " + 
							(("key" in attributes) ?
								("var " + attributes.key + " = __" + attributes.index + ";") :
								""
							) +
							"var " + attributes.index + " = " + attributes.collection + "[ __" + attributes.index + " ];"
						);
					
					} else {
					
						// Object loop.
						// Return a FOR loop with an index 
						// variable computed on each iteration.
						return(
							" for ( var __" + attributes.index + " in " + attributes.collection + " ) { " + 
							(("key" in attributes) ?
								("var " + attributes.key + " = __" + attributes.index + ";") :
								""
							) +
							"var " + attributes.index + " = " + attributes.collection + "[ __" + attributes.index + " ];"
						);
					
					}
					
				// If there is no collection attribute, then it is assumed
				// that we are doing a FROM-TO loop.
				} else {
				
					// Index loop.
					return(
						" for ( var __" + attributes.index + " = " + (attributes.from || 0) + " ; __" + attributes.index + " <= " + attributes.to + " ; __" + attributes.index + "+=" + (attributes.step || 1) + " ) { " + 
						"var " + attributes.index + " = __" + attributes.index + ";"
					);
					
				}
									
				break;
				
			// No appropriate tag could be matched.
			default:
				return( "/* Unknown OPEN */" );
				break;
		}
	},
	
	
	// I determine if the given object is an array.
	// Taken from jQuery library.
	isArray: function( object ){
		return( $.isArray( object ) );
		
		// This was causing issue in IE, so just default to jQuery
		// implementation above.
		// return( toString.apply( [ object ] ) === "[object Array]" );
	},
	
	
	// I parse the meta data of a template tag into a 
	// collection of name-value attribute pairs.
	parseMetaData: function( metaData ){
		var attributes = {};
		
		// Find all the name-value pairs.
		metaData.replace(
			new RegExp( "(\\w+)\\s*=\\s*\"([^\"]*)\"", "g" ),
			function( $0, $1, $2 ){
				attributes[ $1 ] = $2;
			}
		);
	
		// Return the attribute collection.
		return( attributes );
	},
	
	
	// I render the template using given map and return the
	// resultant markup.
	render: function( map ){
		// Create a collection of function parts since we
		// need to compile the function that collects the 
		// map values and renders the template.
		var functionParts = [];
		
		// Create an indexer for the function parts.
		var f = 0;
		
		// This function will be expecting the map argument
		// as the only argument. We need to copy the map
		// arguments to the local scope of the function so
		// that the closure (template renderer) will have 
		// access to them.
		for (var key in map){
			
			// Locally VAR map value.
			functionParts[ f++ ] = (
				"var " + key + " = _map[ \"" + key + "\" ];"
			);
		
		}
		
		// Return the execution value of the inner compiled
		// function executed as a closure.
		functionParts[ f++ ] = (
			"return( (function(){ " +
			this.compiledTemplate +
			" })() );"
		);

		// Create the compiled function for this instance
		// of the template renderer.
		var renderFunction = new Function( 
			"_map", 
			functionParts.join( "\n" )
		);
		
		// Execute the renderer and return the result.
		return(
			renderFunction( map )
		);
	}

};


