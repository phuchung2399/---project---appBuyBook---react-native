import React, { Component } from 'react'
import { connect } from 'react-redux'
import InforUser from './InforUser';
import Auth from '../../screens/AuthScreen'
import { StyleSheet, ScrollView } from 'react-native';
import navigateTo from '../../utils/navigateTo';
import { Navigation } from 'react-native-navigation';
import { View } from 'native-base';
import * as userActions from '../../reduxs/authRedux/actions'

class Profile extends Component {
  constructor(props) {
    super(props);
  }


  navigationButtonPressed = ({ buttonId }) => {
    const { componentId } = this.props;
    if (buttonId === 'close') {
      Navigation.dismissModal(componentId);
    }
  };

  logout = () => {
    this.props.logout();
  }

  render() {
    const inforUser = <InforUser logout={this.logout} token={this.props.token} idUser={this.props.idUser} isAuthenticated={this.props.isAuthenticated} user={this.props.user} componentId={this.props.componentId} ></InforUser>;
    const isAuthenticated = this.props.isAuthenticated;
    if (isAuthenticated) {
      return (
        <View style={styles.container}>
          {inforUser}
        </View >
      )
    } else return (<Auth></Auth>)
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
function mapStateToProps(state) {
  return {
    isAuthenticated: state.authReducer.isAuthenticated,
    idUser: state.authReducer.user.Id,
    token: state.authReducer.token,
    user: state.authReducer.user
  }
}
function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(userActions.logout())
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
