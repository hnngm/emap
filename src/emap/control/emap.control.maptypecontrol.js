/**
	#EMap.MapTypeControl
		地图类型切换控制
	@class EMap.MapTypeControl
	@author hnngm@163.com
	@extends EMap
	
 */
/**
	@method constructor  构造一个地理坐标对象
	@param {Number} [lng] 经度值
	@param {Number} [lat] 纬度值
*/
EMap.MapTypeControl = function(mapTypeControlOptions) {
  var emap=EMap.Map.currentMap;

  var plane = document.createElement('div');
  plane.innerHTML = '平面';
  plane.className="selected";


  var planeClick = function(e) {
    var tagLayer=emap.baseLayersManager_.findBaseLayerByMapType("plane");
    emap.mapOptions.maxZoom=tagLayer.maxZoom;
    emap.mapOptions.minZoom=tagLayer.minZoom;
    emap.refushView();

    emap.baseLayersManager_.setVisibleByMapType("plane",true);
    emap.baseLayersManager_.setVisibleByMapType("satellite",false);
    mapTypeSelectedClear();
    this.className="selected";
  };

  plane.addEventListener('click', planeClick, false);
  plane.addEventListener('touchstart', planeClick, false);


  var satellite=document.createElement('div');
  satellite.innerHTML = '卫星';

  var satelliteClick = function(e) {
    var tagLayer=emap.baseLayersManager_.findBaseLayerByMapType("satellite");
    emap.mapOptions.maxZoom=tagLayer.maxZoom;
    emap.mapOptions.minZoom=tagLayer.minZoom;
    emap.refushView();

    emap.baseLayersManager_.setVisibleByMapType("plane",false);
    emap.baseLayersManager_.setVisibleByMapType("satellite",true);
    mapTypeSelectedClear();
    this.className="selected";
  };

  satellite.addEventListener('click', satelliteClick, false);
  satellite.addEventListener('touchstart', satelliteClick, false);

  var emapTools = document.createElement('div');
  emapTools.className = 'emap_tools';
  emapTools.appendChild(plane);
  emapTools.appendChild(satellite);

  //设置当前地图类型
  var mapTypeSelectedClear=function(){
  		var mapTypes = emapTools.childNodes;
	  	for(var i=0;i<mapTypes.length;i++){ 
	         mapTypes[i].className="";
	   	}
  }
  ol.control.Control.call(this, {
    element: emapTools
  });

};
ol.inherits(EMap.MapTypeControl, ol.control.Control);
