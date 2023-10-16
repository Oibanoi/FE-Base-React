import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { Typography } from 'antd';
import { ApexOptions } from 'apexcharts';

const { Title } = Typography;

const LineChart: React.FC = () => {
  const options: ApexOptions = {
    chart: {
      width: '100%',
      height: 350,
      type: 'area',
      toolbar: {
        show: false,
      },
    },

    legend: {
      show: false,
    },

    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },

    yaxis: {
      labels: {
        style: {
          fontSize: '14px',
          fontWeight: 600,
        },
      },
    },

    xaxis: {
      labels: {
        style: {
          fontSize: '14px',
          fontWeight: 600,
        },
      },
      categories: [
        'T1',
        'T2',
        'T3',
        'T4',
        'T5',
        'T6',
        'T7',
        'T8',
        'T9',
        'T10',
        'T11',
        'T12',
      ],
    },

    tooltip: {
      y: {
        formatter: function(val: any) {
          return val;
        },
      },
    },
  };
  const lineChart = {
    series: [
      {
        name: 'Người dùng',
        data: [0, 0, 0, 6, 2, 1, 0, 0, 0, 0, 0, 0],
        offsetY: 0,
      },
    ],
  };

  return (
    <>
      <div className="linechart">
        <div>
          <Title level={4}>Thống kê số lượng người dùng mới theo tháng</Title>
        </div>
      </div>

      <ReactApexChart
        className="full-width"
        options={options}
        series={lineChart.series}
        type="area"
        height={350}
        width={'100%'}
      />
    </>
  );
};

export default LineChart;
