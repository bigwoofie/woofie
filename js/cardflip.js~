


( function ($) {

		var methods = {
				init : function( options ) {  
						return this.each(function() {
								if (options) {
										$.extend(settings,options);
								}

								card = $(this);
								front = $('.front',this).show();
								back  = $('.back',this).hide();
								}
				},

				showlogin : function( ) { $(front).show(); $back.hide()  },
				showregister : function( ) { $(front).hide(); $back.show() },
   			flip : function( ) { },
				update : function( content ) { }
		};


  	$.fn.cardFlip = function (methods) {

				var settings = {
						
				};

				// Method calling logic
				if ( methods[method] ) {
						return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
				} else if ( typeof method === 'object' || ! method ) {
						return methods.init.apply( this, arguments );
				} else {
						$.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
				}    
								
		}

}
)(jQuery);
