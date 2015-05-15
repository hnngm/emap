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
	},
	colorRgb: function(colorHex){
		var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
	    var sColor = colorHex.toLowerCase();
	    if(sColor && reg.test(sColor)){
	        if(sColor.length === 4){
	            var sColorNew = "#";
	                for(var i=1; i<4; i+=1){
	                    sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));        
	                }
	                sColor = sColorNew;
	        }
	        //处理六位的颜色值
	        var sColorChange = [];
	        for(var i=1; i<7; i+=2){
	            sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));        
	        }
	        return sColorChange;
	    }else{
	        return sColor;        
	    }
	},
	distance:function(lng1,lat1,lng2,lat2){
		var EARTH_RADIUS  = 6378137.0  
		function getRad(d){
	        return d*Math.PI/180.0;
	    }
        var f = getRad((lat1 + lat2)/2);
        var g = getRad((lat1 - lat2)/2);
        var l = getRad((lng1 - lng2)/2);
        
        var sg = Math.sin(g);
        var sl = Math.sin(l);
        var sf = Math.sin(f);
        
        var s,c,w,r,d,h1,h2;
        var a = EARTH_RADIUS;
        var fl = 1/298.257;
        
        sg = sg*sg;
        sl = sl*sl;
        sf = sf*sf;
        
        s = sg*(1-sl) + (1-sf)*sl;
        c = (1-sg)*(1-sl) + sf*sl;
        
        w = Math.atan(Math.sqrt(s/c));
        if(w==0){
        	return 0;
        }
        r = Math.sqrt(s*c)/w;
        d = 2*w*a;
        h1 = (3*r -1)/2/c;
        h2 = (3*r +1)/2/s;
        
        return d*(1 + fl*(h1*sf*(1-sg) - h2*(1-sf)*sg));
    }
}