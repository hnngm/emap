/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2014-12-24 14:39:25
 * @version $Id$
 */
Emap.Polygon=function(polygonOptions){
	
	this.options={
		width:3,//线宽
		color:"#3399CC",//线的颜色
		fillColor:"#ffffCC",
		opacity:0.6,
		labelColor:"red"
	};
	this.options=Emap.util.extend(polygonOptions,this.options);
	this.options.fillColor=Emap.util.colorRgb(this.options.fillColor);
	this.options.fillColor.push(this.options.opacity);
	
	
    //调用超类
  	ol.Feature.call(this,{});

	var polygonString=null;
	if(this.options.path!=undefined){
		polygonString=new ol.geom.Polygon([Emap.LngLat.parseToCoordinates(this.options.path)]);
		this.setGeometry(polygonString);
	}

	var styleOption={
				        stroke: new ol.style.Stroke({
				          width: this.options.width,
				          color: this.options.color
				        }),
				        fill:new ol.style.Fill({
				         color: this.options.fillColor
				       })
			      }
     //设置区域标签
    if(this.options.label!=undefined){
		styleOption["text"]=new ol.style.Text({
			    textAlign: "normal",
			    textBaseline: "bottom",
			    font:"bold 10px Arial",
			    text: this.options.label,
			    fill: new ol.style.Fill({color: this.options.labelColor}),
			    stroke: new ol.style.Stroke({color: "#33FFCC", width: 2}),
			    rotation: 0
			  })      
    }
	var style=new ol.style.Style(styleOption);
	this.setStyle(style);

    var source=null;
    if(this.options.map!=undefined){
    	 source=Emap.currentMap.drawVector.getSource();
         source.addFeature(this);
	}

	//设置地图
	this.setMap=function(map){
		source=map.drawVector.getSource();
        source.addFeature(this);
	}
	//设置路径
	this.setPath=function(path){
		if(polygonString==null){
			polygonString=new ol.geom.Polygon([Emap.LngLat.parseToCoordinates(path)],"XY");
			this.setGeometry(polygonString);
		}else{
			polygonString.setCoordinates([Emap.LngLat.parseToCoordinates(path)],"XY");
			this.setGeometry(polygonString);
		}
	}
	//获得Path
	this.getPath=function(){
		var coordinates=polygonString.getCoordinates();
		return Emap.point.parseToPoint(coordinates[0]);
	}
	//删除polyline
	this.remove=function(){
		if(source!=null){
			source.removeFeature(this);
		}
	}
}
ol.inherits(Emap.Polygon, ol.Feature);