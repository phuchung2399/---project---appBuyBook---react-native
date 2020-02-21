import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native"
import InputText from '../../components/Form/InputText'
import Title from '../../components/Form/Title'
import Error from '../../components/Form/Error'
import { bottomTabs } from "../../config/bottomTabs"
import { Navigation } from 'react-native-navigation'
import { connect } from 'react-redux'
import * as userAction from '../../reduxs/authRedux/actions'
import Loading from '../../components/Home/Loading'



// import TextInputState from 'react-native/lib/TextInputState';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {
        firstName: "Ly",
        lastName: "Đoàn Thị",
        email: "ly.dev@gmail.com",
        phone: "0348543343",
        pass: "123456",
        confirmPass: "123456"
      },
      errors: {
        firstNameErr: "",
        emailErr: "",
        phoneErr: "",
        lastNameErr: "",
        passErr: "",
        confirmPassErr: ""
      }
    }
  }

  getData = (name, text) => {
    var nameErr = name + "Err";
    this.setState(prevState => ({
      errors: {
        ...prevState.errors,
        [nameErr]: ""
      },
      info: {
        ...prevState.info,
        [name]: text
      }
    }));
  }

  clear = () => {
    this.setState(prevState => ({
      ...prevState,
      info: {
        firstName: "",
        email: "",
        phone: "",
        lastName: "",
        pass: "",
        confirmPass: ""
      }
    }));
  }

  checkValidation = () => {
    var { firstName, email, phone, lastName, pass, confirmPass } = this.state.info;
    var countErr = 0;
    var { firstNameErr, emailErr, phoneErr, lastNameErr, passErr, confirmPassErr } = this.state.errors;
    firstNameErr = "";
    emailErr = "";
    phoneErr = "";
    lastNameErr = "";
    passErr = "";
    confirmPassErr = "";
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (firstName == "") {
      firstNameErr = "Tên là trường bắt buộc";
      countErr++;
    }
    if (email == "") {
      countErr++;
      emailErr = "Email là trường bắt buộc";
    } else if (!re.test(String(email).toLowerCase())) {
      countErr++;
      emailErr = "Email không đúng format";
    }
    if (lastName == "") {
      lastNameErr = "Họ là trường bắt buộc"
      countErr++;
    }
    if (phone == "") {
      countErr++;
      phoneErr = "Phone là trường bắt buộc";
    } else if (phone.length != 10) {
      countErr++;
      phoneErr = "Phone không đúng format "
    }
    if (pass == "") {
      countErr++;
      passErr = "Password là trường bắt buộc";
      countErr++;
    } else if (pass.length < 6) {
      countErr++;
      passErr += "Độ dài password không đúng\n"
    } else if (pass != confirmPass) {
      countErr++;
      confirmPassErr += "Xác nhận password không trùng khớp\n"
    }

    this.setState({
      errors: {
        firstNameErr,
        emailErr,
        phoneErr,
        lastNameErr,
        passErr,
        confirmPassErr
      }
    })

    return countErr;
  }

  login = () => {
    this.props.changeState();
  }

  signUp = () => {
    var { firstName, email, phone, lastName, pass } = this.state.info;
    if (this.checkValidation() == 0) {
      this.props.register({ FirstName: firstName, LastName: lastName, Password: pass, Email: email, PhoneNumber: phone });
    }
  }

  render() {
    var { firstName, email, phone, lastName, pass, confirmPass } = this.state.info;
    var { firstNameErr, emailErr, phoneErr, lastNameErr, passErr, confirmPassErr } = this.state.errors;
    var { loading, error } = this.props
    if (loading) {
      return (
        <Loading></Loading>
      )
    } else
      return (
        <ScrollView style={{ flex: 1, margin: 15, flexDirection: 'column' }} showsVerticalScrollIndicator={false}>
          <View style={styles.titleContent}><Text style={{ fontSize: 20 }}>Đăng kí</Text></View>
          <Error errorText={error}></Error>

          <View style={{ flex: 1, marginBottom: 8 }}>
            <Title title="Tên người dùng *"></Title>
            <InputText
              name="firstName"
              value={firstName}
              getData={this.getData}
              onSubmitEditing={() => this.refInput.getInnerRef().focus()}
              returnKeyType="next"></InputText>
            <Error errorText={firstNameErr}></Error>
          </View>
          <View style={{ flex: 1, marginBottom: 8, }}>
            <Title title="Họ *"></Title>
            <InputText name="lastName" value={lastName} getData={this.getData}></InputText>
            <Error errorText={lastNameErr}></Error>
          </View>
          <View style={{ flex: 1, marginBottom: 8, }}>
            <Title title="Email *"></Title>
            <InputText
              name="email"
              value={email}
              getData={this.getData}
              ref={(r) => this.refInput = r}></InputText>
            <Error errorText={emailErr}></Error>
          </View>
          <View style={{ flex: 1, marginBottom: 8, }}>
            <Title title="Số điện thoại *"></Title>
            <InputText name="phone" value={phone} getData={this.getData}></InputText>
            <Error errorText={phoneErr}></Error>
          </View>
          <View style={{ flex: 1, marginBottom: 8, }}>
            <Title title="Mật khẩu *"></Title>
            <InputText pass={true} name="pass" value={pass} getData={this.getData}></InputText>
            <Error errorText={passErr}></Error>
          </View>
          <View style={{ flex: 1, marginBottom: 8, }}>
            <Title title="Xác nhận mật khẩu *"></Title>
            <InputText pass={true} name="confirmPass" value={confirmPass} getData={this.getData}></InputText>
            <Error errorText={confirmPassErr}></Error>

          </View>
          <View style={styles.buttonContent}>
            <TouchableOpacity style={styles.btnLogin} onPress={this.login}><Text style={styles.loginText}>Đăng nhập</Text></TouchableOpacity>
            <TouchableOpacity style={styles.btnSignUp} onPress={this.signUp}><Text style={styles.signUpText}>Đăng kí</Text></TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ textAlign: 'center' }}><Text>Bằng việc xác nhận tạo tài khoản, bạn đã đồng ý với các</Text> <Text style={{ color: '#ff6666' }}>điều khoản quy định</Text> của chúng tôi</Text>
          </View>
        </ScrollView>
      )
  }
}



const styles = StyleSheet.create({
  titleContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContent: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: 20
  },
  btnLogin: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ff6666'
  },
  loginText: {
    color: '#ff6666',
    textAlign: 'center',
  },
  btnSignUp: {
    width: 100,
    justifyContent: 'center',
    backgroundColor: '#ff6666',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff'
  },
  signUpText: {
    color: '#fff',
    textAlign: 'center',
  }
})
