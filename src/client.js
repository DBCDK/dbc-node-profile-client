'use strict';

import {Promise} from 'es6-promise';
import request from 'request';
import format from 'util';

let endpoint = null;

/**
 * TODO: Comment this
 */
export function verifyEmail(params) {
  return new Promise((resolve) => {
    const url = endpoint + 'api/Profiles/confirm';
    request.post(
      {
        url: url,
        form: params
      }, function (err, httpResponse) {
        resolve(httpResponse);
      }
    );
  });
}

/**
 * TODO: Comment this
 */
export function createUser(params) {
  return new Promise((resolve) => {
    const url = endpoint + 'api/Profiles';
    request.post(
      {
        url: url,
        form: params
      }, function (err, httpResponse) {
        resolve(httpResponse);
      }
    );
  });
}


/**
 * TODO: Comment this
 */
export function getUser(params) {
  return new Promise((resolve) => {
    const uid = params.id;
    const accessToken = params.accessToken;
    const url = endpoint + format('api/Profiles/%s?access_token=%s', uid, accessToken);
    request.get(
      {
        url: url
      }, function (err, httpResponse) {
        resolve(httpResponse);
      }
    );
  });
}


/**
 * TODO: Comment this
 */
export function loginUser(params) {
  return new Promise((resolve) => {
    const url = endpoint + 'api/Profiles/login';
    request.post(
      {
        url: url,
        form: params
      }, function (err, httpResponse) {
        resolve(httpResponse);
      }
    );
  });
}


/**
 * TODO: Comment this
 */
export function logoutUser(params) {
  return new Promise((resolve) => {
    const url = endpoint + 'api/Profiles/logout?access_token=' + params.accessToken;
    request.post(
      {
        url: url,
        params: {}
      }, function (err, httpResponse) {
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
  createUser: createUser,
  getUser: getUser,
  loginUser: loginUser,
  logoutUser: logoutUser
};
