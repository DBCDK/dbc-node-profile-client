'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = ProfileClient;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

/**
 * Verifies a Profile in Loopback using verification token sent by email.
 */
function verifyEmail(endpoint, params) {
  return new Promise(function (resolve) {
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
function createProfile(endpoint, params) {
  return new Promise(function (resolve) {
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
function getProfile(endpoint, params) {
  return new Promise(function (resolve) {
    var id = params.id;
    var accessToken = params.accessToken;
    var filter_str = JSON.stringify({ include: ['likes', 'groups'] });
    var url = endpoint + 'api/Profiles/' + id + '?access_token=' + accessToken + '&filter=' + filter_str;
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
function createGroup(endpoint, params) {
  return new Promise(function (resolve) {
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
 * Makes a Profile member of a Group in Loopback
 */
function joinGroup(endpoint, params) {
  return new Promise(function (resolve) {
    var groupId = params.groupId;
    var memberId = params.memberId;
    var url = endpoint + 'api/Groups/' + groupId + '/members/rel/' + memberId;
    _request2['default'].put({
      url: url,
      form: params
    }, function (err, httpResponse) {
      resolve(httpResponse);
    });
  });
}

/**
 * Remove a Profile member from a Group in Loopback
 */
function leaveGroup(endpoint, params) {
  return new Promise(function (resolve) {
    var groupId = params.groupId;
    var memberId = params.memberId;
    var url = endpoint + 'api/Groups/' + groupId + '/members/rel/' + memberId;
    _request2['default'].del({
      url: url,
      form: params
    }, function (err, httpResponse) {
      resolve(httpResponse);
    });
  });
}

/**
 * Persist Group to Loopback
 */
function updateGroup(endpoint, params) {
  var id = params.id;
  var accessToken = params.accessToken;
  return new Promise(function (resolve) {
    var url = endpoint + 'api/Groups/' + id + '?access_token=' + accessToken;
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
 * Fetches a Group in Loopback
 */
function getGroup(endpoint, params) {
  return new Promise(function (resolve) {
    var id = params.id; // {include: ['owner', {comments: ['owner']}]}
    var filter_str = JSON.stringify({ include: [{ posts: ['owner', { comments: ['owner'] }] }, 'members'] });
    var url = endpoint + 'api/Groups/' + id + '?filter=' + filter_str;
    _request2['default'].get({
      url: url
    }, function (err, httpResponse) {
      resolve(httpResponse);
    });
  });
}

/**
 * Searches through Groups in Loopback
 */
function queryGroups(endpoint, params) {
  return new Promise(function (resolve, reject) {
    var accessToken = params.accessToken;
    var pattern = new RegExp('.*' + params.query + '.*', 'i');
    var filter_str = JSON.stringify({ where: { name: { regexp: pattern.toString() } }, include: ['members'] });
    var url = endpoint + 'api/Groups?access_token=' + accessToken + '&filter=' + filter_str;
    _request2['default'].get({ url: url }, function (err, res) {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
}

/**
 * Create a Post
 */
function createGroupPost(endpoint, params) {
  return new Promise(function (resolve, reject) {
    var accessToken = params.accessToken;
    var groupId = params.groupId;
    var url = endpoint + 'api/Groups/' + groupId + '/posts?access_token=' + accessToken;
    var postBody = {
      title: params.title,
      content: params.content,
      timeCreated: new Date().toUTCString(),
      postownerid: params.postownerid
    };

    _request2['default'].post({
      url: url,
      json: true,
      body: postBody
    }, function (err, res) {
      if (err) {
        reject(err);
      }

      resolve(res);
    });
  });
}

/**
 * Gets a specific Post
 */
function getGroupPost(endpoint, params) {
  return new Promise(function (resolve, reject) {
    var accessToken = params.accessToken;
    var postId = params.postId;
    var filter_str = JSON.stringify({ include: ['owner', { comments: ['owner'] }] });
    var url = endpoint + 'api/Posts/' + postId + '?access_token' + accessToken + '&filter=' + filter_str;
    _request2['default'].get({ url: url }, function (err, res) {
      if (err) {
        reject(err);
      }

      resolve(res);
    });
  });
}

/**
 * Update a specific Post
 */
function updateGroupPost(endpoint, params) {
  return new Promise(function (resolve, reject) {
    var accessToken = params.accessToken;
    var postId = params.postId;
    var url = endpoint + 'api/Posts/' + postId + '?access_token' + accessToken;
    var putBody = {
      title: params.title,
      content: params.content
    };
    _request2['default'].put({
      url: url,
      json: true,
      body: JSON.stringify(putBody)
    }, function (err, res) {
      if (err) {
        reject(err);
      }

      resolve(res);
    });
  });
}

/**
 * Delete a specific Post
 */
function removeGroupPost(endpoint, params) {
  return new Promise(function (resolve) {
    var accessToken = params.accessToken;
    var postId = params.postId;
    var url = endpoint + 'api/Posts/' + postId + '?access_token' + accessToken;
    _request2['default'].del({ url: url }, function (err, res) {
      resolve(res.statusCode === 204);
    });
  });
}

/**
 * Comments on a post
 */
function commentOnGroupPost(endpoint, params) {
  return new Promise(function (resolve, reject) {
    var accessToken = params.accessToken;
    var postId = params.postId;
    var uid = params.uid;
    var commentContent = params.commentText;
    var url = endpoint + 'api/Comments?access_token' + accessToken;
    _request2['default'].post({
      url: url,
      json: true,
      body: JSON.stringify({
        content: commentContent,
        timeCreated: new Date().toUTCString(),
        commentownerid: uid,
        postid: postId
      })
    }, function (err, resp) {
      if (err) {
        reject(err);
      }

      resolve(resp);
    });
  });
}

/**
 * Persist Profile to Loopback
 */
function updateProfile(endpoint, params) {
  var id = params.id;
  var accessToken = params.accessToken;
  return new Promise(function (resolve) {
    var url = endpoint + 'api/Profiles/' + id + '?access_token=' + accessToken;
    _request2['default'].put({
      url: url,
      body: params,
      json: true
    }, function (err, httpResponse) {
      resolve(httpResponse);
    });
  });
}

/**
 * Login Profile in Loopback
 */
function loginProfile(endpoint, params) {
  return new Promise(function (resolve) {
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
function logoutProfile(endpoint, params) {
  return new Promise(function (resolve) {
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
function saveLike(endpoint, params) {
  var uid = params.uid;
  var accessToken = params.accessToken;
  var item_id = params.item_id;
  var value = params.value;

  return new Promise(function (resolve) {
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
function updateLike(endpoint, params) {
  var uid = params.uid;
  var accessToken = params.accessToken;
  var value = params.value;
  var id = params.id;

  return new Promise(function (resolve) {
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
function removeLike(endpoint, params) {
  var uid = params.uid;
  var accessToken = params.accessToken;
  var id = params.id;

  return new Promise(function (resolve) {
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
 * Remove all likes on a users profile
 *
 * @param {object} params
 * @return {Promise}
 */
function resetLikes(endpoint, params) {
  var uid = params.uid;
  var accessToken = params.accessToken;

  return new Promise(function (resolve) {
    var url = endpoint + 'api/Profiles/' + uid + '/likes?access_token=' + accessToken;
    _request2['default'].del({
      url: url,
      form: {}
    }, function (err, httpResponse) {
      resolve(httpResponse);
    });
  });
}

/**
 * Requests a specific user profile from the profile service.
 * @param {{agencyid: string, loanerid: string}} params
 * @see http://profile-i01.dbc.dk:3001/explorer/#!/MobilSoegProfiles/findMobilSoegProfile
 */
function findMobilSoegProfile(endpoint, params) {
  var loanerid = params.loanerid;
  var agencyid = params.agencyid;

  var url = endpoint + 'api/MobilSoegProfiles/findMobilSoegProfile';

  return new Promise(function (resolve, reject) {
    _request2['default'].get({
      url: url,
      json: {
        agencyid: agencyid,
        loanerid: loanerid
      }
    }, function (err, httpResponse) {
      if (err) {
        reject({ err: err, httpResponse: httpResponse });
      } else {
        resolve(httpResponse);
      }
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

function ProfileClient() {
  var config = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

  if (!config || !config.endpoint) {
    throw new Error('Expected config object but got null or no endpoint provided');
  }

  return {
    verifyEmail: verifyEmail.bind(null, config.endpoint),
    createProfile: createProfile.bind(null, config.endpoint),
    updateProfile: updateProfile.bind(null, config.endpoint),
    getProfile: getProfile.bind(null, config.endpoint),
    loginProfile: loginProfile.bind(null, config.endpoint),
    logoutProfile: logoutProfile.bind(null, config.endpoint),
    getGroup: getGroup.bind(null, config.endpoint),
    joinGroup: joinGroup.bind(null, config.endpoint),
    leaveGroup: leaveGroup.bind(null, config.endpoint),
    createGroup: createGroup.bind(null, config.endpoint),
    updateGroup: updateGroup.bind(null, config.endpoint),
    queryGroups: queryGroups.bind(null, config.endpoint),
    createGroupPost: createGroupPost.bind(null, config.endpoint),
    getGroupPost: getGroupPost.bind(null, config.endpoint),
    updateGroupPost: updateGroupPost.bind(null, config.endpoint),
    removeGroupPost: removeGroupPost.bind(null, config.endpoint),
    commentOnGroupPost: commentOnGroupPost.bind(null, config.endpoint),
    saveLike: saveLike.bind(null, config.endpoint),
    removeLike: removeLike.bind(null, config.endpoint),
    updateLike: updateLike.bind(null, config.endpoint),
    resetLikes: resetLikes.bind(null, config.endpoint),
    findMobilSoegProfile: findMobilSoegProfile.bind(null, config.endpoint)
  };
}

module.exports = exports['default'];