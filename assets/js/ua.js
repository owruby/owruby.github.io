var ua = {};
var uaResult = {};
function getUA(){
	ua.name = window.navigator.userAgent.toLowerCase();
		 
	ua.isIE = (ua.name.indexOf('msie') >= 0 || ua.name.indexOf('trident') >= 0);
	ua.isSafari = (ua.name.indexOf('safari') >= 0 && ua.name.indexOf('version') >= 0);
	ua.isChrome = (ua.name.indexOf('chrome') >= 0);
	ua.isFirefox = (ua.name.indexOf('firefox')>= 0);
	ua.isiPhone = ua.name.indexOf('iphone') >= 0;
	ua.isiPod = ua.name.indexOf('ipod') >= 0;
	ua.isiPad = ua.name.indexOf('ipad') >= 0;
	ua.isiOS = (ua.isiPhone || ua.isiPod || ua.isiPad);
	ua.isAndroid = ua.name.indexOf('android') >= 0;
	ua.isTablet = (ua.isiPad || (ua.isAndroid && ua.name.indexOf('mobile') < 0));
		 
	if (ua.isIE) {
	    ua.verArray = /(msie|rv:?)\s?([0-9]{1,})([\.0-9]{1,})/.exec(ua.name);
	    if (ua.verArray) {
	    	ua.ver = parseInt(ua.verArray[2], 10);
	    }
	}
	
	if (ua.isSafari) {
	    ua.verArray = /version\/([1-9]{1,2}\.[0-9]{1,2})/.exec(ua.name);
	    if (ua.verArray) {
	    	ua.ver = parseInt(ua.verArray[1], 10);
	    }
	}
	
	if (ua.isChrome) {
	    ua.verArray = /chrome\/([1-9]{1,2}\.[0-9]{1,2})/.exec(ua.name);
	    if (ua.verArray) {
	    	ua.ver = parseInt(ua.verArray[1], 10);
	    }
	}
	
	if (ua.isFirefox) {
	    ua.verArray = /firefox\/([1-9]{1,2}\.[0-9]{1,2})/.exec(ua.name);
	    if (ua.verArray) {
	    	ua.ver = parseInt(ua.verArray[1], 10);
	    }
	}

	if (ua.isiOS) {
		ua.verArray = /(os)\s([0-9]{1,})([\_0-9]{1,})/.exec(ua.name);
		if (ua.verArray) {
			ua.ver = parseInt(ua.verArray[2], 10);
		}
	}
	
	if (ua.isAndroid) {
		ua.verArray = /(android)\s([0-9]{1,})([\.0-9]{1,})/.exec(ua.name);
		if (ua.verArray) {
			ua.ver = parseInt(ua.verArray[2], 10);
		}
	}
	
	if(!ua.ver){
		ua.ver = 0;
	}
	
	Object.keys(ua).forEach(function (key) {
		if(ua[key] && key!='ver' && key!='verArray'){
			uaResult.agent = key;
			uaResult.ver = ua.ver;
		}
		if(key=='isIE' && ua[key]){
			uaResult.type = 'IE';
		}else if((key=='isiPhone' || key=='isiPod' || key=='isiPad' || key=='isAndroid' || key=='isiOS' || key=='isTablet') && ua[key]){
			uaResult.type = 'mobile';
		}else if((key=='isSafari' || key=='isChrome' || key=='isFirefox') && ua[key]){
			uaResult.type = 'modern';
		}
	});
	
	if(uaResult.type==null){
		uaResult.type = 'other';
	}
	
	return uaResult;
}