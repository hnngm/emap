/**
	#Emap.LngLat
		经纬度坐标，确定地图上的一个点。
	@class Emap.LngLat
	@author hnngm@163.com
	@extends Emap
	
 */
/**
	@method constructor  构造一个地理坐标对象
	@param {Number} [lng] 经度值
	@param {Number} [lat] 纬度值
*/
Emap.LngLat=function(lng,lat){
	var lng=lng;
	var lat=lat;


	/*this.coordinate=function(){
		return Emap.LngLat.transToCoordinate([this.lng,this.lat]);
	}*/

	/**
	*@method distance  当前经纬度和传入经纬度之间的地面距离，单位为米
	*@param {Emap.LngLat} lnglat 传入经纬度
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


