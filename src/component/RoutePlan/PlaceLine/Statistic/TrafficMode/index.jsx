import React,{Component} from 'react';
import {observer,inject} from 'mobx-react';
import {
  Radio,
} from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;


@inject('store')
@observer
export default class TrafficMode extends Component{
  onChange=(e)=>{
    this.props.store.changeTrafficMode(e.target.value)
  }
  render(){
    return (
      <RadioGroup onChange={this.onChange} value={this.props.store.trafficMode}>
        <RadioButton value="DRIVING">
          <i className="iconfont icon-qiche"/>
        </RadioButton>
        <RadioButton value="BICYCLING">
          <i className="iconfont icon-cycleqiche"/>
        </RadioButton>
        <RadioButton value="WALKING">
          <i className="iconfont icon-buxing"/>
        </RadioButton>
      </RadioGroup>
    )
  }
}
