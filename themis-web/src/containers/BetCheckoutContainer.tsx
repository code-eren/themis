import { connect } from 'react-redux';
import { BetCheckout, BetCheckoutProps } from '../components/BetCheckout/BetCheckout';
import { State } from '../reducers';
import {
    selectSide,
    enterBid,
    submit,
    cancel
} from '../actions/BetCheckoutActions';

const mapStateToProps = (state: State): BetCheckoutProps => ({
    matchesState: state.matches,
    betCheckoutState: state.betCheckout,
    onSelectSide: selectSide,
    onEnterBid: enterBid,
    onSubmit: submit,
    onCancel: cancel
});

export default connect(mapStateToProps)(BetCheckout);