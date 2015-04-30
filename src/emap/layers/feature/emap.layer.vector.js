/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-04-27 15:34:12
 * @version $Id$
 */

EMap.Layer.FeatureVector=function(option){
  //调用超类
  ol.layer.Vector.call(this,{source: new ol.source.Vector(),style: new ol.style.Style({
          fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 0.2)'
          }),
          stroke: new ol.style.Stroke({
            color: '#F704B3',
            width: 3
          })
        })});
}
ol.inherits(EMap.Layer.FeatureVector,ol.layer.Vector);
