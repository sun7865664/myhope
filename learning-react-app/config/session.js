module.exports = {
  secret: '12345',
  name: 'node-web-demo', //这里的name值得是cookie的name，默认cookie的name是：connect.sid
  cookie: {
      maxAge: 1800000
  }, //设置maxAge是1800000ms，即1800s后session和相应的cookie失效过期
  resave: true,
  saveUninitialized: false,
  rolling: true
};
