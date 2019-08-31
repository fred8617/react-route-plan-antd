import React,{Component,Fragment} from 'react';
import {observer,inject} from 'mobx-react';
import {
  Drawer,
  Divider,
  Row,
  Col,
  Modal,
} from 'antd';
import {
  action
} from 'mobx';


@inject('store')
@observer
export default class EditingContent extends Component{
  @action onClose=()=>{
    this.props.store.editing=false;
  }
  render(){
    const {
      store:{
        editing,
        editingData,
      }
    }=this.props;
    return (
      <Drawer
        title="添加事项"
        placement="right"
        mask={false}
        onClose={this.onClose}
        visible={editing}
        width={400}
      >
        {do{
          if(editingData&&editingData.place&&editingData.place.photos){
            <Fragment>
              <Divider>
                景区照片
              </Divider>
              <Row gutter={5}>
                {
                  editingData.place.photos.map(
                    e=>
                      <Col style={{marginBottom:5}} span={12}>
                        <img
                          width={`100%`}
                          height={90}
                          src={e.getUrl()}
                        />
                      </Col>
                  )
                }
              </Row>
              <Divider>
                待办事项
              </Divider>
            </Fragment>

          }
        }}

      </Drawer>
    )
  }
}
