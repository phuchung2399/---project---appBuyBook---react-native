import React, { Component } from 'react';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import { Container } from 'native-base';
import CategoryItem from '../../components/SideBar/CategoryItem';
import { connect } from 'react-redux';
import { FETCH_CATEGORY } from '../../reduxs/categoryRedux/actions';

class SideBar extends Component {
  componentDidMount() {
    this.props.onCategory();
  }

  renderItem = ({ item }) => {
    return <CategoryItem name={item.Name} subList={item.SubCategories} />;
  };

  render() {
    let { categories } = this.props;
    return (
      <Container style={{ backgroundColor: '#fff', paddingTop: 20 }}>
        <FlatList
          data={categories}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index}
        />
        <View>
          <TouchableOpacity>
            <View
              style={{
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fc9619',
              }}>
              <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>
                Tìm kết quả
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categoryReducer.categories.Data,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCategory: () => {
      dispatch({ type: FETCH_CATEGORY });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
