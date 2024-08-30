/* eslint-disable no-nested-ternary */
import Dialog from 'tdesign-miniprogram/dialog/index';
import Toast from 'tdesign-miniprogram/toast/index';
import { dispatchSupplementInvoice } from '../../../services/order/orderConfirm';
import i18n from '../../../i18n/index';
const app = getApp();

const invoiceJson = {
  info: [
    "1. According to rules of tax bureau, a valid business invoice requires a tax registration number. However, a personal invoice doesn't need a taxpayer identification number. ",
    '2. Electronic invoice: An e-invoice is a valid down payment voucher recognized by the tax bureau. It has the same legal effect, purpose, and usage rules as a paper invoice. If you need a paper invoice, you can download and print it yourself. ',
    '3. Value-added tax (VAT) invoice: VAT invoices are currently unavailable. You can refer to the "Issuance of VAT Invoices" or call 400-633-6868 for more information.',
  ],
  codeTitle: [
    '1. What is the taxpayer identification number/unified social credit code? The taxpayer identification number consists of 15, 17, 18, or 20 digits (character type). For enterprises, public institutions, and other organizations, a 9-digit code assigned by the State Administration for Market Regulation is used (excluding the "-" symbol between the main code and the check digit). The 15-digit taxpayer code issued by the State Taxation Administration includes: the first 2 digits for province and city codes, digits 3-6 for regional codes, digits 7-8 for economic nature codes, digits 9-10 for industry codes, and digits 11-15 for the sequence codes set by each region.',
    '2. How to obtain or know the taxpayer identification number/unified social credit code? The taxpayer identification number is the number on the tax registration certificate, commonly referred to as the "tax number," and each company\'s taxpayer identification number is unique. This unique and unchanging numerical code may become our second "ID card" in the future.  ',
  ],
};

Page({
  orderNo: '',
  data: {
    lang: app.globalData.lang,
    receiptIndex: 0,
    addressTagsIndex: 0,
    goodsClassesIndex: 0,
    dialogShow: false,
    codeShow: false,
    txt1: i18n.t('Please enter the mobile number'),
    txt2: i18n.t("Please enter the taxpayer's identification number"),
    receipts: [
      { title: 'Do not need invoice', id: 0, name: 'receipt' },
      { title: 'E-invoice', id: 1, name: 'receipt' },
    ],
    addressTags: [
      { title: 'Individual', id: 0, name: 'addressTags', type: 1 },
      { title: 'Institution', id: 1, name: 'addressTags', type: 2 },
    ],
    goodsClasses: [
      { title: 'Products', id: 0, name: 'goodsClasses' },
      { title: 'Commodity category', id: 1, name: 'goodsClasses' },
    ],
    name: '',
    componentName: '',
    code: '',
    phone: '',
    email: '',
    invoiceInfo: invoiceJson,
  },
  onLoad(query) {
    const { orderNo, invoiceData } = query;
    const tempData = JSON.parse(invoiceData || '{}');
    const invoice = {
      receiptIndex: tempData.invoiceType === 5 ? 1 : 0,
      name: tempData.buyerName || '',
      email: tempData.email || '',
      phone: tempData.buyerPhone || '',
      addressTagsIndex: tempData.titleType === 2 ? 1 : 0,
      goodsClassesIndex: tempData.contentType === 2 ? 1 : 0,
      code: tempData.buyerTaxNo || '',
      componentName: tempData.titleType === 2 ? tempData.buyerName : '',
    };
    this.orderNo = orderNo;
    this.setData({ ...invoice });
  },
  onLabels(e) {
    const { item } = e.currentTarget.dataset;
    const nameIndex = `${item.name}Index`;
    this.setData({ [nameIndex]: item.id });
  },
  onInput(e) {
    const { addressTagsIndex } = this.data;
    const { item } = e.currentTarget.dataset;
    const { value } = e.detail;
    const key =
      item === 'name'
        ? addressTagsIndex === 0
          ? 'name'
          : 'componentName'
        : item === 'code'
        ? addressTagsIndex === 0
          ? 'phone'
          : 'code'
        : 'email';
    this.setData({ [key]: value });
  },
  onSure() {
    const result = this.checkSure();
    if (!result) {
      Dialog.alert({
        title: i18n.t('Please enter invoice information'),
        content: '',
        confirmBtn: i18n.t('OK'),
      });
      return;
    }
    const {
      receiptIndex,
      addressTagsIndex,
      receipts,
      addressTags,
      name,
      componentName,
      code,
      phone,
      email,
      goodsClassesIndex,
    } = this.data;

    const data = {
      buyerName: addressTagsIndex === 0 ? name : componentName,
      buyerTaxNo: code,
      buyerPhone: phone,
      email,
      titleType: addressTags[addressTagsIndex].type,
      contentType: goodsClassesIndex === 0 ? 1 : 2,
      invoiceType: receiptIndex === 1 ? 5 : 0,
    };
    if (this.orderNo) {
      if (this.submitting) return;
      const params = {
        parameter: {
          orderNo: this.orderNo,
          invoiceVO: data,
        },
      };
      this.submitting = true;
      dispatchSupplementInvoice(params)
        .then(() => {
          Toast({
            context: this,
            selector: '#t-toast',
            message: i18n.t('Saved successfully'),
            duration: 2000,
            icon: '',
          });
          setTimeout(() => {
            this.submitting = false;
            wx.navigateBack({ delta: 1 });
          }, 1000);
        })
        .catch((err) => {
          this.submitting = false;
          console.error(err);
        });
    } else {
      Object.assign(data, {
        receipts: receipts[receiptIndex],
        addressTags: addressTags[addressTagsIndex],
      });
      wx.setStorageSync('invoiceData', data);
      wx.navigateBack({ delta: 1 });
    }
  },
  checkSure() {
    const { name, componentName, code, phone, email, addressTagsIndex, receiptIndex } = this.data;
    if (receiptIndex === 0) {
      return true;
    }
    if (addressTagsIndex === 0) {
      if (!name.length || !phone.length) {
        return false;
      }
    } else if (addressTagsIndex === 1) {
      if (!componentName.length || !code.length) {
        return false;
      }
    }
    if (!email.length) {
      return false;
    }
    return true;
  },
  onDialogTap() {
    const { dialogShow } = this.data;
    this.setData({
      dialogShow: !dialogShow,
      codeShow: false,
    });
  },
  onKnoeCode() {
    this.setData({
      dialogShow: !this.data.dialogShow,
      codeShow: true,
    });
  },
});
