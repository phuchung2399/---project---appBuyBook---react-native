import React, { Component } from 'react'
import { View, Image, StyleSheet, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import ScrollableTabView, { ScrollableTabBar, DefaultTabBar } from 'react-native-scrollable-tab-view';
import TabMenuBook from '../../components/Profile/TabMenuBook';
import BookRequest from './BookRequest';
import navigateTo from '../../utils/navigateTo';
import { connect } from 'react-redux';
import callAPI from '../../utils/callAPI';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class InfoUser extends Component {
  constructor(props) {
    super(props);
    this.getRequestBook();
    this.state = {
      requestBook: [],
      display: false
    }
  }

  navigationModal = (page) => {
    Navigation.showModal({
      stack: {
        children: [{
          component: {
            name: page,
            passProps: {
              token: this.props.token,
              idUser: this.props.idUser,
              isAuthenticated: this.props.isAuthenticated,
              user: this.props.user,
            },
            options: {
              topBar: {
                title: {
                  text: 'Setting',
                  alignment: 'center'
                },
                leftButtons: [
                  {
                    id: 'close',
                    icon: require('../../assets/images/arrow.png'),
                  },
                ],
              }
            }
          }
        }]
      }
    });
  }
  getRequestBook = async () => {
    const { token } = this.props;
    try {
      var data = await callAPI(`api/bookrequests`, 'GET', null, token);
      this.setState(
        { requestBook: data.data }
      )
    } catch (error) {
      console.log('ERROR GET USER:', error);
    }
  }
  onPressArrowButton = () => {
    this.setState((prevState) => ({
      ...prevState,
      display: !prevState.display
    }))
  }
  render() {
    const tabSubMenu = <TabMenuBook token={this.props.token} idUser={this.props.idUser} isAuthenticated={this.props.isAuthenticated} componentId={this.props.componentId}></TabMenuBook>
    const bookRequest = <BookRequest requestBook={this.state.requestBook}></BookRequest>
    const { display } = this.state;
    return (
      <View>
        <Image style={styles.image} source={{ uri: 'https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' }}>
        </Image>
        <View style={styles.styleFirstRow}>
          <View>
            <Image style={styles.styleQRCode} source={{ uri: this.props.user.QrCodeUrl }}></Image>
          </View>
          <TouchableOpacity onPress={() => this.navigationModal('SettingInfo')} >
            <Image style={styles.styleSetting} source={this.props.user.Image == null ? require('../../assets/images/settingProfile.png') : this.props.user.Image}></Image>
          </TouchableOpacity>
        </View>
        <View style={styles.info}>
          <Image style={styles.avatar} source={{ uri: this.props.user.Image == null ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdpBEf6Zmjl40AHZpsNq32fnSw5MaZbwLz_-clppwuTjBLqWQE&s' : this.props.user.Image }}></Image>
          <Image style={styles.styleImageLevel} source={require('../../assets/images/titanlevel.png')}></Image>
          <Text style={styles.textTitle}>{this.props.user.FullName}</Text>
          <TouchableOpacity style={styles.styleRank}>
            <Text style={styles.textRank}>{this.props.user.Membership.Name}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.tabView}>
          <ScrollableTabView
            initialPage={0}
            tabBarActiveTextColor={'#fff'}
            tabBarUnderlineStyle={{ backgroundColor: '#ffffff' }}
            tabBarInactiveTextColor={'#bdc0c2'}
            tabBarTextStyle={{ fontWeight: 'bold' }}
            renderTabBar={() => <ScrollableTabBar style={{ borderWidth: 0 }} />}>
            <View style={styles.tabBarMenu} tabLabel='Sách của bạn'>
              {tabSubMenu}
            </View>
            <View style={styles.tabBarMenu} tabLabel='Yêu cầu sách'>
              {bookRequest}
            </View>
            <View style={styles.tabBarMenu} tabLabel='Gói thành viên'>
              <View style={{ borderRadius: 20, backgroundColor: '#fff', marginTop: 20 }}>
                <View style={styles.content}>
                  <Image style={styles.styleQRCode} source={require('../../assets/images/platinumGreen.jpg')}></Image>
                  <View style={{ flexDirection: 'column', justifyContent: 'center', marginTop: 15 }}>
                    <Text style={{ color: '#000000', fontSize: 17, fontFamily: 'SVN-ProximaNova', textAlign: 'center' }}>
                      Gói thành viên
                  <Text style={styles.styleMemberShipName} onPress={this.onPressArrowButton}> {(this.props.user.Membership.Name).toUpperCase()} </Text>
                    </Text>
                    <Text style={{ color: '#dadada', fontSize: 17, fontFamily: 'SVN-ProximaNova', textAlign: 'center' }}>Hết hạn:<Text style={{ color: '#000000' }}>{this.props.user.MembershipExpiryDate}</Text></Text>
                  </View>
                  <TouchableOpacity onPress={this.onPressArrowButton}>
                    <Image style={styles.styleSetting} onPress={this.onPressArrowButton} source={this.props.user.Image == null ? require('../../assets/images/arrow.png') : this.props.user.Image}></Image>
                  </TouchableOpacity>
                </View>

                <View style={{ borderTopWidth: 1, borderColor: '#f2f2f2', bottom: 20 }}></View>
                <View style={{ flexDirection: 'column', display: display ? 'flex' : 'none' }}>
                  <View style={styles.styleRowContent}>
                    <Text style={styles.styleTextTitle}>Giá trị gói</Text>
                    <Text style={styles.styleTextData}>{this.props.user.Membership.Value}</Text>
                  </View>
                  <View style={styles.styleRowContent}>
                    <Text style={styles.styleTextTitle}>Gia hạn sách</Text>
                    <Text style={styles.styleTextData}>{this.props.user.Membership.MaxExtensionTimes} lượt/năm</Text>
                  </View>
                  <View style={styles.styleRowContent}>
                    <Text style={styles.styleTextTitle}>Yêu cầu sách</Text>
                    <Text style={styles.styleTextData}>{this.props.user.Membership.MaxRequestTimes} lượt/năm</Text>
                  </View>
                  <View style={styles.styleRowContent}>
                    <Text style={styles.styleTextTitle}>Giao sách tại nhà</Text>
                    <Text style={styles.styleTextData}>{this.props.user.Membership.MaxDeliveryTimes} lượt/năm</Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollableTabView>
        </View >
      </View >
    )
  }
}

const styles = StyleSheet.create({
  image: {
    position: "relative",
    height: Dimensions.get('window').height / 2,
  },
  info: {
    padding: 10,
    position: 'absolute',
    top: 20,
    justifyContent: 'center',
    flexDirection: "column",
    alignItems: 'center',
  },
  styleFirstRow: {
    width: '100%',
    flexDirection: 'row',
    position: 'absolute',
    marginTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    top: 5,
  },
  styleQRCode: {
    borderRadius: 80,
    height: 50,
    width: 50,
  },
  styleSetting: {
    height: 40,
    width: 40,
  },
  avatar: {
    borderRadius: 70,
    height: 140,
    top: 30,
    width: 140,
    left: 120,
  },
  styleImageLevel: {
    borderRadius: 80,
    height: 50,
    width: 50,
    left: 120,
  },
  textTitle: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: "center",
    left: Dimensions.get('window').width / 3.5,
    fontFamily: 'SVN-ProximaNova'
  },
  styleRank: {
    justifyContent: 'center',
    alignContent: 'center',
    height: 50,
    paddingVertical: 10,
    borderWidth: 0.5,
    borderColor: '#ffffff',
    borderRadius: 50,
    left: Dimensions.get('window').width / 3.5
  },
  textRank: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'SVN-ProximaNova'
  },
  tabView: {
    padding: 10,
    position: 'absolute',
    top: 350,
    zIndex: 1,
    height: Dimensions.get('window').height / 2
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 100,
  },
  styleMemberShipName: {
    color: '#89c838',
    fontWeight: 'bold',
    fontFamily: 'SVN-ProximaNova',
    fontSize: 20,
  },
  styleTextTitle: {
    textAlign: 'left',
    fontSize: 17,
    fontFamily: 'SVN-ProximaNova',
  },
  styleTextData: {
    textAlign: 'right',
    fontFamily: 'SVN-ProximaNova',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#757575'
  },
  styleRowContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20
  }
})




