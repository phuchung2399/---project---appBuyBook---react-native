import React, { Component } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

export default class Input extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: this.props.value
    }
  }

  onChangeText = (value) => {
    this.setState({
      value
    }, () => { this.props.getData(this.props.name, value); })
  }

  componentDidUpdate(prevProps) {
    if (this.props.value !== prevProps.value) {
      const { value } = this.props;
      this.setState({
        value
      })
    }
  }

  render() {
    return (
      <View>
        <TextInput
          {...this.props}
          editable={this.props.editable}
          style={styles.styleInput}
          onChangeText={(text) => this.onChangeText(text)}
          value={this.state.value}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  styleInput: {
    borderWidth: 1,
    borderColor: '#e9e9e9',
    marginBottom: 20
  }
})