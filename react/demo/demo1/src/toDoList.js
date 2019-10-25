import React, {Component} from 'react'

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
              <li 
                onClick={this.deleteItem.bind(this, index)}
                key={index}>
                {item}
              </li>
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