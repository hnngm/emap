/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2014-12-23 17:32:04
 * @version $Id$
 */

Emap.PopupWindow=function(popuWindowOption){
	var popuWindow=this;
	this.options={
		title:popuWindowOption.title||"",//标题
		content:popuWindowOption.content||"",//类容
		labelTitle:false,//是否显示标题,
		positioning:"bottom-center",
		offset:[0,0],
		open:false
	};
	this.options=Emap.util.extend(popuWindowOption,this.options);

	var boxhtml='<div id="popup-window" class="popup-window">'+
	              '  <span class="title">'+this.options.title+'</span>'+
	              '  <a href="javascript:void(0);"  class="close"></a>'+
	             '   <div class="content"><p>'+this.options.content+'</p></div>'+
	            '</div>';
	var box=Emap.util.parseToDOM(boxhtml)[0];
	//设置默认打开
	if(this.options.open){
		box.style.display="block";
	}
	//对话框关闭事件
	var closeBut=box.getElementsByClassName("close")[0];
	closeBut.addEventListener("click", function(){
				popuWindow.close();
				return false;
			}, false);


	var overlayOption={
				  position: this.options.position.coordinate(),
				  positioning: 'center-center',
				  offset:[box.offsetHeight+this.options.offset[0],this.options.offset[1]],
				  element: box,
				  stopEvent: true
				};
	//调用超类
  	ol.Overlay.call(this,overlayOption);

	
	if(this.options.map!=undefined){
		this.options.map.addOverlay(this);
	}

	//设置经纬度
	this.setLngLat=function(point){
		if(point instanceof Array){
			this.setPosition(point);
		}else{
			this.setPosition(point.coordinate());
		}
	}
	//设置类容
	this.setTitle=function(title){
       var titleEle=box.getElementsByClassName("title")[0];
       titleEle.innerHTML=title;
	}
	//设置类容
	this.setContent=function(content){
       var contentEle=box.getElementsByClassName("content")[0];
       var p=contentEle.getElementsByTagName("p")[0];
       content=Emap.util.parseToDOM(content)[0];
       Emap.util.removeAllChild(p);
       p.appendChild(content);
	}
	//显示
	this.show=function(){
		box.style.display="block";
	}
	//关闭
	this.close=function(){
		box.style.display="none";
	}

}
ol.inherits(Emap.PopupWindow, ol.Overlay);
