import React from 'react';

import {
  AreaChart,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Area,
  Bar,
} from 'recharts';

import './DashBoard.css';

const data = [
  {
    name: 'JAN',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'FEB',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'MAR',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'APR',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'MAY',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'JUN',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'JUL',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function DashBoard() {
  const statisticList = [
    {
      header: 'USERS',
      countTotal: '487',
      countToday: '12',
      icon: <i class='fa fa-user'></i>,
    },
    {
      header: 'DOWNLOADS',
      countTotal: '150',
      countToday: '32',
      icon: <i class='fa fa-download'></i>,
    },
    {
      header: 'MOVIES',
      countTotal: '200',
      countToday: '40',
      icon: <i class='fa fa-film'></i>,
    },
    {
      header: 'MESSAGES',
      countTotal: '140',
      countToday: '50',
      icon: <i class='fa fa-sms'></i>,
    },
  ];

  return (
    <div className='dashboard-container'>
      {/* Analytic */}
      <div className='dashboard-statistic'>
        {statisticList.map((statistic) => (
          <div
            className={`dashboard-statistic--item statistic-${statistic.header.toLowerCase()}`}>
            <div>
              <div className='statistic-header'>{statistic.header}</div>
              <div className='statistic-count-total'>
                {statistic.countTotal}
              </div>
              <div className='statistic-count-today'>
                {statistic.countToday}
              </div>
            </div>
            <div className='statistic-icon'>{statistic.icon}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className='chart-movies'>
        <h1 className='chart-title'>Lượt xem từng tháng</h1>
        <AreaChart
          axisLine={false}
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='#8884d8' stopOpacity={0.8} />
              <stop offset='95%' stopColor='#8884d8' stopOpacity={0} />
            </linearGradient>
            <linearGradient id='colorPv' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='#82ca9d' stopOpacity={0.8} />
              <stop offset='95%' stopColor='#82ca9d' stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey='name' />
          <YAxis />
          <CartesianGrid strokeDasharray='3 3' />
          <Tooltip />
          <Area
            type='monotone'
            dataKey='uv'
            stroke='#8884d8'
            fillOpacity={1}
            fill='url(#colorUv)'
          />
          <Area
            type='monotone'
            dataKey='pv'
            stroke='#82ca9d'
            fillOpacity={1}
            fill='url(#colorPv)'
          />
        </AreaChart>
      </div>

      <div className='chart-users'>
        <h1 className='chart-title'>Số lượng người đăng ký</h1>
        <ComposedChart width={730} height={250} data={data}>
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid stroke='#f5f5f5' />
          <Area type='monotone' dataKey='amt' fill='#8884d8' stroke='#8884d8' />
          <Bar dataKey='pv' barSize={20} fill='#413ea0' />
          <Line type='monotone' dataKey='uv' stroke='#ff7300' />
        </ComposedChart>
      </div>
    </div>
  );
}
