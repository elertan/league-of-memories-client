import * as React from 'react';

interface IProps {
  displayName: string;
}

const styles = {
  container: {
    maxWidth: 125,
    backgroundColor: 'rgb(9, 18, 29)',
    borderRadius: 5,
    border: '1px solid #777',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 14
  } as React.CSSProperties,
};

const ChatItem: React.SFC<IProps> = (props: IProps) => {
  return (
    <div style={styles.container}>
      <p>{props.displayName}</p>
    </div>
  );
};

export default ChatItem;
