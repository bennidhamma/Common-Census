
// Define the remote version of the JTMLTemplate.
function RemoteJTMLTemplate( templateUrl, preloadTemplate ){
	// Store the URL of our remote template.
	this.templateUrl = templateUrl;
	
	// I am the JTML template object that will eventually be loaded
	// once we have the JTML markup.
	this.template = null;
	
	// I am the queue to hold rendering maps and callbacks that 
	// will need to be merged when the template is available.
	this.renderQueue = [];
	
	// I am the AJAX request for the template being loaded.
	this.templateRequest = null;
	
	
	// Check to see if the user wants to preload the template (or if 
	// they simply want to wait until the first render call has been
	// made).
	if (preloadTemplate){
	
		// Load teh remote template - this will be executed with AJAX
		// and will happen asynchronoushly. 
		this.loadRemoteTemplate();
	
	}
}


// Define the template class methods. 
RemoteJTMLTemplate.prototype = {

	// I flush the render queue. I only get called once the template
	// has been loaded.
	flushRenderQueue: function(){
		// While the queue has a length, shift the render command
		// and pass it off to the render method.
		while( this.renderQueue.length ){
			
			// Get the oldest queue item.
			var renderItem = this.renderQueue.shift();
			
			// Render the template.
			this.render( renderItem.map, renderItem.callback );
		
		}
	},
	

	// I load the JTML template off of the remote server.
	loadRemoteTemplate: function(){
		var self = this;
		
		// Check to see if the template is currently being loaded.
		if (this.templateRequest){
			
			// The template is already being loaded, so just return
			// out of this method.
			return;
			
		}
		
		// Load the template from the remote server. Regardless of 
		// what type of remote file extension we use, we are 
		// explicitly telling jQuery to expect a TEXT data response.
		this.templateRequest = $.ajax({
			type: "get",
			url: this.templateUrl,
			dataType: "text",
			success: function( jtmlMarkup ){
				
				// Now that we have loaded the JTML markup, let's 
				// create and store the JTML Template class instance 
				// that will be used to render the tempaltes.
				self.template = new JTMLTemplate( jtmlMarkup );				
				
				// Now that the render template is available, let's 
				// flush any render commands that have been queued up.
				self.flushRenderQueue();
			
			},
			error: function(){
				// Something went wrong.
				alert( "JTML Template could not be loaded" );
			}
		});	
	},

	
	// I am the render method that merges the map into the loaded 
	// JTML template. If there is not template available yet, the
	// render command is queued.
	render: function( map, callback ){
		// Check to see if the template is available.
		if (this.template){
		
			// Since we know this will only be called once the 
			// template has been loaded, we can pass this off 
			// directly to the stored JTML Template instance.
			callback(
				this.template.render( map )
			);
			
		} else {
			
			// The template is not yet available so queue the render
			// command for later rendering
			this.renderQueue.push({
				map: map,
				callback: callback
			});
			
			// Load the remote temolate.
			this.loadRemoteTemplate();
			
		}
	}
	
};

