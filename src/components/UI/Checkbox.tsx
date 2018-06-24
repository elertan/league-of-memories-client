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
        />
      </div>
    );
  }
}

export default Checkbox;
