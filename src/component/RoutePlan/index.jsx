import React,{Component,Fragment} from 'react';
import {
  Row,
  Col,
  Timeline,
  Button,
  Input,
  Layout,
  Spin,
} from 'antd';

import Store from '../Store';
import {loadAll} from '../tool';
import {observer,Provider} from 'mobx-react';
import PlaceLine from './PlaceLine';

const store=new Store();
const { Header, Content, Sider } = Layout;
const TimelineDetail=Timeline.Item;


@observer
export default class RoutePlan extends Component{
  container=React.createRef();//容器

  async componentDidMount(){
    await loadAll();
    const {
      google,
      MarkerClusterer
    }=window;
    store.map=new window.google.maps.Map(
      this.container.current,
      {
        zoom: 4,
        center:{
          lat: -25.344, lng: 131.036
        },
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.TOP_CENTER
        },
      }
    )
  }
  render(){
    const height=`100%`;
    const width=`100%`;
    console.log(`render`);
    return (
      <Provider
        store={store}
      >
        <Fragment>
          <style>
            {
            `
              .ant-spin-nested-loading,.ant-spin-container{
                height:100%
              }
            `
            }
          </style>
          <Spin
            spinning={store.spinning}
            tip={store.tip}
            style={{height,width}}
          >
            <div
              ref={this.container}
              style={{height,width}}
            >

            </div>
            <div style={{display:`none`}} id="infowindow-content">
              <img id="place-icon" src="" height="16" width="16"/>
              <span id="place-name"  class="title"></span><br/>
              Place ID <span id="place-id"></span><br/>
              <span id="place-address"></span>
            </div>
            <PlaceLine store={store}/>
          </Spin>
        </Fragment>
      </Provider>
    )
  }
}
