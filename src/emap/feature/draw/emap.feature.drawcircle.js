/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-06-01 18:12:04
 * @version $Id$
 */

/**
 * 画多边形
 * @authors Your Name (you@example.org)
 * @date    2015-03-25 13:43:14
 * @version $Id$
 */
EMap.DrawCircle=function(drawOptions){
	  this.options={
              color:drawOptions.color||"#ffcc33",
              opacity:drawOptions.opacity||0.6,
              fillColor:drawOptions.color||"#ffcc33",
          };
   EMap.Tool.extend(this.options,drawOptions);
  this.options.fillColor=EMap.Tool.colorRgb(this.options.color);
  this.options.fillColor.push(this.options.opacity);


   var drawVector=this.options.map.drawVector;
   var callback=null;

   var style= new ol.style.Style({
              fill: new ol.style.Fill({
                color: this.options.fillColor
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
        type:'Circle',
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
        	var feature=evt.feature;
        	var geometry=feature.getGeometry();

        	var coordinate=geometry.getCenter();
			var position=EMap.LngLat.parseToLngLat(coordinate);

            callback(position,geometry.getRadius());
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
                var geometry =feature.getGeometry();
                if (geometry instanceof ol.geom.Circle) {
                   msg="半径:"+geometry.getRadius();
                  tooltipCoord = geometry.getLastCoordinate();
                }
                msgTooltipOverlay.getElement().innerHTML=msg;
                msgTooltipOverlay.setPosition(tooltipCoord);
              }
       };
    
    //获得长度
  var getArea=function() {
        var area=0;
        var wgs84Sphere = new ol.Sphere(6378137);
        
        var sourceProj = this.options.map.olmap_.getView().getProjection();

        var geom =feature.getGeometry().clone().transform(sourceProj, 'EPSG:4326');
        var coordinates = geom.getLinearRing(0).getCoordinates();
         area = Math.abs(wgs84Sphere.geodesicArea(coordinates));

        area=Math.round(area * 100) / 100;
        return area;
      };
}
