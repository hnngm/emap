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
	basesrc+"base/emap.extent.js",
	basesrc+"base/emap.bounds.js",
	basesrc+"common/emap.tool.js",

	basesrc+"control/emap.control.maptypecontrol.js",
	basesrc+"control/emap.control.js",
	
	basesrc+"layers/baselayers/tile/emap.baselayer.tile.js",
	basesrc+"layers/baselayers/tile/emap.baselayer.amaptile.js",
	basesrc+"layers/baselayers/tile/emap.baselayer.googletile.js",
	basesrc+"layers/baselayers/emap.baselayers.manager.js",

	basesrc+"events/emap.eventtype.js",

	basesrc+"emap.map.js",

	basesrc+"base/emap.bounds.js",
];
var dest="../dest/emap.js";
if(!deststatus){
	for(var i=0;i<files.length;i++){
		document.write('<scr' + 'ipt type="text/javascript" src="' + files[i] + '"></scr' + 'ipt>');
	}
}else{
	document.write('<scr' + 'ipt type="text/javascript" src="' + dest + '"></scr' + 'ipt>');
}

