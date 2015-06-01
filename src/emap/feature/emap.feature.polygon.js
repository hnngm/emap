/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2014-12-24 14:39:25
 * @version $Id$
 */
EMap.Polygon=function(polygonOptions){
	this.options={
		width:polygonOptions.width||3,//线宽
		borderColor:polygonOptions.borderColor||"#3399CC",//线的颜色
		fillColor:polygonOptions.fillColor||"#3399CC",
		opacity:polygonOptions.opacity||0.6,
		labelColor:polygonOptions.labelColor||"red"
	};
	
	EMap.Tool.extend(this.options,polygonOptions);
	this.options.fillColor=EMap.Tool.colorRgb(this.options.fillColor);
	this.options.fillColor.push(this.options.opacity);
	
	
    var feature = new ol.Feature();
  

	var polygonString=null;
	if(this.options.path!=undefined){
		polygonString=new ol.geom.Polygon([EMap.LngLat.parseToCoordinates(this.options.path)]);
		feature.setGeometry(polygonString);
	}

	var styleOption={
				        stroke: new ol.style.Stroke({
				          width: this.options.width,
				          color: this.options.borderColor
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
	feature.setStyle(style);

	var source=this.options.map.featureVector.getSource();
    if(this.options.map!=undefined){
		source.addFeature(feature);
	}

	//设置地图
	this.setMap=function(map){
		source=map.drawVector.getSource();
        source.addFeature(this);
	}
	//设置路径
	this.setPath=function(path){
		if(polygonString==null){
			polygonString=new ol.geom.LineString([EMap.LngLat.parseToCoordinates(path)]);
			feature.setGeometry(polygonString);
		}else{
			polygonString.setCoordinates([EMap.LngLat.parseToCoordinates(path)]);
		}
	}
	//设置标题
	this.setTitle=function(title){
		var textStyle=styleOption.style.getText();
		textStyle.setText(title);
	}
	//添加一个点
	this.addPoint=function(point){
		var path=this.getPath();
		path.push(point);
		this.setPath(path);
	}
	//获得Path
	this.getPath=function(){
		var coordinates=polygonString.getCoordinates();
		return EMap.LngLat.parseToLngLats(coordinates[0]);
	}
	//删除polyline
	this.remove=function(){
		if(source!=null){
			source.removeFeature(feature);
		}
	}
	//获得长度
	this.getArea=function(){//返回平方米
		var wgs84Sphere = new ol.Sphere(6378137);
		var area;
		  //if (geodesicCheckbox.checked) {
		    var sourceProj = this.options.map.olmap_.getView().getProjection();
		    var geom =feature.getGeometry().clone().transform(sourceProj, 'EPSG:4326');
		    var coordinates = geom.getLinearRing(0).getCoordinates();
		    area = Math.abs(wgs84Sphere.geodesicArea(coordinates));
		  //} else {
		    //area = polygon.getArea();
		 // }
		    area = Math.round(area * 100) / 100;
		return area;
	}
}
