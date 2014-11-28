// Generated by CoffeeScript 1.8.0
(function() {
  var net,
    __slice = [].slice;

  net = require("net");

  module.exports = function() {
    var beg, cb, end, ip, onprob, p, prob, _i;
    beg = arguments[0], p = 3 <= arguments.length ? __slice.call(arguments, 1, _i = arguments.length - 1) : (_i = 1, []), cb = arguments[_i++];
    end = p[0], ip = p[1];
    if (!ip && end && !/^\d+$/.test(end)) {
      ip = end;
      end = 65534;
    } else {
      if (end == null) {
        end = 65534;
      }
      if (ip == null) {
        ip = '0.0.0.0';
      }
    }
    prob = function(ip, port, cb) {
      var s;
      s = net.createServer().listen(port, ip);
      s.on('listening', function() {
        s.close();
        return cb(port);
      });
      return s.on('error', function(err) {
        return cb(null, port + 1);
      });
    };
    onprob = function(port, nextPort) {
      if (port) {
        return cb(null, port);
      } else {
        if (nextPort >= end) {
          return cb("No available ports");
        } else {
          return setImmediate(function() {
            return prob(ip, nextPort, onprob);
          });
        }
      }
    };
    return prob(ip, beg, onprob);
  };

}).call(this);

//# sourceMappingURL=index.js.map
