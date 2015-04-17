/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2014-12-05 22:57:46
 * @version $Id$
 */

EMap.Control.Manager=function(){
  var emap=EMap.Map.currentMap;
  var controlOptions=emap.mapOptions.control;

	var controls=[];
	if(controlOptions.scaleEnale){//比例尺
		controls.push(new ol.control.ScaleLine());
	}
	if(controlOptions.zoomEnable){//+-缩放
		controls.push(new ol.control.Zoom({zoomInTipLabel:'放大',zoomOutTipLabel:'缩小'}));
	}
	if(controlOptions.zoomToExtentEnable){//缩放固定区域
    var bounds=new Emap.Bounds(117.196655,36.79609,118.508663,38.195022);
		controls.push(new ol.control.ZoomToExtent({
			        extent:bounds.coordinate(),//范围
			        tipLabel:'默认比例'
			      }));
	}
	if(controlOptions.zoomSliderEnable){//地图控制滑块
		controls.push(new ol.control.ZoomSlider({/*className:"",maxResolution:5,minResolution:3*/}));
	}
  //设置缩略图
  if(controlOptions.overview){
    controls.push(new ol.control.OverviewMap());
  }
  if(controlOptions.fullscreen){
    controls.push(new ol.control.FullScreen());
  }
  if(controlOptions.mapTypeControl){
    var mapTypeControlOptions={
                  defaultMapTypeControl:controlOptions.defaultMapTypeControl
              };
    var mapTypeControl=new EMap.MapTypeControl(mapTypeControlOptions);
    controls.push(mapTypeControl);
  }
  this.getControls=function(){

    return controls;
  }
};



