/**
 * 画线
 * @authors Your Name (you@example.org)
 * @date    2015-03-04 20:57:30
 * @version $Id$
 */
EMap.DrawPolyLine=function(drawOptions){
	 this.options={
              color:drawOptions.color||"#ffcc33",
              opacity:drawOptions.opacity||0.6
          };
   EMap.Tool.extend(this.options,drawOptions);
  this.options.color=EMap.Tool.colorRgb(this.options.color);
  this.options.color.push(this.options.opacity);


   var drawVector=this.options.map.drawVector;
   var callback=null;

   var style= new ol.style.Style({
              fill: new ol.style.Fill({
                color: "#F704B3"
              }),
              stroke: new ol.style.Stroke({
                color: this.options.color,
                width: 3
              }),
              image: new ol.style.Circle({
                radius: 5,
                fill: new ol.style.Fill({
                  color: '#46560F'
                }),
                stroke: new ol.style.Stroke({
                  color: 'rgba(0, 0, 0, 0.7)'
                })
              })
     });
    var  draw = new ol.interaction.Draw({
        source: drawVector.getSource(),
        type:'LineString',
        style:style
      });

    var feature=null;
    var boxHtml='<div class="draw-info" style="position: relative; cursor: pointer; z-index: 500;"></div>';
    var msg="";

    var msgTooltipOverlay=null;
    draw.on('drawstart',function(event) {
        clearFeature();
        if(msgTooltipOverlay==null){
          msg=EMap.Tool.parseDom(boxHtml);
          msgTooltipOverlay = new ol.Overlay({
                element: msg,
                offset: [0, -15],
                positioning: 'bottom-center'
              });
          this.options.map.olmap_.addOverlay(msgTooltipOverlay);
        }
        feature = event.feature;
      }, this);
    draw.on('drawend',function(evt) {
        if(callback!=null){
            var geom = evt.feature.getGeometry();
            var coordinates=geom.getCoordinates();
            var lngLats=EMap.LngLat.parseToLngLats(coordinates);
            callback(lngLats,getLength());
        }
      }, this);
    //开始画
    this.draw=function(callbacktemp){
       this.options.map.olmap_.removeInteraction(draw)
       this.options.map.olmap_.addInteraction(draw);
       callback=callbacktemp||null;
       this.options.map.olmap_.on('pointermove', pointerMoveHandler);
     }
     //清空已画数据
   var clearFeature=function(){
      if(feature!=null){
        drawVector.getSource().removeFeature(feature);
        this.options.map.olmap_.removeOverlay(msgTooltipOverlay);
        msgTooltipOverlay=null;
        feature=null;
      }
    }
    //清空画笔
    this.clear=function(){
      this.options.map.olmap_.un('pointermove', pointerMoveHandler,this);
      this.options.map.olmap_.removeInteraction(draw)
       if(feature!=null){
          drawVector.getSource().removeFeature(feature);
          this.options.map.olmap_.removeOverlay(msgTooltipOverlay);
          msgTooltipOverlay=null;
          feature=null;
       }
    }
    var pointerMoveHandler = function(event) {
              if (event.dragging) {
                return;
              }
              var tooltipCoord = event.coordinate;
              if (feature) {
                var geom =feature.getGeometry();
                if (geom instanceof ol.geom.LineString) {
                  msg=getLength();
                  if (msg > 1000) {
                    msg= (Math.round(msg/1000*100)/100)+' km';
                  } else {
                    msg= msg+' m';
                  }
                  tooltipCoord = geom.getLastCoordinate();
                }
                msgTooltipOverlay.getElement().innerHTML=msg;
                msgTooltipOverlay.setPosition(tooltipCoord);
              }
       };
    
    //获得长度
  var getLength=function() {
        var length=0;
        var wgs84Sphere = new ol.Sphere(6378137);
        var coordinates = feature.getGeometry().getCoordinates();

        var sourceProj = this.options.map.olmap_.getView().getProjection();
        for (var i = 0, ii = coordinates.length - 1; i < ii; ++i) {
          var c1 = ol.proj.transform(coordinates[i], sourceProj, 'EPSG:4326');
          var c2 = ol.proj.transform(coordinates[i + 1], sourceProj, 'EPSG:4326');
          length += wgs84Sphere.haversineDistance(c1, c2);
        }
        
        length=Math.round(length * 100) / 100;
        return length;
      };

}

