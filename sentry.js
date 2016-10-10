var raven = require('raven');
var client = undefined;

module.exports = {
  init: function () {
    if(!client){
      var dsn = process.env.SENTRY_DSN;
      if (dsn) {
        client = new raven.Client(dsn, {
          logger: 'default'
        });
        client.patchGlobal();
      }
    }
    return client;
  },

  get sentry(){
    return this.init();
  }
}


