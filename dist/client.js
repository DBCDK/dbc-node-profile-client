'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.createUser = createUser;
exports.init = init;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _es6Promise = require('es6-promise');

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var endpoint = null;

/**
 * TODO: Comment this
 */

function createUser(params) {
  return new _es6Promise.Promise(function (resolve) {
    var url = endpoint + 'api/Profiles';

    _request2['default'].post({
      url: url,
      form: params
    }, function (err, httpResponse) {
      resolve(httpResponse);
    });
  });
}

/**
 * Setting the necessary paramerters for the client to be usable.
 * The endpoint is only set if endpoint is null to allow setting it through
 * environment variables.
 *
 * @param {Object} config Config object with the necessary parameters to use
 * the webservice
 */

function init() {
  var config = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

  if (!config || !config.endpoint) {
    throw new Error('Expected config object but got null or no endpoint provided');
  }

  endpoint = config.endpoint;

  return { createUser: createUser };
}

var METHODS = {
  createUser: createUser
};
exports.METHODS = METHODS;