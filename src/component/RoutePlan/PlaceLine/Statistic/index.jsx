import React,{Component,Fragment} from 'react';
import {
  Row,
  Col,
  Timeline,
  Button,
  Layout,
  Input,
  Divider ,
  Card ,
} from 'antd';
import {observer} from 'mobx-react';
import TrafficMode from './TrafficMode';
import styled from 'styled-components';
import {SpanLH32} from  '../../../styled'
const NumberRow=styled(Row)`
  font-size: 20px;
  text-overflow: ellipsis;
  overflow: hidden;
  color:${props=>props.color}
`;
const UnitRow=styled(Row)`
  font-size: 15px;
  color:${props=>props.color}
`

const gridStyle = {
  width: '33.33%',
  textAlign: 'center',
};

const PlaceNumber=observer((props)=><span title={props.store.totalPlace}>{props.store.totalPlace}</span>)
const DistanceNumber=observer((props)=><span title={props.store.totalDistance}>{props.store.totalDistance}</span>)
const TimeNumber=observer((props)=><span title={props.store.totalTime}>{props.store.totalTime}</span>)

@observer(['store'])
export default class Statistic extends Component{
  render(){
    const {
      store
    }=this.props;
    return (
      <Card title={
        <Row>
          <Col span={17}>
            <SpanLH32>
              计算结果
            </SpanLH32>
          </Col>
          <Col span={7}>
            <TrafficMode/>
          </Col>
        </Row>
      }>
        <Card.Grid style={gridStyle}>
          <NumberRow color="red">
            <PlaceNumber store={store}/>
          </NumberRow>
          <UnitRow>地点</UnitRow>
        </Card.Grid>
        <Card.Grid style={gridStyle}>
          <NumberRow color="green">
            <DistanceNumber  store={store}/>
          </NumberRow>
          <UnitRow>公里</UnitRow>
        </Card.Grid>
        <Card.Grid style={gridStyle}>
          <NumberRow color="blue">
            <TimeNumber store={store}/>
          </NumberRow>
          <UnitRow>分钟</UnitRow>
        </Card.Grid>
      </Card>
    )
  }
}
