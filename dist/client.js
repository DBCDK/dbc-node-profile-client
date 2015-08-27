'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.verifyEmail = verifyEmail;
exports.createUser = createUser;
exports.getUser = getUser;
exports.loginUser = loginUser;
exports.logoutUser = logoutUser;
exports.init = init;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _es6Promise = require('es6-promise');

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var endpoint = null;

/**
 * TODO: Comment this
 */

function verifyEmail(params) {
  return new _es6Promise.Promise(function (resolve) {
    var url = endpoint + 'api/Profiles/confirm';
    _request2['default'].post({
      url: url,
      form: params
    }, function (err, httpResponse) {
      resolve(httpResponse);
    });
  });
}

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
 * TODO: Comment this
 */

function getUser(params) {
  return new _es6Promise.Promise(function (resolve) {
    var uid = params.id;
    var accessToken = params.accessToken;
    var url = endpoint + (0, _util2['default'])('api/Profiles/%s?access_token=%s', uid, accessToken);
    _request2['default'].get({
      url: url
    }, function (err, httpResponse) {
      resolve(httpResponse);
    });
  });
}

/**
 * TODO: Comment this
 */

function loginUser(params) {
  return new _es6Promise.Promise(function (resolve) {
    var url = endpoint + 'api/Profiles/login';
    _request2['default'].post({
      url: url,
      form: params
    }, function (err, httpResponse) {
      resolve(httpResponse);
    });
  });
}

/**
 * TODO: Comment this
 */

function logoutUser(params) {
  return new _es6Promise.Promise(function (resolve) {
    var url = endpoint + 'api/Profiles/logout?access_token=' + params.accessToken;
    _request2['default'].post({
      url: url,
      params: {}
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
}

var METHODS = {
  verifyEmail: verifyEmail,
  createUser: createUser,
  getUser: getUser,
  loginUser: loginUser,
  logoutUser: logoutUser
};
exports.METHODS = METHODS;