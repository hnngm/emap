/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-04-27 16:58:57
 * @version $Id$
 */
EMap.FeatureMarker=function(featureMarkerOption){

	this.featureMarkerOption={
		opacity:1,
		icon:EMap.icon.defaultMarkerIcon
	};
	this.featureMarkerOption=EMap.Tool.extend(featureMarkerOption,this.featureMarkerOption);

	this.position=new ol.geom.Point(this.featureMarkerOption.position.coordinate());
	var feature = new ol.Feature({
		  geometry: this.position,
		  name: this.featureMarkerOption.title||"",
		  population: 4000,
		  rainfall: 500
		});
	
	if(this.featureMarkerOption.map!=undefined){
		map.featureVector.getSource().addFeature(feature);
	}
	

	this.style = new ol.style.Style({
		  image: new ol.style.Icon({
		    anchor: [15, 32],
		    anchorXUnits: 'pixels',
		    anchorYUnits: 'pixels',
		    opacity: this.featureMarkerOption.opacity,
		    src: this.featureMarkerOption.icon
		  }),
		  text:new ol.style.Text({
		    textAlign: "left",
		    textBaseline: "bottom",
		    font: "normal 12px Arial",
		    text: this.featureMarkerOption.title||"",
		    fill: new ol.style.Fill({color: "#aa3300"}),
		    stroke: new ol.style.Stroke({color: "#ffffff", width: 3}),
		    offsetX: 15,
		    offsetY: -18,
		    rotation: 0
		  })
	});

	feature.setStyle(this.style);

	

	//设置鼠标移到marker上的事件
	this.on("move",function(evt) {
		  if (evt.dragging) {
		    return;
		  }
		  var pixel = this.featureMarkerOption.map.olmap_.getEventPixel(evt.originalEvent);
		  var hit = this.featureMarkerOption.map.olmap_.hasFeatureAtPixel([evt.pixel.x,evt.pixel.y]);
		  this.featureMarkerOption.map.olmap_.getTargetElement().style.cursor = hit ? 'pointer' : '';
	});
}
/**设置标题
	*/
EMap.FeatureMarker.prototype.setTitle=function(title){
		var textStyle=this.style.getText();
		textStyle.setText(title);
}
/**设置位置
	*/
EMap.FeatureMarker.prototype.setPosition=function(position){
		this.position.setCoordinates(position.coordinate());
}
/** 
 * 	@method on  监听事件   
 *	@param {String} [eventName] 事件名称
 *	@param {Function} [callback] 回调函数
 *	@param {Object} [context] 上下文环境
*/
EMap.FeatureMarker.prototype.on=function(eventName,callback,context) {
	var title=this.featureMarkerOption.title||"";
	var olmapEvent=function(event){
		var coordinate=event.coordinate;
		var emapEvent={
			position:EMap.LngLat.parseToLngLat(coordinate),
			frameState:event.frameState,
			originalEvent:event.originalEvent,
			pixel:{x:event.pixel[0],y:event.pixel[1]},
			dragging:event.dragging,
			title:title,
			type:eventName
		};
		callback(emapEvent);
	}
	EMap.FeatureMarker.EventCache[callback.toString()]=olmapEvent;
	if(context!=undefined){
		this.featureMarkerOption.map.olmap_.on(EMap.EventType[eventName],olmapEvent,context);
	}
	this.featureMarkerOption.map.olmap_.on(EMap.EventType[eventName],olmapEvent);
}

/** 
 * 	@method un  取消监听事件   
 *	@param {String} [eventName] 事件名称
*/
EMap.FeatureMarker.prototype.un=function(eventName,callback,context) {
	if(context!=undefined){
		this.featureMarkerOption.map.olmap_.un(EMap.EventType[eventName],EMap.FeatureMarker.EventCache[callback.toString()],context);
	}
	this.featureMarkerOption.map.olmap_.un(EMap.EventType[eventName],EMap.FeatureMarker.EventCache[callback.toString()]);
	delete EMap.FeatureMarker.EventCache[callback.toString()];
}
EMap.FeatureMarker.EventCache={}