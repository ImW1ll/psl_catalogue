var layerBase = 'https://layer.spareparts.live/';
var host;
var protocol;
var token;
var single;
var filter;
var port = '';
var noGrip;
var lateGrip;
var useGrip;
var openedOnce = false;
var ie = !!document.documentMode;
var openTop;
var lang;
var emptyorderbasket = true;
var emptyquotebasket = true;
var layerLoadedEvent = new Event('layerLoaded');
var layerClosedEvent = new Event('layerClosed');

/* ui ids */
var layerId = 'pcg-layer';

window.onload = function () {
  initializeLayer();
};

window.onmessage = function (event) {
    if (event.data === 'pcgcloselayer' || event.data === 'close_please')
      closeLayer();
    else if (event.data === 'layerLoaded')
      window.dispatchEvent(layerLoadedEvent);
    else if (event.data === 'pcgopenlayer')
      openLayer();
    else {
    	if(event.data.task != null) {
       		let task = event.data.task;
            if(task == "openLayer")
                openLayer();
           	else if(task == "closeLayer")
                closeLayer();
           	else if(task == "destroyLayer")
                destroyLayer();
            else if(task == "switchLayer")
                switchLayer(event.data.token, event.data.filter);
            else if(task == "openLayerByDrawingId")
                openLayerByDrawingId(event.data.id);
            else if(task == "openLayerByReleaseId")
                openLayerByReleaseId(event.data.id, event.data.strict);
            else if(task == "openLayerRoot")
                openLayerRoot();
            else if(task == "openLayerByDrawingName")
                openLayerByDrawingName(event.data.name, event.data.fuzzy, event.data.casesens);
            else if(task == "openLayerByReleaseName")
                openLayerByReleaseName(event.data.name, event.data.fuzzy, event.data.casesens, event.data.strict);
            else if(task == "openLayerByMetaData")
                openLayerByMetaData(event.data.metafilters, event.data.pageno)
            else if(task == "openLayerAndSearch")
                openLayerAndSearch(event.data.term);
        	else if(task == "resetOrderCalls")
            	resetOrderCalls();
        	else if(task == "resetQuoteCalls")
            	resetQuoteCalls();
            else if(task == "resetScope")
            	resetScope();
            else if(task == "setLayerCookie")
            	setLayerCookie(event.data.name, event.data.value);
            else if(task == "showLayerCookie")
            	showLayerCookie(event.data.name);
            else if(task == "getLayerCookie")
            	getLayerCookie(event.data.name);
            else if(task == "deleteLayerCookie")
            	deleteLayerCookie(event.data.name);
            else if(task == "deleteAllLayerCookies")
            	deleteAllLayerCookies();
        }
    }
};

function initializeLayer() {
  host = window.location.hostname.trim().toLowerCase();
  protocol = window.location.protocol;
  port = window.location.port;
  let script = document.querySelector("script[src*='spareparts.live/layer']");
  if(script) {
    let urlParams = (new URL(script.getAttribute('src'))).searchParams;
    token = script.hasAttribute('data-token') ? script.getAttribute('data-token') : urlParams.get('token');
    single = script.hasAttribute('data-single') ? script.getAttribute('data-single') : urlParams.get('single');
    filter = script.hasAttribute('data-filter') ? script.getAttribute('data-filter') : urlParams.get('filter');
    if(filter === null) filter = '';
    noGrip = script.hasAttribute('data-nohandle') ?  script.getAttribute('data-nohandle') == "true" : (urlParams.get('nohandle') == "true");
    lateGrip = script.hasAttribute('data-latehandle') ? script.getAttribute('data-latehandle') == "true" : (urlParams.get('latehandle') == "true");
    openedOnce = (cookiesAllowed() && sessionStorage.getItem("spl_openedonce_" + host)) || false;
    useGrip = (!noGrip && !lateGrip) || (lateGrip && openedOnce);
    lang = script.hasAttribute('data-lang') ? script.getAttribute('data-lang') : urlParams.get('lang');
    initLayer(layerBase);
  }
}

function createLayerGrip() {
  let el = document.createElement('div');
  el.innerHTML = '<div id="pcg-handle" class="pcg-handle" style="display:none"><div class="upper_tab"><div id="pcg-handle-text"><span id="tab_text" class="theme-tabfontcolor theme-fontname">spare parts</span></div></div><div class="lower_tab"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 44 64" style="enable-background:new 0 0 44 64;" xml:space="preserve"><g class="theme-tabiconcolor"><path d="M14.7,5.7c-2.5,2.5-2.5,6.6,0,9.1c2.4,2.4,6.2,2.5,8.7,0.4l1.6,1.6c-0.2,0.5-0.1,1.2,0.3,1.6l5.3,5.3c0.6,0.6,1.5,0.6,2.1,0c0.6-0.6,0.6-1.5,0-2.1l-5.3-5.3c-0.4-0.4-1.1-0.5-1.6-0.3l-1.6-1.6c1-1.2,1.5-2.7,1.5-4.1c0-1.6-0.6-3.3-1.9-4.5C21.3,3.2,17.2,3.2,14.7,5.7z M22.2,7.3c1.6,1.6,1.6,4.3,0,6c-1.6,1.6-4.3,1.6-6,0c-0.8-0.8-1.2-1.9-1.2-3c0-1.1,0.4-2.2,1.2-3C17.9,5.6,20.6,5.6,22.2,7.3z"/><path d="M30.2,41.8H15.2l-0.5-1.7c0,0,0,0,0,0c0,0,0-0.1,0-0.1c0,0,0-0.1,0-0.1c0,0,0-0.1-0.1-0.1c0,0,0-0.1-0.1-0.1c0,0,0,0-0.1-0.1c0,0-0.1,0-0.1-0.1c0,0-0.1,0-0.1-0.1c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0,0,0,0,0c0,0,0,0,0,0l-2.6,0c-0.6,0-1.1,0.5-1.1,1.1c0,0.6,0.5,1.1,1.1,1.1c0,0,0,0,0,0l1.8,0l0.5,1.7c0,0,0,0,0,0l2.9,9.2c0.1,0.4,0.6,0.7,1,0.7c0.1,0,0.1,0,0.2,0l12.9-2.6c0.5-0.1,0.8-0.5,0.8-1v-6.6C31.3,42.3,30.8,41.8,30.2,41.8z M29.2,45.8L26,46l-0.1-2.1h3.3V45.8z M21.3,46.4l-0.4-2.5h3.9l0.1,2.2L21.3,46.4z M25,47.1l0.1,2.3l-3.3,0.7l-0.4-2.7L25,47.1z M19.8,43.9l0.4,2.5l-3.5,0.3l-0.9-2.8H19.8z M17,47.7l3.3-0.2l0.4,2.8L18,50.9L17,47.7zM26.2,49.2l-0.1-2.1l3.1-0.2v1.8L26.2,49.2z"/><path d="M30.4,54.2H15.2c-0.4,0-0.8,0.3-0.8,0.8s0.3,0.8,0.8,0.8h15.1c0.4,0,0.8-0.3,0.8-0.8S30.8,54.2,30.4,54.2z"/><path d="M16,56.8c-0.8,0-1.5,0.7-1.5,1.5s0.7,1.5,1.5,1.5s1.5-0.7,1.5-1.5S16.8,56.8,16,56.8z"/><path d="M29.6,56.8c-0.8,0-1.5,0.7-1.5,1.5s0.7,1.5,1.5,1.5c0.8,0,1.5-0.7,1.5-1.5S30.5,56.8,29.6,56.8z"/></g><g class="theme-iconfontcolor"><polygon points="26,29.3 23,29.3 23,26.3 21,26.3 21,29.3 18,29.3 18,31.3 21,31.3 21,34.3 23,34.3 23,31.3 26,31.3 "/></g></svg></div></div>';
  return el;
}

function cookiesAllowed() {
  try {
    sessionStorage.setItem("spl_test_sessionstorage", "1357");
    sessionStorage.removeItem("spl_test_sessionstorage");
    return true;
  } catch(e) {
    return false;
  }
}

function appendStyle(url) {
    const layerCSS = document.createElement('link');
    layerCSS.setAttribute('rel', 'stylesheet');
    let t = new Date();
    url += '?time=' + t.getTime();
    layerCSS.setAttribute('href', url);
	  layerCSS.setAttribute('data-sp1layer', '');
    document.head.appendChild(layerCSS);
}

function initLayer(layerBase) {
    appendStyle(layerBase + '/layer.css');
    appendStyle('https://data.spareparts.live/mdi/css/materialdesignicons.min.css');

    let pcgLayerFrame = document.createElement('div');
    pcgLayerFrame.id = layerId;
    pcgLayerFrame.innerHTML = '<div id="pcglayercontainer">' +
        '<div class="close_wrapper"><div id="close_tab" class="close_tab theme-tabbackcolor">' +
        '<div id="close_tab_close_button" class="close_tab_close_button">' +
        '<span class="mdi mdi-close"></span></div>' +
        '</div></div><div>' +
        '<iframe id="pcglayercontent" src="' + layerBase +
        '/' + '?token=' + token + '&cache=' + (new Date()).getTime() +
        '&protocol=' + protocol +
        '&host=' + host +
        '&imap=' + getImap() +
        '&port=' + port +
        '&drawing=-1' +
        '&filter=' + filter +
        (single !== null ? ('&single=' + single) : '') +
        '"></iframe>' +
        '<div>';
    document.body.appendChild(pcgLayerFrame);
    if (useGrip) {
        initGrip();
    }
    document.getElementById('close_tab_close_button').onclick = function () {
        closeLayer();
    };
    getTab();
}

function initGrip() {
    document.body.appendChild(createLayerGrip());
    document.getElementById('pcg-handle').onclick = function () {
        window.scrollTo(0, 0);
        if (document.getElementById(layerId).style.display === 'block') {
            closeLayer();
        } else {
            if (ie) {
                alert("Spareparts.Live does not support your browser. To use the layer, please install and use a supported browser, such as the latest version of Chrome, Firefox, Edge or Safari.");
            } else {
                openLayer();
            }
        }
    };
}

function switchLayer(newtoken, newfilter) {
	let script = document.querySelector("script[src*='spareparts.live']");
  	if(script) {
		script.setAttribute("data-token", newtoken);
		if(newfilter !== "")
			script.setAttribute("data-filter", newfilter);
		else {
		if(script.hasAttribute("data-filter"))
			script.removeAttribute("data-filter");
		}
		token = newtoken;
		filter = newfilter;
		destroyLayer();
		initLayer(layerBase);
    }
}

function applyFilter(newfilter) {
	let script = document.querySelector("script[src*='spareparts.live']");
	if(script) {
		if(newfilter !== "")
			script.setAttribute("data-filter", newfilter);
		else {
			if(script.hasAttribute("data-filter"))
				script.removeAttribute("data-filter");
		}
		filter = newfilter;
		destroyLayer();
		initLayer(layerBase);
	}
}

function destroyLayer() {
	let el = document.getElementById(layerId);
	if(el) el.parentNode.removeChild(el);
	document.querySelectorAll('[data-sp1layer]').forEach(x => { x.parentNode.removeChild(x); });
	el = document.getElementById("pcg-handle");
	if(el) el.parentNode.removeChild(el);
}

function loadDrawing(id) {
    let obj = document.getElementById('pcglayercontent');
    obj.data = layerBase + '/' + '?token=' +
        token + '&cache=' + (new Date()).getTime() + '&host=' +
        host + '&drawing=' + id + '&filter=' + filter;
}

function openLayerByDrawingId(id) {
   taskTheLayer({cmd:"opendrawingid", id:id });
}

function openLayerByReleaseId(id, strict) {
  taskTheLayer({cmd:"openreleaseid", id : id, strict : strict });
}

function openLayerRoot() {
  taskTheLayer({cmd:"openreleaseid", id : -1, strict: false});
}

function openLayerByDrawingName(name, fuzzy = true, casesens = false) {
  taskTheLayer({cmd:"opendrawingname", name:name, fuzzy:fuzzy, casesens:casesens });
}

function openLayerByReleaseName(name, fuzzy = true, casesens = false, strict = false) {
  taskTheLayer({cmd:"openreleasename", name:name, fuzzy:fuzzy, casesens:casesens, strict : strict });
}

function openLayerByMetaData(metafilters, pageno = 0) {
  taskTheLayer({cmd:"openmetadata", metafilters : metafilters, pageno: pageno});
}

function openLayerAndSearch(term) {
  taskTheLayer({cmd:"search", term:term});
  setTimeout(function() {
  	openLayer();
  }, 1000);
}

function resetOrderCalls() {
  taskTheLayer({cmd:"resetordercalls"});
}

function resetQuoteCalls() {
  taskTheLayer({cmd:"resetquotecalls"});
}

function resetScope() {
  taskTheLayer({cmd:"resetscope"});
}

function setLayerCookie(name, value) {
  taskTheLayer({cmd:"setcookie", name : name, value: value});
}

function getLayerCookie(name) {
  taskTheLayer({cmd:"getcookie", name : name});
}

function deleteLayerCookie(name) {
  taskTheLayer({cmd:"deletecookie", name : name});
}

function deleteAllLayerCookies() {
  taskTheLayer({cmd:"deleteallcookies"});
}

function showLayerCookie(name) {
  taskTheLayer({cmd:"showcookie", name: name});
}

function taskTheLayer(task) {
  let iFrame = document.getElementById('pcglayercontent').contentWindow;
  let target = new URL(layerBase).hostname;
  iFrame.postMessage(JSON.stringify(task), "https://" + target);
}

async function openFullscreen(elem) {
    if (elem.requestFullscreen) {
        await elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
        await elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        await elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
        await elem.msRequestFullscreen();
    } else {
        // eslint-disable-next-line no-console
        console.log('API requestFullscreen NOT supported ');
    }
}

async function closeFullscreen() {
    if (document.exitFullscreen) {
        await document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { /* Firefox */
        await document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        await document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE/Edge */
        await document.msExitFullscreen();
    } else {
        console.log('API exitFullscreen NOT supported ');
    }
}

function openLayer() {

    if (lateGrip && !openedOnce) {
        initGrip();
        useGrip = true;
        getTab();
    }
    window.scrollTo(0, 0);

    if (noGrammarlyPlugin()) {
        if (useGrip) {
            let handleElem = document.getElementById('pcg-handle');
            if (handleElem.classList.contains('open')) {
                handleElem.classList.remove('open');
            } else {
                handleElem.classList.add('open');
            }
        }
        let doc = document.documentElement;
        let layerFrame = document.getElementById(layerId);
        if(layerFrame == null) {
          destroyLayer();
          initLayer(layerBase);
          layerFrame = document.getElementById(layerId);
        }
        layerFrame.classList.add('open');
        openTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
        window.addEventListener('scroll', noScroll);
    } else {
        alert("The Spareparts.Live layer is not compatible with the Grammarly browser add-on.\nIf you want to use the layer, please disable the Grammarly browser add-on first, and try again.");
    }
    document.getElementById('close_tab').style.display = 'block';


    openedOnce = true;
    sessionStorage.setItem("spl_openedonce_" + host, "true");
    useGrip = (!noGrip && !lateGrip) || lateGrip;

    const iframe = document.getElementById('pcglayercontent');
    // This should turn on fullscreen mode
    if (navigator.userAgent.match(/(android|iphone)/gi)) {
        openFullscreen(iframe)
            .then(() => {
                // invoke lock on orientation
                // Got Illegal operation on lock
                // if ('orientation' in screen) {
                //     const lockOrientation = screen.lockOrientation || screen.orientation.lock || ScreenOrientation.lock || screen.mozLockOrientation || screen.msLockOrientation;
                //     if (lockOrientation) {
                //         lockOrientation('portrait')
                //             .then(() => console.log('API supported, yeah!', lockOrientation))
                //             .catch((e) => console.log('Lock orientation failed !!!', e));
                //     } else {
                //         console.log('API lockOrientation NOT supported!', lockOrientation);
                //     }
                //     console.log('new orientation is ', screen.orientation);
                // } else {
                //     console.log('API orientation NOT supported ');
                // }
            })
            .catch((e) => console.log('API Full screen failed', e));
    }
    let container = iframe.parentElement;
    container.removeChild(iframe);
    container.appendChild(iframe);
}

function closeLayer() {
    if (navigator.userAgent.match(/(android|iphone)/gi)) {
        closeFullscreen(document.getElementById('pcglayercontent'))
            .catch((e) => console.log('API Full screen failed', e));
    }
    if (useGrip) {
        document.getElementById('pcg-handle').style.display = 'block';
        document.getElementById('pcg-handle').classList.remove('open');
    }
    if(emptyorderbasket)
      resetOrderCalls();
    if(emptyquotebasket)
      resetQuoteCalls();

    document.getElementById(layerId).classList.remove('open');
    document.getElementById('close_tab').style.display = 'none';
    window.removeEventListener('scroll', noScroll);
    // document.documentElement.style.overflow = "auto";
    window.dispatchEvent(layerClosedEvent);
}

function reloadLayer() {
    getTab();
    document.getElementById('pcglayercontent').src += '';
}

function noScroll() {
    window.scrollTo(0, openTop);
}

function noGrammarlyPlugin() {
    let result = true;
    document.querySelector("html").classList.forEach(item => {
        if (item.startsWith("gr__")) {
            result = false;
            return;
        }
    });
    return result;
}

function getTab() {
    let xhr = new XMLHttpRequest();
    if (lang == null)
        lang = window.navigator.userLanguage || window.navigator.language;
    if (host == "*")
        xhr.open("GET", "https://api.spareparts.live/v1/getTab.php?token=" + token + "&lang=" + lang, true);
    else
        xhr.open("GET", "https://api.spareparts.live/v1/getTab.php?token=" + token + "&host=" + host + "&filter=" + filter + "&lang=" + lang, true);
    xhr.onload = function (e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let obj = JSON.parse(xhr.responseText);
                emptyorderbasket = obj.emptyorderbasket == "true";
                emptyquotebasket = obj.emptyquotebasket == "true";
                appendStyle(obj.themecss);
                if (useGrip) {
                    let pcgHandle = document.getElementById("pcg-handle");
                    pcgHandle.title = obj.flyover;
                    document.getElementById("tab_text").innerHTML = obj.text;
                    document.getElementById("pcg-handle").style.display = "block";
                }
            }
        }
    };
    xhr.send(null);
}

function getImap() {
  return btoa(host).replace('=', '|').replace('/', '_').replace('+', '-');
}
