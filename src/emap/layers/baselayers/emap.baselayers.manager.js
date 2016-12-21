/**
 * 底图图层管理
 * @authors Your Name (you@example.org)
 * @date    2014-12-07 14:45:37
 * @version $Id$
 */
EMap.BaseLayer.Manager=function(){
	    var mapOptions=EMap.Map.currentMap.mapOptions;
	    var baseLayers=[];
	    //创建地图基本图层
	    if(mapOptions.mapType=="amap"){
	    		mapOptions.projection="EPSG:3857";
	    		var planeTileOptions={
					url:"http://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}",
				}
	            var amapPlaneTile=new EMap.BaseLayer.PlaneTile(planeTileOptions);

	    		
	    		var satelliteTileOptions={
	    			visible:false,
					url:"http://webst04.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
				}
				var amapSatelliteTile= new EMap.BaseLayer.SatelliteTile(satelliteTileOptions);
	    		
				var satelliteTileOptions={
	    			visible:false,
					url:"http://webst01.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}",
				}
				var amapAddressTile= new EMap.BaseLayer.SatelliteTile(satelliteTileOptions);
	    		
	    		baseLayers.push(amapPlaneTile);
				baseLayers.push(amapSatelliteTile);
				baseLayers.push(amapAddressTile);
			  
			  
	    			
	     }
	     else if(mapOptions.mapType=="amapgoogle"){
				mapOptions.projection="EPSG:3857";
				
				var planeTileOptions={
					url:"http://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}",
				}
	            var amapPlaneTile=new EMap.BaseLayer.PlaneTile(planeTileOptions);
	    		
	    		var satelliteTileOptions={
	    			visible:false,
					url:"http://www.google.cn/maps/vt?lyrs=s@169&gl=cn&x={x}&y={y}&z={z}",
				}
				var googleSatelliteTile= new EMap.BaseLayer.SatelliteTile(satelliteTileOptions);
	    		
				var satelliteTileOptions={
	    			visible:false,
					url:"http://mt1.google.cn/maps/vt?lyrs=s@192&hl=zh&gl=CN&x={x}&y={y}&z={z}&token=86094",
				}
				var googleAddressTile= new EMap.BaseLayer.SatelliteTile(satelliteTileOptions);

	    		baseLayers.push(amapPlaneTile);
				baseLayers.push(googleSatelliteTile);
				baseLayers.push(googleAddressTile);
				
	     }else if(mapOptions.mapType=="google"){
				mapOptions.projection="EPSG:3857";
				
				var planeTileOptions={
					url:"http://mt{0-3}.google.cn/vt/lyrs=m@142&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=Galil",
				}
	            var amapPlaneTile=new EMap.BaseLayer.PlaneTile(planeTileOptions);
	    		
	    		var satelliteTileOptions={
	    			visible:false,
					url:"http://www.google.cn/maps/vt?lyrs=s@169&gl=cn&x={x}&y={y}&z={z}",
				}
				var googleSatelliteTile= new EMap.BaseLayer.SatelliteTile(satelliteTileOptions);
	    		
				var satelliteTileOptions={
	    			visible:false,
					url:"http://mt1.google.cn/maps/vt?lyrs=s@192&hl=zh&gl=CN&x={x}&y={y}&z={z}&token=86094",
				}
				var googleAddressTile= new EMap.BaseLayer.SatelliteTile(satelliteTileOptions);
					
	    		baseLayers.push(amapPlaneTile);
				baseLayers.push(googleSatelliteTile);
				baseLayers.push(googleAddressTile);
				
	   }else if(mapOptions.mapType=="tianditu"){
				mapOptions.projection="EPSG:3857";
				
				var tiandituWMTSPlaneWMTSTileOption={
					projection:mapOptions.projection,
					url:"http://t0.tianditu.com/vec_w/wmts",
					layer:"vec",
					matrixSet: 'w',
	                format: 'tiles'
				}
	            var tiandituPlaneTile=new EMap.BaseLayer.PlaneWMTSTile(tiandituWMTSPlaneWMTSTileOption);

	            var tiandituAddresswPlaneMTSTile={
					projection:mapOptions.projection,
					url: 'http://t0.tianditu.com/cva_w/wmts',
                    layer: 'cva',
                    matrixSet: 'w',
                    format: 'tiles'
				}
	            var tiandituAddressPlaneWMTSTile=new EMap.BaseLayer.PlaneWMTSTile(tiandituAddresswPlaneMTSTile);

	            var tiandituSatelliteWMTSTileOption={
					projection:mapOptions.projection,
					visible:false,
					url: 'http://t0.tianditu.com/img_w/wmts',
                    layer: 'img',
                    matrixSet: 'w',
                    format: 'tiles'
				}
	            var tiandituSatelliteMTSTile=new EMap.BaseLayer.SatelliteWMTSTile(tiandituSatelliteWMTSTileOption);

	            var tiandituAddresswSatelliteMTSTile={
					projection:mapOptions.projection,
					visible:false,
					url: 'http://t0.tianditu.com/cia_w/wmts',
                    layer: 'cia',
                    matrixSet: 'w',
                    format: 'tiles'
				}
	            var tiandituAddressSatelliteMTSTile=new EMap.BaseLayer.SatelliteWMTSTile(tiandituAddresswSatelliteMTSTile);
	    		
	    		baseLayers.push(tiandituPlaneTile);
				baseLayers.push(tiandituAddressPlaneWMTSTile);
				baseLayers.push(tiandituSatelliteMTSTile);
				baseLayers.push(tiandituAddressSatelliteMTSTile);
				
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
