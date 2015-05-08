/**
 *	#EMap.Tool
 *		矩形范围构造函数，参数sw、ne分别代表地物对象西南角经纬度和东北角经纬度值。
 *	@class EMap.Tool
 *	@author hnngm@163.com
 *	@extends EMap			
 *	  	
 */
EMap.Tool={

	/**
	*@method extend 将两个对象合并成一个对象，并返回合并后的对象。
	*@param {Object} [des] 目标对象。
	*@param {Object} [src] 源对象。
	*@param {Boolean} [override] 是否重写。
	*@return {Object} 返回合并后的对象。
	*/
	extend:function(des, src, override){
		if(des==undefined){
			return src;
		}
	    if(src instanceof Array){
	        for(var i = 0, len = src.length; i < len; i++)
	             extend(des, src[i], override);
	    }
	    for( var i in src){
	        if(override || !(i in des)){
	            des[i] = src[i];
	        }
	    } 
	    return des;
	},
	/**
	*转换dom
	*/
	parseDom:function(html){
		 var elementTemp = document.createElement("div");
　　 		elementTemp.innerHTML = html;
		var childNodes=elementTemp.childNodes;
		if(childNodes.length==1){
			return childNodes[0];
		}else{
			return childNodes;
		}
	}
}