import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {connect} from 'react-redux';
import * as bookActions from '../../reduxs/bookRedux/actions';
import navigateTo from '../../utils/navigateTo';

class SearchBook extends Component {
  constructor() {
    super();
    this.state = {
      dataSearch: '',
    };
  }

  hanldGetDataFromTextInput = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  onPressBack = () => {
    Navigation.dismissModal(this.props.componentId);
  };

  navigateToDetail = item => {
    navigateTo({item}, this.props.componentId, 'Detail', item.Title);
  };

  hanldSearch = item => {
    var inputData = this.state.dataSearch.toUpperCase();
    var dataFind = item.Title.toUpperCase();
    if (dataFind.indexOf(inputData) > 0) {
      return (
        <TouchableOpacity
          onPress={() => {
            this.navigateToDetail(item);
          }}>
          <View style={styles.itemSearch}>
            <Text>{item.Title}</Text>
          </View>
        </TouchableOpacity>
      );
    }
  };

  render() {
    let {dataBook} = this.props;
    return (
      <View>
        <TouchableOpacity style={{marginTop: 10}} onPress={this.onPressBack}>
          <Image source={require('./../../assets/images/closeCategory.png')} />
        </TouchableOpacity>
        <View style={styles.viewInputSearch}>
          <TextInput
            style={styles.borderInput}
            onChangeText={value =>
              this.hanldGetDataFromTextInput('dataSearch', value)
            }
          />
        </View>
        <View style={{marginTop: 20}}>
          <FlatList
            Vertical={true}
            data={dataBook}
            renderItem={({item}) => this.hanldSearch(item)}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    dataBook: state.bookReducer.books,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchBook: () => dispatch(bookActions.fetchBooks()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBook);

const styles = StyleSheet.create({
  viewInputSearch: {
    flexDirection: 'row',
  },
  borderInput: {
    borderEndColor: 'gray',
    borderBottomWidth: 0.5,
    width: '90%',
    height: 40,
  },
  itemSearch: {
    marginTop: 20,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  text: {},
});
