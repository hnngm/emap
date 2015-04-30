/**
 * arcgis 数据源
 */

EMap.BaseLayer.ArcGISRestSource=function(arcGISRestSourceOption){
  this.arcGISRestSourceOption={
  	
  }
  this.arcGISRestSourceOption=EMap.Tool.extend(arcGISRestSourceOption,this.arcGISRestSourceOption);
  
	//调用超类
  ol.source.TileArcGISRest.call(this,this.arcGISRestSourceOption);

}

ol.inherits(EMap.BaseLayer.ArcGISRestSource,ol.source.TileArcGISRest);