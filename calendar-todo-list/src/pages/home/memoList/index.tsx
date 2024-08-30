import { View } from '@tarojs/components';
import { atMessage, useDidShow } from '@tarojs/taro';
import classNames from 'classnames';
import { t } from 'i18next';
import { FC, useEffect, useState } from 'react';
import { AtTextarea } from 'taro-ui';

import Action from '@/components/action';
import Icon from '@/components/icon';
import Modal from '@/components/modal';
import { deleteItem, getList, patchItem, postItem } from '@/services/memo';
import { useRequest } from '@/utils/hooks';

import styles from './index.module.less';

const initEditState = () => ({
  id: '',
  value: '',
});

interface Props {
  setMemoBt?: React.Dispatch<React.SetStateAction<JSX.Element | undefined>>;
  modalOpen?: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MemoList: FC<Props> = ({ setMemoBt, setModalOpen, modalOpen }) => {
  const [actionOpen, setActionOpen] = useState(false);
  const [editState, setEditState] = useState(initEditState);

  const { data: list = [], run: getListSync } = useRequest(getList, {
    manual: true,
    onSuccess: (res) => {
      if (!res?.length) {
        setMemoBt?.(
          <View className={styles.bt} onClick={() => setModalOpen(true)}>
            {t('添加便签')}
          </View>
        );
      } else {
        setMemoBt?.(undefined);
      }
      setActionOpen(false);
      setModalOpen(false);
      setEditState(initEditState);
    },
  });

  const { run: postItemSync, loading: postLoading } = useRequest(postItem, {
    manual: true,
    onSuccess: () => getListSync(),
  });

  const { run: patchItemSync, loading: patchLoading } = useRequest(patchItem, {
    manual: true,
    onSuccess: () => getListSync(),
  });

  const { run: deleteItemSync } = useRequest(deleteItem, {
    manual: true,
    onSuccess: () => getListSync(),
  });

  const onDelete = () => {
    if (editState.id) {
      deleteItemSync(editState.id);
    }
  };

  const onSubmit = () => {
    if (!editState.value.trim()) {
      atMessage({
        message: t('便签内容不能为空'),
        type: 'warning',
      });
    } else if ((editState.value || '').length > 200) {
      atMessage({
        message: t('便签内容不能超过200个字符'),
        type: 'warning',
      });
    } else if (!editState.id) {
      postItemSync({ value: editState.value });
    } else {
      patchItemSync({ _id: editState.id, value: editState.value });
    }
  };

  useEffect(() => {
    getListSync();
  }, [getListSync]);

  useDidShow(() => {
    getListSync();
  });

  return (
    <>
      {list.length > 0 && !modalOpen && (
        <View className={styles.memo}>
          <View className={styles.memoTitle}>{t('备忘便签')}</View>
          {list
            .map((item) => (
              <View key={item._id} className={styles.memoLi}>
                <View
                  className={styles.checkBox}
                  onClick={() => {
                    patchItemSync({
                      ...item,
                      status: item.status === 'finish' ? '' : 'finish',
                    });
                  }}
                >
                  {item.status === 'finish' && <Icon type="gou" size={10} />}
                </View>
                <View
                  className={classNames(styles.text, {
                    [styles.lineThrough]: item.status === 'finish',
                  })}
                  onClick={() => {
                    setEditState({
                      id: item._id,
                      value: item.value,
                    });
                    setActionOpen(true);
                  }}
                >
                  {item.value}
                </View>
              </View>
            ))}
        </View>
      )}
      {modalOpen && (
        <Modal
          title={t('备忘便签')}
          isOpened={modalOpen}
          onCancel={() => setModalOpen(false)}
          onOk={onSubmit}
          loading={postLoading || patchLoading}
        >
          <AtTextarea
            value={editState.value || ''}
            placeholder={t('请输入便签内容')}
            maxLength={200}
            height={200}
            onChange={(v) => {
              setEditState((prev) => ({ ...prev, value: v }));
            }}
            count
          />
        </Modal>
      )}
      <Action
        preTitle={t('便签内容')}
        title={editState.value || ''}
        isOpened={actionOpen}
        onClose={() => setActionOpen(false)}
        onDelete={editState.id ? onDelete : undefined}
        options={[
          {
            name: t('添加新便签'),
            fn: () => {
              setEditState(initEditState);
              setActionOpen(false);
              setModalOpen(true);
            },
          },
        ].concat(
          editState.id
            ? {
              name: t('编辑'),
              fn: () => {
                setActionOpen(false);
                setModalOpen(true);
              },
            }
            : []
        )}
      />
    </>
  );
};

export default MemoList;
