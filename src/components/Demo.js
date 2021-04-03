import React, { useState } from 'react';
import Button from '../shared/components/UI/Button';

export default function Demo() {
  const [count, setCount] = useState(0);

  console.log('render');

  return (
    <div style={{ marginTop: '7rem' }} className=''>
      <h1>Demo</h1>
      <p>{count}</p>
      <Button onClick={() => setCount(count + 0)} isPrimary>
        Click
      </Button>
    </div>
  );
}
