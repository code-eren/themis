import { connect } from "react-redux";
import { cancel, selectMatch } from "../redux/actions/BetCheckoutActions";
import { setMatches, setLoading } from "../redux/actions/MatchesActions";
import { AllMatches, AllMatchesProps } from "../components/AllMatches/AllMatches";
import { RootState } from "../redux/reducers";

const mapStateToProps = (state: RootState): AllMatchesProps => ({
    matchesState: state.matches,
    betCheckoutState: state.betCheckout,
    contractProps: state.contractsState.contractProps,
    selectMatch,
    onCancel: cancel,
    setMatches,
    setLoading
});

export default connect(mapStateToProps)(AllMatches);