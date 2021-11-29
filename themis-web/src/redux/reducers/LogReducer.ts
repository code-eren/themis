import { LOGS_STATE } from './../../storage/constants';
import { LogsActionTypes } from './../constants/LogsActionType';
import { AddLogAction } from './../actions/LogsAction';
import { Log } from '../../interfaces/Log';
import { fetchStateFromCache } from '../../storage/fetch-store';
import { LogsState } from '../../interfaces/LogsState';

const cachedState = fetchStateFromCache(LOGS_STATE);

export const initialState: LogsState = cachedState === undefined ? {
    logs: []
} : cachedState;


export const reducer = (state: LogsState=initialState, action: AddLogAction):LogsState => {
    switch (action.type) {
        case LogsActionTypes.ADD_LOG: {
            // de-dupe
            const foundLog = state.logs.findIndex((log) => log.event.transactionHash === action.log.event.transactionHash) !== -1;
            if (foundLog) {
                return state;
            }
            let newLogs = state.logs.slice();
            newLogs.unshift(action.log);
            return {
                ...state,
                logs: newLogs
            };
        }
        default:
            return state;
    }
}
