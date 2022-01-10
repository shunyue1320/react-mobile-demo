import React from "react";
import { connect } from "react-redux";
import HomeHeader from './components/HomeHeader';
import actionCreators from "@/store/actionCreators/home";

import type { CombinedState } from "@/store/reducers";
import type { HomeState } from "@/store/reducers/home";
import "./index.less";

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof actionCreators;
type Props = StateProps & DispatchProps;

function Home(props: Props) {
  return (
    <div>
      <HomeHeader
        setCurrentCategory={props.setCurrentCategory}
        currentCategory={props.currentCategory}
      />
    </div>
  );
}

const mapStateToProps = (state: CombinedState): HomeState => state.home;

export default connect(mapStateToProps, actionCreators)(Home);
