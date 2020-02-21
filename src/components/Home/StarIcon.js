import React, { Component } from 'react'
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View } from 'native-base';
export default class StarIcon extends Component {
  render() {
    const { star } = this.props;

    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon
          name="star"
          size={13}
          style={{ paddingRight: 2 }}
          color={star < 1 ? '#ababab' : '#ffd11a'}
        />
        <Icon
          name="star"
          size={13}
          style={styles.star_icon}
          color={star < 2 ? '#ababab' : '#ffd11a'}
        />
        <Icon
          name="star"
          size={13}
          style={styles.star_icon}
          color={star < 3 ? '#ababab' : '#ffd11a'}
        />
        <Icon
          name="star"
          size={13}
          style={styles.star_icon}
          color={star < 4 ? '#ababab' : '#ffd11a'}
        />
        <Icon
          name="star"
          size={13}
          style={styles.star_icon}
          color={star < 5 ? '#ababab' : '#ffd11a'}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  star_icon: {
    paddingHorizontal: 2,
  },
});
