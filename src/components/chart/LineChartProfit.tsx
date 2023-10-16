import React from 'react';
import { Typography } from 'antd';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { MinusOutlined } from '@ant-design/icons';

const { Title } = Typography;
const LineChartProfit: React.FC = () => {
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
        name: 'Mobile apps',
        data: [3, 4, 3, 2, 5, 2, 4, 2, 5, 4, 5, 6],
        offsetY: 0,
      },
      {
        name: 'Websites',
        data: [3, 9, 4, 14, 2, 12, 3, 7, 12, 4, 5, 7],
        offsetY: 0,
      },
    ],
  };

  return (
    <>
      <div className="linechart">
        <div>
          <Title level={5}>Lợi nhuận trong 1 năm gần nhất</Title>
        </div>
        <div className="sales">
          <ul>
            <li
              style={{
                display: 'flex',
                alignItems: 'center',
                fontWeight: 'bold',
              }}
            >
              {<MinusOutlined style={{ fontSize: 30, color: 'blue' }} />} Số
              tiền người dùng nạp vào
            </li>
            <li
              style={{
                display: 'flex',
                alignItems: 'center',
                fontWeight: 'bold',
              }}
            >
              {<MinusOutlined style={{ fontSize: 30, color: 'green' }} />} Số
              tiền người dùng sử dụng
            </li>
          </ul>
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

export default LineChartProfit;
