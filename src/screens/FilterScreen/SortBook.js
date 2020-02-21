import React, {Component} from 'react';
import {View, Text, ListItem, Body, Right, Container} from 'native-base';
import {TouchableOpacity, FlatList, Image, StyleSheet} from 'react-native';
import {Navigation} from 'react-native-navigation';

export default class SortBook extends Component {
  constructor() {
    super();
    this.state = {
      sort: [
        {
          key: 'htl',
          title: 'Từ cao đến thấp',
        },
        {
          key: 'lth',
          title: 'Từ thấp đến cao',
        },
        {
          key: 'atz',
          title: 'Từ A đến Z',
        },
        {
          key: 'zta',
          title: 'Từ Z đến A',
        },
      ],
      dataSource: '',
    };
  }

  onMoveFilterScreen = item => {
    Navigation.showModal({
      component: {
        name: 'FilterScreen',
        passProps: {
          sort: item,
        },
      },
    });
    //  Navigation.dismissModal(this.props.componentId);
  };

  onPressBack = () => {
    Navigation.dismissModal(this.props.componentId);
  };

  renderItem = ({item}) => {
    return (
      <View>
        <ListItem icon onPress={() => this.onMoveFilterScreen(item.key)}>
          <Body>
            <Text>{item.title}</Text>
          </Body>
        </ListItem>
      </View>
    );
  };

  render() {
    let {sort} = this.state;
    return (
      <Container style={{backgroundColor: '#fff', paddingTop: 20}}>
        <View style={styles.header}>
          <TouchableOpacity onPress={this.onPressBack}>
            <Image
              style={{marginLeft: 10}}
              source={require('./../../assets/images/closeCategory.png')}
            />
          </TouchableOpacity>
          <Text>Sắp xếp</Text>
          <Image
            style={{marginRight: 10, width: 30, height: 30}}
            source={require('./../../assets/images/crrowCycle.png')}
          />
        </View>
        <FlatList
          data={sort}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
