import React from 'react';

export default function(props: any) {
  return (
    <div>
      <div>大家好这里是user layout</div>
      <div>main:</div>
      <div>{props.children}</div>
    </div>
  );
}
