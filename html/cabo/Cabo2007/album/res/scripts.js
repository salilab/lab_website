function addBananAlbum() {
tmpbgcolor = bgcolor.replace("#","0x");
tmplinecolor = linecolor.replace("#","0x");
tmpimgcolor = imgcolor.replace("#","0x");

 document.write('<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="100%" height="100%" id="bananalbum"><param name="movie" value="'+respath+'BananAlbum.swf?browser=true&bgcolor='+tmpbgcolor+'&imgcolor='+tmpimgcolor+'&linecolor='+tmplinecolor+addvars+'" /><param name="loop" value="false" /><param name="quality" value="best" /><PARAM NAME=bgcolor VALUE='+bgcolor+'><param name="allowFullScreen" value="true" /><embed src="'+respath+'BananAlbum.swf?browser=true&bgcolor='+tmpbgcolor+'&imgcolor='+tmpimgcolor+'&linecolor='+tmplinecolor+addvars+'" loop="false" quality="best" bgcolor='+bgcolor+' allowFullScreen="true" width="100%" height="100%" name="bananalbum" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" /></object>');
}

function downloadURL(theURL) {
	w = 240;
	h = 180;
	x = (screen.width-w)/2;
	y = (screen.height-h)/2;
	downloadWin = window.open(theURL,"BananAlbum","status=yes,toolbar=no,resizable=yes,scrollbars=no,location=no,menubar=no,left="+x+",top="+y+",width="+w+",height="+h+"");
window.focus();
}

download = 0;
function downloadWin(theURL) {
	image = theURL;
	w = 240;
	h = 180;
	download = download+1;
	border = 36;
	x = (screen.width-w)/2;
	y = (screen.height-h)/2;
	window._w = window.open(window.respath+"download.html?image="+theURL,"BananAlbum"+download,"status=no,toolbar=no,resizable=no,scrollbars=no,location=no,menubar=no,left="+x+",top="+y+",width="+w+",height="+h+"");
	window._w.image = theURL;
}
function movieWin(theURL) {
	movie = theURL;
	w = 740;
	h = 580;
	download = download+1;
	x = (screen.width-w)/2;
	y = (screen.height-h)/2;
	window._w = window.open(theURL,"BananAlbum"+download,"status=yes,toolbar=no,resizable=yes,scrollbars=no,location=no,menubar=no,left="+x+",top="+y+",width="+w+",height="+h+"");
}
function resizeWin(image) {
		var detect = navigator.userAgent.toLowerCase();
		correctW = 8;
		correctH = screen.height-screen.availHeight;
		if (image.width<screen.availWidth && image.height<screen.availHeight) {
			newWidth = image.width;
			newHeight = image.height;
		} else {
			screenWH = screen.availWidth/(screen.availHeight-correctH);
			imageWH = image.width/image.height;
			if (screenWH>imageWH) {
				// use height...
				newHeight = screen.availHeight-border-correctH;
				newWidth = newHeight*imageWH;
			} else {
				// use width...
				newWidth = screen.availWidth-border;
				newHeight = newWidth/imageWH;
			}
		}
	if (document.all) {								// IE
		if (navigator.appVersion.indexOf("Mac")>-1){
			window._w.moveTo((screen.width-newWidth)/2,(screen.height-newHeight)/2-correctH);
			window._w.resizeTo(newWidth,newHeight-1);
		} else {
			window._w.moveTo((screen.width-newWidth)/2,(screen.height-newHeight-correctH)/2);
			window._w.resizeTo(newWidth+correctW,newHeight+correctH);
		}
	} else {										// Mozilla
		if (navigator.appVersion.indexOf("Mac")>-1){
			if (detect.indexOf("safari")>-1) {
				window._w.moveTo((screen.width-newWidth)/2,(screen.height-newHeight)/2);
				window._w.resizeTo(newWidth,newHeight+correctH);
			} else {
				window._w.moveTo((screen.width-newWidth)/2,(screen.height-newHeight)/2-correctH);
				window._w.resizeTo(newWidth+correctW,newHeight);
				// one more time for FireFox!
				window._w.moveTo((screen.width-newWidth)/2,(screen.height-newHeight)/2-correctH);
			}
		} else {
			window._w.moveTo((screen.width-newWidth)/2,(screen.height-newHeight+correctH)/2-correctH);
			window._w.resizeTo(newWidth+correctW,newHeight+correctH);
		}	}
}
function showDiv() {
	document.getElementById('imgShow').style.visibility="visible";
}
