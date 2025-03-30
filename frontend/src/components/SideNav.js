import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FiHome,
  FiCheckCircle,
  FiUsers,
  FiUserPlus,
  FiShoppingCart,
  FiBox,
  FiDollarSign,
  FiTrendingUp,
  FiBell,
  FiPackage
} from 'react-icons/fi';
import MenuIcon from '@mui/icons-material/Menu';
import '../styles/SideNav.css';

const Sidebar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
      setOpen(!open);
  };

  return (
      <Box className="custom-sidebar-wrapper">
          {isMobile && (
              <AppBar position="sticky" sx={{ bgcolor:  "#00000090" }}>
                  <Toolbar>
                      <IconButton
                          color="inherit"
                          edge="start"
                          onClick={toggleDrawer}
                          aria-label="menu"
                          sx={{ mr: 2 }}
                      >
                          <MenuIcon />
                      </IconButton>
                      <Typography variant="h6">Menu</Typography>
                  </Toolbar>
              </AppBar>
          )}

          <Drawer
              className="custom-sidebar-drawer"
              sx={{
                  width: 240,
                  flexShrink: 0,
                  '& .MuiDrawer-paper': {
                      width: 220,
                      boxSizing: 'border-box',
                      paddingTop: '20px'
                  }
              }}
              variant={isMobile ? 'temporary' : 'permanent'}
              anchor="left"
              open={open}
              onClose={toggleDrawer}
              ModalProps={{ keepMounted: true }}
          >
              <List className="custom-sidebar-nav">
                  <ListItem button component={NavLink} to="/OwnerDashboard" className="custom-nav-item-dashboard">
                      <ListItemIcon className="custom-nav-icon-dashboard"><FiHome /></ListItemIcon>
                      <ListItemText primary="Dashboard" className="custom-nav-text-dashboard" />
                  </ListItem>
                  <Divider />

                  <ListItem button component={NavLink} to="/ApproveOrder" className="custom-nav-item-approve-order">
                      <ListItemIcon className="custom-nav-icon-approve-order"><FiCheckCircle /></ListItemIcon>
                      <ListItemText primary="Approve Orders" className="custom-nav-text-approve-order" />
                  </ListItem>
                  <Divider />

                  <ListItem button component={NavLink} to="/AssignWorker" className="custom-nav-item-assign-worker">
                      <ListItemIcon className="custom-nav-icon-assign-worker"><FiUsers /></ListItemIcon>
                      <ListItemText primary="Assign Workers" className="custom-nav-text-assign-worker" />
                  </ListItem>
                  <Divider />

                  <ListItem button component={NavLink} to="/ApproveWorker" className="custom-nav-item-approve-worker">
                      <ListItemIcon className="custom-nav-icon-approve-worker"><FiUserPlus /></ListItemIcon>
                      <ListItemText primary="Approve Workers" className="custom-nav-text-approve-worker" />
                  </ListItem>
                  <Divider />

                  <ListItem button component={NavLink} to="/CustomerHandle" className="custom-nav-item-handle-customer">
                      <ListItemIcon className="custom-nav-icon-handle-customer"><FiShoppingCart /></ListItemIcon>
                      <ListItemText primary="Handle Customers" className="custom-nav-text-handle-customer" />
                  </ListItem>
                  <Divider />

                  <ListItem button component={NavLink} to="/OwnerProductInquiries" className="custom-nav-item-product-inquiries">
                      <ListItemIcon className="custom-nav-icon-product-inquiries"><FiBox /></ListItemIcon>
                      <ListItemText primary="Product Inquiries" className="custom-nav-text-product-inquiries" />
                  </ListItem>
                  <Divider />

                  <ListItem button component={NavLink} to="/Owner/SeePayment" className="custom-nav-item-worker-payments">
                      <ListItemIcon className="custom-nav-icon-worker-payments"><FiDollarSign /></ListItemIcon>
                      <ListItemText primary="Worker Payments" className="custom-nav-text-worker-payments" />
                  </ListItem>
                  <Divider />

                  <ListItem button component={NavLink} to="/Owner/SeeCustomerPayment" className="custom-nav-item-customer-payments">
                      <ListItemIcon className="custom-nav-icon-customer-payments"><FiDollarSign /></ListItemIcon>
                      <ListItemText primary="Customer Payments" className="custom-nav-text-customer-payments" />
                  </ListItem>
                  <Divider />

                  <ListItem button component={NavLink} to="/Owner/SendNotice" className="custom-nav-item-customer-notice">
                      <ListItemIcon className="custom-nav-icon-customer-notice"><FiBell /></ListItemIcon>
                      <ListItemText primary="Customer Notice" className="custom-nav-text-customer-notice" />
                  </ListItem>
                  <Divider />

                  <ListItem button component={NavLink} to="/Owner/Supplies" className="custom-nav-item-supplies">
                      <ListItemIcon className="custom-nav-icon-supplies"><FiPackage /></ListItemIcon>
                      <ListItemText primary="Supplies" className="custom-nav-text-supplies" />
                  </ListItem>
                  <Divider />

                  <ListItem button component={NavLink} to="/Owner/SeeSales" className="custom-nav-item-sales">
                      <ListItemIcon className="custom-nav-icon-sales"><FiTrendingUp /></ListItemIcon>
                      <ListItemText primary="Sales" className="custom-nav-text-sales" />
                  </ListItem>
                  <Divider />

                  <ListItem button component={NavLink} to="/Owner/SeeCustomerSales" className="custom-nav-item-customer-sales">
                      <ListItemIcon className="custom-nav-icon-customer-sales"><FiTrendingUp /></ListItemIcon>
                      <ListItemText primary="Customer Sales" className="custom-nav-text-customer-sales" />
                  </ListItem>
              </List>
          </Drawer>

          <Box sx={{ marginLeft: isMobile ? 0 : 240, transition: 'margin 0.3s' }}>
              {/* Main content here */}
          </Box>
      </Box>
  );
};

export default Sidebar;