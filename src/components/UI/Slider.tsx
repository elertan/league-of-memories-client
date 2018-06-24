import * as React from 'react';
import colors from '../../colors';

interface IProps {
  min: number;
  max: number;
  value?: number;
  onChange?: (value: number) => void;
}

const styles = {
  container: {
  } as React.CSSProperties,
  slider: {
    WebkitAppearance: 'none',
    appearance: 'none',
    width: '100%',
    height: 20,
    border: '3px solid #222',
    borderRadius: 3,
    background: colors.leagueLight,
    outline: 'none',
    opacity: 0.7,
    WebkitTransition: '.2s',
    transition: 'opacity .2s',
  } as React.CSSProperties,
};

class Slider extends React.Component<IProps, {}> {
  public render() {
    return (
      <div style={styles.container}>
        <input
          style={styles.slider}
          type="range"
          min={this.props.min}
          max={this.props.max}
          value={this.props.value}
          onChange={(ev) => this.props.onChange && this.props.onChange(ev.target.valueAsNumber)}
        />
      </div>
    );
  }
}

export default Slider;
