// @flow

import ethers from 'ethers';
import ERC20ABI from './ERC20ABI.json';
import NationsABI from './NationABI.json';
import type { NetworkType } from '../../types/Account';

export default class EthereumService {
  wallet: Object;
  nations: Object;
  network: NetworkType;
  constructor(wallet: Object, network: NetworkType) {
    this.wallet = wallet;
    this.network = network;
    const abi = NationsABI;
    this.nations = new ethers.Contract(network === 'dev' ? '0x559f57f7dbe737319f8d28f8a94f1dcee9f468ad' : '0xa014847cff475826804f2e0a178096b10eeed7a7', abi, this.wallet);
  }
  /**
   * @desc Function to get the balance of the given wallet
   *
   * @return {Promise} Promise that resolves with the balance in BN form
   */
  async getBalance(): Promise<void> {
    const balance = await this.wallet.getBalance('latest');
    return balance;
  }

  /**
   * @desc Function to get the balance of the given wallet
   *
   * @param {string} tokenAddress The address of the deployed token contract
   *
   * @return {Promise} Promise that resolves with the balance in BN form
   */
  async getTokenBalance(tokenAddress: string): Promise<void> {
    const abi = ERC20ABI;
    const contract = new ethers.Contract(tokenAddress, abi, this.wallet.provider);
    const balance = await contract.balanceOf(this.wallet.address);
    return balance;
  }

  /**
   * @desc Function to send tokens to an ethereum address
   *
   * @param {string} tokenAddress The address of the deployed token contract
   * @param {string} toAddress The hex address of the recipient of the tokens
   * @param {string} tokenAmount The amount of tokens that you wish to send.
   *
   * @return {Promise} Promise that resolves with the transaction hash
   */
  async sendTokens(tokenAddress: string, toAddress: string, tokenAmount: string) {
    const abi = ERC20ABI;
    const contract = new ethers.Contract(tokenAddress, abi, this.wallet);
    const formattedTokenAmount = ethers.utils.parseUnits(tokenAmount, 18);
    const overrideOptions = {
      gasLimit: 1000000,
    };
    const transactionHash = await contract.transfer(toAddress, formattedTokenAmount, overrideOptions);
    return transactionHash;
  }

  /**
   * @desc Function to estimate how much gas will be used for any transaction
   *
   * @param {string} gasPrice The price of gas in gwei
   * @param {string} data The data that needs to be sent with the transaction
   *
   * @return {Promise} Promise that resolves with the estimated gas in BN form
   */
  async estimateGas(gasPrice: string, data: string): Promise<void> {
    const transaction = {
      gasPrice: ethers.utils.bigNumberify(gasPrice),
      to: '0xF0D346A86A68086846363185d24D5893F4353A78',
      data,
      value: ethers.utils.parseEther('0.1'),
    };

    const gasEstimate = await this.wallet.estimateGas(transaction);

    return gasEstimate;
  }

  /**
   * @desc Function to send ether to an ethereum address
   *
   * @param {string} toAddress The address to send the ether to
   * @param {string} amount The amount of ether to be sent. (In ETH)
   *
   * @return {Promise} Promise that resolves with the transaction hash
   */
  sendMoney(toAddress: string, amount: string): Promise<void> {
    const transaction = {
      gasLimit: 21000,
      to: toAddress,
      data: '0x',
      value: ethers.utils.parseEther(amount),
    };
    return this.wallet.sendTransaction(transaction);
  }

  /**
   * @desc Function to track a transaction.
   *
   * @param {string} transactionHash The hash of the transaction that you want to track
   *
   * @return {Promise} Promise that resolves when the transaction is successfully mined.
   */
  trackTransaction(transactionHash: string): Promise<void> {
    return this.wallet.provider.waitForTransaction(transactionHash);
  }

  /**
   * @desc Function to get receipt of a transaction.
   *
   * @param {string} transactionHash The hash of the transaction that you want to get receipt of.
   *
   * @return {Promise} Promise that resolves with receipt object.
   */
  getTransactionReceipt(transactionHash: string): Promise<Object> {
    return this.wallet.provider.getTransactionReceipt(transactionHash);
  }
}