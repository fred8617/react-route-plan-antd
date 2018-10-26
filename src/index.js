import RoutePlan from 'react-route-plan-antd';
import React,{Fragment} from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import DevTools from 'mobx-react-devtools';
import './index.css';

const Container=styled.div`

`;

const data={
  "data": [
    {
      "type": "checkbox",
      "name": "复选框",
      "fieldName": "checkbox2",
      "label": "checkbox2",
      "adding": true,
      "required": false,
      "requiredMessage": ""
    },
    {
      "type": "radio",
      "name": "单选框",
      "fieldName": "radio3",
      "label": "radio3",
      "adding": true,
      "required": false,
      "requiredMessage": "",
      "options": [
        {
          "label": "default1",
          "value": "default1Value"
        },
        {
          "label": "default2",
          "value": "default2Value"
        }
      ],
      "optionRowShow": 3
    },
    {
      "type": "inputNumber",
      "name": "数字输入框",
      "fieldName": "inputNumber1",
      "label": "inputNumber1",
      "adding": true,
      "required": false,
      "requiredMessage": ""
    },
    {
      "type": "input",
      "name": "文本输入框",
      "demo": false,
      "fieldName": "input0",
      "label": "input0",
      "required": false,
      "requiredMessage": ""
    },
    {
      "type": "radio",
      "name": "单选框",
      "fieldName": "radio4",
      "label": "radio4",
      "adding": true,
      "required": false,
      "requiredMessage": "",
      "options": [
        {
          "label": "default1",
          "value": "default1Value"
        },
        {
          "label": "default2",
          "value": "default2Value"
        }
      ],
      "optionRowShow": 3,
      "demo": false
    }
  ],
  "submitUrl": "1aaaaaaaaa"
}

ReactDOM.render(
  <Fragment>
    <RoutePlan
      developer={true}
      design={true}
      data={data}
    />
    <DevTools/>
  </Fragment>
,root)
