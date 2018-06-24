import * as React from 'react';
import colors from '../../colors';
import TextField from './TextField';

interface IProps {
  value?: string;
  onChange?: (value: string) => void;
}

const styles = {
  searchIcon: {
    fontSize: 12,
    margin: 'auto auto',
    marginLeft: 10,
    color: colors.darkText,
  } as React.CSSProperties,
};

class SearchField extends React.Component<IProps, {}> {
  public render() {
    return (
      <TextField
        value={this.props.value}
        onChange={this.props.onChange}
        leftInputAdornment={this.renderSearchIcon()}
        placeholder="Search"
      />
    );
  }

  private renderSearchIcon() {
    return (
      <i
        style={styles.searchIcon}
        className="fas fa-search"
      />
    );
  }
}

export default SearchField;
