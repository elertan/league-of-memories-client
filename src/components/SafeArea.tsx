import * as React from 'react';

interface IProps {
  children?: any;
}

const SafeArea: React.SFC<IProps> = (props: IProps) => {
  return (
    <div style={{
      marginTop: 50
    }}>
      {props.children}
    </div>
  )
};

export default SafeArea;
