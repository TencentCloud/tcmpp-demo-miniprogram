import { Picker } from '@tarojs/components';
import { CommonEventFunction } from '@tarojs/components/types/common';
import { PickerMultiSelectorProps } from '@tarojs/components/types/Picker';
import dayjs from 'dayjs';
import { ComponentProps, FC, useState } from 'react';

import Lunar from '@/utils/lunar';

const getDays = (y: number, m: number) => {
  return dayjs(`${y}-${m}`).daysInMonth();
};

const calcRange = (initDate: dayjs.Dayjs) => {
  const [y, m, d] = initDate.format('YYYY/MM/DD').split('/').map(Number);

  const years = new Array(200).fill(0).map((item, index) => {
    const yItem = item + index + 1901;
    const lunar = Lunar.solar2lunar(yItem, m, Math.min(getDays(yItem, m), d));

    if (lunar !== -1) {
      return `${yItem}(${lunar.lYear})`;
    } else {
      return `${yItem}`;
    }
  });
  const months = new Array(12).fill(0).map((item, index) => {
    const mItem = item + index + 1;
    const lunar = Lunar.solar2lunar(y, mItem, Math.min(getDays(y, mItem), d));

    if (lunar !== -1) {
      return `${mItem}(${lunar.IMonthCn})`;
    } else {
      return `${mItem}`;
    }
  });
  const days = new Array(getDays(y, m)).fill(0).map((item, index) => {
    const dItem = item + index + 1;

    const lunar = Lunar.solar2lunar(y, m, dItem);

    if (lunar !== -1) {
      return `${dItem}(${lunar.IDayCn})`;
    } else {
      return `${dItem}`;
    }
  });

  return [years, months, days];
};

const calcValue = (initDate: dayjs.Dayjs) => {
  const [y, m, d] = initDate.format('YYYY/MM/DD').split('/').map(Number);

  return [y - 1900 - 1, m - 1, d - 1];
};

type Props = Partial<Omit<ComponentProps<typeof Picker>, 'onChange' | 'value'>> & {
  value?: string;
  onChange: (v: number[]) => void;
}

const DatePicker: FC<Props> = ({
  value: pValue,
  onChange: pOnChange,
  children,
  ...pickerProps
}) => {
  const currentDay = dayjs(pValue);
  const [range, setRange] = useState<string[][]>(calcRange(currentDay));
  const [column, setColumn] = useState<number[]>(calcValue(currentDay));

  const onColumnChange: CommonEventFunction<
    PickerMultiSelectorProps.ColumnChangeEventDetail
  > = ({ detail: { column: c, value: v } }) => {
    const nextValue = [...column];

    nextValue[c] = v;
    const nextDateArr = nextValue.map((item, index) => {
      const itemV = range[index][item];

      return +(itemV.match(/^.*(?=\()/g)?.[0] ?? '');
    });

    nextDateArr[2] = Math.min(
      nextDateArr[2],
      getDays(nextDateArr[0], nextDateArr[1]),
    );
    nextValue[2] = Math.min(
      nextValue[2],
      getDays(nextDateArr[0], nextDateArr[1]) - 1,
    );

    setColumn(nextValue);
    setRange(calcRange(dayjs(nextDateArr.join('/'))));
  };

  const onChange: CommonEventFunction<
    PickerMultiSelectorProps.ChangeEventDetail
  > = ({ detail: { value: v } }) => {
    const nextDateArr = v.map((item, index) => {
      const itemV = range[index][item];

      return +(itemV.match(/^.*(?=\()/g)?.[0] ?? '');
    });

    pOnChange(nextDateArr);
  };

  return (
    <Picker
      {...pickerProps}
      mode='multiSelector'
      onChange={onChange}
      value={column}
      range={range}
      onColumnChange={onColumnChange}
    >
      {children}
    </Picker>
  );
};

export default DatePicker;
