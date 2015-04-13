/**
 * 地图边界框
 * @authors Your Name (you@example.org)
 * @date    2015-01-18 20:42:46
 * @version $Id$
 */

EMap.Extent=function(points){
	if(points ==undefined || ! points instanceof Array && points.length==0){
		console.error("参数必须为数组,且长度不能为0!");
		return false;
	}
	var temp=[];
	for(var i=0;i<points.length;i++){
		var point=points[i];
		temp.push(point.lng);
		temp.push(point.lat);
	}
	this.getCoordinates=function(){
		return EMap.Extent.transToCoordinate(temp);
	}
	//判断点是否在当前范围内
	this.containsPoint=function(point){
		return ol.extent.containsCoordinate(this.getCoordinates(), point.coordinate());
	}
	//判断范围是否包含在当前范围内
	this.containsExtent=function(extent){
		return ol.extent.containsExtent(this.getCoordinates(), extent);
	}
	//判断范围是否相等
	this.equals=function(extent){
		return ol.extent.equals(this.getCoordinates(), extent);
	}
	//获得中心点
	this.getCenter=function(){
		return EMap.point.parseToLngLat(ol.extent.getCenter(this.getCoordinates()));
	}
	//获得左下点
	this.getBottomLeft=function(){
		return EMap.point.parseToLngLat(ol.extent.getBottomLeft(this.getCoordinates()));
	}
	//获得右下点
	this.getBottomLeft=function(){
		return EMap.point.parseToLngLat(ol.extent.getBottomLeft(this.getCoordinates()));
	}
	//获得左上点
	this.getTopLeft=function(){
		return EMap.point.parseToLngLat(ol.extent.getTopLeft(this.getCoordinates()));
	}
	//获得右上点
	this.getTopRight=function(){
		return EMap.point.parseToLngLat(ol.extent.getTopRight(this.getCoordinates()));
	}
	//两个范围相交
	this.intersects=function(extent){
		return ol.extent.intersects(this.getCoordinates(),extent);
	}
}
//转换经纬度
EMap.Extent.transToLngLats=function(extent){
		return ol.proj.transformExtent(extent, EMap.currentMap.mapOptions.projection,'EPSG:4326');
	}
//转换坐标
EMap.Extent.transToCoordinate=function(extent){
		return ol.proj.transformExtent(extent, 'EPSG:4326',EMap.currentMap.mapOptions.projection);
}
//判断点是否在当前范围内
EMap.Extent.containsPoint=function(extent,point){
		return ol.extent.containsCoordinate(extent.coordinate(), point.coordinate());
}
