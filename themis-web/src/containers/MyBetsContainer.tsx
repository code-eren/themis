import { connect } from "react-redux";
import { BetsTable, BetsTableProps } from "../components/BetsTable/BetsTable";
import { RootState } from "../redux/reducers";

const mapStateToProps = (state: RootState): BetsTableProps => ({
    betsMade: state.userBets.betsMade,
    contractProps: state.contractsState.contractProps
});

export default connect(mapStateToProps)(BetsTable);