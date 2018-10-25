import React,{Component,Fragment} from 'react';
import {
  Row,
  Col,
  Timeline,
  Button,
  Layout,
  Input,
} from 'antd';
import {observer} from 'mobx-react';
import GooglePlaceInput from './GooglePlaceInput';
import GooglePlaceCard from './GooglePlaceCard';
import RouteLegInfo from './RouteLegInfo';
const TimelineDetail=Timeline.Item;

@observer(['store'])
export default class PlaceLine extends Component{
  render(){
    const {
      store:{
        data,
        fData,
        unshiftData,
        addPlaceInput,
        legs,
      }
    }=this.props;
    return (
      <Timeline
        style={{marginTop:10,marginLeft:10}}
      >
        {do{
          if(data[0].place_id){
            <TimelineDetail
              dot={
                <Button
                  type="primary"
                  icon="plus"
                  shape="circle"
                  size="small"
                  onClick={unshiftData}
                />
              }
            />
          }
        }}
        {
          data.map((e,i)=>{
            const {
              place_id
            }=e;
            return (
              <Fragment key={i}>
                <TimelineDetail>
                  {do{
                    if(place_id){
                      <GooglePlaceCard
                        data={e}
                      />
                    }else{
                      <GooglePlaceInput
                        data={e}
                      />
                    }
                  }}
                </TimelineDetail>
                {do{
                  if(
                    (place_id&&legs[i])
                  ){
                    <TimelineDetail
                      color="red"
                    >
                      <RouteLegInfo
                        leg={legs[i]}
                      />
                    </TimelineDetail>
                  }else if(
                    (data[i-1]&&!data[i-1].place_id&&legs[i-1])
                  ){
                    <TimelineDetail>
                      <RouteLegInfo
                        leg={legs[i-1]}
                      />
                    </TimelineDetail>
                  }
                }}
                {do{
                  if(
                    place_id&&
                    (
                      (!data[i+1])||
                      (data[i+1]&&data[i+1].place_id)
                    )
                  ){
                    <TimelineDetail
                      dot={
                        <Button
                          type="primary"
                          icon="plus"
                          shape="circle"
                          size="small"
                          onClick={e=>addPlaceInput(i)}
                        />
                      }
                    />
                  }
                }}
              </Fragment>
            )
          })
        }

      </Timeline>
    )
  }
}
