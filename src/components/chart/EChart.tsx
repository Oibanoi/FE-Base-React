import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { Typography } from 'antd';

const { Title } = Typography;

const EChart: React.FC = () => {
  const options: ApexOptions = {
    chart: {
      type: 'bar',
      width: '100%',
      height: 'auto',

      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 5,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 1,
      colors: ['transparent'],
    },
    grid: {
      show: true,
      borderColor: '#ccc',
      strokeDashArray: 2,
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
    yaxis: {
      labels: {
        show: true,
        align: 'right',
        minWidth: 0,
        maxWidth: 160,
      },
    },

    tooltip: {
      y: {
        formatter: function(val: any) {
          return val + ' triệu VNĐ';
        },
      },
    },
  };
  const eChart = {
    series: [
      {
        name: 'Lợi nhuận',
        data: [5, 4, 20, 30, 12, 1, 0, 0, 0, 0, 0, 0],
        color: '#99CCFF',
      },
    ],
  };

  return (
    <>
      <div id="chart">
        <Title level={4}>Thống kê số BĐS được tạo mới theo tháng</Title>
        <ReactApexChart
          className="bar-chart"
          options={options}
          series={eChart.series}
          type="bar"
          height={420}
        />
      </div>
    </>
  );
};

export default EChart;
