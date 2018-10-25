import {observable,computed,action,set} from 'mobx';
import {Input,Modal,message} from 'antd';
export default class Store {
  @observable data=[{place_id:''}];//时间节点
  @observable legs=[];//路线分支
  @observable spinning=false;//加载旋转
  @observable tip='';

  directionsService ;
  directionsDisplay ;
  placesService ;
  infowindow ;
  infowindowContent;
  map;

  //过滤不存在的地点
  @computed get fData(){
    return this.data.filter(e=>e.place_id);
  }
  beginSpin=(str='')=>{
    this.spinning=true;
    this.tip=str;
  }
  endSpin=()=>{
    this.spinning=false;
  }
  getIndex=(data)=>{//获取数据索引
    return this.data.indexOf(data);
  }
  getFIndex=(data)=>{//获取数据索引
    return this.fData.indexOf(data);
  }

  //计算顺序距离
  calculateAndDisplayRoute=(oriData,tarData,mode)=>{
    const oriIndex=this.getFIndex(oriData);
    const tarIndex=this.getFIndex(tarData);
    const startIndex=oriIndex+1;
    const endIndex=tarIndex-1;
    const waypts = [];
    for(let i=startIndex;i<=endIndex;i++){
      waypts.push({
        location: this.fData[i].place.formatted_address,
        stopover: true
      });
    }
    this.beginSpin("计算路线中")
    oriData.directionsService.route({
      origin:oriData.place.geometry.location,
      destination:tarData.place.geometry.location,
      waypoints: waypts,
      optimizeWaypoints: true,
      travelMode: 'DRIVING'
    },(response, status)=>{
       if (status === 'OK') {
         oriData.directionsDisplay.setDirections(response);
         const {legs} = response.routes[0];
         this.legs=legs;
       }else{
         message.error(`路线计算出错`);
       }
       action(()=>{
         this.endSpin();
       })()
    })
  }


  @action setDataPlace=(data,place,marker)=>{
    const {place_id}=place;
    const {
      google
    }=window;
    const directionsDisplay=new google.maps.DirectionsRenderer
    directionsDisplay.setMap(this.map);
    set(data,{
      place,
      place_id,
      marker,
      directionsDisplay,
      directionsService:new google.maps.DirectionsService,
    })
    if(this.fData.length>1){
      this.calculateAndDisplayRoute(this.fData[0],this.fData[this.fData.length-1]);
    }
  }
  @action unshiftData=()=>{
    this.data.unshift({place_id:``})
  }
  @action addPlaceInput=(index)=>{
    this.data.splice(index+1,null,{place_id:``})
  }
  @action deletePlace=(data)=>{
    this.data.remove(data);
    if(this.data.length===0){
      this.data=[{place_id:''}];
      this.legs=[];
    }
    if(this.fData.length>1){
      this.calculateAndDisplayRoute(this.fData[0],this.fData[this.fData.length-1]);
    }
  }
}
