import React,{Component,Fragment} from 'react';
import {
  Row,
  Col,
  Timeline,
  Button,
  Layout,
  Input,
  Divider ,
  Affix,
  Badge,
} from 'antd';
import {observer} from 'mobx-react';
import styled from 'styled-components';
import GooglePlaceInput from './GooglePlaceInput';
import GooglePlaceCard from './GooglePlaceCard';
import RouteLegInfo from './RouteLegInfo';
import Statistic from './Statistic';
const TimelineDetail=Timeline.Item;
const TimelineContainer=styled.div`
  position: absolute;
  top: 64px;
  height: 90%;
  ${'' /* min-height: 140px; */}
  overflow: auto;
  width: 25%;
  background: white;
  box-shadow: 1px 2px 3px 4px aliceblue;
  min-width: 321px;
  border-radius: 4px;
  left: 20px;
`;
/*const containerStyle={//备用
  position: `absolute`,
  top: 64,
  height: `80%`,
  overflow: `auto`,
  width: `25%`,
  background: `white`,
  boxShadow: `1px 2px 3px 4px aliceblue`,
  minWidth: `321px`,
  borderRadius: `4px`,
  left: `20px`,
}*/

@observer(['store'])
export default class PlaceLine extends Component{
  affixRef;
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
      <TimelineContainer
        innerRef={x => {
          this.affixRef = x
        }}
      >
        <Affix offsetBottom={0} target={()=>this.affixRef}>
          <Statistic/>
        </Affix>
        <Timeline
          style={{marginLeft:10,marginTop:10}}
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
                  <TimelineDetail
                    dot={<Badge count={`ABCDEFGHIJKLMNOPQRSTUVWXYZ`.charAt(i)}/>}
                  >
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
                        color="green"
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

      </TimelineContainer>
    )
  }
}
