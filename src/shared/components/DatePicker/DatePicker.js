import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import './DatePicker.css';

export default function CustomDatePicker() {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div className='date-picker'>
      <h1>Date Picker</h1>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
    </div>
  );
}
