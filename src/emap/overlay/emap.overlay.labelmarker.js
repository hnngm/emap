/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2014-12-23 15:14:58
 * @version $Id$
 */

/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2014-12-23 10:04:11
 * @version $Id$
 */
EMap.LabelMarker= function(labelMarkerOption) {
	this.labelMarkerOption={
		positioning:"bottom-center",
	};
	EMap.Tool.extend(this.labelMarkerOption,labelMarkerOption);
	var emapLabelMarker=this;

	var markerHtml='<div style="position: relative; cursor: pointer; z-index: 500;background-color: #dfe8f6;border: 1px solid #999999;max-width: 200px;min-width: 200px;font-size: 8px;padding: 2px 7px 2px 7px;border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;">'+
						labelMarkerOption.label+'</div>';
	var markerDom=EMap.Tool.parseDom(markerHtml)

	var marker = new ol.Overlay({
		  position: this.labelMarkerOption.position.coordinate(),
		  positioning: this.labelMarkerOption.positioning,
		  element: markerDom,
		  stopEvent: false
		});
	if(this.labelMarkerOption.map!=undefined){
	    this.labelMarkerOption.map.olmap_.addOverlay(marker);
	}

	
	//设置文字
	this.setLabel=function(label){
			this.markerOption.label=label;
			var tooltipDom=	tooltip.getElement();
			tooltipDom.innerText=label;
	}
	//设置位置
	this.setPosition=function(postion){
			marker.setPosition(postion.coordinate());
			tooltip.setPosition(postion.coordinate());
	}
	//设置位置
	this.getPosition=function(){
			var postion=marker.getPosition();
			return EMap.LngLat.parseToLngLat(postion);
	}
	//删除
	this.remove=function(){
		this.markerOption.map.olmap_.removeOverlay(marker);
		this.markerOption.map.olmap_.removeOverlay(tooltip);
	}
	//绑定事件
	this.on=function(eventName,callback){
		var markerDom=marker.getElement();
		markerDom.addEventListener(eventName, callback, false);
	}
	this.un=function(eventName,callback){
		var markerDom=marker.getElement();
		markerDom.removeEventListener(eventName, callback, false);
	}
	
};
