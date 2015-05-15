/**
 * 拉框查询
 * @authors Your Name (you@example.org)
 * @date    2015-03-04 20:57:30
 * @version $Id$
 */
Emap.DrawBox=function(){
	  this.callback=null;
	  this.rectPath=[];
    this.rect=null;

	  this.pointer = new ol.interaction.DragBox({
        source: Emap.currentMap.drawVector.getSource(),
        type: this.type,
        style: new ol.style.Style({
          fill: new ol.style.Fill({
            color: 'rgba(39, 179, 240, 0.7)'
          }),
          stroke: new ol.style.Stroke({
            color: '#F704B3',
            lineDash: [10, 10],
            width: 3
          })
        })
      });

   this.pointer.on('boxstart',function(evt) {
   		this.clearRect();
        var position = Emap.LngLat.parseToLngLat(evt.coordinate);
          this.rectPath[0]=position;
            
      }, this);

   this.pointer.on('boxend',function(evt) {
        var position = Emap.LngLat.parseToLngLat(evt.coordinate);
        this.rectPath[2]=position;

        this.rectPath[1]=new Emap.LngLat(this.rectPath[0].lng,this.rectPath[2].lat);
        this.rectPath[3]=new Emap.LngLat(this.rectPath[2].lng,this.rectPath[0].lat);
        
        var rectOption={
	          map:Emap.currentMap,
	          path:this.rectPath,
	          opacity:0.7,
	          color:"#C00000",
	          labelColor:"blue"
	      }
        this.rect=new Emap.Polygon(rectOption);
        if(this.callback!=null){
			this.callback(this.rectPath);
        }
      }, this);
    //画框
    this.draw=function(callback){
    		this.callback=callback==undefined?null:callback;
      	this.clear();
		    Emap.currentMap.addInteraction(this.pointer);
    }
    //清理
    this.clear=function(){
		    if(this.rect!=null){
          this.rect.remove();
          this.rect=null;
        }
        Emap.currentMap.removeInteraction(this.pointer);
	  }
	  this.clearRect=function(){
	  	if(this.rect!=null){
  			this.rect.remove();
  			this.rect=null;
		  }
	  }
}
