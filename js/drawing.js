/* Blank for now. */


/* catalog pages
<div class="templatebutton"><div class="tblight red"></div><div class="tblabel">Control</div></div>

*/
/* DSL Domain Specific Language for Scratch-like drawing. */

    var commandTypeImages = { 'Statement' : {blockcss:"acceptCanvas acceptStatement greenblock",wellcss:""},
    						  'Number': {blockcss:"Number numberblock",wellcss:""},
    						  'String': {blockcss:"String greenblock",wellcss:""},
    						  'Control': {blockcss:"acceptCanvas acceptStatement controlblock",wellcss:""},
    						  'Boolean': {blockcss:"Boolean booleanblock",wellcss:""},
    						  'Handler': {blockcss:"acceptCanvas handlerblock",wellcss:""},
    						  }
    						  
    						  
    var catalogBackgrounds = { 'motion' : "20101006-texture2blue.png",
    							'pen' : "20101006-texture2green2.png",
    							'sound' : "20101006-texture2looks2.png",
    							'looks' : "20101006-texture2purple.png",
    							'sensing' :"20101006-texture2green3.png",
    							'variables' : "20101006-texture2variables2.png" ,
    							'numbers' : "20101006-texture2red.png",
    							'control' : "20101006-texture2control2.png" }
 
    var catalogBackgrounds2 = { 'motion' : "20101006-texture23.png",
    							'pen' : "20101006-texture23.png",
    							'sound' : "20101006-texture23.png",
    							'looks' : "20101006-texture23.png",
    							'sensing' :"20101006-texture23.png",
    							'variables' : "20101006-texture23.png" ,
    							'numbers' : "20101006-texture23.png",
    							'control' : "20101006-texture23.png" }

    var d  = { 'motion' : "greenblock",
    							'pen' : "turquoiseblock",
    							'sound' : "cyanblock",
    							'looks' : "violetblock",
    							'sensing' :"blueblock",
    							'variables' : "limeblock" }
    							
    						  
	var commandSettings = { firstCatalogPage : "motion"
				}; 			  
 
	var componentCatalogAC = new Array( {name:'Start',format:'Start',type:"Statement",params:[],code:"Start"},
    								   	{name:'Move',format:'Move x:{x}y:{y}',type:"Statement",params:[{type:'Number',name:'x'},{type:'Number',name:'y'}],code:"move({x},{y})"},
    									{name:'Draw',format:'Draw x:{x}y:{y}',type:"Statement",params:[{type:'Number',name:'x'},{type:'Number',name:'y'}],code:"draw({x},{y})"},
    									{name:'TextInput',format:'Text Input length:{length} bind:{bindto}',type:"Statement",params:[{type:'Number',name:'length'},{type:'String',name:'bindto'}],code:"<TextInput length='{length}' bind='{bindto}' >"});


	var motionCatalogAC = new Array({name:'move', format:'move {a} steps',type:"Statement",params:[{type:'Number',name:'a'}],code:"move({a})"},
									{name:'turn right', format:'turn right {a} degrees',type:"Statement",params:[{type:'Number',name:'a'}],code:"turnright({a})"},
									{name:'turn left',format:'turn left {a} degrees',type:"Statement",params:[{type:'Number',name:'a'}],code:"turnleft({a})"},
									{name:'point in direction', format:'point in direction {[degrees]}',type:"Statement",params:[{type:'Number',name:'[degrees]'}],code:"pointdirection({[degrees]})"},
									{name:'point towards', format:'point towards {[sprite]}',type:"Statement",params:[{type:'Number',name:'[sprite]'}],code:"pointtowards({[sprite])"},
									{name:'gotoxy', format:'goto x:{x}y:{y}',type:"Statement",params:[{type:'Number',name:'x'},{type:'Number',name:'y'}],code:"goto({x},{y})"},
									{name:'gotosprite', format:'goto {[sprite]}',type:"Statement",params:[{type:'Number',name:'[sprite]'}],code:"gotosprite({[sprite]})"},
									{name:'glide', format:'glide {seconds} seconds to x:{x}y:{y}',type:"Statement",params:[{type:'Number',name:'seconds'},{type:'Number',name:'x'},{type:'Number',name:'y'}],code:"glide({seconds},{x},{y})"},
									{name:'changex',format:'change x by {dx}',type:"Statement",params:[{type:'Number',name:'dx'}],code:"changexby({dx})"},
									{name:'set x to', format:'set x to {x}',type:"Statement",params:[{type:'Number',name:'x'}],code:"setxto({x})"},
									{name:'changey',format:'change y by {dy}',type:"Statement",params:[{type:'Number',name:'dy'}],code:"changeyby({dy})"},
									{name:'set y to', format:'set y to {y}',type:"Statement",params:[{type:'Number',name:'y'}],code:"setyto({y})"},
									{name:'if on edge bounce', format:'if on edge bounce',type:"Statement",params:[],code:"ifonedgebounce()"}
									// Variables ToDo.
									//{name:'x position', category:'motion',format:'{[check]} x position',type:"Number",params:[],code:"({x})"},
									//{name:'y position', category:'motion',format:'{[check]} y position',type:"Number",params:[],code:"({y})"},
									//{name:'direction', category:'motion',format:'{[check]} direction',type:"Number",params:[],code:"({direction})"},
									);

    var penCatalogAC = new Array({name:'clear',  format:'clear',type:"Statement",params:[],code:"clear()"},
    							 {name:'pen down',  format:'pen down',type:"Statement",params:[],code:"pendown()"},
    							 {name:'pen up',  format:'pen up',type:"Statement",params:[],code:"penup()"},
    							 {name:'clear', format:'clear',type:"Statement",params:[],code:"clear()"},
    							 {name:'set pen color',  format:'set pen color to {[color]} ',type:"Statement",params:[{type:'Number',name:'[color]'}],code:"pencolor({[color]})"},
    							 {name:'change pen color by',  format:'change pen color by{a}',type:"Statement",params:[{type:'Number',name:'a'}],code:"changepencolorby({a})"},
    							 {name:'set pen color to',  format:'set pen color to{a}',type:"Statement",params:[{type:'Number',name:'a'}],code:"setpencolorto({a})"},
    							 {name:'change pen shade by',  format:'change pen shade by{a}',type:"Statement",params:[{type:'Number',name:'a'}],code:"changepenshadeby({a})"},
    							 {name:'set pen shade to',  format:'set pen shade to{a}',type:"Statement",params:[{type:'Number',name:'a'}],code:"setpenshadeto({a})"},
    							 {name:'change pen size by',  format:'change pen size by{a}',type:"Statement",params:[{type:'Number',name:'a'}],code:"changepensizeby({a})"},
    							 {name:'set pen size to', format:'set pen size to{a}',type:"Statement",params:[{type:'Number',name:'a'}],code:"setpensizeto({a})"},
    							 {name:'stamp',  format:'stamp',type:"Statement",params:[],code:"stamp()"}
    							 );										
    														
    														
 
    var soundCatalogAC = new Array ({name:'play sound',  format:'play sound{[sound]}',type:"Statement",params:[{type:'String',name:'[sound]'}],code:"playsound({[sound]})"},
    							   {name:'play sound until done', format:'play sound{[sound]} until done',type:"Statement",params:[{type:'String',name:'[sound]'}],code:"playsounduntildone({[sound]})"},
    							   {name:'pen down', format:'pen down',type:"Statement",params:[],code:"pendown()"},
    							   {name:'stop all sounds', format:'stop all sounds',type:"Statement",params:[],code:"stopallsounds()"},
    							   {name:'play drum for beats', format:'play drum{[drum]} for{beats}',type:"Statement",params:[{type:'Number',name:'[drum]'},{type:'Number',name:'beats'}],code:"playdrumforbeats({[drum]},{beats})"},
    							   {name:'rest for beats', format:'rest for{beats}',type:"Statement",params:[{type:'Number',name:'beats'}],code:"restforbeats({beats})"},
    							   {name:'play note for beats',  format:'play note{[note]} for{beats}',type:"Statement",params:[{type:'Number',name:'[note]'},{type:'Number',name:'beats'}],code:"playnoteforbeats({[note]},{beats})"},
    							   {name:'set instrument to', format:'set instrument to{[instrument]}',type:"Statement",params:[{type:'Number',name:'[instrument]'}],code:"setinstrumentto({[instrument]})"},
    							   {name:'change volume by', format:'change volume by{volume}',type:"Statement",params:[{type:'Number',name:'volume'}],code:"changevolumeby({volume})"},
    							   {name:'set volume to',  format:'set volume to{volume}%',type:"Statement",params:[{type:'Number',name:'volume'}],code:"setvolumeto({volume})"},
    							   /* variable volume */
    							   {name:'change tempo by', format:'change tempo by{bpm}',type:"Statement",params:[{type:'Number',name:'bpm'}],code:"changetempoby({bpm})"},
    							   {name:'set tempo to',  format:'set tempo to{bpm} bpm',type:"Statement",params:[{type:'Number',name:'bpm'}],code:"settempoto({bpm})"}
    														/* variable tempo */
    								);
    														

    var controlCatalogAC = new Array({name:'when start clicked',  format:'when <span class="goicon">GO</span> clicked',type:"Handler", params:[],code:"whenstartclicked()"},
    								 {name:'when key pressed',  format:'when {[key]} pressed',type:"Handler", params:[{type:"String",name:'[key]'}],code:"whenkeypressed([{[key]})"},
    								 {name:'when spritename clicked',format:'when #this.name# clicked',type:"Handler", params:[],code:"whenimclicked()"},
    								 {name:'wait secs',  format:'wait{secs}secs',type:"Statement", params:[{type:"Number",name:'secs',_default:1}],code:"waitsecs({secs})"},
    								 {name:'forever',  format:'forever',type:"Control", params:[],code:"forever{}"},
    								 {name:'repeat', format:'repeat{times}',type:"Control", params:[{type:"Number",name:'times',_default:10}],code:"repeat({times}){}"},
    								 {name:'broadcast',  format:'broadcast{[message]}',type:"Statement", params:[{type:"String",name:'[message]'}],code:"broadcast({[message]})"},
    								 {name:'broadcast and wait',  format:'broadcast and wait{[message]}',type:"Statement", params:[{type:"String",name:'[message]'}],code:"broadcastandwait({[message]})"},
    								 {name:'when I receive', format:'when I receive{[message]}',type:"Handler", params:[{type:"String",name:'[message]'}],code:"whenIreceive({[message]})"},
    								 {name:'forever if', format:'forever if{cond}',type:"Control", params:[{type:"Boolean",name:'cond'}],code:"foreverif({cond}){}"},
    								 {name:'if',  format:'if {cond}',type:"Control", params:[{type:"Boolean",name:'cond'}],code:"if({cond}){}"},
    								 {name:'ifelse', format:'if {cond}*else',type:"Control", params:[{type:"Boolean",name:'cond'}],code:"if({cond}){}else{}"},
    								 {name:'wait until',  format:'wait until {cond}',type:"Control", params:[{type:"Boolean",name:'cond'}],code:"waituntil({cond})"},
									 {name:'repeat until', format:'repeat until {cond}',type:"Control", params:[{type:"Boolean",name:'cond'}],code:"repeat until({cond}){}"},
									 {name:'stop script',  format:'stop script',type:"Statement",params:[],code:"stopscript()"},
								     {name:'stop all',  format:'stop all^stop^',type:"Statement",params:[],code:"stopall()"}														    
    								);
  
    var sensingCatalogAC = new Array({name:'when start clicked',  format:'when ^flag^ clicked',type:"Handler", params:[],code:"whenstartclicked()"},
    								 {name:'when key pressed',  format:'when {[key]} pressed',type:"Handler", params:[{type:"String",name:'[key]'}],code:"whenkeypressed([{[key]})"},
    								 {name:'when spritename clicked',  format:'when #this.name# clicked',type:"Handler", params:[],code:"whenimclicked()"},
    								 {name:'wait secs',  format:'wait {secs} secs',type:"Statement", params:[{type:"Number",name:'secs',_default:1}],code:"waitsecs({secs})"},
    							     {name:'forever',  format:'forever',type:"Control", params:[],code:"forever{}"},
    								 {name:'repeat', format:'repeat{times}',type:"Control", params:[{type:"Number",name:'times',_default:10}],code:"repeat({times}){}"},
    								 {name:'broadcast', format:'broadcast{[message]}',type:"Statement", params:[{type:"String",name:'[message]'}],code:"broadcast({[message]})"},
    								 {name:'broadcast and wait',  format:'broadcast and wait{[message]}',type:"Statement", params:[{type:"String",name:'[message]'}],code:"broadcastandwait({[message]})"},
    							     {name:'when I receive', format:'when I receive{[message]}',type:"Handler", params:[{type:"String",name:'[message]'}],code:"whenIreceive({[message]})"},
    								 {name:'forever if',  format:'forever if{cond}',type:"Control",params:[{type:"Boolean",name:'cond'}],code:"foreverif({cond}){}"},
    								 {name:'if',  format:'if {cond}',type:"Control", params:[{type:"Boolean",name:'cond'}],code:"if({cond}){}"},
    								 {name:'ifelse',  format:'if {cond}*else',type:"Control", params:[{type:"Boolean",name:'cond'}],code:"if({cond}){}else{}"},
    							     {name:'wait until',  format:'wait until {cond}',type:"Control", params:[{type:"Boolean",name:'cond'}],code:"waituntil({cond})"},
									 {name:'repeat until',  format:'repeat until{cond}',type:"Control", params:[{type:"Boolean",name:'cond'}],code:"repeat until({cond}){}"},
								     {name:'stop script',  format:'stop script',type:"Statement",params:[],code:"stopscript()"},
									 {name:'stop all',  format:'stop all^stop^',type:"Statement",params:[],code:"stopall()"}    															    
    								);
    														    														
    
    var mathCatalogAC = new Array({name:'+', format:'{a}+{b}',type:"Number",params:[{type:'Number',name:'a'},{type:'Number',name:'b'}],code:"({a}+{b})"},
    								{name:'-', format:'{a}-{b}',type:"Number",params:[{type:'Number',name:'a'},{type:'Number',name:'b'}],code:"({a}-{b})"},
    							    {name:'*', format:'{a}*{b}',type:"Number",params:[{type:'Number',name:'a'},{type:'Number',name:'b'}],code:"({a}*{b})"},
    								{name:'/', format:'{a}/{b}',type:"Number",params:[{type:'Number',name:'a'},{type:'Number',name:'b'}],code:"({a}/{b})"},
    								{name:'rand', format:'pick random from{from}to{to}',type:"Number",params:[{type:'Number',name:'from'},{type:'Number',name:'to'}],code:"(Math.rand(1)*({from}+{to})+{from})"},
    														    														
    								{name:'less than', format:'{a}<{b}',type:"Boolean",params:[{type:'Number',name:'a'},{type:'Number',name:'b'}],code:"({a} < {b})"},
    								{name:'equals', format:'{a}={b}',type:"Boolean",params:[{type:'Number',name:'a'},{type:'Number',name:'b'}],code:"({a} == {b})"},
    						        {name:'greater than', format:'{a}>{b}',type:"Boolean",params:[{type:'Number',name:'a'},{type:'Number',name:'b'}],code:"({a} > {b})"},
    						        {name:'and', format:'{a}and{b}',type:"Boolean",params:[{type:'Boolean',name:'a'},{type:'Boolean',name:'b'}],code:"({a} && {b})"},
    								{name:'or', format:'{a}or{b}',type:"Boolean",params:[{type:'Boolean',name:'a'},{type:'Boolean',name:'b'}],code:"({a} || {b})"},
    							    {name:'not', format:'not{a}',type:"Boolean",params:[{type:'Boolean',name:'a'}],code:"(!{a})"},
    								{name:'mod', format:'{a} mod {b}',type:"Number",params:[{type:'Number',name:'a'},{type:'Number',name:'b'}],code:"({a} % {b})"}
    				                );

    var costumeCatalogAC = new Array({name:'switch to costume',  format:'switch to costume{[costume]}',type:"Statement",params:[{type:'String',name:'[costume]'}],code:"switchtocostume({[costume]})"},
    								 {name:'next costume', format:'next costume',type:"Statement",params:[],code:'nextcostume()'},
									 // {name:'costume number'}
									 {name:'say for',  format:'say{hello} for{a}secs',type:"Statement",params:[{type:'String',name:'hello'},{type:'Number',name:'a'}],code:"sayfor({hello},{a})"},
									 {name:'say',  format:'say{hello}',type:"Statement",params:[{type:'String',name:'hello'}],code:"say({hello})"},
									 {name:'think for',format:'think{hello} for{a}secs',type:"Statement",params:[{type:'String',name:'hello'},{type:'Number',name:'a'}],code:"think({hello},{a})"},
									 {name:'think',format:'think{hello}',type:"Statement",params:[{type:'String',name:'hello'}],code:"think({hello})"},
									
									 {name:'change effect by',format:'change{[effect]} by{a}',type:"Statement",params:[{type:'String',name:'[effect]'},{type:'Number',name:'a'}],code:"changeby({[effect]},{a})"},
									 {name:'set effect to',format:'set{[effect]} to{a}',type:"Statement",params:[{type:'String',name:'[effect]'},{type:'Number',name:'a'}],code:"seteffectto({[effect]},{a})"},
									 {name:'clear graphics effects',format:'clear graphics effects',type:"Statement",params:[],code:'cleargraphicseffects()'},
									
									 {name:'change size by', format:'change size by{a}',type:"Statement",params:[{type:'Number',name:'a'}],code:"changesizeby({a})"},
									 {name:'set size to %', format:'set size to{a}%',type:"Statement",params:[{type:'Number',name:'a'}],code:"setsizeto({a})"},
									 /* variable size */
									
									 {name:'show',format:'show',type:"Statement",params:[],code:'show()'},
									 {name:'hide',format:'clear graphics effects',type:"Statement",params:[],code:'hide()'},
									 {name:'go to front',format:'go to front',type:"Statement",params:[],code:'gotofront()'},
									 {name:'go back layers', format:'go back{a}  layers',type:"Statement",params:[{type:'Number',name:'a'}],code:"gobacklayers({a})"}
									
									);
    															

	
	var drawingCatalogPages= { motion: {id:'motion',name:'Motion',color:"#6699ff",dataSource:motionCatalogAC},
							   control:{id:'control',name:'Control',color:"#ffbb99",dataSource:controlCatalogAC},
							   looks: {id:'looks',name:'Looks',color:"#aa99ff",dataSource:costumeCatalogAC},
							   sensing: {id:'sensing',name:'Sensing',color:"#99aa99",dataSource:sensingCatalogAC},
							   sound:{id:'sound',name:'Sound',color:"#ccaacc",dataSource:soundCatalogAC},	
							   numbers:{id:'numbers',name:'Numbers',color:"#ff9999",dataSource:mathCatalogAC},
							   pen:{id:'pen',name:'Pen',color:"#009999",dataSource:penCatalogAC},
							   variables:{id:'variables',name:'Variables',color:"#99cc99",dataSource:componentCatalogAC}
	                          }; 
										
														  
														  