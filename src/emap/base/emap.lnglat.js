/**
	#EMap.LngLat
		经纬度坐标，确定地图上的一个点。
	@class EMap.LngLat
	@author hnngm@163.com
	@extends EMap
	
 */
/**
	@method constructor  构造一个地理坐标对象
	@param {Number} [lng] 经度值
	@param {Number} [lat] 纬度值
*/
EMap.LngLat=function(lng,lat){
	var lng=lng;
	var lat=lat;


	this.coordinate=function(){
		return EMap.LngLat.transToCoordinate([lng,lat]);
	}

	/**
	*@method distance  当前经纬度和传入经纬度之间的地面距离，单位为米
	*@param {EMap.LngLat} lnglat 传入经纬度
	*@return {Number} 返回地面距离，单位为米
	*/
	this.distance=function(lnglat){
		return 0;
	}
	/**
	*@method getLng  获得经度值
	*@return {Number} 返回经度值
	*/
	this.getLng=function(){
		return lng;
	}

	/**
	*@method getLat  获得纬度值
	*@return {Number} 返回纬度值
	*/
	this.getLat=function(){
		return lat;
	}

	/**
	*@method toString 对象以字符串的形式返回。
	*/
	this.toString=function(){
		return lng+","+lat;
	}
}
//转换坐标到经纬度
EMap.LngLat.parseToLngLat=function(coordinate){
		var lngLats=ol.proj.transform(coordinate,EMap.currentMap.mapOptions.projection,'EPSG:4326');
		return new EMap.LngLat(lngLats[0],lngLats[1]);
}
//转换经纬度到坐标
EMap.LngLat.transToCoordinate=function (lngLat){
		return  ol.proj.transform(lngLat,'EPSG:4326',EMap.currentMap.mapOptions.projection);
}

//批量转换经纬度到坐标
EMap.LngLat.parseToCoordinates=function(points){
		var coordinates=[];
		for(var i=0;i<points.length;i++){
			var point=points[i];
			coordinates.push(point.coordinate());
		}
		return coordinates;
}

//批量转换坐标到经纬度
EMap.LngLat.parseToLngLats=function(coordinates){
		var lngLatList=[];
		coordinates.forEach(function(element,index,array){
			var lngLat=EMap.LngLat.parseToLngLat(element);
			lngLatList.push(lngLat);
		},this);
	   return lngLatList;
}

