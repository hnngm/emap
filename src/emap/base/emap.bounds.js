/**
 *	#EMap.Bounds
 *		矩形范围构造函数，参数sw、ne分别代表地物对象西南角经纬度和东北角经纬度值。
 *	@class EMap.Bounds
 *	@author hnngm@163.com
 *	@extends EMap
 *
 * 	示例:
 *
 *     @example
 *			var sw=new EMap.LngLat(1,2);
 *			var ne=new EMap.LngLat(3,4);
 *			var bounds=new EMap.Bounds(sw,ne);
 *	  	
 */
/** 
 * 	@method constructor  构造一个地理坐标对象
 *	@param {Number} [sw] 西南角经纬度
 *	@param {Number} [ne] 东北角经纬度
*/
EMap.Bounds=function(southWest,northEast){
	var southWest=southWest;
	var northEast=northEast;

	this.coordinate=function(){
		return EMap.Extent.transToCoordinate([southWest.getLng(),southWest.getLat(),northEast.getLng(),northEast.getLat()]);
	};
	/**
	*@method contains 指定点坐标是否在矩形范围内。
	*@param {EMap.LngLat} [point] 西南角经纬度。
	*@return {Boolean} 返回true表示在范围内，false不在范围内。
	*/
	this.contains=function(point){
		return EMap.Extent.containsPoint(this,point);
	}

	/**
	*@method getCenter  获取当前Bounds的中心点经纬度坐标。
	*@return {EMap.LngLat} 返回经度值
	*/
	this.getCenter=function(){
		return EMap.LngLat.parseToLngLat(ol.extent.getCenter(this.coordinate()));
	}

	/**
	*@method getSouthWest  获得西南角经纬度
	*@return {Number} 返回经度值
	*/
	this.getSouthWest=function(){
		return southWest;
	}

	/**
	*@method getNorthEast  获得东北角经纬度
	*@return {Number} 返回纬度值
	*/
	this.getNorthEast=function(){
		return northEast;
	}

	/**
	*@method toString 对象以字符串的形式返回。
	*/
	this.toString=function(){
		return southWest.getLng()+","+southWest.getLat()+","+northEast.getLng()+","+northEast.getLat();
	}
}

EMap.Bounds.parseToCoordinates=function(bounds){
		return EMap.Extent.transToCoordinate([bounds.sw.lng,bounds.sw.lat,bounds.ne.lng,bounds.ne.lat]);
}

EMap.Bounds.parseToBounds=function(coordinate){
		var coordinates=EMap.Extent.transToLngLats(coordinate);
		var southWest=new EMap.LngLat(coordinates[0],coordinates[1]);
		var northEast=new EMap.LngLat(coordinates[2],coordinates[3]);
	  	var bounds=new EMap.Bounds(southWest,northEast);
	  return bounds;
}
