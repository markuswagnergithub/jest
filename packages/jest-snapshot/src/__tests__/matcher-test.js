/**
 * Copyright (c) 2016-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */
'use strict';

const {toMatchSnapshot} = require('../');

it(`matcher returns matcher name, expected and actual values`, () => {
  const actual = 'a';
  const expected = 'b';
  const matcher = toMatchSnapshot.bind({
    snapshotState: {match: (testName, received) => ({actual, expected})},
  });

  const matcherResult = matcher({a: 1});

  expect(matcherResult).toEqual(
    expect.objectContaining({
      actual,
      expected,
      name: 'toMatchSnapshot',
    }),
  );
});
