import React, { Component } from 'react'
import LogIn from './LogIn';
import Register from './Register'
import { connect } from 'react-redux'
import * as userActions from '../../reduxs/authRedux/actions'
import { Navigation } from 'react-native-navigation'
import ModalAddCart from '../../components/Home/ModalAddCart';
import { View } from 'react-native'

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: true,
      modalVisible: false
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.data.isAuthenticated != prevProps.data.isAuthenticated) {
      this.setState(prevState => ({
        ...prevState,
        modalVisible: !prevState.modalVisible
      }))
    }
  }

  dismissAuth = () => {
    Navigation.dismissModal(this.props.componentId);
  }


  navigationButtonPressed = ({ buttonId }) => {
    const { componentId } = this.props;
    if (buttonId === 'close') {
      Navigation.dismissModal(componentId);
    }
  };

  login = (user) => {
    this.props.login(user);
  }
  register = (user) => {
    this.props.register(user)
  }

  changeState = () => {
    this.setState(prevState => ({
      ...prevState,
      isLogin: !prevState.isLogin
    }))
  }

  setModalVisible = () => {
    this.setState(prevState => ({
      ...prevState,
      modalVisible: !prevState.modalVisible
    }))
  }

  render() {
    const { isLogin, modalVisible } = this.state;
    const { loading, error, data } = this.props.data;

    if (isLogin) {
      return (
        <>
          <LogIn changeState={this.changeState} login={this.login} loading={loading} error={error}></LogIn>
          <ModalAddCart
            modalVisible={modalVisible}
            navigateToCall={this.dismissAuth}
            text='Đăng nhập thành công'
            textButton='Đã hiểu'
          ></ModalAddCart>
        </>
      )
    } else
      return (
        <Register changeState={this.changeState} register={this.register} loading={loading} error={error}></Register>
      )
  }
}

function mapStateToProps(state) {
  return {
    data: state.authReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    login: (user) => dispatch(userActions.login(user)),
    register: (user) => dispatch(userActions.register(user)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
