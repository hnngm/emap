


Emap.Circle=function(circleOptions){
	
	this.options={
		width:3,//线宽
		color:"#3399CC",//线的颜色
		opacity:0.6,
		labelColor:"red",
		radius:circleOptions.radius||7
	};
	
	this.options=Emap.util.extend(circleOptions,this.options);
	this.options.color=Emap.util.colorRgb(this.options.color);
	
	
    //var lineFeature = new ol.Feature();
    //调用超类
  	ol.Feature.call(this,{});

	var circle=null;
	if(this.options.position!=undefined){
		circle=new ol.geom.Circle(this.options.position.coordinate(),this.options.radius);
		this.setGeometry(circle);
	}

	var styleOption={
				        fill: new ol.style.Fill({
					      color: 'rgba(255, 255, 255, 0.5)'
					    }),
					    stroke: new ol.style.Stroke({
					      color: '#d7281e',
					      width: 5
					    })
			      }
	 
	var styles=new ol.style.Style(styleOption);

	this.setStyle(styles);

    var source=null;
	 source=Emap.currentMap.drawVector.getSource();
	 source.addFeature(this);

	//设置位置
	this.setPosition=function(position){
		circle.setCenter(position.coordinate());
	}
	//设置半径
	this.setRadius=function(radius){
		circle.setRadius(radius);
	}
	//获得半径
	this.getRadius=function(){
		return circle.getRadius();
	}
	//删除
	this.remove=function(){
		if(source!=null){
			source.removeFeature(this);
		}
	}
}
ol.inherits(Emap.Circle, ol.Feature);