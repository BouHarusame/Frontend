import React, { Component } from 'react';
import PropTypes from 'prop-types'
export default class ToDoItem extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextProps, nextState)
    if (nextProps.content !== this.props.content) {
      return true
    } else {
      return false
    }
  }
  render() {
    console.log('aaaa')
    return (
      <div 
        onClick={this.deleteItem.bind(this)}>
        {this.props.status}-{this.props.content}
      </div>
    );
  }
  deleteItem () {
    this.props.deleteItem(this.props.index)
  }
}
ToDoItem.propTypes = {
  content: PropTypes.string,
  index: PropTypes.number,
  deleteItem: PropTypes.func,
  status: PropTypes.string.isRequired
}
ToDoItem.defaultProps = {
  status: '已完成'
}
