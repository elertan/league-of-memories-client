import { shell } from "electron";
import * as React from "react";
import colors from "../../colors";

import { connect } from "react-redux";
import { Action } from "redux";
import Champion from "../../models/Champion";
import Skin from "../../models/Skin";
import { ChampionsStore, IAppState } from "../../store";
import IDispatchFunc from "../../store/IDispatchFunc";
import Spinner from "../UI/Spinner";
import DropdownSearchbar from "./HomePage/DropdownSearchbar";
import SkinDropdownOption from "./HomePage/SkinDropdownOption";

interface IStoreProps {
  championsStore: ChampionsStore.State;
}
interface IStoreActionProps {
  championsActionsStore: ChampionsStore.IActionCreators;
}

interface IProps extends IStoreProps, IStoreActionProps {}

interface IState {
  filterInput: string;
  hoveredSocialMediaIcons: boolean[];
}

const styles = {
  container: {
    color: colors.leagueSuperLight,
    fontFamily: "LeagueFont"
  } as React.CSSProperties,
  headImageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "5vh"
  } as React.CSSProperties,
  headImage: {
    width: "15vw",
    maxWidth: 150
  } as React.CSSProperties,
  headlineContainer: {
    textAlign: "center",
    fontSize: 28,
    marginTop: "5vh"
  } as React.CSSProperties,
  searchbarContainer: {
    marginTop: "5vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  } as React.CSSProperties,
  extraTextContainer: {
    textAlign: "center",
    fontSize: 14,
    marginTop: "5vh"
  } as React.CSSProperties,
  socialMediaContainer: {
    marginTop: "10vh",
    display: "flex",
    justifyContent: "center"
  } as React.CSSProperties,
  socialMediaContainerInner: {
    display: "flex",
    justifyContent: "space-between"
  } as React.CSSProperties,
  socialMediaIcon: {
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    marginLeft: 5,
    marginRight: 5,
    fontSize: 36
  } as React.CSSProperties,
  socialMediaIcon_hover: {
    color: "#CCC"
  } as React.CSSProperties,
  dropdownContent: {
    height: '100%',
  } as React.CSSProperties,
  dropdownNoResultsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  } as React.CSSProperties,
};

const socialMedias = [
  {
    class: "fab fa-facebook",
    name: "Facebook",
    onClick: () =>
      shell.openExternal("https://www.facebook.com/skinkk.official/"),
  },
  {
    class: "fab fa-youtube",
    name: "YouTube",
    onClick: () =>
      shell.openExternal("https://www.youtube.com/channel/UC-ZgC3QeCSzPBlPPef9Hzjg"),
  },
  {
    class: "fab fa-discord",
    name: "Discord",
    onClick: () => shell.openExternal("https://discordapp.com/invite/uVGCzKT"),
  },
  {
    class: "fab fa-patreon",
    name: "Patreon",
    onClick: () => shell.openExternal("https://www.patreon.com/skinkk"),
  }
];

class HomePage extends React.Component<IProps, IState> {
  public state = {
    filterInput: "",
    hoveredSocialMediaIcons: socialMedias.map((_) => false),
  };

  public componentDidMount() {
    if (!this.props.championsStore.getSuccess) {
      this.props.championsActionsStore.get();
    }
  }

  public render() {
    const dropdownContent = this.props.championsStore.getSuccess ? this.getDropdownContent() : undefined;
    return (
      <div style={styles.container}>
        <div style={styles.headImageContainer}>
          <img style={styles.headImage} src="./assets/img/icon.png" />
        </div>
        <div style={styles.headlineContainer}>
          <h2>All League Skins for FREE</h2>
        </div>
        <div style={styles.searchbarContainer}>
          <DropdownSearchbar
            value={this.state.filterInput}
            onChange={(filterInput) => this.setState({ filterInput })}
            dropdownVisible={this.state.filterInput !== ""}
            dropdownContent={
            <div style={styles.dropdownContent}>
              {dropdownContent ?
              <div>
              {dropdownContent.filter((elements) => elements.length !== 0).length !== 0 ?
              dropdownContent
              :
              <div style={styles.dropdownNoResultsContainer}><p>There are no results for your input.</p></div>
              }
              </div>
              :
              <Spinner />
              }
            </div>}
          />
        </div>
        <div style={styles.extraTextContainer}>
          A total of 1427 skins ready to be used for FREE. Try them out now!
        </div>
        <div style={styles.socialMediaContainer}>
          <div style={styles.socialMediaContainerInner}>
            {socialMedias.map((s, i) => (
              <i
                key={i}
                className={s.class}
                style={this.getSocialMediaIconStyle(i)}
                onClick={s.onClick}
                title={s.name}
                onMouseEnter={() =>
                  this.handleOnMouseHoverSocialMediaIcon(i, true)
                }
                onMouseLeave={() =>
                  this.handleOnMouseHoverSocialMediaIcon(i, false)
                }
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  private getDropdownContent() {
    return this.props.championsStore
      .getSuccess!.map((c: Champion) => {
        const input = this.state.filterInput.toLowerCase();
        let skins: Skin[];
        if (c.name.toLowerCase().includes(input)) {
          skins = c.skins.map((s: Skin) => {
            if (s.name !== "default") {
              return s;
            }
            return Object.assign({}, s, { name: `Default ${c.name}` } as Skin);
          });
        } else {
          skins = c.skins.filter((s: Skin) =>
            s.name.toLowerCase().includes(input),
          );
        }
        return {
          champion: c,
          skins,
        };
      })
      .filter((data) => data.skins.length !== 0)
      .map((data) =>
        data.skins.map((s, i) => (
          <SkinDropdownOption champion={data.champion} skin={s} key={i} />
        )),
      );
  }

  private getSocialMediaIconStyle = (index: number) => {
    if (this.state.hoveredSocialMediaIcons[index]) {
      return Object.assign(
        {},
        styles.socialMediaIcon,
        styles.socialMediaIcon_hover,
      );
    }

    return styles.socialMediaIcon;
  };

  private handleOnMouseHoverSocialMediaIcon = (
    index: number,
    isOver: boolean
  ) => {
    // Re-create the entire array to conform to react's immutability.
    const hoveredStates = [...this.state.hoveredSocialMediaIcons];
    hoveredStates[index] = isOver;
    this.setState({ hoveredSocialMediaIcons: hoveredStates });
  };
}

export default connect(
  (state: IAppState) =>
    ({
      championsStore: state.champions
    } as IStoreProps),
  (dispatch: IDispatchFunc<Action>) =>
    ({
      championsActionsStore: ChampionsStore.actionCreators(dispatch)
    } as IStoreActionProps)
)(HomePage);
