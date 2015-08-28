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
 * Creates a new Profile in Loopback
 */
export function createProfile(params) {
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
      }, function (err, httpResponse) {
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
      }, function (err, httpResponse) {
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
  createProfile: createProfile,
  getProfile: getProfile,
  loginProfile: loginProfile,
  logoutProfile: logoutProfile
};
