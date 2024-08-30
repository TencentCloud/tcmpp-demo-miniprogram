import { Text, View } from '@tarojs/components';
import { atMessage, previewImage, useDidShow } from '@tarojs/taro';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { t } from 'i18next';
import { useState } from 'react';
import { AtButton, AtMessage, AtTextarea } from 'taro-ui';
import { Suggestion } from 'types';

import Action from '@/components/action';
import Modal from '@/components/modal';
import WxSay from '@/components/wxSay';
import { ERoles } from '@/constant';
import {
  deleteItem,
  getList,
  patchItem,
  postItem,
} from '@/services/suggestion';
import { getDateFormat, getResourceUrl } from '@/utils/common';
import { useAppSelector, useLoading, useRequest } from '@/utils/hooks';

import styles from './index.module.less';

const wxCodeUrl = getResourceUrl('public/images/common/other/wxcode.jpg');

const initMyState = (): {
  data: Partial<Suggestion['data'][number]>;
  editId: string;
  isEdit: boolean;
  dataId: string;
  openId?: string;
  deleteId?: string;
} => {
  return {
    openId: '',
    deleteId: '',
    editId: '',
    dataId: '',
    isEdit: false,
    data: {
      text: '',
      type: 'user',
    },
  };
};

const Interaction = () => {
  const { userInfo } = useAppSelector((state) => state.app);
  const isManager = userInfo?.roles.includes(ERoles.manager);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [actionOpen, setActionOpen] = useState(false);
  const [myState, setMyState] = useState(initMyState);

  const {
    data: list = [],
    run: getListAsync,
    loading,
  } = useRequest(getList, {
    manual: true,
    onSuccess: () => {
      setMyState(initMyState);
      setActionOpen(false);
      setEditModalOpen(false);
    },
  });

  const { run: postItemAsync, loading: postItemLoading } = useRequest(
    postItem,
    {
      manual: true,
      onSuccess: () => {
        getListAsync();
      },
    }
  );

  const { run: patchItemAsync, loading: patchItemLoading } = useRequest(
    patchItem,
    {
      manual: true,
      onSuccess: () => {
        getListAsync();
      },
    }
  );

  const { run: deleteItemAsync, loading: deleteLoading } = useRequest(
    deleteItem,
    {
      manual: true,
      onSuccess: () => {
        getListAsync();
      },
    }
  );

  const onDelete = () => {
    if (myState.deleteId) {
      deleteItemAsync(myState.deleteId);
    }
  };

  const onSubmit = () => {
    if (!myState.data.text?.trim()) {
      atMessage({
        message: t('请输入问题或建议'),
        type: 'warning',
      });
    } else {
      const { data, dataId, editId, isEdit } = myState;

      if (!editId && !dataId) {
        postItemAsync(
          [data].map((v) => {
            return v.timestamp ? v : { ...v, timestamp: +new Date() };
          })
        );
      } else if (isEdit) {
        const current = list.find((v) => v._id === editId) as Suggestion;

        patchItemAsync({
          ...current,
          data: current?.data
            .map((v) => {
              return v._id === dataId
                ? (data as Suggestion['data'][number])
                : v;
            })
            .map((v) => {
              return v.timestamp ? v : { ...v, timestamp: +new Date() };
            }),
        });
      } else if (editId && !dataId) {
        const current = list.find((v) => v._id === editId) as Suggestion;

        patchItemAsync({
          ...current,
          data: [...current.data, data as Suggestion['data'][number]].map(
            (v) => {
              return v.timestamp ? v : { ...v, timestamp: +new Date() };
            }
          ),
        });
      } else {
        const current = list.find((v) => v._id === editId) as Suggestion;
        const index = current.data.findIndex((v) => v._id === dataId);

        patchItemAsync({
          ...current,
          data: [
            ...(current.data.slice(0, index + 1) || []),
            data as Suggestion['data'][number],
            ...current.data.slice(index + 1),
          ].map((v) => {
            return v.timestamp ? v : { ...v, timestamp: +new Date() };
          }),
        });
      }
    }
  };

  useDidShow(() => {
    getListAsync();
  });

  useLoading(loading || postItemLoading || patchItemLoading || deleteLoading);
  const sortList = isManager
    ? list.sort(
      (x, y) => dayjs(y.updated).valueOf() - dayjs(x.updated).valueOf()
    )
    : [
      ...list.filter((v) => v.openid === userInfo?.openid),
      ...list.filter((v) => v.openid !== userInfo?.openid),
    ];

  return (
    <>
      <AtMessage />
      <View className={styles.content}>
        <View className={styles.tip}>
          {t('感谢您一直以来对我们的支持和信任！我们一直在努力为您提供更好的产品，而您的意见对我们至关重要，我们将认真对待每一条建议，并努力改进。')}
        </View>
        {!editModalOpen &&
          sortList.map((item) => {
            return (
              <View
                className={classNames(styles.li, styles.myLi)}
                key={item._id}
              >
                {item.data.map((dataItem) => (
                  <View key={item._id}>
                    {dataItem.timestamp && (
                      <View className={styles.time}>
                        {dayjs(dataItem.timestamp).format(
                          `${getDateFormat()} HH:mm:ss`
                        )}
                      </View>
                    )}
                    <WxSay
                      value={{ text: dataItem.text }}
                      type={dataItem.type as 'user' | 'dev'}
                      userName={`${item.openid.slice(-8)}`}
                      onEdit={() => {
                        if (isManager) {
                          setMyState({
                            ...initMyState(),
                            editId: item._id,
                            dataId: dataItem._id,
                            data: {
                              text: dataItem.text,
                              type: dataItem.type,
                            },
                            openId: item.openid,
                          });
                          setActionOpen(true);
                        }
                      }}
                    />
                  </View>
                ))}
                <View className={styles.liFooter}>
                  {userInfo?.openid !== item.openid && <View />}
                  <View className={styles.timestamp}>
                    {dayjs(item.created).format(`${getDateFormat()} HH:mm:ss`)}
                  </View>
                  {userInfo?.openid === item.openid && (
                    <View className={styles.action}>
                      <Text
                        className={styles.delete}
                        onClick={() => {
                          setMyState((prev) => ({
                            ...prev,
                            deleteId: item._id,
                          }));
                          setActionOpen(true);
                        }}
                      >
                        {t('删除')}
                      </Text>
                      <Text
                        className={styles.reply}
                        onClick={() => {
                          setMyState({
                            ...initMyState(),
                            editId: item._id,
                          });
                          setEditModalOpen(true);
                        }}
                      >
                        {t('回复')}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            );
          })}
      </View>
      <View className={styles.footer}>
        <AtButton
          type="primary"
          onClick={() => {
            setMyState(initMyState);
            setEditModalOpen(true);
          }}
        >
          {t('新增建议')}
        </AtButton>
      </View>

      <Action
        preTitle={t('记录')}
        title={myState.data.text || ''}
        isOpened={actionOpen}
        onClose={() => setActionOpen(false)}
        onDelete={myState.deleteId ? onDelete : undefined}
        options={
          myState.deleteId
            ? undefined
            : [
              {
                name: t('在该条数据后添加'),
                fn: () => {
                  setEditModalOpen(true);
                  setMyState((prev) => ({
                    ...prev,
                    isEdit: false,
                    data: { text: '', type: isManager ? 'dev' : 'user' },
                  }));
                  setActionOpen(false);
                },
              },
            ].concat(
              userInfo?.openid === myState.openId || isManager
                ? {
                  name: t('编辑'),
                  fn: () => {
                    setEditModalOpen(true);
                    setMyState((prev) => ({ ...prev, isEdit: true }));
                    setActionOpen(false);
                  },
                }
                : []
            )
        }
      />
      {editModalOpen && (
        <Modal
          isOpened={editModalOpen}
          onCancel={() => setEditModalOpen(false)}
          onOk={onSubmit}
        >
          {/* <Text
            className={styles.wxcode}
            user-select
            onClick={() => {
              previewImage({
                current: wxCodeUrl, // 当前显示图片的http链接
                urls: [wxCodeUrl], // 需要预览的图片http链接列表
              });
            }}
          >
            点击联系开发者（wangjiguahuzi）
          </Text> */}
          <AtTextarea
            value={myState.data.text || ''}
            placeholder={t('请输入问题或建议')}
            maxLength={200}
            height={200}
            onChange={(text) => {
              setMyState((prev) => ({ ...prev, data: { ...prev.data, text } }));
            }}
            count
          />
        </Modal>
      )}
    </>
  );
};

export default Interaction;
