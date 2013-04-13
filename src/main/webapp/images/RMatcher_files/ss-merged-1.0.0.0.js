
var $ss=null;var $j=jQuery.noConflict();var SimpleSite=function(options){var $ssThis=this;init(options);function init(options){this.stage=new Stage(options);};function Stage(options){var $this=this;this.options=options;this.basePath=options.basePath;this.cdnImagePath=options.cdnImagePath;this.cdnCssPath=options.cdnCssPath;this.eventReceiver=$j(options.eventReceiver);this.layout=new Layout(options.layoutControls,options.layout);this.layoutList=options.layoutList;this.getLayoutPreset=function(id){return $j.grep($this.layoutList,function(l){return l.id==parseInt(id);})[0];};this.layoutConfig=options.layoutConfig;this.background=new Background({id:options.background.id,thumbnail:options.background.thumbnail,elementSelector:options.layoutControls.background,src:options.background.src,orientation:options.background.orientation,variation:options.background.variation,color:options.palette.backgrounds.page,thumbnail:options.background.thumbnail,stockBackgroundId:options.background.stockBackgroundId});this.backgroundList=options.backgroundList;this.getBackgroundPreset=function(id){return $j.grep($this.backgroundList,function(b){return b.id==parseInt(id);})[0];};this.palette=new Palette(options.styleControls,options.palette);this.paletteList=options.paletteList;this.getPalettePreset=function(id){return $j.grep($this.paletteList,function(p){return p.id==parseInt(id);})[0];}
this.titleFontList=options.titleFontList;this.getTitleFont=function(id){return $j.grep($this.titleFontList,function(f){return f.id==parseInt(id);})[0];};this.generalFontList=options.generalFontList;this.getGeneralFont=function(id){return $j.grep($this.generalFontList,function(f){return f.id==parseInt(id);})[0];};this.descriptionFontList=options.descriptionFontList;this.getDescriptionFont=function(id){return $j.grep($this.descriptionFontList,function(f){return f.id==parseInt(id);})[0];};this.servicesFontList=options.servicesFontList;this.getServicesFont=function(id){return $j.grep($this.servicesFontList,function(f){return f.id==parseInt(id);})[0];};this.font=new Font(options.fontControls,options.fonts,options.titleFont,options.generalFont);this.siteInfo=new SiteInfo(options.siteInfo,options.layoutControls);this.fixBackgroundOrientation=function(){this.background.fixOrientation(false,'windowresize');}
this.showWidget=this.layout.showWidget;this.hideWidgets=this.layout.hideWidgets;this.showWaiter=function(options){var anchor=$j("#page");if(anchor.length>0){var aWidth=anchor.width();var contrastLevel=$j.getBestContrast($ss.stage.palette.backgrounds.block);var whichSpinner="spinner-"+contrastLevel;var div=$j('<div id="appwaiter"><div class="'+whichSpinner+'"></div><div class="color" style="background-color:'+$ss.stage.palette.backgrounds.block+'"></div></div>').appendTo(document.body).flyout({anchor:anchor,positionX:'center',positionY:'center'});}};this.hideWaiter=function(){var div=$j("#appwaiter");div.flyout("destroy",function(){div.remove();});};this.sessionTimerId=-1;this.showIncompatibleBrowserModal=function(ignoreCallback){var html='Sites like ours are built with newer browsers in mind. Upgrade to a fully-supported browser below for a better experience here and at other leading Web destinations. <a href="#">Learn more>></a>'+'<div class="browser-list"><ul>'+'<li><a href="http://www.mozilla.com/" class="browser ff" target="_browser"></a></li>'+'<li><a href="http://www.google.com/chrome" class="browser chrome" target="_browser"></a></li>'+'<li><a href="http://www.microsoft.com/Windows/internet-explorer" class="browser ie" target="_browser"></a></li>'+'</ul></div>';$c.Stage.showModalNotification({title:'Are you sure?',message:html,buttons:[{type:'ok',caption:'Ignore',action:ignoreCallback}],width:400,callback:function(){$j(".browser-list").find("a").hover(function(){$j(this).addClass("selected");},function(){$j(this).removeClass("selected");})}});};this.shareLinksData=options.shareLinksData;this.showShareLinksPanel=function(isVisitor){$j("#sharePanel").shareLinks({url:'http://'+this.siteInfo.domain.toLowerCase(),title:this.siteInfo.title,links:this.shareLinksData,onLinkClick:function(socialLinkValue){$j.ajax({type:"POST",url:options.basePath+'home/SocialLinkTrack',dataType:'json',contentType:'application/json; charset=utf-8',data:$j.jsonStringify({socialLinkValue:socialLinkValue,isVisitor:isVisitor})});}});};this.showPreviewModal=function(){var appId=$j.getQueryStringVariable('previewAppId');if(!$j.isPopulated(appId))return;var msgItems=$j.grep(options.previewMessageData,function(pm){return pm.appId==appId;});if(msgItems.length==0)return;var message=msgItems[0].message;if($j.isPopulated(message)){$c.Stage.showModalNotification({message:message.replace(/\[\[domain\]\]/g,this.siteInfo.domain),title:'Site Preview',okCaption:'Close'});}};return this;}
function Layout(controls,options){var $this=this;this.controls=controls;this.id=parseInt(options.id);this.type=options.type;this.variation=options.variation;this.className=function(){return'layout'+this.type+(this.variation!=null?'-'+this.variation:'');};this.compensateForScrollbar=function(showing){var p=$j($this.controls.page);var overflowing=p.get(0).clientHeight<p.get(0).scrollHeight;var margin=showing?(overflowing?'17px':'0'):'';$c.Stage.log("clientHeight = "+p.get(0).clientHeight+"\nscrollHeight = "+p.get(0).scrollHeight);if(!showing)p.css("overflow","hidden");if($j.browser.msie){$j("#menucontainer").css("margin-left",(margin==''?'':'-')+margin);p.css('padding-left',margin);}
else{p.css('left',margin);$j("#menucontainer").css({"left":(margin==''?'':'-')+margin,"padding-left":margin});}
$c.Stage.log((showing?"showing scrollbar - ":"hiding scrollbar - ")+"overflowing now = "+overflowing+"\nturning on overflow = "+(margin!=''));if(margin!='')p.css("overflow-y","auto");}
$j(controls.widgetContainer).switcher({blockClass:'ss-block',layoutWidgetShow:{"1":function(){$j($this.controls.title).css("cursor","pointer");$ss.stage.layout.revealed=function(){if($this.variation=='c')
$this.compensateForScrollbar(true);else
$j($this.controls.page).css("overflow-y","auto");};$ss.stage.layout.obscured=function(){$this.compensateForScrollbar(false);$j($this.controls.page).css("overflow-y","auto");};$this.compensateForScrollbar(false);},"2":function(){$j($this.controls.title).css("cursor","pointer");$ss.stage.layout.revealed=function(){setTimeout(function(){$this.compensateForScrollbar(true);},300);};$ss.stage.layout.obscured=null;$this.compensateForScrollbar(false);},"3":function(){$j($this.controls.title).css("cursor","pointer");if(!$j('.legacy.ie').length){var about=$j($this.controls.about);about.animate({'marginTop':'10px'},{duration:500,queue:false,complete:function(){}});$ss.stage.layout.revealed=function(){setTimeout(function(){$this.compensateForScrollbar(true);},300);};$ss.stage.layout.obscured=function(){setTimeout(function(){var p=$j($this.controls.page);var overflowing=p.get(0).clientHeight<p.get(0).scrollHeight;if(overflowing){$j($this.controls.page).css("overflow-y","auto");}},500);};var container=$j($this.controls.widgetContainer);var wHeight=$j($this.controls.page).height();container.css("top",wHeight+'px');$this.compensateForScrollbar(false);if($j.isPopulated(container))
container.animate({'top':about.height()+45},{duration:1000,queue:false});}},"4":function(){$j($this.controls.title).css("cursor","pointer");}},layoutWidgetHide:{"1":function(callback){$j($this.controls.title).css("cursor","default");$this.compensateForScrollbar(false);if(callback)
callback();},"2":function(callback){$j($this.controls.title).css("cursor","default");$this.compensateForScrollbar(false);if(callback)
callback();},"3":function(callback){$j($this.controls.title).css("cursor","default");if($j('.legacy.ie').length){if(callback)
callback();}
else{var menu=$j($this.controls.launcher);var menuHeight=menu.height();var about=$j($this.controls.about);var aboutHeight=about.height();about.animate({'marginTop':'30%'},{duration:500,queue:false});var container=$j($this.controls.widgetContainer);var originalHeight=container.height();var top=$j($this.controls.page).height();$this.compensateForScrollbar(false);container.animate({top:top,height:'0'},{duration:1000,queue:false,complete:function(){$j(this).hide().css("height","");if(callback)
callback();}});}},"4":function(){$j($this.controls.title).css("cursor","default");$j($this.controls.page).css("padding-left","");$j("#menucontainer").css("margin-left","");if(callback)
callback();}}});this.showWidget=function(id,anchor){if(!$this.checkingForDoubleClick){$this.checkingForDoubleClick=true;$j($this.controls.widgetContainer).switcher('switchContent',{anchor:anchor,id:id,preRender:function(){$ssThis.stage.palette.fixPalette(true);$ssThis.stage.font.fixFont();},layout:{type:$this.type,variation:$this.variation}});setTimeout(function(){$this.checkingForDoubleClick=false;},200);}};this.hideWidgets=function(){$j($this.controls.widgetContainer).switcher('switchContent',{close:true,layout:{type:$this.type,variation:$this.variation}});};this.fixHtml=function(){var launcher=$j(controls.launcher);var about=$j(controls.about);var page=$j(controls.page);var container=$j(controls.widgetContainer);var isLegacy=$j(document.body).is('.legacy.ie');var removeHomeLink=function(){var homelink=launcher.find(".link-home").css('display','none');};var fixWidgetContainer=function(){var container=$j(controls.widgetContainer);if(container.parent().is("li"))container.appendTo($j("#content"));}
var aboutThenLauncher=function(){about.css("margin-top",null);if(isLegacy){if(launcher.index()<about.index())about.after(launcher);}
else{if(launcher.parent().is(controls.page))about.after(launcher);}}
var launcherThenAbout=function(){if(isLegacy){if(about.index()<launcher.index())launcher.after(about);}
else{if(!launcher.parent().is(controls.page))launcher.prependTo(page);}}
var resetPageTop=function(){page.css('top',0);}
var resetContainerTop=function(){container.css('top','');}
var resetContainerHeight=function(){container.css('height','');}
var layouts={"1":function(){resetContainerTop();resetPageTop();resetContainerHeight();aboutThenLauncher();removeHomeLink();fixWidgetContainer();},"2":function(){resetContainerTop();resetPageTop();resetContainerHeight();aboutThenLauncher();removeHomeLink();},"3":function(){launcherThenAbout();launcher.find(".link-home").css('display','inline');if($j('.compliant').size()){var top=launcher.height();page.css('top',top);}
fixWidgetContainer();},"4":function(){resetContainerTop();resetPageTop();resetContainerHeight();aboutThenLauncher();removeHomeLink();fixWidgetContainer();}};$this.hideWidgets();layouts[$this.type]();};this.fixClasses=function(){$j("#ss-launcher").css("position","");$j(".page").attr("class",null).addClass("page").addClass($this.className());var position="fixed";if(navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i)){position="relative";}
if($this.className()=="layout3-c"){$j(document).ready(function(){$j("#ss-launcher").css("position",position);});}};this.fixLayout=function(isInit){this.fixClasses();this.fixHtml();if(!isInit)this.saveLayout();};this.fixLayout(true);return this;}
function Background(options){this.id=options.id;this.src=options.src;this.thunbnail=options.thumbnail;this.orientation=options.orientation;this.variation=options.variation;this.element=function(){return $j(options.elementSelector);};this.color=options.color;this.stockBackgroundId=options.stockBackgroundId;this.fixOrientation=function(isInit,caller,isNoImage){var $this=this;$c.Stage.log("orientation = "+$this.orientation+" variation = "+$this.variation+" src = "+$this.src);var scaleBackground=function(scaleType){$this.element().replaceWith('<div id="ss-background" class="ss-background" style="position: fixed; z-index:-1000; background-color: '+$this.color+'; height:100%; width:100%;"></div>');var xaxis=$this.variation.substr(1,1);var yaxis=$this.variation.substr(0,1);xaxis=(xaxis=="r")?"right":(xaxis=="c")?"center":"left";yaxis=(yaxis=="b")?"bottom":(yaxis=="m")?"middle":"top";if($this.element().is(":gd-scaleBackground1")){$this.element().scaleBackground1("rescale",{scaleType:scaleType,src:$this.src,positionX:xaxis,positionY:yaxis,backgroundColor:$this.color,fadeIn:true});}
else{var ops={container:$j(window),positionX:xaxis,positionY:yaxis,src:$this.src,backgroundColor:$this.color,cssPosition:"fixed",fadeIn:true};if(scaleType=="fit"){ops.scaleType="fit";ops.backgroundColorContainer=$j(document.body);}
$c.Stage.log("about to init scale");$this.element().scaleBackground1(ops);}};var orientations={"1":function(){if(caller!='windowresize'){var xaxis=$this.variation.substr(1,1);var yaxis=$this.variation.substr(0,1);var left=(xaxis=='r'?"100%":xaxis=='c'?"50%":"0");var top=(yaxis=='b'?"100%":yaxis=='m'?"50%":"0");$this.element().replaceWith('<div id="ss-background" class="ss-background" style="position: fixed; z-index:-1000; background-color: '+$this.color+'; background-image: url('+$this.src+'); background-repeat: no-repeat; background-position:'+left+' '+top+'; height:100%; width:100%;display:none;"></div>')
$j.getImageProps($this.src,function(){$this.element().fadeIn(500);});}},"2":function(){if(caller!='windowresize'){$this.variation='';$this.element().replaceWith('<div id="ss-background" class="ss-background" style="position: fixed; z-index:-1000; background-color: '+$this.color+'; background-image: url('+$this.src+'); background-repeat:repeat; height:100%; width:100%;display:none;"></div>');$j.getImageProps($this.src,function(){$this.element().fadeIn(500);});}},"3":function(){scaleBackground("fill");},"4":function(){scaleBackground("fit");}};if(!isInit&&caller=="backgroundList"){$this.element().fadeOut(500,function(){orientations[$this.orientation]();});}
else{orientations[$this.orientation]();}
if(caller=="backgroundOrientation")$j(".background-variation-button").trigger('backgroundChange',{orientation:$this.orientation,variation:$this.variation,src:$this.src});if(!isInit){if(caller=="backgroundList"||caller=="added")$j(".background-orientation-button, .background-variation-button").trigger('backgroundChange',{orientation:$this.orientation,variation:$this.variation,src:$this.src});if(caller!="cropImage"&&caller!='windowresize'&&caller!='added')
this.saveBackground({changeType:caller=="backgroundList"?(isNoImage?"no-image":"image"):"position"});}};this.fixOrientation(true);return this;}
function Palette(controls,palette){this.controls=controls;this.backgrounds=palette.backgrounds;this.fonts=palette.fonts;this.id=parseInt(palette.id);this.name=palette.name;this.userCreated=palette.userCreated;this.isActive=palette.isActive;this.changeCount=0;var $this=this;this.fixPalette=function(isInit){$c.Stage.log("fixing palette");var item,control;if($j.isPopulated($this.backgrounds)){for(item in $this.backgrounds){if($j($this.controls[item]).length>0){control=$j($this.controls[item].reset);if($j.isPopulated(control))control.css("backgroundColor",'');if($this.backgrounds[item]!="none"){control=$j($this.controls[item].apply);if($j.isPopulated(control))control.css("backgroundColor",$this.backgrounds[item]);}
if($j.isPopulated($this.controls[item].foreground)){control=$j($this.controls[item].foreground.reset);if(control.length>0)control.css("color",'');control=$j($this.controls[item].foreground.apply);if(control.length>0)control.css("color",$this.backgrounds[item]);}}}}
if($j.isPopulated($this.fonts)){for(item in $this.fonts){if($j($this.controls[item]).length>0){control=$j($this.controls[item].reset);if(control.length>0)control.css("color",'');control=$j($this.controls[item].apply);if(control.length>0)control.css("color",$this.fonts[item]);if($j.isPopulated($this.controls[item].borders)){control=$j($this.controls[item].borders.reset);if(control.length>0)control.css("borderColor",'');control=$j($this.controls[item].borders.apply);if(control.length>0)control.css("borderColor",$this.fonts[item]);}
if($j.isPopulated($this.controls[item].background)){control=$j($this.controls[item].background.reset);if(control.length>0)control.css("backgroundColor",'');control=$j($this.controls[item].background.apply);if(control.length>0)control.css("backgroundColor",$this.fonts[item]);}}}}
var mobileDiv=$j('.mobile-failure');if(mobileDiv.length>0){mobileDiv.css('color','');mobileDiv.css('color','black');}
$j(".color-selector, .palette-new-name, .palette-new-id, #link-palette-save-dialog").trigger('paletteChange',{id:$this.id,name:$this.name,backgrounds:$this.backgrounds,fonts:$this.fonts});if(!isInit){this.savePalette({changeType:'palette'});}};this.getData=function(){return{id:$this.id,name:$this.name,backgrounds:$this.backgrounds,fonts:$this.fonts};};this.getDataForColorPicker=function(){var data={};for(var key in $this.backgrounds){data[key]={color:$this.backgrounds[key],caption:$ss.getColorCaption('background',key)};}
for(var key in $this.fonts){data[key]={color:$this.fonts[key],caption:$ss.getColorCaption('font',key)};}
return data;};this.fixPalette(true);return this;}
function Font(controls,options,titleFont,generalFont){var $this=this;this.controls=controls;this.generalFont=generalFont;this.titleFont=titleFont;this.titleSize=options.titleSize;this.descriptionSize=options.descriptionSize;this.servicesSize=options.servicesSize;this.fixFont=function(){$c.Stage.log("fixing font");for(var controlName in $this.controls){var face='Arial';var fontFaceType=controlName=="title"?controlName:"general";var font=this[fontFaceType+'Font'];if($j.isPopulated(font))face=font.faceName;var control=$j($this.controls[controlName].reset);if($j.isPopulated(control)){if(controlName!="block")control.css({"font-family":'',"font-size":''});else control.css({"font-family":''});}
control=$j($this.controls[controlName].apply);if($j.isPopulated(control)){if(controlName!="block")control.css({"font-family":face,"font-size":this[controlName+"Size"]+'px'});else control.css({"font-family":face});}}}
this.applyShadow=function(controlName){var control=$j($ss.stage.options.layoutControls[controlName]);var fontsize=parseInt(control.copyCSS('font-size')["font-size"].stripCssUnit());var blur=fontsize<=24?1:2;var x=fontsize<=24?1:2;var bg=control.css("background-color");if(bg=="transparent")bg=$j($ss.stage.options.layoutControls["background"]).css("background-color");var bgColor=bg.indexOf("rgb")==0?$j.rgbToHex(bg):bg;var contrast=$j.getBestContrast(bgColor);var color=contrast==1?"#666":contrast==2?"#333":contrast==3?"#666":"#000";if(controlName=="launcher")control=control.find("li a");if(control.is(":gd-textShadow"))control.textShadow("destroy");control.textShadow({x:x,y:x,blur:blur,color:color});}
this.removeShadow=function(controlName){var control=$j($ss.stage.options.layoutControls[controlName]);if(controlName=="launcher")control=control.find("li a");if(control.is(":gd-textShadow"))control.textShadow("destroy");}
this.fixFont();}
function SiteInfo(options,controls){this.title=options.title;this.description=options.description;this.domain=options.domain;this.showShareLinks=options.showShareLinks;this.controls=controls;}
return{stage:$ssThis.stage,basePath:$ssThis.stage.basePath,cdnImagePath:$ssThis.stage.cdnImagePath,cdnCssPath:$ssThis.stage.cdnCssPath,fotoliaUrl:options.fotoliaUrl,affiliateInfo:options.affiliateInfo,wstAppName:options.wstAppName,eventReceiver:$ssThis.stage.eventReceiver,extend:function(extensions){$j.extend(this,extensions);},extendStage:function(extensions){if($j.isPopulated($ssThis.stage)){$j.extend($ssThis.stage,extensions);}},extendComponent:function(componentName,extensions){if($j.isPopulated($ssThis.stage[componentName])){$j.extend($ssThis.stage[componentName],extensions);}},showWidget:function(id,anchor){$ssThis.stage.showWidget(id,anchor);},hideWidgets:function(){$ssThis.stage.hideWidgets();},paletteList:$ssThis.stage.paletteList,getPalettePreset:$ssThis.stage.getPalettePreset,layoutList:$ssThis.stage.layoutList,getLayout:function(){return $ssThis.stage.layout},getLayoutPreset:$ssThis.stage.getLayoutPreset,getBackground:function(){return $ssThis.stage.background},backgroundList:$ssThis.stage.backgroundList,getBackgroundPreset:$ssThis.stage.getBackgroundPreset,fixBackgroundOrientation:function(){$ssThis.stage.fixBackgroundOrientation();},titleFontList:$ssThis.stage.titleFontList,getTitleFont:$ssThis.stage.getTitleFont,generalFontList:$ssThis.stage.generalFontList,getGeneralFont:$ssThis.stage.getGeneralFont,getCurrentPaletteName:function(){return $ssThis.stage.palette.name;},fixPalette:function(){$ssThis.stage.palette.fixPalette(true);},fixFont:function(){$ssThis.stage.font.fixFont();},showWaiter:function(){$ssThis.stage.showWaiter();},hideWaiter:function(){$ssThis.stage.hideWaiter();},showLauncher:function(){var launcher=$j($ssThis.stage.options.layoutControls.launcher);var about=$j($ssThis.stage.options.layoutControls.about);if(launcher.find('a[wid]:not(.uninitialized)').size()||$j('#menu-affiliate-link',launcher).is(':visible')||($j.isPopulated($ss.affiliateInfo)&&$ss.affiliateInfo.selectedAdId>0)){launcher.show();about.removeClass("no-launcher");}
else{launcher.hide();about.addClass("no-launcher");}},showIncompatibleBrowserModal:function(callback){$ssThis.stage.showIncompatibleBrowserModal(callback);}};};$j.extend($j.expr[':'],{isInWidgetConfigPanel:function(obj,index,meta,stack)
{return $j(obj).parents(".widget-edit-config-panel").length>0;},isNotInWidgetConfigPanel:function(obj,index,meta,stack)
{return $j(obj).parents(".widget-edit-config-panel").length==0;},isThirdPartyInclude:function(obj,index,meta,stack){return $j(obj).parents(".widget-third-party").length>0;}});$j(document).ready(function(){var theWindow=$j(window);var currentHeight=theWindow.height();var currentWidth=theWindow.width();theWindow.bind("resize",function(){var newWidth=theWindow.width();var newHeight=theWindow.height();if(newWidth!=currentWidth||newHeight!=currentHeight){currentHeight=newHeight;currentWidth=newWidth;$ss.fixBackgroundOrientation();}});$j('#menu-affiliate-link a').addClass('ss-service');$j("#ss-launcher li:last").addClass("last");$j(document).bind("widgetError",function(e,error){$ss.hideWaiter();});$j("#ss-name").bind("click",function(){$ss.hideWidgets();});$j('.cross-sell').bind("mouseenter",function(){crossellmouseover($j(this));}).bind("mouseleave",function(){crosssellmouseout($j(this),0);}).bind("touchend",function(){var xSell=$j(this);if(xSell.hasClass("extended")){crosssellmouseout(xSell,0);}
else{$j("a.want-one-link",xSell).one("click.touchFlyOut",function(e){e.preventDefault();}).bind("touchend",function(e){e.stopPropagation();});crossellmouseover(xSell);}});function crossellmouseover(el){if(!el.hasClass("extended")){el.clearQueue().stop().animate({right:0},500).addClass("extended");}}
function crosssellmouseout(el,delay){delay=$j.isPopulated(delay)?delay:2000;var widthMethod=($j.browser.msie&&$j.browser.version.split('.')[0]<='7')?"outerWidth":"width";el.clearQueue().delay(delay).animate({right:-Math.floor($j('.cross-sell .blurb')[widthMethod]()-($j('.cross-sell .logo')[widthMethod]()+$j('.cross-sell .arrow').outerWidth(true)))},{duration:500,complete:function(){el.removeClass("extended");}});}
crosssellmouseout($j('.cross-sell'),0);if(document.attachEvent){var originalTitle=document.title;document.attachEvent('onpropertychange',function(evt){if(evt.propertyName==='title'&&document.title!==originalTitle){setTimeout(function(){document.title=originalTitle;},0);}});}});
;(function($)
{$.extend($.expr[':'],{isBound:function(obj,index,meta,stack)
{return $.isPopulated($(obj).data(meta[3]));},isNotBound:function(obj,index,meta,stack)
{return!$.isPopulated($(obj).data(meta[3]));}});$.extend({isPopulated:function(obj)
{var populated=(obj!=null&&obj!=undefined);if(populated&&obj.constructor==String)
{populated=(obj.length>0&&obj!="undefined");}
return populated;},safeStr:function(obj)
{if($.isPopulated(obj))
{if(obj.constructor==String)return obj;else return obj.toString();}
else return"";},addCSS:function(cssCode)
{var styleElement=document.createElement("style");styleElement.type="text/css";if(styleElement.styleSheet)
{styleElement.styleSheet.cssText=cssCode;}
else
{styleElement.appendChild(document.createTextNode(cssCode));}
document.getElementsByTagName("head")[0].appendChild(styleElement);},addStyleSheet:function(src)
{var styleElement=document.createElement("link");styleElement.type="text/css";styleElement.href=src;styleElement.rel="stylesheet";document.getElementsByTagName("head")[0].appendChild(styleElement);},getCSS:function(stylesheetFileName,selector)
{var css=null;for(var i=0;i<document.styleSheets.length;i++)
{if($.isPopulated(document.styleSheets[i].href)&&document.styleSheets[i].href.indexOf(stylesheetFileName)>-1)
{var stylesheet=document.styleSheets[i];for(var j=0;j<stylesheet.cssRules.length;j++)
{if(stylesheet.cssRules[j].selectorText.indexOf(selector)>-1)
{css=stylesheet.cssRules[j].style.cssText;}}
break;}}
return css;},isCssFileLoaded:function(stylesheetFileName){for(var i=0;i<document.styleSheets.length;i++){if($.isPopulated(document.styleSheets[i].href)&&document.styleSheets[i].href.indexOf(stylesheetFileName)>-1)
return true;}
return false;},getQueryStringVariable:function(variable)
{if(!jQuery.isPopulated(variable))variable=="";variable=variable.toLowerCase();var query=window.location.search.substring(1);var vars=query.split("&");for(var i=0;i<vars.length;i++)
{var pair=vars[i].split("=");var q=pair[0];if(!jQuery.isPopulated(q))q="";q=q.toLowerCase();if(q==variable)
{return pair[1];}}
return"";},convertToJson:function(obj)
{var b="\\";var q='"';var rq=/"/g;var rb=/\\/g;var str="{";for(var i in obj)
{var render="";if(typeof obj[i]=='object')
{render=jQuery.convertToJson(obj[i]);}
else
{render='"'+decodeURIComponent(obj[i]).replace(rb,b+b).replace(rq,b+q)+'"';}
str+='"'+i+'" : '+render+', ';}
if(str!="{")str=str.substring(0,str.length-2);str+="}";return str;},isAppleDevice:function()
{return(navigator.userAgent.match(/iPad|iPhone|iPod/i)!=null);},rgbToHex:function(rgb)
{var hexDigits=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];rgb=rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);if($.isPopulated(rgb))
{function hex(x){return isNaN(x)?"00":hexDigits[(x-x%16)/16]+hexDigits[x%16];}
return"#"+hex(rgb[1])+hex(rgb[2])+hex(rgb[3]);}
else return'';},hexToRGB:function(hexColor)
{function prepHex(h)
{h=(h.charAt(0)=="#")?h.substring(1,7):h;if(h.length==3||h.length==6)
{if(h.length==3)
{h=h.substr(0,1)+h.substr(0,1)+h.substr(1,1)+h.substr(1,1)+h.substr(2,1)+h.substr(2,1);}}
else h=(h+'ffffff').substring(0,6);return h;}
function HexToR(h){return parseInt(h.substring(0,2),16)}
function HexToG(h){return parseInt(h.substring(2,4),16)}
function HexToB(h){return parseInt(h.substring(4,6),16)}
var prepped=prepHex(hexColor);return{R:HexToR(prepped),G:HexToG(prepped),B:HexToB(prepped)};},rgbToHSV:function(r,g,b)
{r=r/255,g=g/255,b=b/255;var max=Math.max(r,g,b),min=Math.min(r,g,b);var h,s,v=max;var d=max-min;s=max==0?0:d/max;if(max==min)
{h=0;}else
{switch(max)
{case r:h=(g-b)/d+(g<b?6:0);break;case g:h=(b-r)/d+2;break;case b:h=(r-g)/d+4;break;}
h/=6;}
return{H:h,S:s,V:v};},getContrastBW:function(hexColor)
{var rgb=$.hexToRGB(hexColor);var hsv=$.rgbToHSV(rgb.R,rgb.G,rgb.B);return(hsv.V<0.5?'#fff':'#000');},getBestContrast:function(hexColor)
{var rgb=$.hexToRGB(hexColor);var hsv=$.rgbToHSV(rgb.R,rgb.G,rgb.B);var vLevel=hsv.V<0.30?1:hsv.V<0.5?2:hsv.V<0.70?3:4;var sLevel=hsv.S<0.30?1:hsv.S<0.5?2:hsv.S<0.70?3:4;var level=(vLevel==4&&sLevel==1)?3:(vLevel>=3&&sLevel>=2)?2:vLevel;return level;},getImagePropsOriginal:function(src,loadedCallback)
{var $this=this;this.height=0;this.width=0;this.src=src;this.obj=new Image();this.obj.src=src;this.callback=loadedCallback
this.tries=0;if(window.console&&console.log)
{}
this.checkProps=function()
{if(window.console&&console.log)
{}
if($this.obj.height==0)
{if($this.tries>=30)
{if(window.console&&console.log)
{console.log("Giving up... unable to get image dimensions for "+$this.obj.src);}}
else
{setTimeout(function(){if(window.console&&console.log)
{}
$this.checkProps();},100);$this.tries++;}}
else
{if(window.console&&console.log)
{}
$this.height=$this.obj.height;$this.width=$this.obj.width;$this.callback($this);}}
this.checkProps();},getImageProps:function(src,loadedCallback)
{var checkProps=function(src,objImg,callback,tries)
{if(objImg.height==0)
{if(tries>=100)
{if(window.console&&console.log)console.log("Giving up... unable to get image dimensions for "+src);}
else
{setTimeout(function(){checkProps(src,objImg,callback,++tries);},100);}}
else
{callback({height:objImg.height,width:objImg.width,src:src});}}
var objImg=new Image();objImg.src=src;checkProps(src,objImg,loadedCallback,0);},showMe:function(items)
{var msg="Debug Show Me: ";for(item in items)
{msg+=("\n"+item+": "+items[item]);}
alert(msg);},setCookie:function(options){var today=new Date();today.setTime(today.getTime());var expires=0;if(options.expireDays){expires=options.expireDays*1000*60*60*24;}
var expires_date=new Date(today.getTime()+(expires));document.cookie=options.name+"="+escape(options.value)+
((expires>0)?";expires="+expires_date.toUTCString():"")+
((options.path)?";path="+options.path:"")+
((options.domain)?";domain="+options.path:"")+
((options.secure)?";secure":"");},getCookie:function(cookieName)
{var allCookies=document.cookie;var pairs=allCookies.split(';');var cookie=null;for(var i=0;i<pairs.length;i++)
{var parts=pairs[i].split('=');var name=$j.trim(parts[0]);if(name==cookieName)
{cookie=$j.trim(parts[1]);}}
return cookie;}});$.fn.extend({ellipsesHtml:function(html)
{var element=$(this);var tag=element.get(0).tagName;var temp=$('<'+tag+'></'+tag+'>').insertBefore(element);element.remove().html(html);temp.replaceWith(element);},disableTextSelect:function()
{return this.each(function()
{if($.browser.mozilla)
{$(this).css('MozUserSelect','none');}
else if($.browser.msie)
{$(this).bind('selectstart',function(){return false;});}
else
{$(this).mousedown(function(){return false;});}});},listHandlers:function(events,outputFunction)
{return this.each(function(i){var elem=this,dEvents=$(this).data('events');if(!dEvents){return;}
$.each(dEvents,function(name,handler){if((new RegExp('^('+(events==='*'?'.+':events.replace(',','|').replace(/^on/i,''))+')$','i')).test(name)){$.each(handler,function(i,handler){outputFunction(elem,'\n'+i+': ['+name+'] : '+handler);});}});});},copyCSS:function(style,toNode)
{var self=$(this),styleObj={},has_toNode=typeof toNode!='undefined'?true:false;if(!$.isArray(style))
{style=style.split(' ');}
$.each(style,function(i,name){if(has_toNode)
{toNode.css(name,self.css(name));}
else
{styleObj[name]=self.css(name);}});return(has_toNode?self:styleObj);},attrSafe:function(name)
{return $.safeStr($(this).attr(name));}});String.prototype.stripCssUnit=function()
{var val=this.toString();if(val==null||val==undefined||val==''||val=='auto')return val;re=new RegExp('(px|pt|em|\%|\b)','g');var num=val.replace(re,'');if(num=='')num=0;return parseInt(num);}
Date.parseWCFDateStringToUTC=function(dateString)
{dateString=dateString.replace("/Date(","").replace(")/","");var milliseconds=dateString;var tzSign=(dateString.indexOf("-")>-1)?"-":(dateString.indexOf("+")>-1)?"+":"";if(tzSign!="")milliseconds=dateString.split(tzSign)[0];var date=new Date();date.setTime(new Number(milliseconds));return date;}
String.prototype.commafyNumber=function()
{var nStr=this.toString();nStr+='';x=nStr.split('.');x1=x[0];x2=x.length>1?'.'+x[1]:'';var rgx=/(\d+)(\d{3})/;while(rgx.test(x1))
{x1=x1.replace(rgx,'$1'+','+'$2');}
return x1+x2;}
String.prototype.escapeDouble=function()
{var str=this.toString();return str.replace(/\"/g,"\\\"");};String.prototype.escapeDoubleToHtml=function()
{var str=this.toString();return str.replace(/\"/g,"&#34;");};String.prototype.uriEscapeTroublemakers=function()
{var str=this.toString();str=str.replace(/%/g,"%25").replace(/\"/g,"%22").replace(/&/g,"%26");return str;};String.prototype.unescapeHtml=function()
{var str=this.toString();return $('<div/>').html(str).text();}
String.prototype.makeSafeForVideoPlayer=function()
{var str=this.toString();return str.unescapeHtml().stripHtml().uriEscapeTroublemakers();}
String.prototype.stripHtml=function()
{var str=this.toString();return str.replace(/(<([^>]+)>)/ig,"");}
String.prototype.differenceIndexOf=function(compare)
{var index=-1;var str=this.toString();var len=str.length>compare.length?compare.length:str.length;for(var i=0;i<len;i++)
{if(str.charAt(i)!=compare.charAt(i))
{index=i;break;}}
if(index==-1&&str.length!=compare.length)index=len;return index;}
String.prototype.convertToFriendlyName=function()
{var str=this.toString();str=str.replace(/[-_=]/g,' ');var parts=str.split(' ');if(parts.length>0)
{str='';for(var i=0;i<parts.length;i++)
{var helperWord=("|a|an|and|or|the|of|".indexOf('|'+parts[i].toLowerCase()+'|')>=0);if(!helperWord||i==0)
{str+=parts[i].substring(0,1).toUpperCase();if(parts[i].length>1)str+=parts[i].substring(1);}
else str+=parts[i];if(i<(parts.length-1))str+=' ';}}
return str;}
String.prototype.convertFileNameToFriendlyName=function()
{var str=this.toString();str=str.replace(/(\.+([a-zA-Z0-9]{1,10}))/g,'');return str.convertToFriendlyName();}})(jQuery);

(function($)
{var BaseWidget={options:{log:true},_super:function(method,args)
{if($.gd.baseWidget.prototype[method]!=null&&$.gd.baseWidget.prototype[method]!=undefined)
{if(!$.isPopulated(args))args=[];$.gd.baseWidget.prototype[method].apply(this,args);}},_create:function()
{var id=this.element.attrSafe("id");id=(id.length>0)?"[id="+id+"]":" [class="+this.element.attrSafe("class")+"]";this._logIdentifier=this.widgetName+id;this._log("loading");this.element.addClass(this.widgetBaseClass);},_init:function(){},destroy:function()
{this._log("destroying");this.element.removeClass(this.widgetBaseClass);$.Widget.prototype.destroy.call(this);},_getImagePath:function(imageFile)
{return $ss.cdnImagePath+imageFile;},_addCSS:function(cssCode)
{if($("."+this.widgetBaseClass).length<=0)
{var styleElement=document.createElement("style");styleElement.type="text/css";if(styleElement.styleSheet)
{styleElement.styleSheet.cssText=cssCode;}
else
{styleElement.appendChild(document.createTextNode(cssCode));}
document.getElementsByTagName("head")[0].appendChild(styleElement);}},_addStyleSheet:function(relativePath)
{if($("."+this.widgetBaseClass).length<=1)
{var styleElement=document.createElement("link");styleElement.type="text/css";styleElement.href=$ss.cdnCssPath+relativePath;styleElement.rel="stylesheet";document.getElementsByTagName("head")[0].appendChild(styleElement);}},_log:function(msg)
{if(!$.isPopulated(this.options.log)||!this.options.log)return;$c.Stage.log("{"+this._logIdentifier+"} "+msg);}}
$.widget("gd.baseWidget",BaseWidget);})(jQuery);

(function($){var ScaleBackground={options:{scaleType:'fill',positionX:'',positionY:'',offsetX:0,offsetY:0,container:$(document.body),src:'',backgroundColor:'#000',cssPosition:'absolute',maxWidth:10,maxHeight:10,fadeIn:false},_create:function(){this._super("_create");if(!$.isPopulated(this.options.positionX))this.options.positionX=(this.options.scaleType=="fill")?"left":"center";if(!$.isPopulated(this.options.positionY))this.options.positionY=(this.options.scaleType=="fill")?"top":"middle";this._positionBackground();},_init:function(){this._super("_init");},destroy:function(){this._super("destroy");},_positionBackground:function(){var $this=this;$this._log("orienting background image");var setUpimage=function(imageProps){$this._log("in setup image for "+$this.options.src);var dimensions=($this.options.scaleType=="fill")?$this._getFillDimensions(imageProps.width,imageProps.height):$this._getFitDimensions(imageProps.width,imageProps.height);$this.variation='';var xaxis=($this.options.scaleType=="fit"&&dimensions.bestDimension=="width")?"center":$this.options.positionX;var yaxis=($this.options.scaleType=="fit"&&dimensions.bestDimension=="height")?"middle":$this.options.positionY;var left=(xaxis=='right'?(dimensions.width.container-dimensions.width.best):xaxis=='center'?(Math.ceil((dimensions.width.container-dimensions.width.best)/2)):0)+$this.options.offsetX;var top=(yaxis=='bottom'?(dimensions.height.container-dimensions.height.best):yaxis=='middle'?(Math.ceil((dimensions.height.container-dimensions.height.best)/2)):0)+$this.options.offsetY;$this._log("positionX: "+xaxis+"  positionY: "+yaxis+"\ntop: "+top+" left: "+left+"\ndimension text: "+dimensions.text+'\noffsetX: '+$this.options.offsetX+'  offsetY: '+$this.options.offsetY);var id=$.isPopulated($this.element.attr("id"))?'id="'+$this.element.attr("id")+'"':'';var iClass=$.isPopulated($this.element.attr("class"))?'class="'+$this.element.attr("class")+'" ':'';if($this.element.is("img")){var css={position:$this.options.cssPosition,"background-color":$this.options.backgroundColor,left:left+"px",top:top+"px"};css[dimensions.bestDimension]=dimensions[dimensions.bestDimension].best+"px";css[dimensions.offDimension]='';$this._log("element is already img\n"+$.jsonStringify(css));$this.element.css(css).attr("src",$this.options.src);if($this.options.fadeIn){$this.element.hide().fadeIn(500);}
$this._log("new css:\n"+$this.element.attr("style"));}
else{var img=$('<img '+id+' '+iClass+'style="position: '+$this.options.cssPosition+'; background-color: '+$this.options.backgroundColor+'; left: '+left+'px; top: '+top+'px;'+dimensions.text+'" src="'+$this.options.src+'" />');$this.element.replaceWith(img);if($this.options.fadeIn){img.hide().fadeIn(500);}}
if($.isPopulated($this.options.backgroundColorContainer)){$this.options.backgroundColorContainer.css("background-color",$this.options.backgroundColor);}}
$this._log("about to get image props for "+this.options.src);$.getImageProps(this.options.src,setUpimage);},_getFillDimensions:function(imageWidth,imageHeight){var dimensions={width:{image:imageWidth,container:this.options.container.width()==0?this.options.maxWidth:this.options.container.width()},height:{image:imageHeight,container:this.options.container.height()==0?this.options.maxHeight:this.options.container.height()}};dimensions.width.ifOppositeFillsContainer=Math.ceil((dimensions.width.image*dimensions.height.container)/dimensions.height.image);dimensions.height.ifOppositeFillsContainer=Math.ceil((dimensions.height.image*dimensions.width.container)/dimensions.width.image);dimensions.width.ifOppositeFillsIsUsed=Math.ceil((dimensions.width.image*dimensions.height.ifOppositeFillsContainer)/dimensions.height.image);dimensions.height.ifOppositeFillsIsUsed=Math.ceil((dimensions.height.image*dimensions.width.ifOppositeFillsContainer)/dimensions.width.image);dimensions.width.minimumToFillContainer=!(dimensions.width.container<=dimensions.width.ifOppositeFillsContainer)?dimensions.width.container:dimensions.width.ifOppositeFillsContainer;dimensions.height.minimumToFillContainer=!(dimensions.height.container<=dimensions.height.ifOppositeFillsContainer)?dimensions.height.container:dimensions.height.ifOppositeFillsContainer;var main=(dimensions.height.ifOppositeFillsIsUsed>dimensions.height.container)?"width":"height";var opposite=(main=="width")?"height":"width";dimensions.bestDimension=main;dimensions.offDimension=opposite;dimensions.text=main+": "+dimensions[main].minimumToFillContainer+"px;";dimensions[main].best=dimensions[main].minimumToFillContainer;dimensions[opposite].best=(Math.ceil((dimensions[opposite].image*dimensions[main].minimumToFillContainer)/dimensions[main].image));this._log("dimensions:\n"+$.jsonStringify(dimensions));return dimensions;},_getFitDimensions:function(imageWidth,imageHeight){var dimensions={width:{image:imageWidth,container:this.options.container.width()==0?this.options.maxWidth:this.options.container.width()},height:{image:imageHeight,container:this.options.container.height()==0?this.options.maxHeight:this.options.container.height()}};var main=(imageWidth<imageHeight)?"height":"width";var opposite=(main=="width")?"height":"width";dimensions.bestDimension=main;dimensions.offDimension=opposite;dimensions.text=main+": "+dimensions[main].container+"px;";dimensions[main].best=dimensions[main].container;dimensions[opposite].best=Math.ceil((dimensions[opposite].image*dimensions[main].container)/dimensions[main].image);this._log("dimensions:\n"+$.jsonStringify(dimensions));return dimensions;},rescale:function(options){if($.isPopulated(options.scaleType))this.options.scaleType=options.scaleType;if($.isPopulated(options.positionX))this.options.positionX=options.positionX;if($.isPopulated(options.positionY))this.options.positionY=options.positionY;if($.isPopulated(options.offsetX))this.options.offsetX=options.offsetX;if($.isPopulated(options.offsetY))this.options.offsetY=options.offsetY;if($.isPopulated(options.src))this.options.src=options.src;if($.isPopulated(options.backgroundColor))this.options.backgroundColor=options.backgroundColor;this._positionBackground();}}
$.widget("gd.scaleBackground1",$.gd.baseWidget,ScaleBackground);})(jQuery);

(function($)
{var Switcher={options:{},_create:function()
{this._super("_create");this.space=$c.Stage.currentSpace();},_init:function()
{this._super("_init");},destroy:function()
{this.element.empty();this._super("destroy");},_showWidget:function(layout,el,id,anchor,callback)
{var $this=this;var complete=function(){if($.isFunction(callback))callback(el);el.find(".widget-container").trigger("reveal");$j("#page").eq(0).scrollTop(0);};var layouts={"1":function()
{var width=$this.element.width();var startLeft=layout.variation=="r"?-width:width;el.css({position:'absolute',top:0,width:width,opacity:0}).show().animate({opacity:1},{duration:500,queue:false,complete:complete});},"2":function()
{var li=anchor.parents("li");if(li.has("a.uninitialized")&&li.is(":hidden"))li.show();$this.element.appendTo(li);el.css({position:'relative',top:"",left:"",width:""}).slideDown(500,complete);},"3":function()
{var height=$this.element.height();el.css({position:'relative',top:$this.element.offset().top+height,left:0,width:""}).show().animate({top:0},{duration:500,queue:false,complete:complete});},"4":function()
{}};layouts[layout.type]();},_hideWidget:function(layout,el,id,anchor)
{var $this=this;var complete=function()
{var container=$this.space.findWidgetContainer(id);container.hide();el.hide();el.css("opacity",1);el.find(".widget-container").trigger("obscure");};var layouts={"1":function()
{var width=$this.element.width();var startLeft=layout.variation=="r"?width:-width;el.animate({opacity:0},{duration:500,queue:false,complete:function()
{el.css("position","absolute");complete();}});},"2":function()
{el.slideUp(500,function()
{var li=el.parents("li");if(li.has("a.uninitialized").length>0)li.hide();el.css("position","relative");complete();});},"3":function()
{el.animate({top:$this.element.offset().top+$this.element.height()},{duration:500,queue:false,complete:function()
{el.css("position","relative");complete();}});},"4":function()
{}};layouts[layout.type]();},_switchInProgress:false,switchContent:function(options)
{if(this._switchInProgress)
return;var $this=this;var finishedHandler=function()
{$this._switchInProgress=false;};this._switchInProgress=true;var wc;var id=options.id;var preRender=$.isFunction(options.preRender)?options.preRender:function(){};var mode=(options.mode=="edit")?"edit":null;var isDifferentWidget=($.isPopulated(options.id)&&$this.options.id!=options.id);if($.isPopulated(options.anchor)&&!options.anchor.is("[wid]"))options.anchor=$("*[wid='"+options.id+"']");this.element[options.close?"hide":"show"]();var openIt=!options.close&&isDifferentWidget;if($.isPopulated($this.options.id))
{var oldId=$this.options.id;var elOld=$this.element.find('#'+oldId+'-anchor');if(mode=='edit'&&!isDifferentWidget)
{if(elOld.length>0)
{preRender();wc=$this.space.findWidgetContainer(id);if($.isPopulated(wc))
{if(wc.options.isEditConfigEnabled)
{wc.editConfig(finishedHandler);}else
{finishedHandler();}}}}
else
{var hiding=false;if(elOld.length>0)
{wc=$this.space.findWidgetContainer(oldId);if($.isPopulated(wc))
{if(wc.instance().mode()=="edit")
wc.instance().cancelConfig(false);$this._hideWidget(options.layout,elOld,oldId,options.anchor);hiding=true;$this.options.id=null;wc=null;$('*[wid='+oldId+']').removeClass('open').addClass('closed');}}
if(!openIt&&(options.layout.type=="1"||options.layout.type=="3"))
{if(!hiding)
$this.element.hide();if($this.options.layoutWidgetHide)
$this.options.layoutWidgetHide[options.layout.type](finishedHandler);else
finishedHandler();}}}
else if(!openIt)
{finishedHandler();}
if(options.close)$this.element.id=null;if(openIt)
{$ss.showWaiter();var complete=function()
{if($.isFunction(options.callback))options.callback();$ss.hideWaiter();finishedHandler();};$this.options.id=id;if($.isPopulated($this.options.layoutWidgetShow))$this.options.layoutWidgetShow[options.layout.type]();var anchor=$this.element.find('#'+id+'-anchor');if(anchor.length>0)
{preRender();wc=$this.space.findWidgetContainer(id);wc.show(mode);$this._showWidget(options.layout,anchor,id,options.anchor,complete);}
else
{var html='<div id="'+id+'-anchor" class="ssWidgetBox '+$this.options.blockClass+'" style="display:none;"></div>';var elNew=$(html).appendTo($this.element);wc=$this.space.findWidgetContainer(id);var wce=$this.space.loadWidgetContainer(id,null,mode);wce.hide();elNew.hide().addClass(wc.type()+'-container');wce.bind("widgetPreShow",function(e,id)
{preRender();elNew.show();wce.show();$this._showWidget($ss.getLayout(),elNew,id,options.anchor,complete);});}
$('*[wid='+id+']').removeClass('closed').addClass('open');}
$('.error-bubble').flyout('destroy');}}
$.widget("gd-ss.switcher",$.gd.baseWidget,Switcher);})(jQuery);

(function($)
{var TextShadow={options:{x:0,y:1,blur:1,color:'#000'},_create:function()
{this.element.addClass(this.widgetBaseClass);var $this=this;var o=$this.options;var ver=$.browser.version;var verInt=ver.substr(0,ver.indexOf("."));if($.browser.msie)
{var height=this.element.height();this.element.wrapInner('<span class="ts-original" style="position:absolute; top:0; left:0;"></span>');var dupe=$this.element.find(".ts-original").clone().prependTo($this.element).removeClass("ts-original").addClass("ts-dupe");var css={"position":"absolute","color":o.color,"left":o.x-o.blur};var blur=o.blur;switch(parseInt(verInt))
{case 9:case 8:blur=(o.blur-(o.blur>2?1:(o.blur==2?0.5:0)));css.top=o.y-blur;break;default:css.top=o.y-(blur+1);break;}
css.filter="progid:DXImageTransform.Microsoft.Alpha(Opacity=70, Style=0) progid:DXImageTransform.Microsoft.Blur(PixelRadius='"+blur+"', MakeShadow='false')";;dupe.css(css);this.element.wrapInner('<div class="ts-position" style="position:relative; display: block; height: '+height+'px;"></div>');}
else
{this.element.css("text-shadow",o.x+"px "+o.y+"px "+o.blur+"px "+o.color);}},destroy:function()
{this.element.removeClass(this.widgetBaseClass);this.element.css("text-shadow",'');this.element.find(".ts-dupe").remove();this.element.find(".ts-original").unwrap();this.element.find(".ts-position").unwrap();$.Widget.prototype.destroy.call(this);}}
$.widget("gd.textShadow",TextShadow);})(jQuery);

(function($)
{var ShareLinks={options:{url:window.location.href,title:document.title,opener:"facebook",links:{},shareID:-1,shortUrl:null,shortUrlProviderID:1,shortUrlProviderArgs:null,onLinkClick:null},linkDefaults:{displayOrder:['facebook','twitter','myspace','delicious','stumbleupon'],delicious:{displayName:'Del.icio.us',icon:'delicious-icon.png'},facebook:{displayName:'Facebook',icon:'facebook-icon.png'},digg:{displayName:'Digg',icon:'digg-icon.png'},myspace:{displayName:'MySpace',icon:'myspace-icon.png'},stumbleupon:{displayName:'StumbleUpon',icon:'stumbleupon-icon.png'},reddit:{displayName:'Reddit',icon:'reddit-icon.png'},twitter:{displayName:'Twitter',icon:'twitter-icon.png'}},_create:function()
{var $this=this;$this._super("_create");this._addStyleSheet("jquery.gd.shareLinks.css");$this._log("loading "+$this.widgetBaseClass);var displayOrder=this.options.links.displayOrder;this.options.links=$.extend(true,{},this.linkDefaults,this.options.links);if($.isPopulated(displayOrder))this.options.links.displayOrder=displayOrder;if(!$.isFunction(this.options.title))
{var title=this.options.title;this.options.title=function(){return title;};}
if(!$.isFunction(this.options.url))
{var url=this.options.url;this.options.url=function(){return url;};}
$this.element.addClass($this.widgetBaseClass);$this.element.html($this._getInitHtml());if($.isPopulated($this.options.opener)&&($.inArray($this.options.opener,$this.options.links.displayOrder)>-1))
{$this.currentForm=$this.options.opener;}
else $this.currentForm=$this.links.displayOrder[0];if($this.options.onLinkClick&&$.isFunction($this.options.onLinkClick))
{var anchors=$this.element.find('a');$.each(anchors,function(i,a)
{$(a).click(function(){$this.options.onLinkClick(i);});});}},_init:function()
{this._super("_init");},destroy:function()
{this.element.removeClass(this.widgetBaseClass);this.element.empty();this._super("destroy");},_getInitHtml:function()
{var links=this._getLinks({url:this.options.url(),title:this.options.title(),fullDefs:this.options.links});var list=this.options.links.displayOrder;var linkDefs=this.options.links;var html="<ul>";for(var i=0;i<list.length;i++)
{var name=list[i];var linkDef=linkDefs[name];html+='<li><a href="'+links[name]()+'" target="_blank" ';if($.isPopulated(linkDef.ciCode))html+=' cicode="'+linkDef.ciCode+'" ';html+='class="'+this.widgetBaseClass+'-link-'+name+' '+this.widgetBaseClass+'-link';html+='" title="'+linkDef.displayName+'" >'+linkDef.displayName+'</a></li>';}
html+="</ul></div>";return html;},_urlBuilder:function(options)
{options=$.extend({encode:false,host:"www.godaddy.com",protocol:"http",path:""},options);var link="";if(options.host!=null&&options.host!='undefined'&&options.host!='')
{link+=options.protocol+'://'+options.host;}
else if(options.protocol=="mailto")
{link+=options.protocol+":";}
if(options.path!=null&&options.path!='undefined'&&options.path!='')
{link+="/"+options.path;}
if(options.query!=null&&options.query!=undefined)
{var isFirst=true;var item;for(item in options.query)
{link+=(isFirst?"?":"&")+item+"="+options.query[item];isFirst=false;}}
return options.encode?encodeURIComponent(link):link;},_getLinks:function(options)
{var $this=this;var encode=encodeURIComponent;options=$.extend({url:"http://www.godaddy.com",title:"GoDaddy.com"},options);function delicious()
{return $this._urlBuilder({host:"delicious.com",protocol:"http",path:"save",query:{noui:"no",v:"5",jump:"yes",url:encode(options.url),title:encode(options.title),notes:encode($.isPopulated(options.fullDefs['delicious'].message)?options.fullDefs['delicious'].message:'')}});}
function twitter()
{var msg=$.isPopulated(options.fullDefs['twitter'].message)?options.fullDefs['twitter'].message:options.url;return $this._urlBuilder({host:"twitter.com",path:"intent/tweet",query:{text:encode(msg)}});}
function facebook()
{var msg=$.isPopulated(options.fullDefs['facebook'].message)?options.fullDefs['facebook'].message:options.title;return $this._urlBuilder({host:"www.facebook.com",path:"sharer.php",query:{u:encode(options.url),t:encode(msg)}});}
function digg()
{return $this._urlBuilder({host:"digg.com",path:"submit",query:{url:encode(options.url),t:encode(options.title),bodytext:encode($.isPopulated(options.fullDefs['digg'].message)?options.fullDefs['digg'].message:'')}});}
function myspace()
{var msg=$.isPopulated(options.fullDefs['myspace'].message)?options.fullDefs['myspace'].message:options.title;return $this._urlBuilder({host:"www.myspace.com",path:"Modules/PostTo/Pages",query:{c:options.url,t:encode(msg)}});}
function reddit()
{var msg=$.isPopulated(options.fullDefs['reddit'].message)?options.fullDefs['reddit'].message:options.title;return $this._urlBuilder({host:"www.reddit.com",path:"login",query:{dest:$this._urlBuilder({encode:true,host:"",protocol:"",path:"submit",query:{url:encode(options.url),title:encode(msg)}})}});}
function stumbleupon()
{var msg=$.isPopulated(options.fullDefs['stumbleupon'].message)?options.fullDefs['stumbleupon'].message:options.title;return $this._urlBuilder({host:"www.stumbleupon.com",path:"submit",query:{url:options.url,title:encode(msg)}});}
function email()
{var body=options.url;if($.isPopulated(options.fullDefs.email))
{body=$.isPopulated(options.fullDefs.email.url)?options.fullDefs.email.url:body;body=$.isPopulated(options.fullDefs.email.bodyText)?options.fullDefs.email.bodyText+"\n\n"+body:body;body=$.isPopulated(options.fullDefs.email.extraText)?body+"\n\n"+options.fullDefs.email.extraText:body;}
return $this._urlBuilder({protocol:'mailto',host:"",path:"",query:{subject:encode(options.title.unescapeHtml()),body:encode(body)}});}
return{delicious:delicious,twitter:twitter,facebook:facebook,myspace:myspace,reddit:reddit,stumbleupon:stumbleupon,digg:digg,email:email};},_shortenUrl:function(shortUrlProviderID,shortUrlProviderArgs,url,success)
{if(shortUrlProviderID==1)
{var link='http://to.ly/api.php?json=1&longurl='+encodeURIComponent(url)+'&callback=?';$.getJSON(link,function(data)
{if(success)
{success(data.shorturl);}});}
else if(shortUrlProviderID==2)
{link=shortUrlProviderArgs+"?url="+url+"&callback=?"
$.getJSON(link,function(data)
{if(success)
{success(data);}});}}}
$.widget("gd.shareLinks",$.gd.baseWidget,ShareLinks);})(jQuery);
