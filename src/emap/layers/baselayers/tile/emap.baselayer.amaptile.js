/**
 * Amap平面图块
 * @authors Your Name (you@example.org)
 * @date    2015-01-21 21:36:44
 * @version $Id$
 */

EMap.BaseLayer.AmapPlaneTile=function(option){
  this.maxZoom=18;
  this.minZoom=1;
  var tileOption={
		      		source: new ol.source.XYZ({
			        	url:'http://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}'
		  		 	  })
		    	};
  tileOption=EMap.Tool.extend(tileOption,option);
  
  //调用超类
  EMap.BaseLayer.Tile.call(this,tileOption);
}
ol.inherits(EMap.BaseLayer.AmapPlaneTile,EMap.BaseLayer.Tile);

/**
*
*Amap卫星图块
*
*/
EMap.BaseLayer.AmapSatelliteTile=function(option){
  this.maxZoom=18;
  this.minZoom=1;
  var tileOption={
		      		source: new ol.source.XYZ({
			        	url:'http://webst04.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}'
		  		 	})
		    	};
  tileOption=EMap.Tool.extend(tileOption,option);
  //调用超类
  EMap.BaseLayer.Tile.call(this,tileOption);
}
ol.inherits(EMap.BaseLayer.AmapSatelliteTile,EMap.BaseLayer.Tile);



/**
*
*Amap地址图块
*
*/
EMap.BaseLayer.AmapAddressTile=function(option){
  var tileOption={
		      		source: new ol.source.XYZ({
			        	url:'http://webst01.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}'
		  		 	})
		    	};
  tileOption=EMap.Tool.extend(tileOption,option);
  //调用超类
  EMap.BaseLayer.Tile.call(this,tileOption);
}
ol.inherits(EMap.BaseLayer.AmapAddressTile,EMap.BaseLayer.Tile);