import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: 'top',
    },
    title: {
      display: false,
    },
  },
  scales: {
    y: {
      min: 0, // 최소값
      max: 400, // 최대값
      ticks: {
        stepSize: 50, // 눈금 간격 설정
      },
      grid: {
        display: true, // y축 그리드 표시
      },
    },
    x: {
      grid: {
        display: false, // x축의 그리드선(세로)을 비활성화
      },
      ticks: {
        display: false, // x축의 눈금(세로)을 비활성화
      },
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [100,50,100,50,100,50,200],
      backgroundColor: '#3354F4',
      borderRadius: 10,
    }
  ],
};


function Chart (){
  return(
    <div style={{ width: '600px', height: '400px' }}>
      <Bar options={options} data={data} />
    </div>
  )
}

export default Chart;
