/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-04-16 11:49:26
 * @version $Id$
 */
EMap.BaseLayer.SatelliteTile=function(satelliteTileOptions){
  this.satelliteTileOptions={
  	 maxZoom:18,
  	 minZoom:1,
  	 opacity:1,//图层的透明度，取值范围[0,1]，1代表完全不透明，0代表完全透明
  	 zIndex:1,
  	 visible:true//是否显示
  }
  this.satelliteTileOptions=EMap.Tool.extend(satelliteTileOptions,this.satelliteTileOptions);
 
  var sourceXYZ= new ol.source.XYZ({
			        	maxZoom:this.satelliteTileOptions.maxZoom
		  		 	  });
  if(this.satelliteTileOptions.url!=undefined){
    sourceXYZ.setUrl(this.satelliteTileOptions.url);
  }else if(this.satelliteTileOptions.urls!=undefined){
    this.satelliteTileOptions.urls.forEach(function(url){
      sourceXYZ.setUrl(url);
    });
  }
  var tileOption={
  	source:sourceXYZ,
  	opacity:this.satelliteTileOptions.opacity,
  	visible:this.satelliteTileOptions.visible
  };
  //调用超类
  ol.layer.Tile.call(this,tileOption);


  this.setMaxZoom=function(maxZoom){
  	this.satelliteTileOptions.maxZoom=maxZoom;
  }
  this.setMinZoom=function(minZoom){
  	this.satelliteTileOptions.minZoom=minZoom;
  }
  this.getMaxZoom=function(){
    return this.satelliteTileOptions.maxZoom;
  }
  this.getMinZoom=function(){
    return this.satelliteTileOptions.minZoom;
  }
  this.setUrl=function(url){
  	this.satelliteTileOptions.url=url;
  	sourceXYZ.setUrl(url);
  }
  this.toString=function(){
    return "EMap.BaseLayer.SatelliteTile";
  }
}
ol.inherits(EMap.BaseLayer.SatelliteTile,ol.layer.Tile);

