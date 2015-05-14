/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2014-12-23 17:32:04
 * @version $Id$
 */

EMap.PopupWindow=function(popuWindowOption){
	var popuWindow=this;
	this.popuWindowOption={
		title:popuWindowOption.title||"",//标题
		content:popuWindowOption.content||"",//类容
		positioning:"bottom-left",
		//offset:[0,0],
		open:false
	};
	EMap.Tool.extend(this.popuWindowOption,popuWindowOption);

	var boxhtml='<div id="popup-window" class="popup-window" >'+
	              '  <span class="title">'+this.popuWindowOption.title+'</span>'+
	              '  <a href="javascript:void(0);"  class="close"></a>'+
	             '   <div class="content"><p>'+this.popuWindowOption.content+'</p></div>'+
	            '</div>';
	
	var boxDom=EMap.Tool.parseDom(boxhtml);
	//设置默认打开
	if(this.popuWindowOption.open){
		boxDom.style.display="block";
	}
	//对话框关闭事件
	var closeBut=boxDom.getElementsByClassName("close")[0];
	closeBut.addEventListener("click", function(){
				popuWindow.close();
				return false;
	}, false);

	var popupWindow = new ol.Overlay({
		  position: this.popuWindowOption.position.coordinate(),
		  positioning: this.popuWindowOption.positioning,
		  element: boxDom,
		  stopEvent: false
		});

	if(this.popuWindowOption.map!=undefined){
	    this.popuWindowOption.map.olmap_.addOverlay(popupWindow);
	}

	//设置经纬度
	this.setPosition=function(position){
			popupWindow.setPosition(position.coordinate());
	}
	//设置类容
	this.setTitle=function(title){
       var titleEle=boxDom.getElementsByClassName("title")[0];
       titleEle.innerText=title;
	}
	//设置类容
	this.setContent=function(content){
		var contentTemp=EMap.Tool.parseDom(content);

       var contentEle=boxDom.getElementsByTagName("p")[0];
       if(contentTemp instanceof HTMLElement){
			contentEle.innerHTML=content;
       }else{
			contentEle.innerText=content;
       }
       
	}
	//显示
	this.open=function(){
		boxDom.style.display="block";
	}
	//关闭
	this.close=function(){
		boxDom.style.display="none";
	}
}

