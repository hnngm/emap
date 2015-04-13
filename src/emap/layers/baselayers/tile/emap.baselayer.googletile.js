/**
 * google平面图块
 * @authors Your Name (you@example.org)
 * @date    2015-01-21 21:36:44
 * @version $Id$
 */

EMap.BaseLayer.GooglePlaneTile=function(option){
  this.maxZoom=18;
  this.minZoom=1;
  var tileOption={
		      		source: new ol.source.XYZ({
			        	url:'http://mt2.google.cn/vt/lyrs=m@283000000&hl=zh-CN&gl=CN&src=app&expIds=201527&rlbl=1&x={x}&y={y}&z={z}&s=Ga'
		  		 	})
		    	};
  tileOption=EMap.Tool.extend(tileOption,option);
  //调用超类
  EMap.BaseLayer.Tile.call(this,tileOption);
}
ol.inherits(EMap.BaseLayer.GooglePlaneTile,EMap.BaseLayer.Tile);

/**
*
*google卫星图块
*
*/
EMap.BaseLayer.GoogleSatelliteTile=function(option){
	this.maxZoom=18;
  this.minZomm=1;
  var tileOption={
		      		source: new ol.source.XYZ({
			        	url:'http://www.google.cn/maps/vt?lyrs=s@169&gl=cn&x={x}&y={y}&z={z}'
		  		 	})
		    	};
  tileOption=EMap.Tool.extend(tileOption,option);
  //调用超类
  EMap.BaseLayer.Tile.call(this,tileOption);
}
ol.inherits(EMap.BaseLayer.GoogleSatelliteTile,EMap.BaseLayer.Tile);



/**
*
*google地址图块
*
*/
EMap.BaseLayer.GoogleAddressTile=function(option){
  this.maxZoom=18;
  this.minZomm=1;
  var tileOption={
		      		source: new ol.source.XYZ({
			        	url:'http://mt0.google.cn/vt/imgtp=png32&lyrs=h@283000000&hl=zh-CN&gl=CN&src=app&expIds=201527&rlbl=1&x={x}&y={y}&z={z}&s=Galil'
		  		 	})
		    	};
  tileOption=EMap.Tool.extend(tileOption,option);
  //调用超类
  EMap.BaseLayer.Tile.call(this,tileOption);
}
ol.inherits(EMap.BaseLayer.GoogleAddressTile,EMap.BaseLayer.Tile);