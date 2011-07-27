/* The Multi-Language Editor and Engine */

/**
 * editableText plugin that uses contentEditable property (FF2 is not supported)
 * Project page - http://github.com/valums/editableText
 * Copyright (c) 2009 Andris Valums, http://valums.com
 * Licensed under the MIT license (http://valums.com/mit-license/)
 */
(function(){
    /**
     * The dollar sign could be overwritten globally,
     * but jQuery should always stay accesible
     */
    var $ = jQuery;
	/**
     * Extending jQuery namespace, we
     * could add public methods here
     */
	$.editableText = {};
    $.editableText.defaults = {		 
		/**
		 * Pass true to enable line breaks.
		 * Useful with divs that contain paragraphs.
		 */
		newlinesEnabled : false,
		/**
		 * Event that is triggered when editable text is changed
		 */
		changeEvent : 'change'
	};   		
	/**
	 * Usage $('selector).editableText(optionArray);
	 * See $.editableText.defaults for valid options 
	 */		
    $.fn.editableText = function(options){
        var options = $.extend({}, $.editableText.defaults, options);
        
        return this.each(function(){
             // Add jQuery methods to the element
            var editable = $(this);
            
			/**
			 * Save value to restore if user presses cancel
			 */
			var prevValue = editable.html();
			
			// Create edit/save buttons
           /* var buttons = $(
				"<div class='editableToolbar'>" +
            		"<a href='#' class='edit'></a>" +
            		"<a href='#' class='save'></a>" +
            		"<a href='#' class='cancel'></a>" +
            	"</div>")
				.insertBefore(editable);
			*/
			// Save references and attach events            
			/* var editEl = buttons.find('.edit').click(function() {
				startEditing();
				return false;
			});							
			*/
			editable.click(startEditing);
			
			/**buttons.find('.save').click(function(){
				stopEditing();
				editable.trigger(options.changeEvent);
				return false;
			});
			
						
			buttons.find('.cancel').click(function(){
				stopEditing();
				editable.html(prevValue);
				return false;
			});		
			* */
			// Display only edit button			
			//buttons.children().css('display', 'none');
			//editEl.show();			
			

				// Prevents user from adding newlines to headers, links, etc.
			editable.keypress(function(event){
					// event is done if enter is pressed
				if (event.which == 13) {
					editable.stopEditing();
					editable.trigger(options.changeEvent)};
				});
								// TODO event is cancelled and typing  reverted if escape is pressed
			/*	if (event.which == 13) {
					editable.stopEditing();
					editable.trigger(options.changeEvent)};
				});
	*/
			
			/**
			 * Makes element editable
			 */
			function startEditing(){
				
				editable.focus();               
	            editable.attr('contentEditable', true);
			}
			/**
			 * Makes element non-editable
			 */
			function stopEditing(){
				//buttons.children().hide();
				//editEl.show();				
                editable.attr('contentEditable', false);
			}
        });
    }
})();

(function ($) {
	
	$.fn.Woofie  = function(settings) {
		
	var languageCatalog=null;
	var sprites = new Array();
	
	var scripts = new Array();
	var dragState = null; //'catalog','canvas'
	var BLOCKCONNECTHEIGHTSHIM =3;
	
	if (settings) $.extend(config, settings);

	this.each(function (settings) {
		languageCatalog=drawingCatalogPages;
		loadLanguageDescription(languageCatalog);
		loadCatalogPage(drawingCatalogPages[commandSettings['firstCatalogPage']]);
		$("#charprogram").droppable({drop: dropOnCanvas,
									 accept: ".acceptCanvas"});
		$("#editScript").click(showScript);
		$("#consolebutton").click(function() {$('#consoleLayout').toggle();resize()});
		
		window.onresize=resize;
		$(this).disableSelection();
		resize();
		fadeIn(); // assumes editor1;
		return this;
	});
	
	function resize() {
		var tablePadding = $('#bigtable')[0].cellSpacing;
		$('#consolebutton').css('top',$('#middlerow').position().top+$('#middlerow').innerHeight()-14);

	}
	
	function fadeIn () {
		
		var current =$('#editor1').data("fade"); 
		if (current == null || typeof current =="undefined") {
			current = .9;//-3
		}
		if (current < 1) {
			$('#editor1').css('opacity',current);
			setTimeout(fadeIn,100);
			current += 0.1;
			$('#editor1').data("fade",current);
			
		}
	}
	
	function showScript() {
		for (var i=0;i<scripts.length;i++) {
			debug("script"+i);
			var blockPointer=scripts[i];
			while (blockPointer != null) {
				var commandA = $(blockPointer).attr("command").split('.');
				debug(languageCatalog[commandA[0]].dataSource[commandA[1]].code);
				blockPointer = $(blockPointer).data('next');
			}
			debug("===");
		}
	}
	
	function newBlockInit(newBlock, putx,puty) {
		newBlock.css('position','absolute')	
			    .css('top',puty)
				.css('left',putx)
				.appendTo('#charprogram')
				.draggable( { helper: 'original',
							  revert :"invalid",							  
							  start: function (event,ui) {
									 dragState="block";
									 startstopBlocksDragEvent(event,ui)},
							 drag: updateBlocksDragEvent,
							 stop:  function (event,ui) {
							 		 dragState=null;
							 		 startstopBlocksDragEvent(event,ui)}
							}) 
				.droppable({ greedy:true,
									 tolerance: "pointer",
									 drop: dropOnBlock,
									 hoverClass:'ui-drophover',
									 accept:".acceptStatement"})
				.data('next',null)
				.data('prev',null)
				.disableSelection()
				.find('*')
				.disableSelection(); 
		newWellInit(newBlock);
	}
	
	function pushScript(block) {
		scripts[scripts.length]= block;
		debug("pscripts"+scripts.length);
	}
	
	function removeScript(block) {
		for (var i=0;i<scripts.length;i++) {
			if (scripts[i]===block) {
				scripts.splice(i,1);
			}
		}
		debug("rscripts"+scripts.length);
	}

	function dropOnCanvas(event, ui) {
		var block=null;
		if (dragState=="catalog") {
			debug("drop catalog on canvas ");
			offsetx = $('#charprogram').offset().left-$('#charprogram').scrollLeft();
			offsety = $('#charprogram').offset().top-$('#charprogram').scrollTop();
			putx = ui.position.left-offsetx;
			puty = ui.position.top-offsety;
			debug(putx + ":"+  puty);
			var newBlock =ui.draggable.clone();
			newBlockInit(newBlock,putx,puty);
			pushScript(newBlock[0]);
		} else
		if (dragState=="block") {
			debug("drop block on canvas  ");
			offsetx = $('#charprogram').offset().left-$('#charprogram').scrollLeft();
			offsety = $('#charprogram').offset().top-$('#charprogram').scrollTop();
			putx = ui.position.left-offsetx;
			puty = ui.position.top-offsety;
			block= ui.draggable;
			debug("   prev"+ block.data("prev"));
			if (block.data("prev") != null) {
				$(block.data("prev")).data("next",null);
				block.data("prev",null);
			}
			updateBlocks(ui.draggable);
			removeScript(block[0]);
			pushScript(block[0]);			
		}					
	}

	function newWellInit (wellBlock) {
		wellBlock.find(".well.Number")
				.droppable({greedy:true,
		         			tolerance: "pointer",
							drop:dropInWell,
							hoverClass:'welldrophover',
							accept: ".Number"})
				.end()
				.find(".well.Boolean")
				.droppable({greedy:true,
							tolerance: "pointer",
							drop:dropInWell,
							hoverClass:'welldrophover',
							accept: ".Boolean"})
				.end()
				.find(".well.String")
				.droppable({greedy:true,
							tolerance: "pointer",
							drop:dropInWell,
							hoverClass:'welldrophover',
							accept: ".String"})
				.end()
				.find(".well")
				.editableText({newlinesEnabled:false})

	}	
	
	function dropInWell (event,ui) {
		var newWellThing = ui.draggable.clone() 
			           					.appendTo($(this).empty())
										.disableSelection();
        newWellInit(newWellThing);						
	}
	
	// jQuery this is same as event.target.  The element that had the event bound.
	function dropOnBlock(event, ui) {
		var block=null;
		var droppedOn = event.target; 
		
		if (dragState=="catalog") {
			debug("drop catalog on block ");
			debug(droppedOn.innerHTML);
			putx = $(droppedOn).position().left+$('#charprogram').scrollLeft();
			puty = $(droppedOn).position().top+ $('#charprogram').scrollTop()+$(droppedOn).outerHeight()-BLOCKCONNECTHEIGHTSHIM;
			var newBlock = ui.draggable.clone();
			newBlockInit(newBlock,putx,puty);			
			block = newBlock;
		}
		 else 
		
		if (dragState=="block") {
			debug("drop block on block ");
			debug(droppedOn.innerHTML);
			putx = $(droppedOn).position().left+$('#charprogram').scrollLeft();
			puty = $(droppedOn).position().top+ $('#charprogram').scrollTop()+$(droppedOn).outerHeight()-BLOCKCONNECTHEIGHTSHIM;
			block = ui.draggable.css('top',puty)
						.css('left',putx);
			if (block.data('prev') != null ) {
				$(block.data('prev')).data('next',null);
			}
			removeScript(block[0]);
		}
					// insert into list
		var spliceIntoDroppedOnList = $(droppedOn).data('next');
		block.data('prev',droppedOn);
		$(droppedOn).data('next',block[0]);
		if ( spliceIntoDroppedOnList !=null) {
			var blockList = block;
			while (blockList.data('next')!=null) {
				blockList = $(blockList.data('next'));
			}
			blockList.data('next',spliceIntoDroppedOnList);
			$(spliceIntoDroppedOnList).data('prev',blockList[0]);
		}
		updateBlocks(block);
	}
	


	function updateBlocks(block) {
		// debug(".");
		var putx = block.position().left;
		var puty = block.position().top + block.outerHeight() - BLOCKCONNECTHEIGHTSHIM;
		if (block.data('next')!=null) {
			var me = $(block.data('next'));
			me.css('left',putx)
			  .css('top',puty)
		      .removeClass('ui-drophover');
			puty += me.outerHeight() - BLOCKCONNECTHEIGHTSHIM;
			updateBlocks(me);
		}
	}

	function updateBlocksNew(block,event) {
		var putx = block.position().left;
		var puty = block.position().top + block.outerHeight() - BLOCKCONNECTHEIGHTSHIM;
		if (block.data('next')!=null) {
			var me = $(block.data('next'));
			me.css('left',putx)
			  .css('top',puty)
			  .removeClass('ui-drophover');
			puty += me.outerHeight() - BLOCKCONNECTHEIGHTSHIM;
			updateBlocks(me);
		}
	}

	function highlightBlocks(block) {
		if (dragState=="block")  block.addClass('ui-draggable-dragging')
		else block.removeClass('ui-draggable-dragging')
		
		if (block.data('next')!=null) {
			var me = $(block.data('next'));
			me.removeClass('ui-drophover');
			highlightBlocks(me);
		}
	}

	function startstopBlocksDragEvent(event,ui){
		highlightBlocks(ui.helper);
	}
	
	function updateBlocksDragEvent(event,ui){
		//var block = ui.helper;
		//debug(event.pageX +":" +event.pageY);
		var block = $(event.target);
	//	$(block).css('left',event.offsetX);
		//$(block).css('top',event.offsetY);
		updateBlocks(block);
	}
	
	function debug( text) {
		$('#console').append(text).append("<BR>");
		$('#console')[0].scrollTop = $('#console')[0].scrollHeight;
		
	}
	
	function loadLanguageDescription (languageCatalog) {
		for (catalogPageIndex in languageCatalog) {
			var catalogPage = languageCatalog[catalogPageIndex];
			addPageButton(catalogPage,catalogPageIndex);
		}
	}

	function addPageButton(catalogPage,catalogPageIndex) {
		var html = new Array('<div class="catalogpagebutton" id="',
					  		catalogPageIndex,
					  		'"><div class="cpblight" style="background-color:',
					  		catalogPage.color,
					  		'"></div><div class="cpblabel">',
					  		catalogPage.name,
					  		'</div></div>');
		var pageButton = $(html.join('')).click(pageButtonEvent);
		
		$('#catalogpages').append(pageButton);
	}
	
	function pageButtonEvent(event) {
		var catalogPage =languageCatalog[event.currentTarget.id]; 
		loadCatalogPage(catalogPage);
	}

	function loadCatalogPage(catalogPage) {
		$('#templatelist').empty();
		$('#templatelist').css("background-image","url(../i/"+catalogBackgrounds[catalogPage.id]+")");
		for (commandIndex in catalogPage.dataSource) {
			var command = catalogPage.dataSource[commandIndex];
			command.commandId = catalogPage.id + "." + commandIndex;
			addCommandTemplate(command);
		}
		// Make draggable
		$('#templatelist span').disableSelection();
		$('#templatelist > span').draggable( {helper: "clone", 
											  revert: "invalid",
											  opacity: .75,
											  start: function () {
											  	dragState="catalog";}});
		
		// Highlight page button
		$('.catalogpagebutton').css('background-color','#777');
		$('#catalogpages #'+catalogPage.id).css('background-color',catalogPage.color);
	}
	
    function addCommandTemplate(command) {
    	var commandTemplate = $(makeCommandHtml(command)+"<P>");
		$('#templatelist').append(commandTemplate);
		return commandTemplate;    	
    }
    
    function makeCommandHtml(command) {
    	var commandTemplate = ['<span class="',
    						 commandTypeImages[command.type].blockcss,
    						 '" command="',
    						 command.commandId,
    						 '">',
    						 parseCommandFormat(command),
    						 '</span>'].join('');
		return commandTemplate;
    }
   
    
    function parseCommandFormat(command) {		
		var paramregexp = /\{[^\}]*?\}|[^\{\}]*/g;
		var innerHtmlString = "";
		var parameters = command.format.match(paramregexp);
		
		 for   (var elementParameterIndex in parameters) {
		 	elementParameter = parameters[elementParameterIndex];
		 	var myregexp = /^\{.*\}$/;
 			if (elementParameter.match(myregexp)){  // matches {var}
 				
 				var paramType = getParamTypeByName(command,elementParameter.substring(1,elementParameter.length-1));
				innerHtmlString += ["<span class='well ", 
										paramType,
										"'>&nbsp;&nbsp;&nbsp;</span>"].join('');
						
			}
			else {
				innerHtmlString += ["<span class='commandtext'>", 
										elementParameter,
										"</span>"].join('');
			}
			
		 }
		return innerHtmlString;
	
    }
    
    function getParamTypeByName(command,name) {
    	for (index in command.params) {
    		var parameterDef = command.params[index];
    		if (parameterDef.name == name) {
    			return parameterDef.type;
    		}
    	}
    	return null;
    }
    
  
}	  
})(jQuery);





