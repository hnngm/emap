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
Emap.LabelMarker= function(markerOption) {
	this.options={
		title:markerOption.title||"",//标题
		positioning:"bottom-center"
	};
	this.options=Emap.util.extend(markerOption,this.options);
	

	var element=Emap.util.parseToDOM(this.options.title)[0];
	element.className="emap_label_marker";
	var overlayOption={
			  position: this.options.position.coordinate(),
			  positioning: this.options.positioning,
			  element: element,
			  stopEvent: false
			};

  //调用超类
  ol.Overlay.call(this,overlayOption);

  if(this.options.map!=undefined){
		this.options.map.addOverlay(this);
	}
  //设置地图
	this.setMap=function(map){
		map.addOverlay(this);
	}
	//删除marker
	this.remove=function(){
		Emap.currentMap.removeOverlay(this);
	}
	//设置经纬度
	this.setPosition=function(point){
       this.setPosition(point.coordinate);
	}
	//设置标题
	this.setTitle=function(title){
		this.setElement(title);
	}
	
};
ol.inherits(Emap.LabelMarker, ol.Overlay);
