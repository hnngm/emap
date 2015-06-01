/**
 * 画矩形
 * @authors Your Name (you@example.org)
 * @date    2015-03-04 20:57:30
 * @version $Id$
 */
EMap.DrawRect=function(drawOptions){
	  this.options={
              color:drawOptions.color||"#ffcc33",
              opacity:drawOptions.opacity||0.6,
              fillColor:drawOptions.color||"#ffcc33",
              labelStatus:drawOptions.labelStatus||false//为false不显示label，为true显示label
          };
   EMap.Tool.extend(this.options,drawOptions);

   var colortemp=EMap.Tool.colorRgb(this.options.color);
       colortemp.push(this.options.opacity);

   var drawVector=this.options.map.drawVector;
   var callback=null;
   var rectPath=[];
   var msg="0 ㎡";
   var rectFeature=null;
   var style= new ol.style.Style({
              fill: new ol.style.Fill({
                color: colortemp
              }),
              stroke: new ol.style.Stroke({
                color: this.options.color,
                width: 3
              })
     });

   if(this.options.labelStatus){
      style["text"]=new ol.style.Text({
          textAlign: "normal",
          textBaseline: "bottom",
          font:"bold 10px Arial",
          text: msg,
          fill: new ol.style.Fill({color: this.options.labelColor}),
          stroke: new ol.style.Stroke({color: "#33FFCC", width: 2}),
          rotation: 0
        })      
    }
    var  draw = new ol.interaction.DragBox({
                source: EMap.Map.currentMap.drawVector.getSource(),
                style: style
              });

    draw.on('boxstart',function(event) {
        clearFeature();
        var position = EMap.LngLat.parseToLngLat(event.coordinate);
        rectPath[0]=position;
      }, this);
    draw.on('boxend',function(evt) {
       var position = EMap.LngLat.parseToLngLat(evt.coordinate);
        rectPath[2]=position;

        rectPath[1]=new EMap.LngLat(rectPath[0].getLng(),rectPath[2].getLat());
        rectPath[3]=new EMap.LngLat(rectPath[2].getLng(),rectPath[0].getLat());
        

        msg=getArea();
          if (msg > 10000) {
            msg= (Math.round(msg/1000000*100)/100)+' km<sup>2</sup>';
          } else {
            msg= msg+' ㎡';
          }

        var rectOption={
              map:EMap.Map.currentMap,
              path:rectPath,
              opacity:this.options.opacity,
              borderColor:this.options.color,
              fillColor:this.options.fillColor,
              labelColor:"blue"
          }
          if(this.options.labelStatus){
            rectOption["label"]=msg;
          }
       rectFeature=new EMap.Polygon(rectOption);

        if(callback!=null){
            callback(rectPath,getArea());
        }
      }, this);
    //开始画
    this.draw=function(callbacktemp){
       this.options.map.olmap_.removeInteraction(draw)
       this.options.map.olmap_.addInteraction(draw);
       callback=callbacktemp||null;
     }
     //清空已画数据
   var clearFeature=function(){
      if(rectFeature!=null){
        rectFeature.remove();
        rectFeature=null;
      }
    }
    //清空画笔
    this.clear=function(){
      this.options.map.olmap_.removeInteraction(draw)
      if(rectFeature!=null){
        rectFeature.remove();
      }
    }
    
    //获得长度
  var getArea=function() {
        /*var area=0;
        var wgs84Sphere = new ol.Sphere(6378137);
        var coordinates=[];
         for (var i = 0; i < rectPath.length; i++) {
           var item=rectPath[i].coordinate();
           coordinates.push(item);
         }
        
        var sourceProj = this.options.map.olmap_.getView().getProjection();
        var polygon=new ol.geom.Polygon(coordinates,'xy');

        var geom =polygon.transform(sourceProj, 'EPSG:4326');
        var coordinatesTemp = geom.getLinearRing(0).getCoordinates();*/
        //area = Math.abs(wgs84Sphere.geodesicArea(coordinatesTemp));


        //area=Math.round(area * 100) / 100;
        return 0;
      };
}



