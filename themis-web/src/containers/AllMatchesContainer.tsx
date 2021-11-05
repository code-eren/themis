import { connect } from "react-redux";
import { selectMatch } from "../actions/BetCheckoutActions";
import { AllMatches, AllMatchesProps } from "../components/AllMatches/AllMatches";
import { State } from "../reducers";

const BetCheckoutContainer = (props: AllMatchesProps) => (
    <AllMatches {...props} />
);

const mapStateToProps = (state: State): AllMatchesProps => ({
    selectMatch,
    matchesState: state.matches
});

export default connect(mapStateToProps)(AllMatches);