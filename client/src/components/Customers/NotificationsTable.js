import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Divider from "@mui/material/Divider";
import { useCookies } from "react-cookie";
import axios from "axios";
import { visuallyHidden } from '@mui/utils';
import Avatar from "@mui/material/Avatar";
import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";

function createData(name, PhoneNumber, ProductName, DueDate, RemainingAmount) {
  return { name, PhoneNumber, ProductName, DueDate, RemainingAmount };
}


const rows = [
  createData('Ali', "03112273288", "AC", "4 March 2020", "250,000"),
  createData('Tony', "03115627328", "FRIDGE", "9 March 2021", "37,000"),
  createData('Aslam', "0311287328", "MOBILE", "14 March 2010", "50,000"),
  createData('Alex', "03112356278", "LAPTOP", "3 March 2022", "450,000"),

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
    id: 'Customer Name',
    numeric: false,
    disablePadding: false,
    label: 'Customer Name',
  }, {
    id: 'PhoneNumber',
    numeric: false,
    disablePadding: false,
    label: 'Phone Number',
  },
  {
    id: 'ProductName',
    numeric: true,
    disablePadding: false,
    label: 'Product Name',
  },
  {
    id: 'DueDate',
    numeric: true,
    disablePadding: false,
    label: 'Due Date',
  },
  {
    id: 'RemainingAmount',
    numeric: true,
    disablePadding: false,
    label: 'Remaining Amount',
  },
  {
    id: 'SendVia',
    numeric: false,
    disablePadding: false,
    label: 'Send Via',
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();

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
  const [token, setToken, removeCookie] = useCookies(["KistEase_seller_Token"]);
  const api = axios.create({
    baseURL: "http://localhost:5000/users/",
    timeout: 2000,
    withCredentials: false,
  });
  const [customerToNotify, setCustomerToNotify] = useState([]);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('PhoneNumber');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [customerDetails, setCustomerDetails] = useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const filterCustomers = (array) => {
    console.log({ array })
    const today_date = new Date();
    const year = today_date.getFullYear();
    let month = today_date.getMonth() + 1;
    let day = today_date.getDate();
    if (day < 10) day = "0" + day;
    if (month < 10) month = "0" + month;
    const today = day + "/" + month + "/" + year;
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array[i].Installment.productMonthlyInstallment.length; j++) {
        if (array[i].Installment.productMonthlyInstallment[j].status === "Pending") {
          console.log("today", { today })
          console.log("array1", array[i].Installment.productMonthlyInstallment[j].date)
          let dateString_today = today;
          let dateString_today_parts = dateString_today.split("/");
          let date1 = new Date(+dateString_today_parts[2], dateString_today_parts[1] - 1, +dateString_today_parts[0]);
          let dateString_DBdate = array[i].Installment.productMonthlyInstallment[j].date;
          let dateString_DBdate_parts = dateString_DBdate.split("/");
          let date2 = new Date(+dateString_DBdate_parts[2], dateString_DBdate_parts[1] - 1, +dateString_DBdate_parts[0])
          console.log({ date1, date2 })
          let Difference_In_Time = date2.getTime() - date1.getTime()
          let Difference_In_Day = Difference_In_Time / (1000 * 3600 * 24);
          console.warn("Difference_In_Day",{ Difference_In_Day })
          if (Difference_In_Day === 0) {
            console.log("we are in the inner if")
            console.log("Array Result", array[i])
            setCustomerToNotify((customerToNotify) => [...customerToNotify, array[i]])
            break;
          }
        }
      }

    }
  }
  useEffect(() => {
    console.warn({ customerDetails })
  }, [customerDetails])
  useEffect(() => {
    console.warn({ customerToNotify })
  }, [customerToNotify])
  useEffect(() => {
    console.log({ token });
    if (token != null) {
      console.log("we are in if");
      console.log("token.KistEase_seller_Token:", token.KistEase_seller_Token);
      api
        .get("/", {
          headers: {
            auth_TOKEN: token.KistEase_seller_Token,
          },
        })
        .then((result) => {
          console.log("seller_id", { result });
          if (result) {
            console.log(" Dashboard remain here ");
            console.log(result.data.rootUser);
            api
              .post("customerForNotification", { seller_id: result.data.rootUser })
              .then((result) => {
                console.log("we are at get customer");
                console.log(result);
                setCustomerDetails(result.data.result.reverse());
                filterCustomers(result.data.result.reverse());
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            window.alert(result.error);
          }
        })
        .catch((err) => {
          console.log({ err });
          // navigate("/ShopLogin");
        });
    }
  }, []);
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

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const getDueDate = (productMonthlyInstallment) => {
    const today_date = new Date();
    const year = today_date.getFullYear();
    let month = today_date.getMonth() + 1;
    let day = today_date.getDate();
    if (day < 10) day = "0" + day;
    if (month < 10) month = "0" + month;
    const today = day + "/" + month + "/" + year;
    for (let index = 0; index < productMonthlyInstallment.length; index++) {
      if (productMonthlyInstallment[index].status === "Pending") {
        let dateString_today = today;
        let dateString_today_parts = dateString_today.split("/");
        let date1 = new Date(+dateString_today_parts[2], dateString_today_parts[1] - 1, +dateString_today_parts[0]);
        let dateString_DBdate = productMonthlyInstallment[index].date;
        let dateString_DBdate_parts = dateString_DBdate.split("/");
        let date2 = new Date(+dateString_DBdate_parts[2], dateString_DBdate_parts[1] - 1, +dateString_DBdate_parts[0])
        console.log({ date1, date2 })
        let Difference_In_Time = date2.getTime() - date1.getTime()
        let Difference_In_Day = Difference_In_Time / (1000 * 3600 * 24);
        if (Difference_In_Day <= 8 && Difference_In_Day >= 0) {
          return productMonthlyInstallment[index].date;
        }
      }
    }
  }
  const amountRemaining = (amount, productMonthlyInstallment, customer_id) => {
    let remainingamount = amount;
    if (productMonthlyInstallment.length > 0) {
      for (let index = 0; index < productMonthlyInstallment.length; index++) {
        remainingamount = remainingamount - (productMonthlyInstallment[index].payedAmount ? productMonthlyInstallment[index].payedAmount : 0);
      }
      if (remainingamount < 0) {
        let new_arr = customerToNotify.filter((item) => item._id !== customer_id)
        setCustomerToNotify(new_arr)
      } else {
        return remainingamount;
      }
    }
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <div className="bottom">
            <h1 className="title">Notification Table</h1>
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
              rowCount={customerDetails.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(customerToNotify, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.customerName);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  // console.log({index})
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.customerName)}
                      //   role="checkbox"
                      //   aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                    //   selected={isIte  mSelected}
                    >
                      <TableCell component="th" scope="row">
                        <Button onClick={handleClickOpen}>
                          <center>
                            <Avatar
                              src={
                                row.customerPicture
                                  ? `http://localhost:5000/images/${row.customerPicture}`
                                  : "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg"
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
                                  row.customerPicture
                                    ? `http://localhost:5000/images/${row.customerPicture}`
                                    : "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg"
                                }
                                sx={{ width: 350, height: 350 }}
                                style={{ border: '3px solid lightgray' }}
                              />
                            </DialogContentText>
                          </DialogContent>

                        </Dialog>
                      </TableCell>
                      <TableCell component="th" align="center" id={row._id} scope="row" padding="none" > {row.customerName} </TableCell>
                      <TableCell align="center">{row.customerPhoneNo}</TableCell>
                      <TableCell align="center">{row.Productsdetails[0]?.productName}</TableCell>
                      <TableCell align="center">{getDueDate(row.Installment.productMonthlyInstallment)}</TableCell>
                      <TableCell align="center">{amountRemaining(row.Installment.installmentAmount, row.Installment.productMonthlyInstallment, row._id)}</TableCell>
                      <TableCell align="center">
                        <IconButton aria-label="delete" size="large">
                          <AlternateEmailIcon fontSize="inherit" />
                        </IconButton>
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
