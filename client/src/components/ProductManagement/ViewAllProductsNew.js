import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Divider from "@mui/material/Divider";
import { useParams } from "react-router-dom";
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import Avatar from "@mui/material/Avatar";
import { useState, useEffect } from "react";
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import EditProductDialog from "./EditProductDialog";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import PreviewIcon from '@mui/icons-material/Preview';

function createData(name, ModelName, MakeYear, Stock, Price) {
    return { name, ModelName, MakeYear, Stock, Price };
}


const rows = [
    createData('Samsung', "S12", "2021", 4, "250,000"),
    createData('Vivo', "V91", "2022", 4, "37,000"),
    createData('iTel', "I6", "2022", 6, "50,000"),
    createData('Apple', "A32", "2020", 4, "450,000"),

];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [

    {
        id: 'Brand Name',
        numeric: false,
        disablePadding: false,
        label: 'Brand Name',
    }, {
        id: 'ModelName',
        numeric: false,
        disablePadding: false,
        label: 'Model Name',
    },
    {
        id: 'MakeYear',
        numeric: true,
        disablePadding: false,
        label: 'Make Year',
    },
    {
        id: 'Stock',
        numeric: true,
        disablePadding: false,
        label: 'Stock',
    },
    {
        id: 'Price',
        numeric: true,
        disablePadding: false,
        label: 'Price',
    },
    {
        id: 'Actions',
        numeric: false,
        disablePadding: false,
        label: 'Actions',
    },
];

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    const [rootUser, setRootUser] = useState();
    const [productList, setProductList] = useState([]);

    const [ImagePreview, setImagePreview] = useState("");

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
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">

                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'center' : 'center'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
    const { numSelected } = props;

    return (
        <div className="bottom">
        </div>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
    const [ImagePreview, setImagePreview] = useState("");
    const navigate = useNavigate();
    const { product_id } = useParams();
    const [productList, setProductList] = useState([]);
    const [productName, setProductName] = useState("");
    const [token, setToken, removeCookie] = useCookies(["KistEase_seller_Token"]);
    const api = axios.create({
        baseURL: "http://localhost:5000/users/",
        timeout: 3000,
        withCredentials: false,
    });
    useEffect(() => {
        console.log({ token });
        if (token != null) {
            console.log("we are in if");
            // console.log("token.KistEase_seller_Token:", token.KistEase_seller_Token);
            api
                .get("/", {
                    headers: {
                        auth_TOKEN: token.KistEase_seller_Token,
                    },
                })
                .then((result) => {
                    console.log({ result });
                    if (result) {
                        console.log("remain here");
                        console.log("rootUser:", result.data.rootUser);
                        api
                            .post("viewProduct", { seller_id: result.data.rootUser, product_id: product_id })
                            .then((result) => {
                                console.log("getProduct:", result.data.result);
                                setProductList(result.data.result);
                                setProductName(result.data.productName)
                                console.log("Product:", productList);
                            })
                            .catch((err) => {
                                console.log({ err });
                            });
                    } else {
                        window.alert(result.error);
                    }
                })
                .catch((err) => {
                    console.log({ err });
                    // <Alert severity="error">Invalid Credentials</Alert>;
                    // navigate("/ShopLogin");
                });
        }
    }, []);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('ModelName');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const redirectToSingleProduct = (id) => {
        navigate(`/SingleProduct/${id}`)
    }
    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar numSelected={selected.length} />
                <TableContainer>
                    <div className="bottom">
                        <h1 className="title">{productName}</h1>
                    </div>
                    <Divider />
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={productList.length}
                        />
                        <TableBody>
                            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                            {stableSort(productList, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.Model.modelName);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.name)}
                                            //   role="checkbox"
                                            //   aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={index}
                                        //   selected={isItemSelected}
                                        >
                                            <TableCell component="th" scope="row">
                                                <Button onClick={handleClickOpen}>
                                                    <center>
                                                        <Avatar
                                                            src={
                                                                row.productImage
                                                                    ? `http://localhost:5000/images/${row.productImage}`
                                                                    : ImagePreview
                                                            }
                                                            sx={{ width: 100, height: 100 }}
                                                            style={{ border: '3px solid lightgray' }}
                                                        />
                                                    </center>
                                                </Button>
                                                <Dialog
                                                     
                                                    open={open}
                                                    onClose={handleClose}
                                                    aria-labelledby="responsive-dialog-title"
                                                >
                                                    <DialogTitle id="responsive-dialog-title">
                                                    </DialogTitle>
                                                    <DialogContent>
                                                        <DialogContentText sx={{ width: 350, height: 350 }}
                                                            style={{ border: '3px solid lightgray' }}>
                                                            <Avatar
                                                                src={
                                                                    row.productImage
                                                                        ? `http://localhost:5000/images/${row.productImage}`
                                                                        : ImagePreview
                                                                }
                                                                sx={{ width: 350, height: 350 }}
                                                                style={{ border: '3px solid lightgray' }}
                                                            />
                                                        </DialogContentText>
                                                    </DialogContent>

                                                </Dialog>
                                            </TableCell>
                                            <TableCell component="th" align="center" id={labelId} scope="row" padding="none" > {row.Brand.brandName} </TableCell>
                                            <TableCell align="center">{row.Model.modelName}</TableCell>
                                            <TableCell align="center">{row.makeYear}</TableCell>
                                            <TableCell align="center">{row.productQuantity}</TableCell>
                                            <TableCell align="center">{row.productPrice}</TableCell>
                                            <TableCell align="center">
                                                <EditProductDialog productDetails={row} productName={productName} />
                                                <IconButton onClick={() => { redirectToSingleProduct(row._id) }}> <PreviewIcon /> </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

        </Box>
    );
}
