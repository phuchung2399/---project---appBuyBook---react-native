import axios from 'axios';
import * as Config from '../config/URL';
import { Alert } from 'react-native';

export default function callAPI(
  endpoint,
  method = 'GET',
  body = null,
  token = '',
) {
  try {
    return axios({
      method: method,
      url: `${Config.BASE_URL}/${endpoint}`,
      data: body,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
  } catch (e) {
    Alert.alert('Connection Error', 'Could not fetch data from API');
  }
}
