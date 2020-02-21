import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Navigation } from 'react-native-navigation'

export default class TitleSection extends Component {

  navigateToSeeAll = () => {
    const { data, type } = this.props;
    this.props.navigateToSeeAll(data, type)
  }

  render() {
    const { type, data } = this.props
    return (
      <View style={styles.titleContent}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.title}>{type}</Text>
          <Text style={[styles.title, { marginLeft: 10, }]}>({data.length})</Text>
        </View>
        <TouchableOpacity onPress={this.navigateToSeeAll}><Text style={{ color: '#ff6666' }} > Xem hết</Text></TouchableOpacity>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  titleContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: 20
  }
})
