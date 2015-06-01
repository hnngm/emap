/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2014-12-24 11:23:16
 * @version $Id$
 */


EMap.Polyline=function(polylineOptions){
	
	this.options={
		width:polylineOptions.width||3,//线宽
		color:polylineOptions.color||"#3399CC",//线的颜色
		opacity:polylineOptions.opacity||0.6,
		labelColor:polylineOptions.labelColor||"red"
	};
	EMap.Tool.extend(this.options,polylineOptions);
	this.options.color=EMap.Tool.colorRgb(this.options.color);
	this.options.color.push(this.options.opacity);
	
	
    var feature = new ol.Feature();
  

	var lineString=null;
	if(this.options.path!=undefined){
		lineString=new ol.geom.LineString(EMap.LngLat.parseToCoordinates(this.options.path));
		feature.setGeometry(lineString);
	}

	var styleOption={
				        stroke: new ol.style.Stroke({
				          width: this.options.width,
				          color: this.options.color
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
	var styles=new ol.style.Style(styleOption);

	feature.setStyle(styles);
	var source=this.options.map.featureVector.getSource();
    if(this.options.map!=undefined){
		source.addFeature(feature);
	}

	//设置地图
	this.setMap=function(map){
		source=map.drawVector.getSource();
        source.addFeature(this);
	}
	//设置标题
	this.setTitle=function(title){
		var textStyle=styleOption.style.getText();
		textStyle.setText(title);
	}
	//设置路径
	this.setPath=function(path){
		if(lineString==null){
			lineString=new ol.geom.LineString(EMap.LngLat.parseToCoordinates(path));
			feature.setGeometry(lineString);
		}else{
			lineString.setCoordinates(EMap.LngLat.parseToCoordinates(path));
		}
	}
	//添加一个点
	this.addPoint=function(point){
		lineString.appendCoordinate(point.coordinate());
	}
	//获得Path
	this.getPath=function(){
		var coordinates=lineString.getCoordinates();
		return EMap.LngLat.parseToLngLats(coordinates);
	}
	//删除polyline
	this.remove=function(){
		if(source!=null){
			source.removeFeature(feature);
		}
	}
	//获得长度
	this.getLength=function(){
		var length=0;
		var lngLats=this.getPath();
		for (var i = 0; i < lngLats.length-1; i++) {
			var lngLat=lngLats[i];
			var lngLat2=lngLats[i+1];
			length+=EMap.Tool.distance(lngLat.getLng(),lngLat.getLat(),lngLat2.getLng(),lngLat2.getLat());
		};
		return length;
	}
	
}
