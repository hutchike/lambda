#!/usr/bin/env node

var AWS = require('aws-sdk'),
    ENV = process.env,
    lambda = new AWS.Lambda({
      accessKeyId:     ENV.LAMBDA_ACCESS_KEY,
      secretAccessKey: ENV.LAMBDA_SECRET_KEY,
      region:          ENV.LAMBDA_REGION
    });

module.exports = (function() {
  function handleError(err) {
    if (err === null) return;
    console.log(err.code + ': ' + err.message);
    process.exit();
  }

  function gotFunctionList(err, data) {
    handleError(err);
    console.log(data);
  }

  function cli() {
    var cmd = process.argv[2];
    switch (cmd) {
      case 'list':
        lambda.listFunctions(gotFunctionList);
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
