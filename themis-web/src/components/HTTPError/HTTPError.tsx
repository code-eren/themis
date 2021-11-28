import {Grid, Typography} from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';

interface HTTPErrorProps {
    message: string;
}

export function HTTPError(props: HTTPErrorProps) {
    return (
        <Grid container direction="column" alignItems="center" justifyContent="center">
            <ErrorIcon fontSize="large" />
            <Typography color="red">{props.message}</Typography>
            <Typography>Please refresh the page.</Typography>
        </Grid>
    );
}