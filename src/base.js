/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-01-21 16:27:00
 * @version $Id$
 */
 var deststatus=false;
var basesrc="../../src/emap/";
var files=[
	basesrc+"emap.js",
	basesrc+"base/emap.lnglat.js",
	basesrc+"base/emap.extent.js",
	basesrc+"base/emap.bounds.js",
	basesrc+"common/emap.tool.js",
	basesrc+"common/emap.icon.js",

	basesrc+"control/emap.control.maptypecontrol.js",
	basesrc+"control/emap.control.js",
	//底图
	basesrc+"layers/baselayers/tile/source/emap.baselayer.emaparcgissource.js",

	basesrc+"layers/baselayers/tile/emap.baselayer.tile.js",
	basesrc+"layers/baselayers/tile/emap.baselayer.emapplanetile.js",
	basesrc+"layers/baselayers/tile/emap.baselayer.emapsatellitetile.js",

	basesrc+"layers/baselayers/tile/emap.baselayer.wmts.emapplanetile.js",
	basesrc+"layers/baselayers/tile/emap.baselayer.wmts.emapsatellitetile.js",
	basesrc+"layers/baselayers/emap.baselayers.manager.js",
	//附加图层
	basesrc+"layers/feature/emap.layer.vector.js",

	//feature
	basesrc+"feature/emap.feature.marker.js",
	basesrc+"feature/emap.feature.polyline.js",
	basesrc+"feature/emap.feature.polygon.js",
	basesrc+"feature/emap.feature.circle.js",

	//drawture

	basesrc+"feature/draw/emap.feature.drawpolyline.js",
	basesrc+"feature/draw/emap.feature.drawpolygon.js",
	basesrc+"feature/draw/emap.feature.drawrect.js",
	basesrc+"feature/draw/emap.feature.drawcircle.js",

	//overlay
	basesrc+"overlay/emap.overlay.marker.js",
	basesrc+"overlay/emap.overlay.labelmarker.js",
	basesrc+"overlay/emap.overlay.popuwindow.js",
	

	basesrc+"events/emap.eventtype.js",

	basesrc+"emap.map.js",

	basesrc+"base/emap.bounds.js",
];
var dest="../../dest/emap.js";
if(!deststatus){
	for(var i=0;i<files.length;i++){
		document.write('<scr' + 'ipt type="text/javascript" src="' + files[i] + '"></scr' + 'ipt>');
	}
}else{
	document.write('<scr' + 'ipt type="text/javascript" src="' + dest + '"></scr' + 'ipt>');
}

