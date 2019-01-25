import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { signUp } from '@/store/actions/user'

import config from '@/utils/config'

import '../style.scss'

@withRouter
@connect(
  (state, props) => ({}),
  dispatch => ({
    signUp: bindActionCreators(signUp, dispatch)
  })
)
class SignIn extends Component {
  static propTypes = {
    signUp: PropTypes.func,
    history: PropTypes.object
  }
  constructor(props) {
    super(props)
    this.state = {
      rand: 0
    }
    this.submit = this.submit.bind(this)
  }

  async submit(event) {
    event.preventDefault()

    const { username, password, email, rePassword, validate } = this
    const { signUp } = this.props

    if (!username.value) {
      username.focus()
      return false
    }

    if (!email.value) {
      email.focus()
      return false
    }

    if (!password.value) {
      password.focus()
      return false
    }

    if (password.value !== rePassword.value) {
      password.focus()
      return false
    }

    // if (validate.value !== validate.value) {
    //   password.focus()
    //   return false
    // }

    let [err, success] = await signUp({ username: username.value, password: password.value, email: email.value })
    if (success) {
      setTimeout(() => {
        window.location.reload()
        return false
      }, 300)
    } else {
      this.changeCode()
    }
  }

  changeCode = () => {
    const rand = Math.random()
    this.setState({ rand })
  }

  render() {
    const verify = `${config.api.verify}?tm=${this.state.rand}`
    return (
      <form onSubmit={this.submit}>
        <input
          type="text"
          ref={c => {
            this.username = c
          }}
          placeholder="请输入账号"
        />
        <input
          type="text"
          ref={c => {
            this.email = c
          }}
          placeholder="请输入Email"
        />
        <input
          type="password"
          ref={c => {
            this.password = c
          }}
          placeholder="请输入密码"
        />
        <input
          type="password"
          ref={c => {
            this.rePassword = c
          }}
          placeholder="再输入一次密码"
        />
        {/* <input
          type="text"
          ref={c => {
            this.validate = c
          }}
          placeholder="请输入验证"
        />
        <img src={verify} onClick={this.changeCode} /> */}
        <button type="submit">注册</button>
      </form>
    )
  }
}

export default SignIn
