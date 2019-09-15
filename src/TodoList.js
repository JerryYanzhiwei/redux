import React, { Component } from 'react'

import axios from 'axios'

import TodoListUI from './TodoListUI'

import store from './store'

import { changeInputAction, deleteItemAction, addItemAction, getListAction } from './store/actionCreators'

class TodoList extends Component {
  constructor(props) {
    super(props)
    this.state = store.getState()
    this.changeInputValue = this.changeInputValue.bind(this)
    this.storeChange = this.storeChange.bind(this)
    this.clickBtn = this.clickBtn.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
    store.subscribe(this.storeChange)
  }
  render() {
    return (
      <TodoListUI
        placeHolder={this.state.placeHolder}
        inputValue={this.state.inputValue}
        changeInputValue={this.changeInputValue}
        clickBtn={this.clickBtn}
        list={this.state.list}
        deleteItem={this.deleteItem}
      />
    )
  }

  componentDidMount () {
    axios.get('https://easy-mock.com/mock/5d7e4ff17632193bdf3fd083/example/getList').then(res =>{
      console.log(res)
      const data = res.data.data.list
      const action = getListAction(data)
      store.dispatch(action)
    })
  }

  deleteItem (index) {
    const action = deleteItemAction(index)
    store.dispatch(action)
  }

  clickBtn () {
    const action = addItemAction()
    store.dispatch(action)
  }

  changeInputValue (e) {
    const action = changeInputAction(e.target.value)
    store.dispatch(action)
  }

  storeChange () {
    this.setState(store.getState())
  }
}
 
export default TodoList;