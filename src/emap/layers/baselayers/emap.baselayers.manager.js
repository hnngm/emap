/**
 * 底图图层管理
 * @authors Your Name (you@example.org)
 * @date    2014-12-07 14:45:37
 * @version $Id$
 */
EMap.BaseLayer.Manager=function(){
	    var mapOptions=EMap.currentMap.mapOptions;
	    var baseLayers=[];
	    //创建地图基本图层
	    if(mapOptions.mapType=="amap"){
	    		mapOptions.projection="EPSG:3857";

	    		var amapPlaneTile=new EMap.BaseLayer.AmapPlaneTile();
	    			amapPlaneTile.setBaseLayerName(mapOptions.mapType+".plane");
	    			amapPlaneTile.setGroupName("plane");
	    		var amapSatelliteTile= new EMap.BaseLayer.AmapSatelliteTile({visible:false});
	    			amapSatelliteTile.setBaseLayerName(mapOptions.mapType+".satellite");
	    			amapSatelliteTile.setGroupName("satellite");
	    		var amapAddressTile=new EMap.BaseLayer.AmapAddressTile({visible:false});
	    			amapAddressTile.setGroupName("satellite");
	    		baseLayers.push(amapPlaneTile);
				baseLayers.push(amapSatelliteTile);
				baseLayers.push(amapAddressTile);
	     }
	     else if(mapOptions.mapType=="amapgoogle"){
				mapOptions.projection="EPSG:3857";
				
	    		var amapPlaneTile=new EMap.BaseLayer.AmapPlaneTile();
	    			amapPlaneTile.setBaseLayerName(mapOptions.mapType+".plane");
	    			amapPlaneTile.setGroupName("plane");
	    		var googleSatelliteTile=new EMap.BaseLayer.GoogleSatelliteTile({visible:false});
	    			googleSatelliteTile.setBaseLayerName(mapOptions.mapType+".satellite");
	    			googleSatelliteTile.setGroupName("satellite");
	    		var googleAddressTile=new EMap.BaseLayer.GoogleAddressTile({visible:false});
	    			googleAddressTile.setGroupName("satellite");	
	    		baseLayers.push(amapPlaneTile);
				baseLayers.push(googleSatelliteTile);
				baseLayers.push(googleAddressTile);
	     	}
	    
	    //获得基本图层
	    this.getBaseLayers=function(){
	    	return baseLayers;
	    }
	   /* //设置基本图层
	    this.setBaseLayers=function(laryers){
	    	baseLayers.clear();
	    	for (var i = 0; i < laryers.length; i++) {
	    		var layer=laryers[i]
	    		baseLayers.push(layer);
	    	};
	    }*/
	   
	    //根据基本图层标识找图层
	    this.findBaseLayerByMapType=function(groupType){
	    	var layer=null;
	    	baseLayers.forEach(function(baseLayer){
	    		if(baseLayer.baseLayerName!=undefined){
	    			var baseLayerName=baseLayer.getBaseLayerName();
	    			if(baseLayerName==mapOptions.mapType+"."+groupType){
	    				layer=baseLayer;
	    				return false;
	    			}
	    		}
	    	});
	    	return layer;
	    }
	    //通过tag设置是否显示图层
	    this.setVisibleByMapType=function(groupName,visible){
	    	mapOptions.baseLayers.forEach(function(baseLayer){
	    		if(baseLayer.groupName!=undefined){
	    			var groupNameTemp=baseLayer.getGroupName();
	    			if(groupNameTemp!=undefined&&groupNameTemp.indexOf(groupName)!=-1){
	    				baseLayer.setVisible(visible);
	    			}
	    		}
	    	});
	    }
}
