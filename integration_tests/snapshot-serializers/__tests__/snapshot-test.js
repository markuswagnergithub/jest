/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */
'use strict';

describe('snapshot serializers', () => {
  it('works with first plugin', () => {
    const test = {
      foo: 1,
    };
    expect(test).toMatchSnapshot();
  });

  it('works with second plugin', () => {
    const test = {
      bar: 2,
    };
    expect(test).toMatchSnapshot();
  });

  it('works with nested serializable objects', () => {
    const test = {
      foo: {
        bar: 2,
      },
    };
    expect(test).toMatchSnapshot();
  });
});
