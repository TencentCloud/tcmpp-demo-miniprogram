import { Button, Image, Text, View } from '@tarojs/components';
import {
  atMessage,
  chooseImage,
  getCurrentInstance,
  getStorageSync,
  navigateBack,
  navigateTo,
  uploadFile,
  useDidShow,
} from '@tarojs/taro';
import { t } from 'i18next';
import { useState } from 'react';
import { AtButton, AtCheckbox, AtInput, AtMessage } from 'taro-ui';

import Icon from '@/components/icon';
import { Pages, ServerUrl } from '@/constant';
import { getCode } from '@/services/birthdayReminder';
import { patchUser } from '@/services/user';
import { getUserInfo } from '@/store/app';
import { getResourceUrl } from '@/utils/common';
import { useAppDispatch, useAppSelector, useRequest } from '@/utils/hooks';
import { mailReg } from '@/utils/regular';

import styles from './index.module.less';

const message = (msg: string) => {
  atMessage({
    message: msg,
    type: 'warning',
  });
};

const UserInfo = () => {
  const { type: pageType } = getCurrentInstance().router?.params || {};

  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.app);
  const [checked, setChecked] = useState(true);
  const [value, setValue] = useState({
    ...userInfo,
    code: '',
  });
  const [state, setState] = useState({
    disabled: false,
    second: 30,
  });

  const { run: getCodeAsync } = useRequest(getCode, {
    manual: true,
  });
  const { run: updateAsync, loading } = useRequest(patchUser, {
    manual: true,
    onSuccess: () => {
      dispatch(getUserInfo());
      navigateBack();
    },
    onError: message,
  });

  const validate = (v: Partial<typeof value>) => {
    const { nickName, email, code } = v;

    if (!nickName) {
      message(t('用户名必填'));
      return false;
    } else if (pageType === 'birthday' && !email) {
      message(t('邮箱必填'));
      return false;
    } else if (email && !mailReg.test(email)) {
      message(t('邮箱格式错误'));
      return false;
    } else if (email && email !== userInfo?.email && !code) {
      message(t('验证码必填'));
      return false;
    } else {
      return true;
    }
  };

  const onSubmit = async () => {
    if (validate(value)) {
      updateAsync(value);
    }
  };

  const showTipText = () => {
    return state.disabled ? t('{{second}}s后重试', { second: state.second }) : t('发送验证码');
  };

  const sendCode = async () => {
    if (state.disabled) return;
    if (!value.email) {
      message(t('邮箱必填'));
      return;
    }
    if (!mailReg.test(value.email)) {
      message(t('邮箱格式错误'));
      return;
    }
    setState((prev) => ({ ...prev, disabled: true }));
    await getCodeAsync({ email: value.email });
    // 倒计时
    const timer = setInterval(() => {
      setState((prev) => {
        if (prev.second > 0) {
          return { ...prev, second: prev.second - 1 };
        } else {
          clearInterval(timer);
          return { second: 30, disabled: false };
        }
      });
    }, 1000);
  };

  const fileUpdate = async (filePath: string) => {
    const token = await getStorageSync('token');

    uploadFile({
      url: `${ServerUrl}/api/common/imageUpload`, // 仅为示例，非真实的接口地址
      filePath,
      name: 'file',
      header: { Authorization: `Bearer ${token}` },
      success: function (res) {
        const avatarUrl = JSON.parse(res.data).data[0].value;

        if (avatarUrl) {
          setValue((prev) => ({
            ...prev,
            avatarUrl: avatarUrl.replace(/\\/g, '/'),
          }));
        }
      },
    });
  };

  const addImg = () => {
    chooseImage({
      success: (res) => {
        res.tempFilePaths.forEach(fileUpdate);
      },
    });
  };

  useDidShow(() => dispatch(getUserInfo()));

  return (
    <View className={styles.container}>
      <AtMessage />
      <View className={styles.avatar}>
        {value?.avatarUrl ? (
          <Image
            className={styles.image}
            src={getResourceUrl(value.avatarUrl)}
          />
        ) : (
          <Icon value="add" className={styles.icon} />
        )}
        <Button className={styles.button} onClick={addImg}>
          +
        </Button>
      </View>
      <View className={styles.content}>
        <AtInput
          name="nickName"
          title={`${t('用户名')}：`}
          maxlength={10}
          placeholder={t('请输入')}
          value={value.nickName}
          onChange={(v) =>
            setValue((prev) => ({ ...prev, nickName: v as string }))
          }
        />
        <AtInput
          className={
            pageType === 'birthday' || userInfo?.email ? '' : styles.hidden
          }
          name="email"
          title={`${t('邮箱')}：`}
          placeholder={t('请输入')}
          value={value.email}
          onChange={(v) =>
            setValue((prev) => ({ ...prev, email: v as string, code: '' }))
          }
        />
        <AtInput
          className={value.email === userInfo?.email ? styles.hidden : ''}
          name="code"
          type="number"
          placeholder={t('请输入验证码')}
          value={value.code}
          onChange={(v) => setValue((prev) => ({ ...prev, code: v as string }))}
        >
          <View
            style={{
              color: state.disabled ? '#FF4949' : '',
              fontSize: '12px',
              width: '90px',
            }}
            onClick={sendCode}
          >
            {showTipText()}
          </View>
        </AtInput>
        <AtButton
          type="primary"
          onClick={onSubmit}
          loading={loading}
          className={styles.submit}
          disabled={!checked}
        >
          {t('保存')}
        </AtButton>
        {/* <View className={styles.info}>
          <AtCheckbox
            className={styles.check}
            options={[{ label: '我已阅读并同意', value: 'true' }]}
            onChange={v => setChecked(v.length > 0)}
            selectedList={checked ? ['true'] : []}
          />
          <Text
            className={styles.link}
            onClick={
              () => navigateTo({
                url: Pages.serviceAgreementPage,
              })}
          >《用户服务协议》</Text>
          <Text>和</Text>
          <Text
            className={styles.link}
            onClick={
              () => navigateTo({
                url: Pages.privacyPolicyPage,
              })}
          >《隐私策略》</Text>
        </View>*/}
      </View>
    </View>
  );
};

export default UserInfo;
