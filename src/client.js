'use strict';

import {Promise} from 'es6-promise';
import request from 'request';

let endpoint = null;

/**
 * Verifies a Profile in Loopback using verification token sent by email.
 */
export function verifyEmail(params) {
  return new Promise((resolve) => {
    const url = endpoint + 'api/Profiles/confirm';

    request.get({
      url: url,
      qs: params
    }, (err, httpResponse) => {
      resolve(httpResponse);
    });
  });
}

/**
 * Creates a new Profile in Loopback
 */
export function createProfile(params) {
  return new Promise((resolve) => {
    const url = endpoint + 'api/Profiles';
    request.post(
      {
        url: url,
        form: params
      }, (err, httpResponse) => {
        resolve(httpResponse);
      }
    );
  });
}

/**
 * Fetches a Profile in Loopback
 */
export function getProfile(params) {
  return new Promise((resolve) => {
    const id = params.id;
    const accessToken = params.accessToken;
    const filter_str = JSON.stringify({include: 'likes'});
    const url = endpoint + 'api/Profiles/' + id + '?access_token=' + accessToken + '&filter=' + filter_str;
    request.get(
      {
        url: url
      }, function(err, httpResponse) {
        resolve(httpResponse);
      }
    );
  });
}

/**
 * Creates a new Group in Loopback
 */
export function createGroup(params) {
  return new Promise((resolve) => {
    const url = endpoint + 'api/Groups';
    request.post(
      {
        url: url,
        form: params
      }, (err, httpResponse) => {
        resolve(httpResponse);
      }
    );
  });
}

/**
 * Fetches a Group in Loopback
 */
export function getGroup(params) {
  return new Promise((resolve) => {
    const id = params.id;
    const accessToken = params.accessToken;
    const filter_str = JSON.stringify({include: 'posts'});
    const url = endpoint + 'api/Groups/' + id + '?access_token=' + accessToken + '&filter=' + filter_str;
    request.get(
      {
        url: url
      }, function(err, httpResponse) {
        resolve(httpResponse);
      }
    );
  });
}

/**
 * Searches through Groups in Loopback
 */
export function queryGroups(params) {
  return new Promise((resolve, reject) => {
    const accessToken = params.accessToken;
    const filter_str = JSON.stringify({where: {name: {regexp: params.query + '/i'}}});
    const url = endpoint + 'api/Groups?access_token=' + accessToken + '&filter=' + filter_str;
    request.get({url}, (err, res) => {
      if (err) {
        reject(err);
      }

      resolve(res);
    });
  });
}

/**
 * Persist Profile to Loopback
 */
export function updateProfile(params) {
  const id = params.id;
  const accessToken = params.accessToken;
  return new Promise((resolve) => {
    const url = endpoint + 'api/Profiles/' + id + '?access_token=' + accessToken;
    request.put(
      {
        url: url,
        body: JSON.stringify(params),
        json: true
      }, (err, httpResponse) => {
        resolve(httpResponse);
      }
    );
  });
}

/**
 * Login Profile in Loopback
 */
export function loginProfile(params) {
  return new Promise((resolve) => {
    const url = endpoint + 'api/Profiles/login';
    request.post(
      {
        url: url,
        form: params
      }, (err, httpResponse) => {
        resolve(httpResponse);
      }
    );
  });
}

/**
 * TODO: Comment this
 */
export function logoutProfile(params) {
  return new Promise((resolve) => {
    const url = endpoint + 'api/Profiles/logout?access_token=' + params.accessToken;
    request.post(
      {
        url: url,
        params: {}
      }, (err, httpResponse) => {
        resolve(httpResponse);
      }
    );
  });
}

/**
 * Save a like on a users profile
 *
 * @param {object }params
 * @return {Promise}
 */
export function saveLike(params) {
  const uid = params.uid;
  const accessToken = params.accessToken;
  const item_id = params.item_id;
  const value = params.value;

  return new Promise((resolve) => {
    const url = endpoint + 'api/Profiles/' + uid + '/likes?access_token=' + accessToken;
    request.post(
      {
        url: url,
        form: {
          item_id: item_id,
          value: value
        }
      }, (err, httpResponse) => {
        resolve(httpResponse);
      }
    );
  });
}

/**
 * Update a like on a users profile
 *
 * @param {object} params
 * @return {Promise}
 */
export function updateLike(params) {
  const uid = params.uid;
  const accessToken = params.accessToken;
  const value = params.value;
  const id = params.id;

  return new Promise((resolve) => {
    const url = endpoint + 'api/Profiles/' + uid + '/likes/' + id + '?access_token=' + accessToken;
    request.put(
      {
        url: url,
        form: {
          value: value
        }
      }, (err, httpResponse) => {
        resolve(httpResponse);
      }
    );
  });
}

/**
 * Remove a like on a users profile
 *
 * @param {object} params
 * @return {Promise}
 */
export function removeLike(params) {
  const uid = params.uid;
  const accessToken = params.accessToken;
  const id = params.id;

  return new Promise((resolve) => {
    const url = endpoint + 'api/Profiles/' + uid + '/likes/' + id + '?access_token=' + accessToken;
    request.del(
      {
        url: url,
        form: {}
      }, (err, httpResponse) => {
        resolve(httpResponse);
      }
    );
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
export function init(config = null) {

  if (!config || !config.endpoint) {
    throw new Error('Expected config object but got null or no endpoint provided');
  }
  endpoint = config.endpoint;
}

export const METHODS = {
  verifyEmail: verifyEmail,
  createProfile: createProfile,
  updateProfile: updateProfile,
  getProfile: getProfile,
  loginProfile: loginProfile,
  logoutProfile: logoutProfile,
  getGroup: getGroup,
  createGroup: createGroup,
  queryGroups: queryGroups,
  saveLike: saveLike,
  removeLike: removeLike,
  updateLike: updateLike
};
