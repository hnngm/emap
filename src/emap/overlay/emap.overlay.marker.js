/**
 * 'bottom-left', 'bottom-center', 'bottom-right', 'center-left', 'center-center', 'center-right', 'top-left', 'top-center', and 'top-right'. Default is 'top-left'.
 * @authors Your Name (you@example.org)
 * @date    2014-12-23 10:04:11
 * @version $Id$
 */
EMap.Marker= function(markerOption) {
	this.markerOption={
		label:markerOption.label||"",//标题
		showLabel:markerOption.showLabel||false,//是否显示标题,
		mouseOverLabelShow:markerOption.mouseOverLabelShow||false,//鼠标移动显示
		positioning:"bottom-center",
		icon:{
			path:EMap.icon.defaultMarkerIcon,
			width:"auto",
			height:"auto"
		}
	};
	EMap.Tool.extend(this.markerOption,markerOption);
	var emapMarker=this;

	var markerHtml='<div style="position: relative; cursor: pointer; z-index: 500;">'+
					'  	<div style="position: relative; left: 0px; top: 0px">'+
					'  		<img src="'+this.markerOption.icon.path+'" style="width: '+this.markerOption.icon.width+'px; height: '+this.markerOption.icon.height+'px;">'+
					'  	</div>'+
				  	'</div>';
	var markerDom=EMap.Tool.parseDom(markerHtml)

	var marker = new ol.Overlay({
		  position: this.markerOption.position.coordinate(),
		  positioning: this.markerOption.positioning,
		  element: markerDom,
		  stopEvent: false
		});
	if(this.markerOption.map!=undefined){
	    this.markerOption.map.olmap_.addOverlay(marker);
	}
	var tooltip=null;
	//事件
	markerDom.getElementsByTagName("img")[0].onload=function(){
		console.log(this.width+' , height:'+this.height);
		var labelHtml='<div style="position: relative; cursor: pointer; z-index: 500;background-color: #dfe8f6;border: 1px solid #999999;max-width: 200px;min-width: 200px;font-size: 8px;padding: 2px 7px 2px 7px;border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;">'+
						emapMarker.markerOption.label+'</div>';
		var labelDom=EMap.Tool.parseDom(labelHtml);
		//设置默认是否显示标签
		if(emapMarker.markerOption.showLabel){
			labelDom.style.display="block";
		}else{
			labelDom.style.display="none";
		}
		 
	  	tooltip = new ol.Overlay({
	  			  offset:[this.width,-this.height],
				  position: emapMarker.markerOption.position.coordinate(),
				  element: labelDom,
				  stopEvent: false
				});
		if(emapMarker.markerOption.map!=undefined){
		    emapMarker.markerOption.map.olmap_.addOverlay(tooltip);
		}
	}

	//鼠标移入显示,移出关闭
	if(this.markerOption.mouseOverLabelShow){
		markerDom.onmouseover=function(event){
			var tooltipDom=	tooltip.getElement();
			tooltipDom.style.display="block";
		}
		markerDom.onmouseout=function(event){
			var tooltipDom=	tooltip.getElement();
			tooltipDom.style.display="none";
		}
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
