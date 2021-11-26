import { connect } from 'react-redux';
import { BetCheckout, BetCheckoutProps } from '../components/BetCheckout/BetCheckout';
import { RootState } from '../redux/reducers';
import { getMatch } from '../redux/selectors/MatchSelectors';

const mapStateToProps = (state: RootState): BetCheckoutProps => ({
    match: getMatch(state.betCheckout, state.matches),
    betCheckoutState: state.betCheckout
});

export default connect(mapStateToProps)(BetCheckout);