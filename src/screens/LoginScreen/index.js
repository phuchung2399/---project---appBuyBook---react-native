import React, {Component} from 'react';;
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';;
import Title from '../../components/Login/Title';;
import Input from '../../components/Login/Input';;
import {Navigation} from 'react-native-navigation';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: '',
        password: 'string',
      },
    };
  }
  getData = (name, text) => {
    this.setState({
      user: {
        ...this.state.user,
        [name]: text,
      },
    });
  };

  onPressLogin = () => {
    console.log('Test Login');
  //  console.log(this.state.user);
  };

  onPressRegister = () => {
    console.log('Test Register');

    // Navigation.setRoot({
    //   root: {
    //     component: {
    //       name: 'Register',
    //       passProps: {
    //         text: 'This is a left side menu screen'
    //       }
    //     }
    //   }
    // });
  };

  render() {
    return (
      <ScrollView style={styles.main}>
        <Text style={styles.textTitle}>Login</Text>
        <View style={styles.row1} />
        <View style={styles.row1}>
          <Title title="Tên đăng nhập" />
          <Input name="email" getData={this.getData} />
        </View>
        <View style={styles.row1}>
          <Title title="Mật khẩu" />
          <Input name="password" getData={this.getData} autoCapitalize="none" />
        </View>
        <View style={styles.styleRowButton}>
          <TouchableOpacity
            style={styles.styleButtomLogin}
            onPress={this.onPressLogin}>
            <Title title="Đăng Nhập" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.onPressRegister}
            style={styles.styleButtomRegister}>
            <Title title="Đăng Ký" />
          </TouchableOpacity>
        </View>
        <Text style={styles.textBottom}>Quên mật khẩu?</Text>
      </ScrollView>
    );;
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  row1: {
    paddingRight: 20,
    paddingLeft: 20,
    flex: 1,
    flexDirection: 'column',
  },
  textTitle: {
    fontFamily: 'SVN-ProximaNova',
    marginTop: 20,
    marginBottom: 30,
    fontSize: 40,
    color: '#4a4a4a',
    textAlign: 'center',,
  },
  styleRowButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    paddingVertical: 20,
    alignItems: 'center',
    margin: 5,
  },
  styleButtomRegister: {
    borderColor: '#41b8c1',
    borderWidth: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#41b8c1',
    width: 150,
    borderRadius: 10,,
  },
  styleButtomLogin: {
    borderColor: '#41b8c1',
    borderWidth: 1,
    alignItems: 'center',
    padding: 20,
    width: 150,
    borderRadius: 10,,
  },
  textBottom: {
    fontFamily: 'SVN-ProximaNova',

    fontSize: 15,
    color: '#c0c0c0',
    textAlign: 'center',,
  },
});

;