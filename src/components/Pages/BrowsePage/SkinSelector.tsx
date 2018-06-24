import * as React from 'react';
import LeagueCDN from '../../../api/LeagueCDN';
import Champion from '../../../models/Champion';
import Skin from '../../../models/Skin';
import colors from '../../../colors';
import {
  Tooltip
} from 'react-tippy';

interface IProps {
  champion: Champion;
  selectedSkin?: Skin;
  onSkinChanged?: (skin: Skin) => void;
}

const styles = {
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  } as React.CSSProperties,
  currentSkinContainer: {
    flex: 1,
    // width: '100%',
    // height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  } as React.CSSProperties,
  switchContainer: {
    height: '20%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    bottom: 30,
  } as React.CSSProperties,
  switchItem: {
    width: 85,
    height: 55,
    marginLeft: 5,
    marginRight: 5,
    border: '2px solid #222',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  } as React.CSSProperties,
  skinText: {
    textAlign: 'center',
    fontSize: 21,
    fontFamily: 'LeagueFont',
    position: 'relative',
    bottom: 20,
  } as React.CSSProperties,
  switchButton: {
    fontSize: 36,
    marginLeft: 10,
    marginRight: 10,
    color: colors.leagueSuperLight,
  } as React.CSSProperties,
};

const maxSwitchSkins = 5;

class SkinSelector extends React.Component<IProps, {}> {
  public render() {
    const champion = this.props.champion;
    const skin = this.props.selectedSkin || this.props.champion.skins[0];
    const skinIndex = champion.skins.indexOf(skin);
    const maxSkins = maxSwitchSkins > champion.skins.length ? champion.skins.length : maxSwitchSkins;
    const skinBorderAmount = Math.floor(maxSkins / 2);

    let switchSkins = [skin];
    for (let i = 1; i < maxSkins; i++) {
      const isPrepending = i > skinBorderAmount;
      if (!isPrepending) {
        if (skinIndex + i > champion.skins.length - 1) {
          switchSkins = [...switchSkins, champion.skins[i - 1]];
          continue;
        }
        switchSkins = [...switchSkins, champion.skins[skinIndex + i]];
        continue;
      }

      const backwardsIndex = skinIndex + skinBorderAmount - i;
      if (backwardsIndex < 0) {
        switchSkins = [champion.skins[champion.skins.length - Math.abs(backwardsIndex)], ...switchSkins];
        continue;
      }
      switchSkins = [champion.skins[backwardsIndex], ...switchSkins];
    }
    return (
      <div style={styles.container}>
        <div style={styles.currentSkinContainer}>
          {this.getImageDiv(champion.key, skin.num)}
        </div>
        <p style={styles.skinText}>{skin.name === "default" ? "Default" : skin.name}</p>
        <div style={styles.switchContainer}>
          <i
            className="fas fa-angle-left"
            style={styles.switchButton}
            onClick={this.handleMoveBack}
          />
          {switchSkins.map((s: Skin, i: number) =>
          <Tooltip
            key={i}
            position="bottom"
            trigger={'mouseenter'}
            title={s.name}
          >
          <div
            // tslint:disable-next-line:max-line-length
            style={this.getSwitchItemStyle(champion.key, s.num, skinIndex)}
            onClick={() => this.props.onSkinChanged && this.props.onSkinChanged(champion.skins[s.num])}
          />
          </Tooltip>
          )}
          <i
            className="fas fa-angle-right"
            style={styles.switchButton}
            onClick={this.handleMoveForward}
          />
        </div>
      </div>
    );
  }

  private handleMoveBack = () => {
    const skinIndex = this.props.champion.skins.indexOf(this.props.selectedSkin!);

    if (skinIndex - 1 < 0) {
      // tslint:disable-next-line:no-unused-expression
      this.props.onSkinChanged && this.props.onSkinChanged(
        this.props.champion.skins[this.props.champion.skins.length - 1],
      );
      return;
    }

    // tslint:disable-next-line:no-unused-expression
    this.props.onSkinChanged && this.props.onSkinChanged(this.props.champion.skins[skinIndex - 1]);
  }

  private handleMoveForward = () => {
    const skinIndex = this.props.champion.skins.indexOf(this.props.selectedSkin!);

    if (skinIndex + 1 > this.props.champion.skins.length - 1) {
      // tslint:disable-next-line:no-unused-expression
      this.props.onSkinChanged && this.props.onSkinChanged(this.props.champion.skins[0]);
      return;
    }
    // tslint:disable-next-line:no-unused-expression
    this.props.onSkinChanged && this.props.onSkinChanged(
      this.props.champion.skins[skinIndex + 1],
    );
  }

  private getSwitchItemStyle = (championKey: string, skinIndex: number, currentSkinIndex: number) => {
    const style = Object.assign({}, styles.switchItem, {
      backgroundImage: `url(${LeagueCDN.getChampionSplashUrl(championKey, skinIndex)})`,
    } as React.CSSProperties);

    if (skinIndex === currentSkinIndex) {
      return Object.assign({}, style, { border: `3px solid ${colors.leagueSuperLight}` });
    }

    return style;
  }

  private getImageDiv = (championKey: string, skinIndex: number) => {
    return (
      <div
        style={{
          backgroundImage: `url(${LeagueCDN.getChampionSplashUrl(championKey, skinIndex)})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          width: '80%',
          height: '80%',
        }}
      />
    );
  }
}

export default SkinSelector;
