import React,{Component,Fragment} from 'react';
import {
  Row,
  Col,
  Timeline,
  Button,
  Layout,
  Input,
  Modal,
  Popover,
  Card,
} from 'antd';
import {observer} from 'mobx-react';

@observer(['store'])
export default class PlaceLine extends Component{
  render(){
    const {
      leg:{
        distance,
        duration,
      }
    }=this.props;
    return (
      <Card style={{width:250}}>
        <p>{distance.text}</p>
        <p>{duration.text}</p>
      </Card>
    )
  }
}
