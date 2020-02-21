import React, { Component } from 'react'
import { View, TextInput, StyleSheet } from 'react-native'

export default class Input extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
  }
  onChangeText = (value) => {
    this.setState({
      value
    })
    this.props.getData(this.props.name, value);
  }
  render() {
    return (
      <View>
        <TextInput
          {...this.props}
          style={{ height: 45, borderColor: '#e9e9e9', borderWidth: 1 }}
          onChangeText={(text) => this.onChangeText(text)}
        />
      </View >
    )
  }
}