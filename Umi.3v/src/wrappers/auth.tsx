import React from 'react';
import { Redirect } from 'umi';

export default (props: any) => {
  // const isLogin: boolean = Math.random > 0.5 ? true : false;
  // const isLogin: boolean = true;
  const isLogin: boolean = false;
  if (isLogin) {
    return <div>{props.children}</div>;
  } else {
    return <Redirect to="/login" />;
  }
};
