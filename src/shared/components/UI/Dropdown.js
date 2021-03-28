import React, { useState } from 'react';

export default function Dropdown(props) {
  const [show, setShow] = useState(false);

  const dropdown = show && <>{props.childred}</>;

  return <div></div>;
}
