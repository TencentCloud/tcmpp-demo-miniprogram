/* eslint-disable */

// 经度
export const longitudeReg = /^[\-\+]?(0?\d{1,2}(\.\d{1,14})*|1[0-7]?\d{1}(\.\d{1,14})*|180(\.0{1,14})*)$/

// 纬度
export const latitudeReg = /^[\-\+]?([0-8]?\d{1}(\.\d{1,14})*|90(\.0{1,14})*)$/

// 字母和数字
export const numberAndLetterReg = /^[0-9a-zA-Z]{1,}$/

// 0位小数，整数
export const floatReg0 = /^[\-\+]?\d*$/

// 1位小数
export const floatReg1 = /^[\-\+]?\d*(\.\d{1,1})*$/

// 2位小数
export const floatReg2 = /^[\-\+]?\d*(\.\d{1,2})*$/

// 3位小数
export const floatReg3 = /^[\-\+]?\d*(\.\d{1,3})*$/

// 4位小数
export const floatReg4 = /^[\-\+]?\d*(\.\d{1,4})*$/

// 6位小数
export const floatReg6 = /^[\-\+]?\d*(\.\d{1,6})*$/

// ip
export const ipReg = /^(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/

// port
export const portReg = /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/

// 手机号
export const phoneReg = /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/

// 邮箱
export const mailReg = /^([a-zA-Z0-9]+[_|_|\-|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/