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
  
  var baseLayers=emap.baseLayersManager_.getBaseLayers();

  var planeClick = function(e) {
   if(e.target.className=="selected")return false;
    var planeLayer=null;
    baseLayers.forEach(function(baseLayer){
        if(baseLayer.toString().indexOf("Satellite")==-1){
            baseLayer.setVisible(true);
        }else if(planeLayer==null){
          planeLayer=baseLayer;
          baseLayer.setVisible(false);
        }else{
          baseLayer.setVisible(false);
        }
    });
    
    emap.mapOptions.maxZoom=planeLayer.getMaxZoom();
    emap.mapOptions.minZoom=planeLayer.getMinZoom();
    emap.refushView();

    
    mapTypeSelectedClear();
    this.className="selected";
  };

  plane.addEventListener('click', planeClick, false);
  plane.addEventListener('touchstart', planeClick, false);


  var satellite=document.createElement('div');
  satellite.innerHTML = '卫星';

  var satelliteClick = function(e) {
    if(e.target.className=="selected")return false;
    var satelliteLayer=null;
    
    baseLayers.forEach(function(baseLayer){
        if(baseLayer.toString().indexOf("Plane")==-1){
            baseLayer.setVisible(true);
        }else if(satelliteLayer==null){
          satelliteLayer=baseLayer;
          baseLayer.setVisible(false);
        }else{
          baseLayer.setVisible(false);
        }
    });
    
    emap.mapOptions.maxZoom=satelliteLayer.getMaxZoom();
    emap.mapOptions.minZoom=satelliteLayer.getMinZoom();
    emap.refushView();

   
    mapTypeSelectedClear();
    this.className="selected";
  };

  satellite.addEventListener('click', satelliteClick, false);
  satellite.addEventListener('touchstart', satelliteClick, false);

   //设置默认地图控制按钮
   if(mapTypeControlOptions.defaultMapTypeControl=="plane"){
       plane.className="selected";
   }else{
       satellite.className="selected";
   }
   var tempbaseLayer=null;
   baseLayers.forEach(function(baseLayer){
      if(baseLayer.toString().toLowerCase().indexOf(mapTypeControlOptions.defaultMapTypeControl)!=-1){
          baseLayer.setVisible(true);
          if(tempbaseLayer==null){
            tempbaseLayer=baseLayer;
          }
      }else{
          baseLayer.setVisible(false);
      }
   });
   emap.mapOptions.maxZoom=tempbaseLayer.getMaxZoom();
   emap.mapOptions.minZoom=tempbaseLayer.getMinZoom();


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
