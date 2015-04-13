/**
 * 基类
 * @authors Your Name (you@example.org)
 * @date    2015-01-26 16:52:38
 * @version $Id$
 */
EMap.BaseLayer.Tile=function(option){
  this.maxZoom=this.maxZoom||18;
  this.minZomm=this.minZomm||1;
  this.name="";
  this.groupName="";
  this.baseLayerName="";
 
  var tileOption=EMap.Tool.extend({},option);
  //调用超类
  ol.layer.Tile.call(this,tileOption);


  this.setMaxZoom=function(maxZoom){
  	this.maxZoom=maxZoom;
  }
  this.setMinZomm=function(minZomm){
  	this.minZomm=minZomm;
  }
  //设置组名
  this.setGroupName=function(groupName){
  	this.groupName=groupName;
  }
  //获得组名
  this.getGroupName=function(){
  	return this.groupName;
  }
  //设置名称
  this.setName=function(name){
  	this.name=name;
  }
  //获得名称
  this.getName=function(){
  	return this.name=name;
  }
  this.setBaseLayerName=function(baseLayerName){
  	this.baseLayerName=baseLayerName;
  }
  this.getBaseLayerName=function(){
  	return this.baseLayerName;
  }
}
ol.inherits(EMap.BaseLayer.Tile,ol.layer.Tile);
