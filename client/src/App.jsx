import React, { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios'

import './App.css'

import checkingPassword from './checkingPassword'

const Input = styled.input`
  width: 300px;
  padding: 10px;
  border-radius: 5px;
  font-size: 120%;
`

const Warning = styled.h2`
  color: #ce9178;
`
const Success = styled.h2`
  color: #dadaa8;
`

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      isWeak: true
    }
    this.handleTyping = this.handleTyping.bind(this)
  }

  handleTyping(e) {
    const password = e.target.value
    this.setState({
      value: password
    }, () => {
      axios.post('http://localhost:4000/checking', {
        data: password
      })
      .then((response) => {
        this.setState({
          value: password,
          isWeak: response.data === 'weak'
        })
      })
      .catch((error) => {
        console.log(error)
      })
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Checking Password</h2>
          <Input type="password" onChange={this.handleTyping} />
          {(this.state.value !== '' && this.state.isWeak) && <Warning> Weak </Warning>}
          {(this.state.value !== '' && !this.state.isWeak) && <Success> Fair </Success>}
        </div>
      </div>
    )
  }
}

export default App
