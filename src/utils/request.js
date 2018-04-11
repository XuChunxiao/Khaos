import axios from 'axios';
import { Modal } from 'antd';
import qs from 'qs';
/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
const alertModel = (title, refresh) => {
  Modal.error({
    title,
    onOk() {
      if (refresh) {
        window.location.reload();
      }
    },
  });
};

export default function request(url, options) {
  const { acctId } = sessionStorage;
  const postData = {
    ...options,
    acctId,
  };
  // add cookie support
  axios.defaults.withCredentials = true;
  // if noqs is true. do not use qs stringify
  const finalData = options.noqs ? options.form : qs.stringify(postData);
  return axios.post(url, finalData)
    .then((response) => {
      let ret = {};
      try {
        if (response.data) {
          if (response.data.error) {
            Modal.error({
              title: response.data.error,
            });
          }
          ret = response.data;
          ret.headers = {};
          return ret;
        } else {
          return ret;
        }
      } catch (error) {
        console.error(error);
      }
    })
    .catch((error) => {
      const { message, response, config = {} } = error;
      const { url: requestUrl = '' } = config;
      if (message == 'Network Error') {
        alertModel('网络连接失败，请刷新页面后重试', true);
      } else if (response && response instanceof Object) {
        const { data, statusText } = response;
        const statusCode = response.status;
        const msg = data.message || statusText;
        switch (true) {
          case statusCode == 404:
            alertModel(`服务 ${requestUrl} 请求失败`);
            break;
          case statusCode == 400:
            alertModel('服务请求参数不符合规范');
            break;
          case statusCode == 403:
            alertModel('服务被拒绝');
            break;
          case statusCode >= 500 && statusCode <= 503:
            alertModel('服务内部错误');
            break;
          default:
            alertModel(`服务错误码${statusCode}`);
        }
        console.log(statusCode, msg);
      } else {
        alertModel('获取服务失败，请刷新页面后重试', true);
      }
      console.error(error);
    });
}

