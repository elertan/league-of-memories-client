import * as React from 'react';
import colors from '../../colors';

interface IProps {
  value?: string;
  placeholder?: string;
  leftInputAdornment?: JSX.Element;
  rightInputAdornment?: JSX.Element;
  onChange?: (value: string) => void;
  password?: boolean;
  disabled?: boolean;
}

const styles = {
  container: {
    borderRadius: 2,
    display: 'flex',
    flex: 1,
    border: `1px solid ${colors.leagueLight}`,
    background: 'rgb(10,10,10)',
  } as React.CSSProperties,
  input: {
    height: 30,
    width: '100%',
    color: '#DDD',
    marginLeft: 10,
    marginRight: 10,
    background: 'none',
    border: 'none',
    fontSize: 13,
    outline: 'none',
  } as React.CSSProperties,
};

class TextField extends React.Component<IProps, {}> {
  public render() {
    return (
      <div style={styles.container}>
        {this.props.leftInputAdornment}
        <input
          disabled={this.props.disabled || false}
          style={styles.input}
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={(ev) => this.props.onChange && this.props.onChange(ev.target.value)}
          type={this.props.password ? 'password' : 'text'}
        />
        {this.props.rightInputAdornment}
      </div>
    );
  }
}

export default TextField;
