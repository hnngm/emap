


EMap.Circle=function(circleOptions){
	
	this.options={
		width:circleOptions.width||3,//线宽
		borderColor:circleOptions.borderColor||"#3399CC",//线的颜色
		opacity:circleOptions.opacity||0.6,
		fillColor:circleOptions.fillColor||"#3399CC",
		radius:circleOptions.radius||7
	};
	EMap.Tool.extend(this.options,circleOptions);
	this.options.fillColor=EMap.Tool.colorRgb(this.options.fillColor);
	this.options.fillColor.push(this.options.opacity);
	
    var feature = new ol.Feature();

	var circle=new ol.geom.Circle(this.options.position.coordinate(),this.options.radius);
	feature.setGeometry(circle);

	var styleOption={
				        fill: new ol.style.Fill({
					      color: this.options.fillColor
					    }),
					    stroke: new ol.style.Stroke({
					      color: this.options.borderColor,
					      width: this.options.width
					    })
			      }
	 //设置区域标签
    if(this.options.label!=undefined){
		styleOption["text"]=new ol.style.Text({
			    textAlign: "normal",
			    textBaseline: "center",
			    font:"bold 10px Arial",
			    text: this.options.label,
			    fill: new ol.style.Fill({color: this.options.labelColor}),
			    stroke: new ol.style.Stroke({color: "#33FFCC", width: 2}),
			    rotation: 0
			  })      
    }
	var styles=new ol.style.Style(styleOption);

	feature.setStyle(styles);

    var source=this.options.map.featureVector.getSource();
    if(this.options.map!=undefined){
		source.addFeature(feature);
	}
	//设置地图
	this.setMap=function(map){
		source=map.drawVector.getSource();
        source.addFeature(feature);
	}
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
			source.removeFeature(feature);
		}
	}
}