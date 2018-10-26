import React,{Component,Fragment} from 'react';
import {
  Spin,
} from 'antd';
import {observer} from 'mobx-react';

@observer(['store'])
export default class SpinImg extends Component{
  loadImg=()=>{
    this.props.store.loadImg(this.props.data);
  }
  render(){
    const {
      data,
    }=this.props;
    return (
      <Spin
        spinning={!data.loading}

      >
        <img
          width={250}
          height={140}
          style={{background:`black`}}
          src={data.getUrl()}
          onLoad={this.loadImg}
        />
      </Spin>
    )
  }
}
