import React from 'react';
import { Link } from 'umi';
import { Button } from 'antd';

export default () => {
  return (
    <div>
      <h1>Page index hello world</h1>

      <Button>
        <Link to="admin">admin</Link>
      </Button>
    </div>
  );
};
