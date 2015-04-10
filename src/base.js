/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-01-21 16:27:00
 * @version $Id$
 */
 var deststatus=false;
var basesrc="../src/emap/";
var files=[
	basesrc+"emap.js",
	basesrc+"base/emap.lnglat.js",
	basesrc+"base/emap.bounds.js"
];
var dest="../dest/emap.js";
if(!deststatus){
	for(var i=0;i<files.length;i++){
		document.write('<scr' + 'ipt type="text/javascript" src="' + files[i] + '"></scr' + 'ipt>');
	}
}else{
	document.write('<scr' + 'ipt type="text/javascript" src="' + dest + '"></scr' + 'ipt>');
}

