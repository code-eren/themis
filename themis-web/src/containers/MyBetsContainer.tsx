import { connect } from "react-redux";
import { BetsTable, BetsTableProps } from "../components/BetsTable/BetsTable";
import { State } from "../redux/reducers";

const mapStateToProps = (state: State): BetsTableProps => ({
    bets: state.userBets.bets,
    onBetClicked: (id: string) => { console.log("clicked " + id)}
});

export default connect(mapStateToProps)(BetsTable);