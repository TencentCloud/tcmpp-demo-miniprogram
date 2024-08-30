import { FC, useEffect, useState } from 'react';

import * as echarts from '../ec-canvas/echarts.js';

interface IProps {
  xAxisData: string[];
  seriesData: number[];
  id?: string | number;
  title?: string;
  isList?: boolean; // 是否是列表的形式展示的
  unit?: string;
}

const LineChart: FC<IProps> = ({
  isList,
  xAxisData,
  seriesData,
  id,
  title,
  unit,
}) => {
  const [chart, setChart] = useState<any>();

  useEffect(() => {
    if (chart) {
      const option = {
        color: ['#ff8b99'],
        title: isList
          ? {
              text: title,
              left: 'center',
              top: 10,
              textStyle: { fontSize: 14, overflow: 'truncate' },
            }
          : undefined,
        tooltip: {
          show: !isList,
          trigger: 'axis',
          textStyle: {
            textShadowBlur: 1,
            textShadowColor: 'transparent',
          },
        },
        grid: {
          top: isList ? 60 : '8%',
          left: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          axisTick: {
            alignWithLabel: true,
          },
          data: xAxisData,
        },
        yAxis: {
          name: unit || '',
          type: 'value',
          alignTicks: true,
          axisLine: {
            show: true,
            lineStyle: {
              color: '#666',
            },
          },
          // axisLabel: {
          //   formatter: (v: number) => {
          //     const absV = Math.abs(v);
          //     let result = `${v}`;

          //     if (absV >= 1000 && absV < 10000) {
          //       result = +(v / 1000).toFixed(1) + '千';
          //     } else if (absV >= 10000 && absV < 100000000) {
          //       result = +(v / 10000).toFixed(1) + '万';
          //     } else if (absV >= 100000000) {
          //       result = +(v / 100000000).toFixed(1) + '亿';
          //     }
          //     return result;
          //   },
          // },
          min: (v: { min: number }) => {
            return v.min;
          },
        },
        dataZoom:
          xAxisData.length > 5
            ? [
                {
                  type: 'inside',
                  start: 0,
                  end: 100,
                },
                {
                  start: 0,
                  end: 100,
                },
              ]
            : [],
        series: {
          data: seriesData,
          type: 'line',
          smooth: true,
          symbol: 'circle', // 线上的圆点
          label: {
            // 显示数值
            show: isList,
            position: 'top',
          },
        },
      };

      chart.setOption(option);
      chart.resize();
    }
  }, [chart, isList, seriesData, title, unit, xAxisData]);

  return (
    <ec-canvas
      canvas-id={`lineChart-${id}`}
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

export default LineChart;
