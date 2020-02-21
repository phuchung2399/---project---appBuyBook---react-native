import React, { Component } from 'react'
import { View, ActivityIndicator } from 'react-native'

export default class Loading extends Component {
  render() {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: 'rgba(52, 52, 52, 0.5)' }}>
        <ActivityIndicator size="large" color="#ff6666" style={{ flex: 1 }} />
      </View>
    )
  }
}
