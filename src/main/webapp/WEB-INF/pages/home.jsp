<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML+RDFa 1.0//EN" "http://www.w3.org/MarkUp/DTD/xhtml-rdfa-1.dtd">
<!-- saved from url=(0020)http://rmatcher.com/ -->
<html xmlns="http://www.w3.org/1999/xhtml" version="XHTML+RDFa 1.1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemalocation="http://www.w3.org/1999/xhtml http://www.w3.org/MarkUp/SCHEMA/xhtml-rdfa-2.xsd" xmlns:og="http://ogp.me/ns#"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    <meta name="viewport" content="width=1024">

  <meta name="description" content="See this Go Daddy InstantPage®! http://rmatcher.com. Get yours free with a domain name at GoDaddy.com. Connecting Researchers &amp; Studnets">
  <meta property="og:title" content="RMatcher">
  <meta property="og:description" content="See this Go Daddy InstantPage®! http://rmatcher.com. Get yours free with a domain name at GoDaddy.com. Connecting Researchers &amp; Studnets">

    <meta property="og:image" content="http://cache.nebula.phx3.secureserver.net/obj/MEFFOUE4QjZFRjdBRUE1MUI3QkM6NWI4NDIyNzNkNjcwYWFiZjQxNWUxMmI5N2ZkOGQzNGU=">
    <link rel="image_src" href="http://cache.nebula.phx3.secureserver.net/obj/MEFFOUE4QjZFRjdBRUE1MUI3QkM6NWI4NDIyNzNkNjcwYWFiZjQxNWUxMmI5N2ZkOGQzNGU=">

    <meta property="og:image" content="http://imagesak.websitetonight.com/skins/pl.gd/images/logo1.gif">


    <link rel="shortcut icon" type="image/ico" href="http://img1.wsimg.com/ip/v1.2.0/images/favicon.ico">
    <link rel="icon" type="image/png" href="http://img1.wsimg.com/ip/v1.2.0/images/favicon.jpg">
    <title>
    RMatcher
</title>

  	<link href="/images/RMatcher_files/ss-1.0.0.0.css" rel="stylesheet" type="text/css">



    <link href="/images/RMatcher_files/font-soucisans.css" rel="Stylesheet" type="text/css">


    <script type="text/javascript" src="/images/RMatcher_files/jquery.js"></script>
    <script type="text/javascript" src="/images/RMatcher_files/jquery-ui.js"></script>

    <script src="/images/RMatcher_files/ss-merged-1.0.0.0.js" type="text/javascript"></script>

    <script type="text/javascript" src="/images/RMatcher_files/cygnus-duel.js"></script>



<script type="text/javascript">// <![CDATA[
    $j(document).ready( function() {
        // ---- Configure the application settings for communicating with Cygnus.
        $c.Stage.applicationEventHandlerElement = $j("#page");

        var appSettings = $c.Stage.applicationSettings;
        appSettings.showConfigControl = false;
        appSettings.showToggleControl = false;
        appSettings.showCloseControl = true;
        appSettings.hideCloseControlOnEdit = true;
        appSettings.widgetActions.closeControlClick = function (widgetId, widgetType) {
            // this will hide the widget since it's already open
            $ss.showWidget(widgetId, $j(".ss-service[wid='" + widgetId + "']"));
        };
        appSettings.widgetEvents.saveConfigSuccess =
        function(widgetId, widgetType) {
            var li = $j("li:has(a[wid='" + widgetId + "'])");
            if (li.length > 0)
            {
                li.show();
                li.find("a").removeClass("uninitialized");
                $ss.showLauncher();
                $ss.showSavedConfirmation('App saved successfully.');
            }
            else
            {
                if (widgetType == "fbpage")
                {
                    $ss.showSavedConfirmation('Facebook Page saved successfully.');
                }
            }
        };
        appSettings.widgetEvents.saveConfigFailure =
            function(widgetId, widgetType) {
                //alert("failed!");
            };
        appSettings.widgetEvents.cancelledConfig =
            function(widgetId, widgetType) {
                var a = $j("a[wid='" + widgetId + "']");
                if (a.hasClass("uninitialized"))
                {
                    //close the widget since it's already open if it's not be initialized.
                    $ss.showWidget(widgetId, $j(".ss-service[wid='" + widgetId + "']"));
                    $ss.openAdminPanel('widgets');
                }
            };
        appSettings.widgetEvents.openedConfig =
            function(widgetId, widgetType)
            {
                if (widgetType != "fbpage")
                {
                    // close tabs
                    $ss.hideAdminPanel();
                }
            };
        appSettings.widgetEvents.closedConfig =
            function(widgetId, widgetType)
            {
                if (widgetType == "fbpage")
                {
                    $ss.facebookPage.close(widgetId);
                }
            };
        appSettings.widgetEvents.dataModified =
            function(widgetId, widgetType, data) {
                if ($j.isPopulated(data))
                {
                    if (widgetType == "fbpage")
                    {
                        $j('.widget-fbpage-title').text(data.Title.value);
                    }
                    else
                    {
                        var a = $j("#ss-launcher").find("a[wid=" + widgetId + "]");
                        var children = a.children();
                        a
                            .text(data.LinkTitle.value)
                            .append(children);
                        $j("#widgets-added-list").find("li[wid=" + widgetId + "] .widget-added-label-title").text(data.LinkTitle.value);
                    }
                }
            };
        appSettings.widgetEvents.revealed =
            function(widgetId, widgetType) {
                if ($j.isFunction($ss.stage.layout.revealed)) $ss.stage.layout.revealed();
            };
        appSettings.widgetEvents.obscured =
            function(widgetId, widgetType) {
                if ($j.isFunction($ss.stage.layout.obscured)) $ss.stage.layout.obscured();
            };

        appSettings.widgetEvents.widgetModalDisplayed =
        appSettings.widgetEvents.contentUpdated =
          function(wigetId, widgetType) { $ss.fixPalette(); };

        appSettings.applicationUtilityProviders.getImages = function(widgetId, success, failure)
        {
            // show a dialog for the user to select images that were uploaded as backgrounds
            // one day maybe we can change this to be a uploader instead.
            $ss.facebookPage.gatherImages(null, function(result) {
                // if the user closed the dialog
                if (result)
                {
                    success(result.images);
                }
                else  // do the failure callback otherwise.
                {
                    failure({ error: 'Error', message: 'Unable to get images.' });
                }
            });
        }

        appSettings.baseWidgetColors = {
            background: '#3f4e6b',
            textTitle:  '#ffffff',
            textContent: '#ffffff',
            textLinks:  '#EA5B19',
            borderTitle:  '#EA5B19'
        };

        appSettings.applicationEvents.colorsChanged = "widgets.colorsChanged";

        appSettings.widgetInitializeOptions.fbpage = { hideFacebookConnectDisplay: true };

        appSettings.modalContainerCssClass ="modal-container";

        $c.CommManager.applicationData = { "domainName": "rmatcher.com" };

        // ---- DONE application setting configuration

        // load/style the page and all it's components
        $ss = SimpleSite({
            basePath: "/",
            cdnImagePath: "http://img1.wsimg.com/ip/v1.2.0/images/",
            cdnCssPath: "http://img2.wsimg.com/ip/v1.2.0/style/",
            eventReceiver: "#page",
            background: {"id":8044724,"originalSrc":"https://cache.nebula.phx3.secureserver.net/obj/MEFFOUE4QjZFRjdBRUE1MUI3QkM6MDQ1MmRmOGRjMDNlZGIzZWY3NWFiOTU3ODY5NjIzYmY=","src":"https://cache.nebula.phx3.secureserver.net/obj/MEFFOUE4QjZFRjdBRUE1MUI3QkM6NGNkM2Y5MWZkOGFlNmVhMWM4MmJiZGM3NDI4ZGFhYWE=","thumbnail":"https://cache.nebula.phx3.secureserver.net/obj/MEFFOUE4QjZFRjdBRUE1MUI3QkM6NWI4NDIyNzNkNjcwYWFiZjQxNWUxMmI5N2ZkOGQzNGU=","orientation":"3","variation":"mc","isUserOwner":true,"cropHistory":null,"stockBackgroundId":439,"isUncropped":true},
            layout: {"id":2,"name":"Side Menu","type":"1","variation":"c","VariationName":"Centered"},
            layoutControls:
            {
                content: '#ss-main',
                title: '#ss-name',
                description: '#ss-description',
                launcher: '#ss-launcher',
                page: '#page',
                widgetContainer: '#ss-widgetContainer',
                about: '#ss-about',
                background: '#ss-background'
            },
            palette: {
  "id": 0,
  "name": null,
  "userCreated": false,
  "isActive": true,
  "backgrounds": {
    "page": "#ffffff",
    "main": "none",
    "meta": "none",
    "block": "#3f4e6b"
  },
  "fonts": {
    "title": "#3f4e6b",
    "description": "#ea5b19",
    "services": "#3f4e6b",
    "primary": "#ffffff",
    "secondary": "#ffffff",
    "links": "#EA5B19"
  }
},
            fonts: {"titleFontId":24,"generalFontId":0,"titleSize":80,"descriptionSize":18,"servicesSize":18,"titleFontIsEmbed":true,"generalFontIsEmbed":false},
            titleFont: {"id":24,"appliesTo":"title","faceName":"Soucisans","defaultSize":50,"isEmbed":true},
            generalFont: {"id":0,"appliesTo":"title","faceName":"Arial","defaultSize":60,"isEmbed":false},
            fontControls:
            {
                title: {reset: '.ss-title', apply: '.ss-title' },
                description: {reset: '.ss-description', apply: '.ss-description' },
                services: {reset: '.ss-service', apply: '.ss-service'},
                block: {reset: '.ss-block, #ss-widgetContainer', apply: '.ss-block, #ss-widgetContainer' }
            },
            styleControls:
            {
                // Page background
                background: {reset: '#ss-background', apply: '#ss-background' },
                title: {reset: '.ss-title', apply: '.ss-title', borders: {reset: '#ss-launcher li', apply: '#ss-launcher li'} },
                description: {reset: '.ss-description', apply: '.ss-description' },
                services: {reset: '.ss-service', apply: '.ss-service', borders: {reset: '.accordion-arrow-inheritor, .accordion-button', apply: '.accordion-arrow-inheritor, .accordion-button'}},
                block: {
                  reset: '.ss-block, #ss-widgetContainer',
                  apply: '.ss-block, #ss-widgetContainer, .modal-widget',
                  foreground: { apply: '.contrast' }
                },
                // Widget text
                primary: {
                  reset: '.widget-container .title-bar, .widget-container .text-highlight, .widget-instance h1, .widget-instance h2, .widget-instance h3, .widget-instance h4, .widget-instance h5, .widget-instance h6, .modal-widget .title-bar, .modal-widget .text-highlight, .modal-widget h1, .modal-widget h2, .modal-widget h3, .modal-widget h4, .modal-widget h5, .modal-widget h6',
                  apply: '.widget-container .title-bar, .widget-container .text-highlight, .widget-instance h1, .widget-instance h2, .widget-instance h3, .widget-instance h4, .widget-instance h5, .widget-instance h6, .modal-widget .title-bar, .modal-widget .text-highlight, .modal-widget h1, .modal-widget h2, .modal-widget h3, .modal-widget h4, .modal-widget h5, .modal-widget h6'
                },
                secondary: {
                  reset: '.widget-instance, .widget-instance div:not(.watermark, .charCounter, .text-highlight, .contrast, .error, .form-errors, .required, :isThirdPartyInclude), .widget-instance span:not(.watermark, .charCounter, .text-highlight, .contrast, .error, .form-errors, .required, :isThirdPartyInclude), .widget-instance li, .widget-instance p, .modal-widget, .modal-widget div:not(.watermark, .charCounter), .modal-widget li, .modal-widget span:not(.text-highlight,.contrast), .modal-widget p',
                  apply: '.widget-instance, .widget-instance div:not(.watermark, .charCounter, .text-highlight, .contrast, .error, .form-errors, .required, :isThirdPartyInclude), .widget-instance span:not(.watermark, .charCounter, .text-highlight, .contrast, .error, .form-errors, .required, :isThirdPartyInclude), .widget-instance li, .widget-instance p, .modal-widget, .modal-widget div:not(.watermark, .charCounter), .modal-widget li, .modal-widget span:not(.text-highlight,.welcome-subtitle,.contrast), .modal-widget p',
                  background: { apply: '.contrast, .speech-balloon-tail' },
                  borders: { apply: '.speech-balloon-tail' }
                },
                //main: { reset: '#ss-launcher, .modal-widget', apply: '.modal-widget, .layout3-c #ss-launcher, .layout2-c #ss-launcher, .layout2-l #ss-launcher, .layout2-r #ss-launcher' }, //'.ss-main, .layout3-c #ss-launcher',
                //meta: { reset: '#ss-main', apply: '.layout1-c #ss-main, .layout1-l #ss-main, .layout1-r #ss-main, .layout4-c #ss-main, .layout4-l #ss-main, .layout4-r #ss-main' }, //'.ss-main, .layout3-c #ss-launcher',
                main: { reset: '#ss-launcher', apply: '#ss-launcher' },
                meta: { reset: '#ss-about', apply: '#ss-about' }, //'.ss-main, .layout3-c #ss-launcher',
                links: { reset: '.modal-widget a', apply: '.widget-instance a:not(.contrast, :isInWidgetConfigPanel, :isThirdPartyInclude), .modal-widget a:not(.welcome-link), a.widget-link', borders: {reset: '.widget-container .title-bar, .widget-container .contrast-border, hr', apply: '.widget-container .title-bar, .widget-container .contrast-border, hr' }},
                page: { reset: '.ss-background, body', apply: '.ss-background, body' },
                launcher: { reset: '#ss-launcher', apply: '#ss-launcher' },
                widgetContainer: { reset: '#ss-widgetContainer', apply: '#ss-widgetContainer' }
            },
            siteInfo: {
                title: "RMatcher",
                description: "Connecting Researchers & Studnets",
                domain: "rmatcher.com",
                showShareLinks: false
            },
            shareLinksData: {
                twitter: { ciCode: '44667', message: "See this Go Daddy InstantPage\u00AE! http://rmatcher.com. Get yours free with a domain name at GoDaddy.com.", value:1 },
                facebook: { ciCode: '44670', value:0 },
                myspace: { ciCode: '44666', message: "RMatcher", value:2 },
                delicious: { ciCode: '44668', message: "See this Go Daddy InstantPage\u00AE! http://rmatcher.com. Get yours free with a domain name at GoDaddy.com. Connecting Researchers & Studnets", value:3 },
                stumbleupon: { ciCode: '44669', value:4 }
            },
            previewMessageData: [{"appId":"1", message:"<div class=\"preview-warning-info\">This is only a preview. We may still be setting up your domain.</div><div>To get started customizing your site, click <b>Owner Login</b>. After domain setup is complete, view your live site at your domain address.</div><br/><div>Domain address:<br /><a href=\"http://[[domain]]\">[[domain]]</a></div>"}],
            wstAppName : 'Go Daddy Website Builder'

        });

        $ss.showLauncher();

        // display the main container (nav and about) which should be formatted by now
        $j("#ss-mainContainer").css("visibility", "visible");



        $j("#ss-description").linkify({fontColorParent: '#ss-description', initText: "Connecting Researchers & Studnets"});
        $j("#ss-title").linkify({fontColorParent: '#ss-name', initText: "RMatcher"});

        // show modal dialog if needed.
        $ss.stage.showPreviewModal();
    });
// ]]></script>

  <script type="text/javascript">// <![CDATA[

    $j(document).ready(function () {



      var loginHref = $j("#login-link").attrSafe("href").replace(/&lcid=.*?(&|$)/gi, '&lcid=' + (location.hostname.toLowerCase() == $ss.stage.siteInfo.domain.toLowerCase()));
      $j("#login-link").attrSafe("href", loginHref);
    });

  // ]]></script>

  <script type="text/javascript" src="/images/RMatcher_files/curl.js"></script><script type="text/javascript" src="chrome-extension://bfbmjmiodbnnpllbbbfblcplfjjepjdn/js/injected.js"></script><link rel="stylesheet" type="text/css" _curl_movable="true" href="/images/RMatcher_files/sf.core.css"></head>

  <body class="non-admin compliant rslrgd" style="background-color: rgb(255, 255, 255);">

    <div class="site-wrapper">

    <img id="ss-background" class="ss-background gd-scaleBackground1" style="position: fixed; background-color: rgb(255, 255, 255); left: -26px; top: 0px; width: 1333px; display: block; opacity: 0.792064;" src="/images/RMatcher_files/MEFFOUE4QjZFRjdBRUE1MUI3QkM6NGNkM2Y5MWZkOGFlNmVhMWM4MmJiZGM3NDI4ZGFhYWE=">

      <div id="page" class="page layout1-c" style="top: 0px;">

<div id="content">
    <div id="ss-mainContainer" style="visibility: visible;">
        <div id="ss-main" class="ss-main">

            <div id="ss-about" style="">

<h1 id="ss-name" class="ss-title" style="zoom: 1; color: rgb(63, 78, 107); font-family: Soucisans; font-size: 80px;">RMatcher</h1>
<div id="ss-description" class="ss-description" style="color: rgb(234, 91, 25); font-family: Arial; font-size: 18px;"><span>Connecting Researchers &amp; Students</span><br></div>


<div id="ss-description" class="ss-description" style="color: rgb(234, 91, 25); font-family: Arial; font-size: 18px;"><span>${name}</span><br></div>
            </div>

<div id="ss-launcher" style="">
  <ul>
    <li class="link-home" style="display: none; border-color: rgb(63, 78, 107);"><a class="ss-service" href="javascript:$ss.hideWidgets();" style="color: rgb(63, 78, 107); font-family: Arial; font-size: 18px;">Home</a></li>

        <li style="display: none; border-color: rgb(63, 78, 107);"><a class="ss-service uninitialized  closed" href="http://rmatcher.com/#" wid="SS33224B7W6Re3eQv" onclick="javascript:$ss.showWidget(&#39;SS33224B7W6Re3eQv&#39;, $j(this));" style="color: rgb(63, 78, 107); font-family: Arial; font-size: 18px;">New Facebook 1<div class="accordion-button" style="border-color: rgb(63, 78, 107);"><div class="accordion-arrow-inheritor" style="border-color: rgb(63, 78, 107);"><div class="accordion-arrow"></div></div></div></a></li>

        <li style="border-color: rgb(63, 78, 107);"><a class="ss-service closed" href="http://rmatcher.com/#" wid="SS33224WHZV23EPBz" onclick="javascript:$ss.showWidget(&#39;SS33224WHZV23EPBz&#39;, $j(this));" style="color: rgb(63, 78, 107); font-family: Arial; font-size: 18px;"><div class="accordion-button" style="border-color: rgb(63, 78, 107);"><div class="accordion-arrow-inheritor" style="border-color: rgb(63, 78, 107);"><div class="accordion-arrow"></div></div></div></a></li>

    <li id="menu-affiliate-link" style="display: none; border-color: rgb(63, 78, 107);" class="last">

    </li>
  </ul>
</div>
        </div>
    </div>
    <div id="ss-widgetContainer" style="display: none; background-color: rgb(63, 78, 107); font-family: Arial;" class="gd-ss-switcher"></div>
</div>

<div id="logindisplay">

	<a href="https://idp.godaddy.com/login.aspx?spkey=GDSIMPLESITEWEB.PROD&domain=rmatcher.com&prog_id=GoDaddy&sd=&redirect=true&auto=True&lcid=True" cicode="41766" id="login-link"></a>

</div>
<div id="sharePanel"></div>


  <div class="cross-sell" style="right: -343px;">
    <div class="blurb">
      <span class="arrow"></span>
      <span class="logo"></span>
      Powered by InstantPage® from GoDaddy.com.  <a class="want-one-link" target="_blank" href="https://www.godaddy.com/?showip=true&isc=instantpage_311"><span><b>Want one?</b></span></a>
    </div>
  </div>

      </div>
    </div>


<!-- Version: 1.8.0.0 --></body></html>