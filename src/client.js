'use strict';

import {Promise} from 'es6-promise';
import request from 'request';

let endpoint = null;
let profile = null;
let serviceCallback = '';


function setServiceCallback() {
    return endpoint;
}

/**
 * TODO: Comment this
 */
export function createUser(params) {
    return new Promise((resolve, reject) => {
        const url = endpoint + 'api/Profiles';

        console.log(params.email, params.password);

        console.log(request.post);

        request.post(
            {
                url: url,
                form: params
            }, function (err, httpResponse, body) {
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
    serviceCallback = setServiceCallback();

    return {createUser};
}

export const METHODS = {
    createUser: createUser
};
