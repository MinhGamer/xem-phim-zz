import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import './DatePicker.css';

export default function CustomDatePicker() {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div className='date-picker'>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
    </div>
  );
}
