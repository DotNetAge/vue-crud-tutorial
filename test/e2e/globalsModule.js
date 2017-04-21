process.env.NODE_ENV = 'testing'
const server = require('../../build/dev-server.js')
const config = require('../../config');
var app_server = undefined
module.exports = {


  before: function (done) {
    app_server = server.listen(config.dev.port, function (err) {
      if (err) {
        console.log(err);
        done(err);
      } else {
        console.log('开发服务器启动侦听...');
        done();
      }
    })
  },
  after: function (done) {
    if (app_server) {
      app_server.close();
    }
    done();
  }
}
