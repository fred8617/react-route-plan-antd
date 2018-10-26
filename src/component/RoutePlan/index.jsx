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
        streetViewControl:false,
      }
    )
    var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    var locations = [
        {lat: -31.563910, lng: 147.154312},
        {lat: -33.718234, lng: 150.363181},
        {lat: -33.727111, lng: 150.371124},
        {lat: -33.848588, lng: 151.209834},
        {lat: -33.851702, lng: 151.216968},
        {lat: -34.671264, lng: 150.863657},
        {lat: -35.304724, lng: 148.662905},
        {lat: -36.817685, lng: 175.699196},
        {lat: -36.828611, lng: 175.790222},
        {lat: -37.750000, lng: 145.116667},
        {lat: -37.759859, lng: 145.128708},
        {lat: -37.765015, lng: 145.133858},
        {lat: -37.770104, lng: 145.143299},
        {lat: -37.773700, lng: 145.145187},
        {lat: -37.774785, lng: 145.137978},
        {lat: -37.819616, lng: 144.968119},
        {lat: -38.330766, lng: 144.695692},
        {lat: -39.927193, lng: 175.053218},
        {lat: -41.330162, lng: 174.865694},
        {lat: -42.734358, lng: 147.439506},
        {lat: -42.734358, lng: 147.501315},
        {lat: -42.735258, lng: 147.438000},
        {lat: -43.999792, lng: 170.463352}
      ]
    var markers = locations.map(function(location, i) {
          return new google.maps.Marker({
            position: location,
            label: labels[i % labels.length],
            title:`aaa`
          });
        });
    var markerCluster = new window.MarkerClusterer(this.map, markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    var marker = new window.google.maps.Marker({position: {
      lat: -25.344, lng: 131.036
    }, map: this.map});
    this.setState({dirty:this.state.dirty++})
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
