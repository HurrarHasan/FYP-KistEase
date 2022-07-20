import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function ResponsiveDialog() {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button size="small" fullWidth variant="contained" onClick={handleClickOpen}>
                {" "}
                Are all dues of customer's paid{" "}
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"All Dues Clear?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        All Dues Of Previous Purchase Are
                        <h3 style={{ fontWeight: "bold" }}>Cleared / Not Cleared</h3>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Back To Dashboard
                    </Button>
                    <Button onClick={handleClose} autoFocus>
                        Start New Purchase
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
