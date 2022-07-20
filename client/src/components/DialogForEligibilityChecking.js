import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export default function ResponsiveDialog({ status, paymentStatus, customer_id }) {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const NavigateToStartNewPurchase = () => {
        navigate("/MultiStepForm");
    }
    const NavigateToStartPurchaseForExistingCustomer = () => {
        navigate(`/StepFormForExistingCustomer/${customer_id}`);
    }
    const NavigateToDashboard = () => {
        navigate("/Dashboard");
    }
    
    return (
        <div>
            <Button size="small" fullWidth variant="contained" onClick={handleClickOpen}>
                {" "}
                Check Eligibility For New Purchase{" "}
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <center>
                    {" "}
                    <DialogTitle fontWeight="bold">
                        Edit Customer Details
                    </DialogTitle>{" "}
                </center>

                <center><DialogContent>
                    {(paymentStatus !== "Not Clear"&&status !== "Banned") ?
                        <Typography>Eligible For New Purchase</Typography> :
                        <Typography>Not Eligible For New Purchase</Typography>}
                </DialogContent></center>
                <DialogActions>
                    <Button onClick={NavigateToDashboard}>Dashboard</Button>
                    {(paymentStatus === "Not Clear"&&status === "Banned")?
                    <Button onClick={NavigateToStartNewPurchase}>Start New Purchase</Button>:
                    <Button onClick={NavigateToStartPurchaseForExistingCustomer}>Purchase For Existing Customer</Button>
                    }
                </DialogActions>
            </Dialog>
        </div>
    );
}
