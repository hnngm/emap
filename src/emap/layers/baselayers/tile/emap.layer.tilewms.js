/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-01-27 09:34:39
 * @version $Id$
 */

Emap.Layer.TileWMS=function(option){
   this.maxZoom=18;
  this.minZoom=1;
  
  var tileOption={
		      		source: wmsSource
		    	};

   var wmsSource = new ol.source.TileWMS({
		  url: 'http://220.191.210.178/Tile/WMS/HZTDTVECTORBLEND.gis',
		  params: {
			  	LAYERS: 'hztdtvectorblend',
	  	  		VERSION:"1.1.1",
	  	  		SERVICE:"WMS",
	  	  		FORMAT:"image/png"
			}
		});
   
  tileOption=Emap.util.extend(tileOption,option);
  //调用超类
  Emap.Layer.Tile.call(this,tileOption);

}
ol.inherits(Emap.Layer.TileWMS,Emap.Layer.Tile);