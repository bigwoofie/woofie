(function ($) {
    
    $.fn.cardFlip = function (method) {
        
        var methods = {
            init : function( options ) {  
                settings = this.cardFlip.settings= $.extend({},this.cardFlip.defaults,options);
                
                return this.each(function() {
                    
                    stage = $(this);
                    
                    stage.css(stage.prefixPerspective + 'perspective','1000');
                    
                    card = $('.card',this);
                    card.settings = settings;
                    card.settings.prefixTransform = stage.cardFlip('getPrefix','transform');
                    card.settings.prefixPerspective= stage.cardFlip('getPrefix','perspective');
                    
                    card.css(card.settings.prefixTransform + 'transform-style','preserve-3d')
                        .css('height',$('.face',this).height())
                        .css(card.settings.prefixTransform + 'transition-origin','50% 50%')
                        .css(card.settings.prefixTransform + 'transition','1s')
                    ;
                    
                    if ($.browser.webkit) {
                        stage.cardFlip('showFace');
                    } else {
                        $('.back',this).hide();
                    }
                    
                    $('.back',this).css(card.settings.prefixTransform + 'transform','rotateY(180deg)  translateZ(2px)')
                        .css(card.settings.prefixTransform + 'backface-visibility','hidden');
                    
                    $('.face',this);//  Bug in webkit.  This blocks clicks once returned. Don't need .css('-webkit-backface-visibility','hidden');
                    
                    $(settings.showface,this).click(function () { stage.cardFlip('showFace'); });
                    $(settings.showback,this).click(function () { stage.cardFlip('showBack'); });
                });
                
            },
            
            
            getPrefix : function ( prop ){  
                var prefixes = ['Moz','Webkit','Khtml','0','ms'],  
                elem     = document.createElement('div'),  
                upper      = prop.charAt(0).toUpperCase() + prop.slice(1),  
                pref     = "";  
                for(var len = prefixes.length; len--;){  
                    if((prefixes[len] + upper) in elem.style){  
                        pref = (prefixes[len]);  
                        return '-' + pref.toLowerCase() + '-';  
                    }  
                }  
                if(prop in elem.style){  
                    pref = (prop);  
                    return "";
                }  
            },  
            
            
            showFace : function( ) { 
                if ($.browser.webkit) {
                    
                    rotateThing(card,
                                card.settings.startRotation.x,
                                card.settings.startRotation.y,
                                card.settings.startRotation.z
                               )
                } else {
                    $('.face',this).show();
                    $('.back',this).hide();
                }
            },
            
            showBack : function( ) { 
                if ($.browser.webkit) {
                    rotateThing(card,
                                card.settings.flipRotation.x,
                                card.settings.flipRotation.y,
                                card.settings.flipRotation.z
                               )
                } else {
                    $('.face',this).hide();
                    $('.back',this).show();
                }
                
            },
            
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
    
    // add convention over configuration defaults here
    $.fn.cardFlip.defaults = {
        showface: '#showface',
        showback: '#showback',
        startRotation: {x: '0deg',y: '0deg',z:'0deg'},
        flipRotation: {x: '0deg',y: '10deg',z:'0deg'}
    }
    
    $.fn.cardFlip.settings = {}
    // add privates here.
    
    rotateThing = function (card,x,y,z) {
        card.css(card.settings.prefixTransform+ 'transform',
                 "rotateX(" + x + " ) " +
                 "rotateY(" + y + " ) " +
                 "rotateZ(" + z + " ) ") ;
        
        
        
    }
})(jQuery);
 