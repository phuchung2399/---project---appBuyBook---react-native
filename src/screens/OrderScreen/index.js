import React, { Component } from 'react'
import { View, Text, FlatList, SectionList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import Auth from '../AuthScreen'
import callAPI from '../../utils/callAPI'
import ItemOrder from '../../components/Order/ItemOrder'
import InfoOrder from '../../components/Order/InfoOrder'
import * as userActions from '../../reduxs/authRedux/actions'
import _ from 'lodash'
class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      orders: [],
      item: {},
      modalVisible: false,
      showAllOrder: false
    }
    this.getOrders();
  }

  componentDidUpdate(prevProps) {
    if (this.props.cart !== prevProps.cart) {
      this.getOrders();
    }
  }

  openModalInfo = (item) => {
    this.setState(prevState => ({
      ...prevState,
      item,
      modalVisible: true
    }))
  }

  setModalVisible = () => {
    this.setState(prevState => ({
      ...prevState,
      modalVisible: false
    }))
  }

  getOrders = async () => {
    const { token } = this.props;
    this.setState({
      loading: true,
    });
    try {
      var data = await callAPI(
        `api/orders`,
        'GET',
        null,
        token
      );

      var orders = [];
      data.data.Orders.map(order => {
        orders.push({
          createdAt: order.CreatedAt,
          title: order.Id,
          data: order.Items
        })
      })

      this.setState({
        loading: false,
        orders: _.orderBy(orders, ['createdAt'], ['desc']),
        idOrder: data.data.Orders[0].Id
      });
    } catch (error) {
      console.log("Error: ", error.response.data.Message);
    }
  }

  updateStatus = async (id, status) => {
    const { orders } = this.state;
    var idOrder = '';
    orders.map(item => {
      var exist = item.data.find(order => order.Id === id);
      if (exist) {
        idOrder = item.title;
      }
    })

    const { token } = this.props;
    var info = { OrderItemStatus: status, OrderItemIds: [id] }
    try {
      var data = await callAPI(
        `api/orders/${idOrder}/setstatus`,
        'PUT',
        info,
        token
      );
      this.setModalVisible();
      this.getOrders();
      this.props.getNotifications(token);
    } catch (error) {
      console.log("Error: ", error.response.data.Message);
    }
  }

  showAllOrder = () => {
    this.setState(prevState => ({
      ...prevState,
      showAllOrder: !prevState.showAllOrder
    }))
  }

  render() {
    const isAuthenticated = this.props.isAuthenticated;
    const { modalVisible, item, showAllOrder } = this.state;

    if (isAuthenticated) {
      const { orders, loading } = this.state;
      if (loading) {
        return (
          <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <ActivityIndicator size="large" color="#ff6666" style={{ flex: 1 }} />
          </View>
        );
      } else {
        return (
          <View style={{ margin: 15 }}>
            <SectionList
              showsVerticalScrollIndicator={false}
              sections={showAllOrder ? orders : orders.slice(0, 3)}
              onRefresh={this.getOrders}
              refreshing={this.state.loading}
              renderItem={({ item }) => (
                <ItemOrder item={item} openModalInfo={this.openModalInfo}></ItemOrder>
              )}
              keyExtractor={(item, index) => item + index}
              renderSectionHeader={({ section: { title } }) => (
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 15, color: '#ff6666' }}>{title.toUpperCase()}</Text>
              )}
              ListFooterComponent={() => (
                orders.length > 3 &&
                <View
                  style={{
                    marginVertical: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    style={styles.btnSeeAll}
                    onPress={this.showAllOrder}
                  >
                    <Text style={{ color: '#ff6666', fontSize: 15 }}>{!showAllOrder ? 'Hiển thị tất cả đơn hàng' : 'Hiển thị ít đơn hàng hơn'}</Text>
                  </TouchableOpacity>
                </View>
              )}
            />

            <InfoOrder
              modalVisible={modalVisible}
              setModalVisible={this.setModalVisible}
              item={item}
              updateStatus={this.updateStatus}
            ></InfoOrder>
          </View>
        )
      }
    } else return (<Auth></Auth>)
  }
}

const styles = StyleSheet.create({
  btnSeeAll: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ff6666',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    width: '90%'
  }
})

function mapStateToProps(state) {
  return {
    isAuthenticated: state.authReducer.isAuthenticated,
    token: state.authReducer.token,
    cart: state.authReducer.cart
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getNotifications: (token) => dispatch(userActions.getNotifications(token)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Order);
