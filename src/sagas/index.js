// @flow

import { all, call } from 'redux-saga/effects';

import accounts from './accounts';
import activity from './activity';
import chat from './chat';
import navigation from './navigation';
import key from './key';
import settings from './settings';
import wallet from './wallet';
import serviceContainer from './serviceContainer';
import modifyNation from './modifyNation';
import nations from './nations';
import txProcessor from './txProcessor';
import dApps from './dApps';
import migration from './migration';
import upstream from './upstream';
import documents from './documents';
import contacts from './contacts';

/**
 * @desc Root saga.
 * @return {void}
 */
export default function* rootSaga(): Generator<*, *, *> {
  yield all([
    call(accounts),
    call(activity),
    call(chat),
    call(navigation),
    call(key),
    call(settings),
    call(wallet),
    call(serviceContainer),
    call(modifyNation),
    call(nations),
    call(txProcessor),
    call(migration),
    call(dApps),
    call(migration),
    call(upstream),
    call(documents),
    call(contacts),
  ]);
}
