import { dispatch } from '../../storage/redux-store';
import { Log } from './../../interfaces/Log';

import { LogsActionTypes } from './../constants/LogsActionType';
export interface AddLogAction {
    type: typeof LogsActionTypes.ADD_LOG;
    log: Log
}

export const addLog = (log: Log): AddLogAction => dispatch({
    type: LogsActionTypes.ADD_LOG,
    log
});

export type LogsAction = AddLogAction;