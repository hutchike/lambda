#!/usr/bin/env node

var AWS = require('aws-sdk'),
    ENV = process.env,
    ARGV = process.argv,
    lambda = new AWS.Lambda({
      accessKeyId:     ENV.LAMBDA_ACCESS_KEY,
      secretAccessKey: ENV.LAMBDA_SECRET_KEY,
      region:          ENV.LAMBDA_REGION || 'us-east-1',
      sslEnabled:      true
    });

module.exports = (function() {
  function handleError(err, verbose) {
    if (err === null) return;
    console.log(verbose ? err.stack : err.code + ': ' + err.message);
    process.exit();
  }

  function gotFunctionList(err, data) {
    handleError(err);
    console.log(data);
  }

  function gotInvoked(err, data) {
    handleError(err);
    console.log(JSON.parse(data.Payload));
  }

  function cli() {
    var cmd = ARGV[2],
        arg1 = ARGV[3],
        arg2 = ARGV[4];
    switch (cmd) {
      case 'list':
        lambda.listFunctions(gotFunctionList);
        break;

      case 'invoke':
        lambda.invoke({
          FunctionName: arg1,
          Payload: arg2
        }, gotInvoked);
        break;
    }
  }

  return {
    cli: cli
  }
})(global)

if (__filename == process.argv[1]) {
  // Maybe write some tess here?
}
