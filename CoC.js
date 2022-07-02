'use strict';
var http = require('https');
console.log('Loading function');
exports.handler = function(event, context) {
  console.log('start request to ' + 
    "https://api.clashofclans.com" +
    "/v1/locations/32000006/rankings/clans?limit=10");
  var options = {
    "method": "GET",
    "hostname": "api.clashofclans.com",
    "port": null,
    "path": "/v1/locations/32000006/rankings/clans?limit=10",
    "headers": {
      "authorization": "Bearer SUPER_SECRET_KEY",
      "cache-control": "no-cache"
    }
  };
var req = http.request(options);
  req.on('response', function(res) {
    var chunks = [];
res.on("data", function (chunk) {
      chunks.push(chunk);
    });
res.on("end", function () {
      var body = Buffer.concat(chunks);
      console.log("Got response: " + body.toString());
      context.succeed(body.toString());
    });
  })
  req.on('error', function(e) {
    console.log("Got error: " + e.message);
    context.done(null, 'FAILURE');
  });
  req.end();
console.log('end request to ' + 
    "https://api.clashofclans.com" + 
    "/v1/locations/32000006/rankings/clans?limit=10");
}
