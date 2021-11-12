import { connect } from "react-redux";
import { cancel, selectMatch } from "../redux/actions/BetCheckoutActions";
import { AllMatches, AllMatchesProps } from "../components/AllMatches/AllMatches";
import { State } from "../redux/reducers";

const mapStateToProps = (state: State): AllMatchesProps => ({
    matchesState: state.matches,
    betCheckoutState: state.betCheckout,
    selectMatch,
    onCancel: cancel,
});

export default connect(mapStateToProps)(AllMatches);