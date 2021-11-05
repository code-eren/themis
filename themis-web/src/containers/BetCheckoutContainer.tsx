import React from 'react';
import { connect } from 'react-redux';
// import {
//     selectSide,
//     enterBidAmount,
//     submitBetSubmission,
//     cancelBetSubmission
// } from '../actions/BetCheckoutActions';
import { DraftedBet } from '../interfaces/BetSubmisison';
import { BetCheckout } from '../components/BetCheckout/BetCheckout';
import PropTypes from 'prop-types';
// import { AppState } from '../reducers';

// const BetCheckoutContainer = ({ 
//     draft: DraftedBet, 
//     select, 
//     enter, 
//     submit, 
//     cancel 
// }) => (
//     <BetCheckout 
//         draftedBet={draft}
//         selectSide={select}
//         enterBidAmount={enter}
//         submitBetSubmission={submit}
//         cancelBetSubmission={cancel}
//     />
// );

// interface State {
//     draftedBet: DraftedBet;
//     selectSide: typeof selectSide;
//     enterBidAmount: typeof enterBidAmount;
//     submitBetSubmission: typeof submitBetSubmission;
//     cancelBetSubmission: typeof cancelBetSubmission;
// }

// const BetCheckoutContainer = (state: State) => (
//     <BetCheckout
//         {...state}
//     />
// );

// const mapStateToProps = (state: AppState) => ({
//     draftedBet: state.betSubmission
// });

// export default connect(
//     mapStateToProps,
//     {
//         selectSide,
//         enterBidAmount,
//         submitBetSubmission,
//         cancelBetSubmission
//     }
// )(BetCheckoutContainer);