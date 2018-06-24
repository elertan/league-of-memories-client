import * as React from 'react';

interface IProps {
  checked?: boolean;
  onChanged?: (checked: boolean) => void;
}

class Checkbox extends React.Component<IProps, {}> {
  public render() {
    return (
      <div>
        <input
          className="Checkbox"
          type="checkbox"
          checked={this.props.checked || false}
          onChange={(ev) => this.props.onChanged && this.props.onChanged(ev.target.checked)}
        />
      </div>
    );
  }
}

export default Checkbox;
