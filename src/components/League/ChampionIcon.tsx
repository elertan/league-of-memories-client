import * as React from 'react';
import LeagueCDN from '../../api/LeagueCDN';
import Champion from '../../models/Champion';

interface IProps {
  champion: Champion;
  onClick?: () => void;
}

interface IState {
  hovered: boolean;
}

const styles = {
  container: {
    width: 80,
    height: 100,
    margin: 10,
    marginBottom: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  } as React.CSSProperties,
  image: {
    width: 75,
    height: 75,
    border: '1px solid #333',
  } as React.CSSProperties,
  image_hover: {
    border: '1px solid #777',
  } as React.CSSProperties,
  text: {
    textAlign: 'center',
    fontSize: 14,
    color: '#AAA',
    marginTop: 10,
    fontFamily: 'LeagueFont',
  } as React.CSSProperties,
};

class ChampionIcon extends React.Component<IProps, IState> {
  public state = {
    hovered: false,
  };

  public render() {
    return (
      <div
        style={styles.container}
        onClick={this.props.onClick}
        onMouseEnter={() => this.setState({hovered: true})}
        onMouseLeave={() => this.setState({hovered: false})}
      >
        <img
          style={this.getImageStyle()}
          src={LeagueCDN.getChampionIconUrl(this.props.champion.key)}
        />
        <p
          style={styles.text}
        >{this.props.champion.name}</p>
      </div>
    );
  }

  private getImageStyle() {
    if (this.state.hovered) {
      return Object.assign({}, styles.image, styles.image_hover);
    }

    return styles.image;
  }
}

export default ChampionIcon;
