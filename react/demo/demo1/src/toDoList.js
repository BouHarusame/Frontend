import React, {Component} from 'react'
import ToDoItem from './toDoItem'
class ToDoList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      inputVal: '',
      list: []
    }
  }
  render() {
    return (
      <div>
        <div><input value={this.state.inputVal} onChange={this.inputChange.bind(this)} /><button onClick={this.addList.bind(this)}>add</button></div>
        <ul>
          {
            this.state.list.map((item, index) => (
              <ToDoItem key={item + index} index={index} content={item} deleteItem={this.deleteItem.bind(this)}/>
            ))
          }
        </ul>
      </div>
    )
  }
  deleteItem (index) {
    let list = this.state.list
    list.splice(index, 1)
    this.setState({
      list
    })
  }
  inputChange(e) {
    this.setState({
      inputVal: e.target.value
    })
  }
  addList() {
    this.setState({
      list: [...this.state.list, this.state.inputVal],
      inputVal: ''
    })
  }
}
export default ToDoList