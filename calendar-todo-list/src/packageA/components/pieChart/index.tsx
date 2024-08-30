import { FC, useEffect, useState } from 'react';

import * as echarts from '../ec-canvas/echarts.js';

interface IProps {
  data: { value: number; name: string }[];
  id?: string | number;
  title?: string;
}

const PieChart: FC<IProps> = ({ id, title = '', data }) => {
  const [chart, setChart] = useState<any>();

  useEffect(() => {
    if (chart) {
      const option = {
        title: {
          text: title,
          left: 'center',
          textStyle: { fontSize: 14, overflow: 'truncate' },
        },
        tooltip: {
          trigger: 'item',
        },
        legend: {
          type: 'scroll',
          orient: 'horizontal',
          left: 0,
          right: 0,
          bottom: 0,
        },
        series: [
          {
            type: 'pie',
            center: ['50%', '50%'],
            radius: ['20%', '45%'],
            label: {
              // show: false,
              formatter: (v: { percent: number }) => {
                return `${v.percent}%`;
              },
            },
            // labelLine: {
            //  show: false,
            // },
            itemStyle: {
              borderRadius: 5,
              borderColor: '#fff',
              borderWidth: 1,
            },
            data: data,
          },
        ],
      };

      chart.setOption(option);
      chart.resize();
    }
  }, [chart, data, title]);

  return (
    <ec-canvas
      z-level={1}
      canvas-id={`pieChart-${id}`}
      ec={{
        onInit: function (canvas: any, width: any, height: any, dpr: any) {
          const chart = echarts.init(canvas, null, {
            width: width,
            height: height,
            devicePixelRatio: dpr,
          });

          canvas.setChart(chart);
          setChart(chart);
          return chart;
        },
      }}
    />
  );
};

export default PieChart;
