/**
 * 拉框查询
 * @authors Your Name (you@example.org)
 * @date    2015-03-04 20:57:30
 * @version $Id$
 */
Emap.DrawPolyLine=function(drawOptions){
	 this.options={
              info:false//跟随显示的消息
          };
    this.options=Emap.util.extend(drawOptions,this.options);
    this.callback=null;
    this.path=[];
    this.currentFeature=null;

    this.pointer = new ol.interaction.Draw({
        source: Emap.currentMap.drawVector.getSource(),
        type: "LineString",
        style: new ol.style.Style({
          fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 0.2)'
          }),
          stroke: new ol.style.Stroke({
            color: '#F704B3',
            lineDash: [10, 10],
            width: 3
          })
        })
      });

   this.pointer.on('drawstart',function(evt) {
      this.clearFeature();
       this.currentFeature=evt.feature;    
       if(this.options.info){//判断是否显示信息
        Emap.currentMap.on('pointermove', pointerMoveHandler,this);
      Emap.currentMap.addOverlay(this.infoOverlay); 
       }
  }, this);

   this.pointer.on('drawend',function(evt) {
      var geom = evt.feature.getGeometry();
      var coordinates=geom.getCoordinates();
        var lngLats=Emap.LngLat.parseToLngLats(coordinates);
        if(this.callback!=null){
          this.callback(lngLats,geom.getLength());
        }
      }, this);
   
   var element = document.createElement('div');
    element.className = 'draw-info';
  this.infoOverlay = new ol.Overlay({
        element: element,
        offset: [0, -15],
        positioning: 'bottom-center'
      });
  

   var pointerMoveHandler=function(evt) {
      if (this.currentFeature) {
          
          var geom = this.currentFeature.getGeometry();
          var position = geom.getLastCoordinate();
          
          this.infoOverlay.getElement().innerHTML=formatLength(geom);
          this.infoOverlay.setPosition(position);
      }
  };
    //画框
    this.draw=function(callback){
        this.callback=callback==undefined?null:callback;
          this.clear();
        Emap.currentMap.addInteraction(this.pointer);
    }
    //清理
    this.clear=function(){
    if(this.currentFeature!=null){
          Emap.currentMap.drawVector.getSource().removeFeature(this.currentFeature);
          Emap.currentMap.removeOverlay(this.infoOverlay);
          this.currentFeature=null;
          this.path=[];
        }
        Emap.currentMap.removeInteraction(this.pointer);
    }
    this.clearFeature=function(){
      if(this.currentFeature!=null){
        Emap.currentMap.drawVector.getSource().removeFeature(this.currentFeature);
        Emap.currentMap.removeOverlay(this.infoOverlay);
        Emap.currentMap.un('pointermove', pointerMoveHandler,this);
        this.currentFeature=null;
          this.path=[];
      }
    }
    var formatLength = function(line) {
        var length = Math.round(line.getLength() * 100) / 100;
        var output;
        if (length > 100) {
          output = (Math.round(length / 1000 * 100) / 100) +
              ' ' +"km";
        } else {
          output = (Math.round(length * 100) / 100) +
              ' ' + "m";
        }
        return output;
      };
}
