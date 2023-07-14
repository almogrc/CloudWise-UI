import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import {
  Box,
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Snackbar,
  SnackbarContent,
  Menu,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TextField,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';


// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'dns', label: 'DNS', alignRight: false },
  { id: 'provider', label: 'Provider', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' },
];

// ---------------------------------------------------------------------- popover code


const Providers = [
  {
    value: 'azure',
    label: 'Azure',
    icon: '/assets/icons/ic_azure.svg',
  },
  {
    value: 'aws',
    label: 'AWS',
    icon: '/assets/icons/ic_aws.svg',
  },
];

const azureTableIcon = "/assets/icons/ic_azure_table.svg";
const awsTableIcon = '/assets/icons/ic_aws.svg';


// ----------------------------------------------------------------------

const username = "Gil Kanti";

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

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserPage() {

  const [machineDNS, setDNS] = useState('');
  const [machineName, setMachineName] = useState('');
  const [openProviders, setOpenProviders] = useState('');
  const [open, setOpen] = useState(null);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openForm, setOpenPopup] = useState(null);
  const [errorOpen, setErrorOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorText, setErrorText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(Providers[0]);
  const [selectedRow, setSelectedRow] = useState(null);

  const navigate = useNavigate();

  const handleRowClick = (row) => {
    if(row !== selectedRow){
      setSelectedRow(row === selectedRow ? null : row);
    }else{
      navigate('/dashboard/app');
      setSelectedRow(row === selectedRow ? null : row);
    }
  };
 
  const handleOpenProviders = (event) => {
    setOpenProviders(event.currentTarget);
  };

  const handleCancel = (event) => {
    handleClosePopup();
  };

  const handleClosePopup = () => {
    setDNS('');
    setMachineName('');
    setOpenProviders('');
    setErrorOpen(false);
    setErrorText('');
    setSelectedProvider(Providers[0]);
    setOpenPopup(null);
  };
  
  const isValidDNS = () => {
    //  TODO
    let valid = true;
    if (machineDNS === 'kaka') {
      valid = false;
    }
    return valid;
  };

  const isValidMachineName = () => { 
    //  TODO
    let valid = true;
    if (machineDNS === 'kaka') {
      valid = false;
    }
    return valid;
  };

  const isValidProvider = () => {
    let valid = true;
    valid = true;
    //  TODO
    return valid;
  };

  const handleSubmit = (event) => {
    setIsSubmitting(true);
    if (!machineDNS || !machineName || !selectedProvider) {
      setErrorOpen(true);
      setErrorText('Please fill in all the fields.');
    } else if (!isValidDNS()) {
      setErrorOpen(true);
      setErrorText('Invalid DNS format.');
    } else if (!isValidMachineName()) {
      setErrorOpen(true);
      setErrorText('Invalid Machine Name.');
    } else if (!isValidProvider()) {
      setErrorOpen(true);
      setErrorText('Invalid Provider.');
    } else {
      setErrorOpen(false); // Clear the error state
      setSuccessMessage('Machine added successfully!');
      setSuccessOpen(true);
      setErrorText('');
      handleClosePopup();
    }
    setTimeout(() => {
      setErrorOpen(false);
      setErrorText('');
      setIsSubmitting(false);
    }, 2000);
  };
  
  const handleCloseProviders = () => {
    setOpenProviders('');
  };
  
  const handleChangeMachineNameTextBox = (event) =>  {
    setMachineName(event.target.value);
  }
  
  const handleChangeDNSTextBox = (event) => {
    setDNS(event.target.value);
    console.log("Value changed:", event.target.value);
  };
  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  
  const handleNewVirtualMachineButtonClick = (event, name) => {
    setOpenPopup(true);
  }

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
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleProviderSelect = (option) => {
    setSelectedProvider(option);
    handleCloseProviders();
  };

  const handleCloseError = () => {
    setErrorOpen(false);
    setErrorText('');
  };

  const handleCloseSuccess = () => {
    setSuccessOpen(false);
  };
  
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title>User | Minimal UI</title>
      </Helmet>

      <Container>
      
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
        <Typography variant="h3" gutterBottom>
          Welcome back {username}!
        </Typography>
        <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleNewVirtualMachineButtonClick}>
          New Virtual Machine
        </Button>
      </Stack>
      
          <Typography variant="h4" component="span" style={{ display: 'block' }}>
            Virtual Machines Registered:
          </Typography>
        
        {openForm && (
          <Popover
            id="mainPop"
            open={openForm}
            anchorOrigin={{
              vertical: 'center',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'center',
              horizontal: 'center',
            }}
            BackdropProps={{
              sx: { backdropFilter: 'blur(4px)' },
            }}
          >
            <Typography sx={{ p: 2 }}>Please enter new machine details:</Typography>
            <Typography sx={{ p: 2 }}>
              <TextField label="DNS" type="text" value={machineDNS} onChange={handleChangeDNSTextBox} style={{ marginLeft: '13px' }} />
            </Typography>
            <Typography sx={{ p: 2 }}>
              <TextField label="Machine's Name" type="text" value={machineName} onChange={handleChangeMachineNameTextBox} style={{ marginLeft: '13px' }} />
            </Typography>
            <Typography sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="subtitle1" sx={{ marginRight: '10px', marginLeft: '20px', flexGrow: 1, textAlign: 'left' }}>
                  Provider:
                </Typography>
                <Button onClick={handleOpenProviders} sx={{ marginRight: '40px', padding: 0, width: 70, height: 50 }}>
                  <img src={selectedProvider.icon} alt={selectedProvider.label} />
                </Button>
              </Box>
              <Menu
                open={Boolean(openProviders)}
                anchorEl={openProviders}
                onClose={handleCloseProviders}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                sx={{ marginTop: '8px' }}
              >
                <Stack sx={{ minWidth: 100 }}>
                  {Providers.map((option) => (
                    <MenuItem
                      key={option.value}
                      selected={option.value === selectedProvider.value}
                      onClick={() => handleProviderSelect(option)}
                    >
                      <Box component="img" alt={option.label} src={option.icon} sx={{ width: 28, mr: 2 }} />
                      {option.label}
                    </MenuItem>
                  ))}
                </Stack>
              </Menu>
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ p: 2 }}>
                <Button variant="contained" color="error" onClick={handleCancel} sx={{ marginLeft: '30px' }}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  sx={{ marginLeft: '30px' }}
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              </Typography>
            </Box>
            <Snackbar
              open={errorOpen}
              autoHideDuration={3000}
              onClose={handleCloseError}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
              <SnackbarContent
                style={{
                  backgroundColor: 'red',
                  fontWeight: 'bold',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                }}
                message={<span id="client-snackbar">{errorText}</span>}
              />
            </Snackbar>
          </Popover>
        )}

        
            <Snackbar
              open={successOpen}
              autoHideDuration={3000}
              onClose={handleCloseSuccess}
              anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
            >
              <SnackbarContent
                style={{
                  backgroundColor: 'green',
                  fontWeight: 'bold',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                }}
                message={<span id="client-snackbar">{successMessage}</span>}
              />
            </Snackbar>
        
        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
          <TableContainer sx={{ minWidth: 800 }}>
  <Table>
    <UserListHead
      order={order}
      orderBy={orderBy}
      headLabel={TABLE_HEAD}
      rowCount={USERLIST.length}
      numSelected={selected.length}
      onRequestSort={handleRequestSort}
      onSelectAllClick={handleSelectAllClick}
    />
    <TableBody>
      {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
        const { name, role, status, company, avatarUrl } = row;

        return (
          <TableRow
            onDoubleClick={() => navigate('/dashboard/app')}
            style={{
              backgroundColor: selectedRow === row ? 'lightblue' : 'transparent',
            }}
            onClick={() => handleRowClick(row)}
          >
            <TableCell component="th" scope="row" padding="none">
              <Stack direction="row" alignItems="center" spacing={1} margin={1}>
                <Avatar alt={name} src={avatarUrl} />
                <Typography variant="subtitle2" noWrap>
                  {name}
                </Typography>
              </Stack>
            </TableCell>

            <TableCell align="left">{company}</TableCell>

            <TableCell align="left">
              {role === 'Azure' && <img src={azureTableIcon} alt="Azure" height={22} />}
              {role === 'AWS' && <img src={awsTableIcon} alt="AWS" height={30} />}
            </TableCell>

            <TableCell align="left">
              <Label color={((status === 'closed' || status === 'not connected') && 'error') || 'success'}>
                {sentenceCase(status)}
              </Label>
            </TableCell>

            <TableCell align="right">
              <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                <Iconify icon={'eva:more-vertical-fill'} />
              </IconButton>
            </TableCell>
          </TableRow>
        );
      })}
      {emptyRows > 0 && (
        <TableRow style={{ height: 53 * emptyRows }}>
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </TableBody>

    {isNotFound && (
      <TableBody>
        <TableRow>
          <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
            <Paper
              sx={{
                textAlign: 'center',
              }}
            >
              <Typography variant="h6" paragraph>
                Not found
              </Typography>

              <Typography variant="body2">
                No results found for&nbsp;
                <strong>&quot;{filterName}&quot;</strong>.
                <br /> Try checking for typos or using complete words.
              </Typography>
            </Paper>
          </TableCell>
        </TableRow>
      </TableBody>
    )}
  </Table>
</TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Remove
        </MenuItem>
      </Popover>
    </>
  );
}
