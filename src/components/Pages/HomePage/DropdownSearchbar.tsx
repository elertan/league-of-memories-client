import * as React from 'react';
import colors from '../../../colors';
import Spinner from '../../UI/Spinner';

interface IProps {
  value?: string;
  onChange?: (value: string) => void;
  dropdownVisible?: boolean;
  dropdownContent?: JSX.Element;
}

const styles = {
  container: {
    maxWidth: 500,
    width: '100%',
  } as React.CSSProperties,
  containerInner: {
    border: `1px solid ${colors.leagueSuperLight}`,
    borderRadius: 3,
    padding: 15,
    paddingTop: 10,
    paddingBottom: 10,
    background: '#222',
    maxWidth: 500,
    width: '100%',
    display: 'flex',
  } as React.CSSProperties,
  searchIcon: {
    marginTop: 2,
  } as React.CSSProperties,
  input: {
    background: 'none',
    border: 'none',
    outline: 'none',
    fontSize: 15,
    color: colors.leagueSuperLight,
    fontWeight: 500,
    width: '100%',
    flex: 1,
    marginLeft: 10,
  } as React.CSSProperties,
  dropdownContainer: {
    border: `1px solid ${colors.leagueSuperLight}`,
    background: 'rgba(34, 34, 34, 0.75)',
    position: 'absolute',
    width: '100%',
    maxWidth: 500,
    height: '35vh',
    overflow: 'auto',
  } as React.CSSProperties,
};

class DropdownSearchbar extends React.Component<IProps, {}> {
  public render() {
    return (
      <div style={styles.container}>
        <div style={styles.containerInner}>
          <i
            style={styles.searchIcon}
            className="fas fa-search"
          />
          <input
            style={styles.input}
            value={this.props.value}
            onChange={(ev) => this.props.onChange && this.props.onChange(ev.target.value)}
            placeholder="Type to search for a champion or skin..."
          />
        </div>
        {this.props.dropdownVisible &&
        <div style={styles.dropdownContainer}>{this.props.dropdownContent || <Spinner />}</div>
        }
      </div>
    );
  }
}

export default DropdownSearchbar;
