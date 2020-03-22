import React from 'react';

export default (props: any) => {
  console.log(props);

  return (
    <div>
      hello user id
      <p>{props.match.params.id}</p>
    </div>
  );
};
