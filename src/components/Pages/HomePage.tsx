import * as React from "react";
import colors from "../../colors";

interface IStoreProps {
}
interface IStoreActionProps {
}

interface IProps extends IStoreProps, IStoreActionProps {}

interface IState {
}

const styles = {
  container: {
    color: colors.leagueSuperLight,
    fontFamily: "LeagueFont"
  } as React.CSSProperties,
};

class HomePage extends React.Component<IProps, IState> {
  public render() {
    return (
      <div style={styles.container}>
      </div>
    );
  }
}

export default HomePage;
