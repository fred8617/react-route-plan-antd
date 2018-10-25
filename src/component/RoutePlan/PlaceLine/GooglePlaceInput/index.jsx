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
  Card
} from 'antd';
import {observer} from 'mobx-react';
import {loadAll} from '../../../tool';
import './style.css';

@observer(['store'])
export default class GooglePalceInput extends Component{
  ref=React.createRef();
  async componentDidMount(){
    await loadAll()
    const {
      google,
    }=window
    const {
      store,
      store:{
        setDataPlace,
      },
      data,
    }=this.props;
    const input=this.ref.current.input;
    input.scrollIntoView();
    new google
    .maps
    .places
    .Autocomplete(input)
    .addListener('place_changed',function(){
      const {
        map
      }=store;
      const place=this.getPlace();
      if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        Modal.error({title:`error`,content:`No details available for input:${place.name}`})
        return;
      }
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);  // Why 17? Because it looks good.
      }

      // new google.maps.places.PlacesService(map).getDetails({placeId:place.place_id},function(place){
      //   debugger
      // })
      const marker = new google.maps.Marker({
        map,
      });
      marker.setPosition(place.geometry.location);
      marker.setVisible(false);
      setDataPlace(data,place,marker);



    });
  }
  render(){
    return (
      <Fragment>
        <Card style={{width:250}}>
          <Input ref={this.ref}/>
        </Card>
      </Fragment>
    )
  }
}
