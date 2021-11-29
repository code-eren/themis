import { connect } from 'react-redux';
import { BetCheckout, BetCheckoutProps } from '../components/BetCheckout/BetCheckout';
import { Trends, TrendsProps } from '../components/Trends/Trends';
import { RootState } from '../redux/reducers';
import { getMatchContracts } from '../redux/selectors/MatchContractSelectors';
import { getMatch } from '../redux/selectors/MatchSelectors';
import { CampaignContract } from '../web3/campaign';

const mapStateToProps = (state: RootState): TrendsProps => ({
    matchContracts: getMatchContracts(state.matches.matches, state.contractsState.contractProps),
    logs: state.logsState.logs
});

export default connect(mapStateToProps)(Trends);