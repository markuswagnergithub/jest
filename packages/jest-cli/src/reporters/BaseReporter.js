/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */
'use strict';

import type {AggregatedResult, TestResult} from 'types/TestResult';
import type {Config} from 'types/Config';
import type {RunnerContext} from 'types/Reporters';

class BaseReporter {
  _error: ?Error;

  log(message: string) {
    process.stderr.write(message + '\n');
  }

  onRunStart(config: Config, results: AggregatedResult) {}

  onTestResult(
    config: Config,
    testResult: TestResult,
    results: AggregatedResult,
  ) {}

  onRunComplete(
    config: Config,
    aggregatedResults: AggregatedResult,
    runnerContext: RunnerContext,
  ): ?Promise<any> {}

  _write(string: string) {
    // If we write more than one character at a time it is possible that
    // node exits in the middle of printing the result.
    // If you are reading this and you are from the future, this might not
    // be true any more.
    for (let i = 0; i < string.length; i++) {
      process.stderr.write(string.charAt(i));
    }
    process.stderr.write('\n');
  }

  _setError(error: Error) {
    this._error = error;
  }

  // Return an error that occured during reporting. This error will
  // define whether the test run was successful or failed.
  getLastError(): ?Error {
    return this._error;
  }
}

module.exports = BaseReporter;
