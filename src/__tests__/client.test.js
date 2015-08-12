'use strict';

import * as PopSuggest from '../client.js';
import {assert, expect} from 'chai';

describe('Test methods in client.js', () => {
  /* eslint-disable */
  it('Test init method', () => {
    expect(PopSuggest.init).is.not.null;

    const init = PopSuggest.init;
    assert.isFunction(init, 'init is a function');

    expect(init).to.throw('Expected config object but got null or no endpoint provided');

    let config = {};
    expect(() => init(config)).to.throw('Expected config object but got null or no endpoint provided');

    config = {endpoint: 'test'};
    expect(() => init(config)).to.not.throw(Error);

    assert.property(init(config), 'getSuggestions');
  });

  it('Test getSuggestions Method on good URL', () => {
    let methods = PopSuggest.init({
      name: 'popsuggest',
      endpoint: 'http://devel7:8888/'
    });

    const Promise = PopSuggest.getSuggestions({index: 'term.creator', query: 'Rowl', fields: ['term.creator']});
    return Promise.then((data) => {
      assert.isObject(data, 'got object');
    });
  });

  it('Test getSuggestions Method on bad URL', () => {
    PopSuggest.init({
      name: 'popsuggest',
      endpoint: 'http://devel7:8888/nonexistingurl/'
    });

    const Promise = PopSuggest.getSuggestions({index: 'term.creator', query: 'Rowl', fields: ['term.creator']});

    return Promise.then((data) => {
    }).catch((err) => {
      assert.isObject(err, 'got error object');

      assert.isDefined(err.type, 'Type is defined');
      assert.strictEqual(err.type, 'Error', 'Type equals Error');

      assert.isDefined(err.statusCode, 'statusCode is defined');
      assert.strictEqual(err.statusCode, 404, 'statusCode is 404');

      assert.isDefined(err.statusMessage, 'statusMessage is defined');
      assert.strictEqual(err.statusMessage, 'Not Found', 'statusMessage is "Nor Found"');

      assert.isDefined(err.response, 'response is defined');
      assert.isObject(err.response, 'response is of type object');
    });
  });
  /* eslint-enable */
});
