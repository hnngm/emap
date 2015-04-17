/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-04-16 11:49:26
 * @version $Id$
 */
EMap.BaseLayer.PlaneTile=function(planeTileOptions){
  this.planeTileOptions={
  	 maxZoom:18,
  	 minZoom:1,
  	 opacity:1,//图层的透明度，取值范围[0,1]，1代表完全不透明，0代表完全透明
  	 zIndex:1,
  	 visible:true//是否显示
  }
  this.planeTileOptions=EMap.Tool.extend(planeTileOptions,this.planeTileOptions);
 
  var sourceXYZ= new ol.source.XYZ({
			        	maxZoom:this.planeTileOptions.maxZoom
		  		 	  });
  if(this.planeTileOptions.url!=undefined){
    sourceXYZ.setUrl(this.planeTileOptions.url);
  }else{
    this.planeTileOptions.urls.forEach(function(url){
      sourceXYZ.setUrl(url);
    });
  }
  var tileOption={
  	source:sourceXYZ,
  	opacity:this.planeTileOptions.opacity,
  	visible:this.planeTileOptions.visible
  };
  //调用超类
  ol.layer.Tile.call(this,tileOption);


  this.setMaxZoom=function(maxZoom){
  	this.planeTileOptions.maxZoom=maxZoom;
  }
  this.setMinZoom=function(minZoom){
  	this.planeTileOptions.minZoom=minZoom;
  }
  this.getMaxZoom=function(){
    return this.planeTileOptions.maxZoom;
  }
  this.getMinZoom=function(){
    return this.planeTileOptions.minZoom;
  }
  this.setUrl=function(url){
  	this.planeTileOptions.url=url;
  	sourceXYZ.setUrl(url);
  }
  this.toString=function(){
    return "EMap.BaseLayer.PlaneTile";
  }
}
ol.inherits(EMap.BaseLayer.PlaneTile,ol.layer.Tile);

