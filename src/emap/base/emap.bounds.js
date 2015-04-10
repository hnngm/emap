/**
 *	#Emap.Bounds
 *		矩形范围构造函数，参数sw、ne分别代表地物对象西南角经纬度和东北角经纬度值。
 *	@class Emap.Bounds
 *	@author hnngm@163.com
 *	@extends Emap
 *
 * 	示例:
 *
 *     @example
 *			var sw=new Emap.LngLat(1,2);
 *			var ne=new Emap.LngLat(3,4);
 *			var bounds=new Emap.Bounds(sw,ne);
 *	  	
 */
/** 
 * 	@method constructor  构造一个地理坐标对象
 *	@param {Number} [sw] 西南角经纬度
 *	@param {Number} [ne] 东北角经纬度
*/
Emap.Bounds=function(sw,ne){
	var sw=sw;
	var ne=ne;

	/**
	*@method contains 指定点坐标是否在矩形范围内。
	*@param {Emap.LngLat} [point] 西南角经纬度。
	*@return {Boolean} 返回true表示在范围内，false不在范围内。
	*/
	this.getCenter=function(point){
		return sw;
	}

	/**
	*@method getCenter  获取当前Bounds的中心点经纬度坐标。
	*@return {Emap.LngLat} 返回经度值
	*/
	this.getCenter=function(){
		return sw;
	}

	/**
	*@method getLng  获得西南角经纬度
	*@return {Number} 返回经度值
	*/
	this.getSw=function(){
		return sw;
	}

	/**
	*@method getLat  获得东北角经纬度
	*@return {Number} 返回纬度值
	*/
	this.getNe=function(){
		return ne;
	}

	/**
	*@method toString 对象以字符串的形式返回。
	*/
	this.toString=function(){
		return sw.getLng()+","+sw.getLat()+","+ne.getLng()+","+ne.getLat();
	}
}