/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-04-16 17:12:03
 * @version $Id$
 */

EMap.BaseLayer.PlaneWMTSTile=function(planeWMTSTileOption){
	  this.planeWMTSTileOption={
	  	 maxZoom:18,
	  	 minZoom:1,
	  	 opacity:1,//图层的透明度，取值范围[0,1]，1代表完全不透明，0代表完全透明
	  	 zIndex:1,
	  	 visible:true//是否显示
	  }
	  this.planeWMTSTileOption=EMap.Tool.extend(planeWMTSTileOption,this.planeWMTSTileOption);


	var projection = ol.proj.get(this.planeWMTSTileOption.projection);
	var projectionExtent = projection.getExtent();
	var size = ol.extent.getWidth(projectionExtent) / 256;
	var resolutions = new Array(this.planeWMTSTileOption.maxZoom);
	var matrixIds = new Array(this.planeWMTSTileOption.minZoom);
	for (var z = 0; z <this.planeWMTSTileOption.maxZoom; ++z) {
	  resolutions[z] = size / Math.pow(2, z);
	  matrixIds[z] = z;
	}

	var wmsSource = new ol.source.WMTS({
	                    url: this.planeWMTSTileOption.url,
	                    layer: this.planeWMTSTileOption.layer,
	                    matrixSet: this.planeWMTSTileOption.matrixSet,
	                    format: this.planeWMTSTileOption.format,
	                    projection: projection,
	                    tileGrid: new ol.tilegrid.WMTS({
	                        origin: ol.extent.getTopLeft(projectionExtent),
	                        resolutions: resolutions,
	                        matrixIds: matrixIds
	                    }),
	                    style: 'default'
	                });

	  var tileOption={
	  	source:wmsSource,
	  	opacity:this.planeWMTSTileOption.opacity,
	  	visible:this.planeWMTSTileOption.visible
	  };
	  //调用超类
	  ol.layer.Tile.call(this,tileOption);



	  this.setMaxZoom=function(maxZoom){
  	    this.planeWMTSTileOption.maxZoom=maxZoom;
	  }
	  this.setMinZoom=function(minZoom){
	  	this.planeWMTSTileOption.minZoom=minZoom;
	  }
	  this.getMaxZoom=function(){
	    return this.planeWMTSTileOption.maxZoom;
	  }
	  this.getMinZoom=function(){
	    return this.planeWMTSTileOption.minZoom;
	  }
	  this.setUrl=function(url){
	  	this.planeWMTSTileOption.url=url;
	  	sourceXYZ.setUrl(url);
	  }
	  this.toString=function(){
	    return "EMap.BaseLayer.PlaneWMTSTile";
	  }
  }
ol.inherits(EMap.BaseLayer.PlaneWMTSTile,ol.layer.Tile);