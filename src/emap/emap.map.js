/**
 *	#EMap.Map
 *		矩形范围构造函数，参数sw、ne分别代表地物对象西南角经纬度和东北角经纬度值。
 *	@class EMap.Map
 *	@author hnngm@163.com
 *	@extends EMap
 *
 * 	示例:
 *
 *     @example
 *			
 *	  	
 */
/** 
 * 	@method constructor  构造一个地理坐标对象
 *	@param {Number} [sw] 西南角经纬度
 *	@param {Number} [ne] 东北角经纬度
*/
EMap.Map=function(container,mapOptions){
	EMap.Map.currentMap=this;
	
	this.container=container;
	document.getElementById(container).className="emap";
	
	var defaultPoint=new EMap.LngLat(121.478432,31.219761);
	this.mapOptions={
		center:defaultPoint,
		zoom:7,
		baseLayers:[],//底图图层
		layers:[],//图层
		mapType:"amapgoogle",//图层类型
		groupType:"plane",//组类型
		control:{
			scaleEnale:true,//比例尺
			zoomEnable:true,//+-缩放
			zoomToExtentEnable:false,//缩放固定区域
			zoomSliderEnable:true,//地图控制滑块，
			overview:true,//缩略图
			mapTypeControl:true,//是否显示地图控制
			fullscreen:false//是否显示全屏按钮
		},
		projection:"EPSG:4326"//设置投影
	};
	this.mapOptions=EMap.Tool.extend(mapOptions,this.mapOptions);

	//基本图层管理
	this.baseLayersManager_=new EMap.BaseLayer.Manager();
    var baseLayer=null;
	if(this.mapOptions.baseLayers.length==0){
		this.mapOptions.baseLayers=this.baseLayersManager_.getBaseLayers();
		 baseLayer=this.baseLayersManager_.findBaseLayerByMapType(this.mapOptions.groupType);
	  	 
	}else{
		 baseLayer=this.mapOptions.layers[0];
		 this.layerManager.setBaseLayers(this.mapOptions.layers);
	}

	  //缩放范围
	  this.mapOptions.maxZoom=baseLayer.maxZoom;
	  this.mapOptions.minZoom=baseLayer.minZoom;
	
	var controlManager=new EMap.Control.Manager();


	var olview=new ol.View({
	              center:this.mapOptions.center.coordinate(),
	              zoom: this.mapOptions.zoom,
	              projection: this.mapOptions.projection,
	              maxZoom:this.mapOptions.maxZoom,
	              minZoom:this.mapOptions.minZoom
	              //enableRotation:true,
	            });
	var olMapOption={
				    target: container,
			        layers:this.mapOptions.baseLayers,
			        controls:controlManager.getControls(),
			        view:olview,
			        ol3Logo:"EMAP"
			}
	this.olmap_ = new ol.Map(olMapOption);
	
	//监空地图div大小变化
	setInterval(function(){
		var domcontainer= document.getElementById(EMap.Map.currentMap.container);
		var width=domcontainer.offsetWidth;
		var height=domcontainer.offsetHeight;
		var size=map.olmap_.getSize();
		if(size[0]!=width||size[1]!=height){
			EMap.Map.currentMap.olmap_.updateSize();
		}
	},500);
}

/** 
 * 	@method setCenterZoom  设置地图中心位置和缩放级别
 *	@param {EMap.LngLat} [point] 要设置的位置点
*/
EMap.Map.prototype.setCenterZoom=function (point,zoom){
		this.olmap_.getView().setCenter(point.coordinate());
		this.setZoom(zoom);
}
/** 
 * 	@method setZoom  设置地图中心位置
 *	@param {EMap.LngLat} [point] 要设置的位置点
*/
EMap.Map.prototype.setCenter=function (point){
		this.olmap_.getView().setCenter(point.coordinate());
}
/** 
 * 	@method getCenter  获得地图中心位置
 *	@return {EMap.LngLat} 
*/
EMap.Map.prototype.getCenter=function (){
		var point=this.olmap_.getView().getCenter();
	return EMap.LngLat.parseToLngLat(point);
}
/** 
 * 	@method setZoom  设置地图显示的缩放级别
 *	@param {Number} [zoom] 参数zoom可设范围：[minZoom,maxZoom]
*/
EMap.Map.prototype.setZoom=function (level){
		this.olmap_.getView().setZoom(zoom);
}
/** 
 * 	@method getZoom  获得地图当前的缩放级别
 *	@return {Number} 返回级别数
*/
EMap.Map.prototype.getZoom=function (){
		return this.olmap_.getView().getZoom();
}
/** 
 * 	@method getBounds  获取当前地图视图范围
 *	@return {EMap.Bounds} 
*/
EMap.Map.prototype.getBounds=function() {
	  var extent = this.olmap_.getView().calculateExtent(this.olmap_.getSize());
	return EMap.Bounds.parseToBounds(extent);
}
/** 
 * 	@method refushView  刷新地图视图   
 *	@return {EMap.Bounds} 
*/
EMap.Map.prototype.refushView=function() {
	  var view=new ol.View({
              center: this.olmap_.getView().getCenter(),
              zoom:this.olmap_.getView().getZoom(),
              projection: this.mapOptions.projection,
              maxZoom:this.mapOptions.maxZoom,
              minZoom:this.mapOptions.minZoom
              //enableRotation:true,
            });
	this.olmap_.setView(view);
}
/** 
 * 	@method on  监听事件   
 *	@param {String} [eventName] 事件名称
 *	@param {Function} [callback] 回调函数
 *	@param {Object} [context] 上下文环境
*/
EMap.Map.prototype.on=function(eventName,callback,context) {
	var olmapEvent=function(event){
		var coordinate=event.coordinate;
		var emapEvent={
			position:EMap.LngLat.parseToLngLat(coordinate),
			frameState:event.frameState,
			originalEvent:event.originalEvent,
			pixel:{x:event.pixel[0],y:event.pixel[1]},
			type:eventName
		};
		callback(emapEvent);
	}
	EMap.Map.EventCache[callback.toString()]=olmapEvent;
	if(context!=undefined){
		this.olmap_.on(EMap.EventType[eventName],olmapEvent,context);
	}
	this.olmap_.on(EMap.EventType[eventName],olmapEvent);
}

/** 
 * 	@method un  取消监听事件   
 *	@param {String} [eventName] 事件名称
*/
EMap.Map.prototype.un=function(eventName,callback,context) {
	if(context!=undefined){
		this.olmap_.un(EMap.EventType[eventName],EMap.Map.EventCache[callback.toString()],context);
	}
	this.olmap_.un(EMap.EventType[eventName],EMap.Map.EventCache[callback.toString()]);
	delete EMap.Map.EventCache[callback.toString()];
}

//地图事件缓存
EMap.Map.EventCache={

}