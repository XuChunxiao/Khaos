export default {
    "proxy": {
        "/api": {
          "target": "http://jsonplaceholder.typicode.com/",
          "changeOrigin": true,
          "pathRewrite": { "^/api" : "" }
        }
    },
    "theme": {
      "font-size-base": "12px"
    },
}
