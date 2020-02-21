import React, { Component } from 'react';
import { View, Image, StyleSheet, Text, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ScrollableTabView, { ScrollableTabBar, DefaultTabBar } from 'react-native-scrollable-tab-view';

export default class Library extends Component {
  render() {
    return (
      <View>
        <View>
          <Image style={styles.image} source={require('../../assets/images/backLibrary.png')}></Image>
          <View style={styles.info}>
            <View style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Text style={styles.title}>The Library</Text>
              <Text style={{ color: '#fff', marginVertical: 5 }}>www.thebook.com</Text>

              <Text style={{ color: '#fff', textAlign: 'center' }}>
                Think back over your life. Think about the people that had a positive influence on you. If your past…
                Think back over your life.
            </Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                <Icon name='instagram' size={27} color='#fff' style={styles.social}></Icon>
                <Icon name='facebook' size={26} color='#fff' style={styles.social}></Icon>
                <Icon name='youtube-play' size={27} color='#fff' style={styles.social}></Icon>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ marginHorizontal: 30 }}>
                  <Text style={styles.openText}>OPEN</Text>
                  <Text style={styles.hourText}>8am</Text>
                </View>
                <Image source={require('../../assets/images/enouvoLibrary.png')} style={styles.imgLibrary}></Image>
                <View style={{ marginHorizontal: 30 }}>
                  <Text style={styles.openText}>CLOSE</Text>
                  <Text style={styles.hourText}>6pm</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10, width: '95%' }}>
                <View style={styles.venueContent}>
                  <View style={styles.venue}>
                    <View style={styles.contentIcon}>
                      <Icon name='phone' size={19} color='#fff'></Icon>
                    </View>
                    <View>
                      <Text style={{ color: '#A1D8E2' }}>Phone</Text>
                      <Text style={{ color: '#FFF' }}>(+84) 348 543</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.venueContent}>
                  <View style={styles.venue}>
                    <View style={styles.contentIcon}>
                      <Icon name='send' size={17} color='#fff'></Icon>
                    </View>
                    <View>
                      <Text style={{ color: '#A1D8E2' }}>Address</Text>
                      <Text style={{ color: '#FFF' }}>20 Cao Thắng</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <ScrollView>
          <View style={{ height: Dimensions.get('window').height / 7 * 3.2 }}>
            <ScrollableTabView
              style={{ paddingBottom: 10 }}
              initialPage={0}
              tabBarInactiveTextColor={'#111'}
              tabBarActiveTextColor={'#4EC4D1'}
              tabBarUnderlineStyle={{ backgroundColor: '#4EC4D1' }}
              tabBarTextStyle={{ fontWeight: 'bold' }}
              renderTabBar={() => <ScrollableTabBar style={{ borderWidth: 0 }} />}>
              <View tabLabel='Hình ảnh'>
                <View style={{ flex: 1 }}>
                  <Image style={{ width: '87%', height: 120, margin: 20, borderRadius: 10 }} source={require('../../assets/images/img1.png')}></Image>
                </View>
              </View>
              <View tabLabel='Sự kiện'>
              </View>
              <View tabLabel='Khuyến mãi'>
                <Text>Gói thành viên </Text>
              </View>
            </ScrollableTabView>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    position: "relative",
    height: Dimensions.get('window').height / 7 * 3.8
  },
  info: {
    position: 'absolute',
    top: 20,
    marginHorizontal: 15
  },
  title: {
    color: '#fff',
    fontSize: 23,
    fontWeight: "bold"
  },
  social: {
    marginHorizontal: 13
  },
  imgLibrary: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderColor: '#fff',
    borderWidth: 2
  },
  openText: {
    color: '#fff',
    fontSize: 13
  },
  hourText: {
    color: '#fff',
    fontSize: 19,
    fontWeight: 'bold'
  },
  venue: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: '#A1D8E2',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5
  },
  venueContent: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 25,
    width: 150,
    height: 51,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
