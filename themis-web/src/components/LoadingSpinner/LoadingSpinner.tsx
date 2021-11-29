import {Grid, CircularProgress} from '@mui/material';

export function LoadingSpinner() {
    return (
        <Grid container direction="column" alignItems="center" justifyContent="center">
            <Grid item>
                <CircularProgress size={100} />
            </Grid>
        </Grid>
    );
}