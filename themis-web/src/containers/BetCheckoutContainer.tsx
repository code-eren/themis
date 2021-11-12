import { connect } from 'react-redux';
import { BetCheckout, BetCheckoutProps } from '../components/BetCheckout/BetCheckout';
import { State } from '../redux/reducers';
import {
    selectSide,
    enterBid,
    submit,
    cancel,
    setLoading
} from '../redux/actions/BetCheckoutActions';

const mapStateToProps = (state: State): BetCheckoutProps => ({
    matchesState: state.matches,
    betCheckoutState: state.betCheckout,
    onSelectSide: selectSide,
    onEnterBid: enterBid,
    onSubmit: submit,
    onCancel: cancel,
    setLoading,
});

export default connect(mapStateToProps)(BetCheckout);