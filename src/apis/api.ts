import { iotAxios } from "iot-axios";
import { apiMethodsI } from "./types";

const env = process.env.NODE_ENV;

// const env = 'production'
// const envapi = process.env.VUE_APP_BASE_API || 'dev'  //  修改环境变量---历史原因不支持访问非正式域名，暂都改为正式域名
const envapi = "prod"; //服务端限制 必须使用host的方式使用正式环境域名访问
let baseapi = {
  dev: {
    //联调
    // api: 'http://39.107.247.209'
    api: "",
    web: "https://www.haigeek.com/developercenter/static/develop.html#/",
  },
  test: {
    //验收
    // api: 'http://123.57.31.57'
    api: "",
    web: "https://www.haigeek.com/developercenter/static/develop.html#/",
  },
  prod: {
    //正式
    api: "",
    web: "https://www.haigeek.com/developercenter/static/develop.html#/",
  },
  apikaifa: "https://stp.haier.net/mock/290",
};

if (env === "development") {
  baseapi = {
    dev: {
      api: "/apidev",
      // api: '/apikaifa',  //开发时使用
      web: "https://www.haigeek.com/developercenter/static/develop.html#/",
    },
    test: {
      api: "/apitest",
      web: "https://www.haigeek.com/developercenter/static/develop.html#/",
    },
    prod: {
      api: "/apiprod",
      web: "https://www.haigeek.com/developercenter/static/develop.html#/",
    },
    apikaifa: "https://stp.haier.net/mock/290",
  };
}
export default {
  envapi: envapi,
  baseapi: baseapi[envapi],
};

/**
 * @description: 封装请求类
 * @param {method} method 请求方式
 * @param {path} path 请求路径
 * @param {params} params 参数
 * @param {headers} headers 请求头
 */
export const iotRequest = (
  method: keyof typeof apiMethodsI,
  path: string,
  params?: object,
  headers?: object
) => {
  if (method.toLowerCase() === "get") {
    return iotAxios
      .get(baseapi[envapi].api + path, { params: params }, headers)
      .catch((err: any) => {
        if (err.status == "403") {
          // window.loginDateCallback();
        }
      });
  } else {
    return iotAxios
      .post(baseapi[envapi].api + path, params, headers)
      .catch((err: any) => {
        if (err.status == "403") {
          // window.loginDateCallback();
        }
      });
  }
};
