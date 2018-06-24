import * as React from 'react';
import Champion from '../../models/Champion';
import ChampionIcon from './ChampionIcon';

interface IProps {
  champions: Champion[];
  onChampionClick?: (champion: Champion) => void;
}

const styles = {
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  } as React.CSSProperties,
  fillItem: {
    width: 80,
    margin: 10,
  } as React.CSSProperties,
};

class ChampionGrid extends React.Component<IProps, {}> {
  public render() {
    return (
      <div style={styles.container}>
        {/* Renders all champion icons */}
        {this.props.champions.map((c: Champion, i: number) =>
        <ChampionIcon
          key={i}
          champion={c}
          onClick={() => this.props.onChampionClick && this.props.onChampionClick(c)}
        />,
        )}
        {/* Fills the rest of the grid with empty divs, to make the last row appear normal with flex space-between */}
        {Array(10 - (this.props.champions.length % 10)).fill(undefined).map((_, i) =>
          <div
            key={i}
            style={styles.fillItem}
          />,
        )}
      </div>
    );
  }
}

export default ChampionGrid;
