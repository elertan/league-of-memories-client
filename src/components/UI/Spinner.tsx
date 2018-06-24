import * as React from 'react';

const styles = {
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  } as React.CSSProperties,
  image: {
    width: 50,
  } as React.CSSProperties,
};

class Spinner extends React.Component<{}, {}> {
  public render() {
    return (
      <div style={styles.container}>
        <img
          style={styles.image}
          src="./assets/img/loader.svg"
        />
      </div>
    );
  }
}

export default Spinner;
