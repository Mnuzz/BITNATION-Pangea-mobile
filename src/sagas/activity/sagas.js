/* eslint-disable */

import uuid from 'uuid4';
import { call, put, take } from 'redux-saga/effects';

import { doneFetchMessages, messageAdded } from '../../actions/activity';
import { factory as dbFactory } from '../../services/database';
import { convertFromDatabase, convertToDatabase } from '../../utils/mapping/activity';
import type { ActivityLogMessage } from '../../types/ActivityLogMessage';
import { createDatabaseUpdateChannel } from '../database';

export function* fetchMessagesSaga(action) {
  try {
    const db = yield call(dbFactory);
    const messages = db.objects('MessageJob');
    yield put(doneFetchMessages(messages));
  } catch (error) {
    console.log(`Activity messages fetch failed with error: ${error.toString()}`);
  }
}

export function* watchNewMessages(): Generator<*, *, *> {
  const db = yield call(dbFactory);
  const results = db.objects('MessageJob');
  const channel = createDatabaseUpdateChannel(results);
  while (true) {
    const { collection } = yield take(channel);
    yield put(messageAdded(collection.map(convertFromDatabase)));
  }
}

const buildMessageObject = (message, params, interpret): ActivityLogMessage => ({
  id: uuid(),
  msg: message,
  params: JSON.stringify(params),
  interpret
});

export function* addNewMessageSaga(action) {
  const db = yield call(dbFactory);
  let params = action.params || {};
  let interpret = action.interpret === false ? false : true
  const convertedMessage = convertToDatabase(buildMessageObject(action.message, params, interpret));
  if (convertedMessage === null) {
    action.callback(false);
  } else {
    db.write(() => {
      db.create('MessageJob', convertedMessage);
    });
    action.callback(true);
  }
}
