'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.verifyEmail = verifyEmail;
exports.createProfile = createProfile;
exports.getProfile = getProfile;
exports.getGroup = getGroup;
exports.createGroup = createGroup;
exports.getGroup = getGroup;
exports.updateProfile = updateProfile;
exports.loginProfile = loginProfile;
exports.logoutProfile = logoutProfile;
exports.saveLike = saveLike;
exports.updateLike = updateLike;
exports.removeLike = removeLike;
exports.init = init;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _es6Promise = require('es6-promise');

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var endpoint = null;

/**
 * Verifies a Profile in Loopback using verification token sent by email.
 */

function verifyEmail(params) {
  return new _es6Promise.Promise(function (resolve) {
    var url = endpoint + 'api/Profiles/confirm';

    _request2['default'].get({
      url: url,
      qs: params
    }, function (err, httpResponse) {
      resolve(httpResponse);
    });
  });
}

/**
 * Creates a new Profile in Loopback
 */

function createProfile(params) {
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
 * Fetches a Profile in Loopback
 */

function getProfile(params) {
  return new _es6Promise.Promise(function (resolve) {
    var id = params.id;
    var accessToken = params.accessToken;
    var filter_str = JSON.stringify({ include: 'likes' });
    var url = endpoint + 'api/Profiles/' + id + '?access_token=' + accessToken + '&filter=' + filter_str;
    _request2['default'].get({
      url: url
    }, function (err, httpResponse) {
      resolve(httpResponse);
    });
  });
}

/**
 * Fetches a Group in Loopback
 */

function getGroup(params) {
  return new _es6Promise.Promise(function (resolve) {
    var id = params.id;
    var accessToken = params.accessToken;
    var filter_str = JSON.stringify({ include: 'posts' });
    var url = endpoint + 'api/Groups/' + id + '?access_token=' + accessToken + '&filter=' + filter_str;
    _request2['default'].get({
      url: url
    }, function (err, httpResponse) {
      resolve(httpResponse);
    });
  });
}

/**
 * Creates a new Group in Loopback
 */

function createGroup(params) {
  return new _es6Promise.Promise(function (resolve) {
    var url = endpoint + 'api/Groups';
    _request2['default'].post({
      url: url,
      form: params
    }, function (err, httpResponse) {
      resolve(httpResponse);
    });
  });
}

/**
 * Fetches a Group in Loopback
 */

function getGroup(params) {
  return new _es6Promise.Promise(function (resolve) {
    var id = params.id;
    var accessToken = params.accessToken;
    var filter_str = JSON.stringify({ include: 'posts' });
    var url = endpoint + 'api/Groups/' + id + '?access_token=' + accessToken + '&filter=' + filter_str;
    _request2['default'].get({
      url: url
    }, function (err, httpResponse) {
      resolve(httpResponse);
    });
  });
}

/**
 * Persist Profile to Loopback
 */

function updateProfile(params) {
  var id = params.id;
  var accessToken = params.accessToken;
  return new _es6Promise.Promise(function (resolve) {
    var url = endpoint + 'api/Profiles/' + id + '?access_token=' + accessToken;
    _request2['default'].put({
      url: url,
      body: JSON.stringify(params),
      json: true
    }, function (err, httpResponse) {
      resolve(httpResponse);
    });
  });
}

/**
 * Login Profile in Loopback
 */

function loginProfile(params) {
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

function logoutProfile(params) {
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
 * Save a like on a users profile
 *
 * @param {object }params
 * @return {Promise}
 */

function saveLike(params) {
  var uid = params.uid;
  var accessToken = params.accessToken;
  var item_id = params.item_id;
  var value = params.value;

  return new _es6Promise.Promise(function (resolve) {
    var url = endpoint + 'api/Profiles/' + uid + '/likes?access_token=' + accessToken;
    _request2['default'].post({
      url: url,
      form: {
        item_id: item_id,
        value: value
      }
    }, function (err, httpResponse) {
      resolve(httpResponse);
    });
  });
}

/**
 * Update a like on a users profile
 *
 * @param {object} params
 * @return {Promise}
 */

function updateLike(params) {
  var uid = params.uid;
  var accessToken = params.accessToken;
  var value = params.value;
  var id = params.id;

  return new _es6Promise.Promise(function (resolve) {
    var url = endpoint + 'api/Profiles/' + uid + '/likes/' + id + '?access_token=' + accessToken;
    _request2['default'].put({
      url: url,
      form: {
        value: value
      }
    }, function (err, httpResponse) {
      resolve(httpResponse);
    });
  });
}

/**
 * Remove a like on a users profile
 *
 * @param {object} params
 * @return {Promise}
 */

function removeLike(params) {
  var uid = params.uid;
  var accessToken = params.accessToken;
  var id = params.id;

  return new _es6Promise.Promise(function (resolve) {
    var url = endpoint + 'api/Profiles/' + uid + '/likes/' + id + '?access_token=' + accessToken;
    _request2['default'].del({
      url: url,
      form: {}
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
  createProfile: createProfile,
  updateProfile: updateProfile,
  getProfile: getProfile,
  loginProfile: loginProfile,
  logoutProfile: logoutProfile,
  getGroup: getGroup,
  createGroup: createGroup,
  saveLike: saveLike,
  removeLike: removeLike,
  updateLike: updateLike
};
exports.METHODS = METHODS;