/**
 * 矩形
 * @authors Your Name (you@example.org)
 * @date    2015-03-04 15:48:24
 * @version $Id$
 */

Emap.Rect=function(rectOptions){
	this.options={
		width:3,//线宽
		color:"#3399CC",//线的颜色
		fillColor:"#ffffCC",
		opacity:0.6,
		labelColor:"red"
	};
	this.options=Emap.util.extend(rectOptions,this.options);
	if(this.options.path!=undefined&&this.options.path.length!=4){
		delete this.options.path;
	}
    //调用超类
  	Emap.Polygon.call(this,this.options);

  	//设置路径
	this.setPath=function(path){
		if(path.length!=4){
			return false;
		}
		if(this.polygonString==null){
			this.polygonString=new ol.geom.Polygon([Emap.LngLat.parseToCoordinates(path)]);
			this.setGeometry(polygonString);
		}else{
			this.setGeometry([Emap.LngLat.parseToCoordinates(path)]);
		}
	}
}
ol.inherits(Emap.Rect, Emap.Polygon);