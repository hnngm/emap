/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-04-16 17:12:03
 * @version $Id$
 */

EMap.BaseLayer.SatelliteWMTSTile=function(satelliteWMTSTileOption){
	  this.satelliteWMTSTileOption={
	  	 maxZoom:18,
	  	 minZoom:1,
	  	 opacity:1,//图层的透明度，取值范围[0,1]，1代表完全不透明，0代表完全透明
	  	 zIndex:1,
	  	 visible:true//是否显示
	  }
	  this.satelliteWMTSTileOption=EMap.Tool.extend(satelliteWMTSTileOption,this.satelliteWMTSTileOption);


	var projection = ol.proj.get(this.satelliteWMTSTileOption.projection);
	var projectionExtent = projection.getExtent();
	var size = ol.extent.getWidth(projectionExtent) / 256;
	var resolutions = new Array(this.satelliteWMTSTileOption.maxZoom);
	var matrixIds = new Array(this.satelliteWMTSTileOption.minZoom);
	for (var z = 0; z <this.satelliteWMTSTileOption.maxZoom; ++z) {
	  resolutions[z] = size / Math.pow(2, z);
	  matrixIds[z] = z;
	}

	  var wmsSource = new ol.source.WMTS({
	                    url: this.satelliteWMTSTileOption.url,
	                    layer: this.satelliteWMTSTileOption.layer,
	                    matrixSet: this.satelliteWMTSTileOption.matrixSet,
	                    format: this.satelliteWMTSTileOption.format,
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
	  	opacity:this.satelliteWMTSTileOption.opacity,
	  	visible:this.satelliteWMTSTileOption.visible
	  };
	  //调用超类
	  ol.layer.Tile.call(this,tileOption);



	  this.setMaxZoom=function(maxZoom){
  	    this.satelliteWMTSTileOption.maxZoom=maxZoom;
	  }
	  this.setMinZoom=function(minZoom){
	  	this.satelliteWMTSTileOption.minZoom=minZoom;
	  }
	  this.getMaxZoom=function(){
	    return this.satelliteWMTSTileOption.maxZoom;
	  }
	  this.getMinZoom=function(){
	    return this.satelliteWMTSTileOption.minZoom;
	  }
	  this.setUrl=function(url){
	  	this.satelliteWMTSTileOption.url=url;
	  	sourceXYZ.setUrl(url);
	  }
	  this.toString=function(){
	    return "EMap.BaseLayer.SatelliteWMTSTile";
	  }
  }
ol.inherits(EMap.BaseLayer.SatelliteWMTSTile,ol.layer.Tile);