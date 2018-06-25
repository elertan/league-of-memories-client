import * as React from 'react';
import Button from './UI/Button';
import ChatItem from './BottomBar/ChatItem';

interface IProps {}
interface IState {}

const styles = {
  container: {
    backgroundColor: 'rgba(20,20,20,0.4)',
    width: '100%',
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
  } as React.CSSProperties,
  chatAreaContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  } as React.CSSProperties,
  actionsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  } as React.CSSProperties,
};

class BottomBar extends React.Component<IProps, IState> {
  public render() {
    return (
      <div style={styles.container}>
        <div style={styles.chatAreaContainer}>
          <ChatItem displayName="Global Chat" />
        </div>
        <div style={styles.actionsContainer}>
          <Button>
            <i
              className="fas fa-users"
            />
          </Button>
        </div>
      </div>
    );
  }
}

export default BottomBar;
