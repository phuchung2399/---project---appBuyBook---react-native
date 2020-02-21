import React, { Component } from 'react'
import { StyleSheet, View, Image, Text, ScrollView, Alert } from 'react-native'
import ItemSetting from '../../components/Profile/ItemSetting'
import infoProfile from '../../assets/images/infoProfile.png'
import lockIcon from '../../assets/images/lock.png'
import supportIcon from '../../assets/images/support.png'
import feedbackIcon from '../../assets/images/feedback.png'
import ruleIcon from '../../assets/images/rule.png'
import historyIcon from '../../assets/images/history.png'
import shareIcon from '../../assets/images/share.png'
import logOutIcon from '../../assets/images/logout.png'
import navigateTo from '../../utils/navigateTo';
import { connect } from 'react-redux'
import * as userActions from '../../reduxs/authRedux/actions'
import { Navigation } from 'react-native-navigation';

class SettingInfo extends Component {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
    this.state = {
      data: {
        token: this.props.token,
        idUser: this.props.idUser,
        isAuthenticated: this.props.isAuthenticated,
        user: this.props.user,
      }
    }
  }

  navigationScreen = (page, title, data) => {
    navigateTo(data, this.props.componentId, page, {
      title: {
        text: title,
        alignment: 'center'
      }
    });
  }

  logoutScreen = () => {
    Alert.alert(
      'Thông báo',
      'Bạn có muốn thoát tài khoản không?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK', onPress: () => {
            this.props.logout();
            Navigation.dismissModal(this.props.componentId);
          }
        },
      ],
      { cancelable: false },
    );
  }

  navigationButtonPressed = ({ buttonId }) => {
    const { componentId } = this.props;
    if (buttonId === 'close') {
      Navigation.dismissModal(componentId);
    }
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <ItemSetting image={infoProfile} title='Thông tin cá nhân' navigationScreen={() => this.navigationScreen('PersonalInfo', 'Chỉnh sửa thông tin', null)}></ItemSetting>
        <ItemSetting image={lockIcon} title='Đổi mật khẩu' navigationScreen={() => this.navigationScreen('ChangePass', 'Thay đổi mật khẩu', this.state.data)}></ItemSetting>
        <ItemSetting image={supportIcon} title='Hỗ trợ' ></ItemSetting>
        <ItemSetting image={feedbackIcon} title='Phản hồi' ></ItemSetting>
        <ItemSetting image={ruleIcon} title='Quy định' ></ItemSetting>
        <ItemSetting image={historyIcon} title='Lịch sử nâng cấp thành viên' ></ItemSetting>
        <ItemSetting image={shareIcon} title='Chia sẻ' ></ItemSetting>
        <ItemSetting image={logOutIcon} title='Đăng xuất' navigationScreen={this.logoutScreen}></ItemSetting>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 15,
    padding: 15,
  }
})


function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(userActions.logout())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingInfo);

