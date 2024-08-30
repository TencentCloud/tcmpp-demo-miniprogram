/**
 * @param {string|number} key 唯一值
 */
import i18n from '../i18n/index';

export function getActivity(key) {
  return {
    promotionId: `${key}`,
    title: ` ${i18n.t('Discount and dedcution deals are back')} ${key}`,
    description: null,
    promotionCode: 'MERCHANT',
    promotionSubCode: key % 2 === 0 ? 'MYJ' : 'MYG',
    tag: i18n.t('Deduction deals'),
    timeType: 1,
    startTime: '1588737710000',
    endTime: '1601467070000',
    teasingStartTime: null,
    activityLadder: [{ label: i18n.t('Save RMB 99.9 for 100') }],
  };
}
