import React, { Component } from 'react';
import { Input, Button, List } from 'antd';
import 'antd/dist/antd.css';
import './todoList.css'
import store from './store'
export default class TodoList extends Component {
  constructor(props) {
    super(props)
    this.state = store.getState()
    store.subscribe(this.storeChange)
  }
  storeChange = () => {
    this.setState(store.getState())
  }
  changeInputValue = (e) => {
    console.log(e.target.value)
    const action = {
      type: 'changeInput',
      value: e.target.value
    }
    store.dispatch(action)
  }
  render() {
    return (
      <div className="wrap">
        <div className="header">
          <Input 
            placeholder="请输入代办内容"
            value={this.state.value}
            onChange={this.changeInputValue}
          />
          <Button type="primary">添加</Button>
        </div>
        <div className="content">
          <List 
            bordered
            dataSource={this.state.list}
            renderItem={item => <List.Item>{item}</List.Item>}
          />
        </div>
      </div>
    )
  }
}