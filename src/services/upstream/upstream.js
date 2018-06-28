// @flow

import ethers from 'ethers';
import { NativeEventEmitter, NativeModules } from 'react-native';
import Realm from 'realm';
import Navigation from 'react-native-navigation';

import type { MessageKeyType } from '../../types/Message';

// Javascript static code of the proto file
import { api_proto as apiProto } from './compiled';

import EthereumService from '../ethereum';
import { errorAlert } from '../../global/alerts';
import i18n from '../../global/i18n';

const { Panthalassa } = NativeModules;
const { Response, Request } = apiProto;

const RESPONSE_TIMEOUT = 20;

export default class UpstreamService {
  eventsSubscription: any;
  ethereumService: EthereumService;
  dbPromise: Promise<Realm>;
  currentAccountId: string;

  constructor(ethereumService: EthereumService, dbPromise: Promise<Realm>, accountId: string) {
    this.ethereumService = ethereumService;
    this.dbPromise = dbPromise;
    this.currentAccountId = accountId;
  }

  startSubscribe = () => {
    const emitter = new NativeEventEmitter(Panthalassa);
    this.eventsSubscription = emitter.addListener(
      'PanthalassaUpStream',
      request => this.handleRequest(request),
    );
  };

  handleRequest = async (request: any) => {
    try {
      const decoded = Request.decode(request);

      if (decoded.dRKeyStoreGet !== null) {
        await this.handleDRKeyStoreGet(decoded.requestID, decoded.dRKeyStoreGet);
      } else if (decoded.dRKeyStorePut !== null) {
        await this.handleDRKeyStorePut(decoded.requestID, decoded.dRKeyStorePut);
      } else if (decoded.dRKeyStoreDeleteMK !== null) {
        await this.handleDRKeyStoreDeleteMK(decoded.requestID, decoded.dRKeyStoreDeleteMK);
      } else if (decoded.dRKeyStoreDeleteKeys !== null) {
        await this.handleDRKeyStoreDeleteKeys(decoded.requestID, decoded.dRKeyStoreDeleteKeys);
      } else if (decoded.dRKeyStoreCount !== null) {
        await this.handleDRKeyStoreCount(decoded.requestID, decoded.dRKeyStoreCount);
      } else if (decoded.dRKeyStoreAll !== null) {
        await this.handleDRKeyStoreAll(decoded.requestID);
      } else if (decoded.showModal !== null) {
        await this.handleShowModal(decoded.requestID, decoded.showModal);
      } else if (decoded.sendEthereumTransaction !== null) {
        await this.handleSendEthereumTransaction(decoded.requestID, decoded.sendEthereumTransaction);
      } else if (decoded.saveDApp !== null) {
        await this.handleSaveDApp(decoded.requestID, decoded.saveDApp);
      } else {
        await this.handleErrorMessage(decoded.requestID, decoded);
      }
    } catch (e) {
      console.log('====================================');
      console.log('error =', e);
      console.log('====================================');
    }
  };

  handleDRKeyStoreGet = async (id: string, info: any) => {
    const { drKey, messageNumber } = info;
    try {
      const message = await this.getMessageKeyModel(drKey, messageNumber);
      return this.sendSuccessResponse(id, {
        messageKey: message.messageKey,
      });
    } catch (error) {
      return this.sendErrorResponse(id, error);
    }
  };

  handleDRKeyStorePut = async (id: string, info: any) => {
    const { key: drKey, messageNumber, messageKey } = info;
    const db = await this.dbPromise;
    let drKeyModel;
    try {
      drKeyModel = await this.getDRKeyModel(drKey);
    } catch (_) {
      try {
        db.write(() => {
          drKeyModel = db.create('DoubleRatchetKey', {
            accountId: this.currentAccountId,
            doubleRatchetKey: drKey,
          });
        });
      } catch (error) {
        return this.sendErrorResponse(id, error);
      }
    }
    try {
      db.write(() => {
        const createdKey = db.create('MessageKey', {
          messageKey,
          messageNumber,
        });
        drKeyModel.messageKeys.push(createdKey);
      });
      return this.sendSuccessResponse(id, {});
    } catch (error) {
      return this.sendErrorResponse(id, error);
    }
  };

  handleDRKeyStoreDeleteMK = async (id: string, info: any) => {
    const { key: drKey, msgNum: messageNumber } = info;
    try {
      const db = await this.dbPromise;
      const message = await this.getMessageKeyModel(drKey, messageNumber);
      db.write(() => {
        db.delete(message);
      });
      return this.sendSuccessResponse(id, {});
    } catch (error) {
      return this.sendErrorResponse(id, error);
    }
  };

  handleDRKeyStoreDeleteKeys = async (id: string, info: any) => {
    const { key: drKey } = info;
    try {
      const db = await this.dbPromise;
      const drKeyModel = await this.getDRKeyModel(drKey);
      db.write(() => {
        drKeyModel.messageKeys.forEach((messageKey) => {
          db.delete(messageKey);
        });
      });
      return this.sendSuccessResponse(id, {});
    } catch (error) {
      return this.sendErrorResponse(id, error);
    }
  };
  handleDRKeyStoreCount = async (id: string, info: any) => {
    const { key: drKey } = info;
    try {
      const drKeyModel = await this.getDRKeyModel(drKey);
      return this.sendSuccessResponse(id, {
        count: drKeyModel.messageKeys.length,
      });
    } catch (error) {
      return this.sendErrorResponse(id, error);
    }
  };
  handleDRKeyStoreAll = async (id: string) => {
    const db = await this.dbPromise;
    const drKeyModels = db.objects('DoubleRatchetKey').filtered(`accountId == '${this.currentAccountId}'`);
    return this.sendSuccessResponse(id, {
      all: drKeyModels.map((drKeyModel) => {
        const messageKeys = {};
        drKeyModel.messageKeys.forEach((messageKeyModel) => {
          messageKeys[messageKeyModel.messageKeys] = messageKeyModel.messageKey;
        });

        return {
          key: drKeyModel.doubleRatchetKey,
          messageKeys,
        };
      }),
    });
  };

  handleShowModal = (id: string, info: any) => {
  };
  handleSaveDApp = () => {
  };
  handleSendEthereumTransaction = async (id: string, info: any) => {
    const { value, to, data } = info;

    const transaction = {
      to,
      data,
      value: ethers.utils.parseEther(value),
    };
    try {
      const txDetails = await this.ethereumService.wallet.sendTransaction(transaction);
      return this.sendSuccessResponse(id, {
        nonce: txDetails.nonce,
        gasPrice: txDetails.gasPrice.toString(),
        gasLimit: txDetails.gasLimit.toString(),
        value: txDetails.value.toString(),
        to: txDetails.to,
        data: txDetails.data,
        chainId: txDetails.chainId,
        from: txDetails.from,
        hash: txDetails.hash,
        v: txDetails.v,
        r: txDetails.r,
        s: txDetails.s,
      });
    } catch (error) {
      return this.sendErrorResponse(id, error);
    }
  };

  handleErrorMessage = async (id: string, info: any) => this.sendErrorResponse(id, new Error(`Unknown upstream request ${info}`));

  unsubscribe = () => {
    if (this.eventsSubscription) {
      // this.eventsSubscription.remove();
    }
  };

  // Common functions

  sendErrorResponse = async (id: string, error: Error) => Panthalassa.PanthalassaSendResponse({
    id,
    data: Response.encode({}),
    responseError: error,
    timeout: RESPONSE_TIMEOUT,
  });

  sendSuccessResponse = async (id: string, data: any) => Panthalassa.PanthalassaSendResponse({
    id,
    data: Response.encode(data),
    responseError: '',
    timeout: RESPONSE_TIMEOUT,
  });

  getDRKeyModel = async (drKey: string) => {
    const db = await this.dbPromise;
    const drKeyModels = db.objects('DoubleRatchetKey')
      .filtered(`accountId == '${this.currentAccountId}' && doubleRatchetKey == '${drKey}'`);
    if (drKeyModels.length === 0) {
      throw new Error(`No message with drKey ${drKey} found!`);
    }

    return drKeyModels[0];
  };

  getMessageKeyModel = async (drKey: string, messageNumber: string) => {
    const drKeyModel = await this.getDRKeyModel(drKey);
    const messages = drKeyModel.messageKeys.filtered(`messageNumber == ${messageNumber}`);
    if (messages.length === 0) {
      throw new Error(`No message with number ${messageNumber} found!`);
    }

    return messages[0];
  };
}
