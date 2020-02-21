import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Alert } from 'react-native'
import { RadioButton } from 'react-native-paper';
import { connect } from 'react-redux'
import * as userActions from '../../reduxs/authRedux/actions'
import Input from '../../components/Profile/Input';
import { Navigation } from 'react-native-navigation';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';


class PersonalInfo extends Component {
  constructor(props) {
    super(props);
    var dateChangeFomat = moment(this.props.user.DateOfBirth, 'DD-MM_YYYY').format('MM-DD-YYYY');
    const { FirstName, LastName, PhoneNumber, Email, Address, Gender, Position, TotalPoint } = this.props.user;
    this.state = {
      FirstName,
      LastName,
      PhoneNumber,
      Email,
      Address,
      Gender,
      DateOfBirth: dateChangeFomat,
      Position,
      TotalPoint,
    }
  }
  getData = (name, text) => {
    this.setState((prevState) => ({
      ...prevState,
      [name]: text
    }))
  }
  onPressUpdateProfile = async () => {
    Alert.alert(
      'Thông báo',
      'Bạn có muốn thay đổi thông tin không?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK', onPress: () => {
            const { idUser, token } = this.props;
            const { FirstName, LastName, PhoneNumber, Email, Address, Gender, DateOfBirth, Position, TotalPoint } = this.state;
            var user = {
              FirstName,
              LastName,
              PhoneNumber,
              Email,
              Address,
              Gender,
              DateOfBirth,
              Position,
              TotalPoint,
              idUser,
              token
            }
            this.props.updateProfile(user);
            Navigation.dismissModal(this.props.componentId);
          }
        },
      ],
      { cancelable: false },
    );
  }
  render() {
    const { FirstName, LastName, PhoneNumber, Email, Address, Gender, DateOfBirth, Position, TotalPoint } = this.state;
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.styleTitle}>First name</Text>
        <Input name='FirstName' getData={this.getData} value={FirstName} editable={true}></Input>
        <Text style={styles.styleTitle}>Last name</Text>
        <Input name='LastName' getData={this.getData} value={LastName} editable={true}></Input>
        <Text style={styles.styleTitle}>Phone number</Text>
        <Input name='PhoneNumber' getData={this.getData} value={PhoneNumber} editable={true}></Input>
        <Text style={styles.styleTitle}>Email</Text>
        <Input name='Email' getData={this.getData} value={Email} editable={false}></Input>
        <Text style={styles.styleTitle}>Address</Text>
        <Input name='Address' getData={this.getData} value={Address} editable={true}></Input>
        <Text style={styles.styleTitle}>Gender</Text>
        <View style={styles.rowRadioButton}>
          <RadioButton.Group
            onValueChange={Gender => this.setState({ Gender })}
            value={Gender}
          >
            <View style={styles.rowRadioButton}>
              <RadioButton value="Male" />
              <Text>Male</Text>
            </View>
            <View style={styles.rowRadioButton}>
              <RadioButton value="Female" />
              <Text>Female</Text>
            </View>
          </RadioButton.Group>
        </View>
        <Text style={styles.styleTitle}>Date of birth</Text>
        <DatePicker
          date={DateOfBirth}
          mode="date"
          style={styles.styleDatePicker}
          placeholder="select date"
          format="MM/DD/YYYY"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
          }}
          onDateChange={(date) => {
            this.setState((prevState) => ({
              ...prevState,
              DateOfBirth: date
            }))
          }}
        />
        <TouchableOpacity style={styles.styleButton} onPress={this.onPressUpdateProfile}>
          <Text style={styles.styleTextButton}>Gửi yêu cầu</Text>
        </TouchableOpacity>

      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 15,
    padding: 20,
  },
  styleTitle: {
    fontSize: 20,
    fontFamily: 'SVN-ProximaNova',
    color: '#4a4a4a',
    marginBottom: 10,
  },
  styleInput: {
    borderWidth: 1,
    borderColor: '#e9e9e9',
    marginBottom: 20
  },
  rowRadioButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 150,
    marginBottom: 10
  },
  styleTextButton: {
    fontSize: 20,
    fontFamily: 'SVN-ProximaNova',
    color: '#4a4a4a',
    marginBottom: 10,
    textAlign: 'center'
  },
  styleButton: {
    height: 70,
    backgroundColor: '#39b8c2',
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    right: 0,
    bottom: 0
  },
  styleDatePicker: {
    padding: 10
  }
})


function mapStateToProps(state) {
  return {
    isAuthenticated: state.authReducer.isAuthenticated,
    idUser: state.authReducer.user.Id,
    token: state.authReducer.token,
    user: state.authReducer.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateProfile: (user) => dispatch(userActions.updateProfile(user))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfo);
