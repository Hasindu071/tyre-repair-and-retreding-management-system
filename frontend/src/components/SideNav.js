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
    useTheme,
    Collapse
  } from '@mui/material';
  import React, { useState } from 'react';
  import { NavLink } from 'react-router-dom';
  import {
    FiHome,
    FiUsers,
    FiUserPlus,
    FiShoppingCart,
    FiBox,
    FiDollarSign,
    FiBell,
    FiPackage,
    FiLayers,
    FiCalendar,
    FiFileText,
    FiClock,
    FiThumbsUp
  } from 'react-icons/fi';
  import MenuIcon from '@mui/icons-material/Menu';
  import { ExpandLess, ExpandMore } from '@mui/icons-material';
  import '../styles/SideNav.css';
  
  const Sidebar = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [open, setOpen] = useState(false);
    const [openOrdersMenu, setOpenOrdersMenu] = useState(false);
  
    const toggleDrawer = () => setOpen(!open);
    const handleOrdersMenuClick = () => setOpenOrdersMenu(!openOrdersMenu);
  
    return (
      <Box className="custom-sidebar-wrapper">
        {isMobile && (
          <AppBar position="sticky" sx={{ bgcolor: "#00000090" }}>
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
              width: 260,
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
  
                          {/* Orders Menu with Collapse */}
              <ListItem button onClick={handleOrdersMenuClick} className="custom-nav-item-orders">
                <ListItemIcon className="custom-nav-icon-orders"><FiShoppingCart /></ListItemIcon>
                <ListItemText primary="Orders" className="custom-nav-text-orders" />
                {openOrdersMenu ? <ExpandLess /> : <ExpandMore />}
              </ListItem>

              <Collapse in={openOrdersMenu} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component={NavLink}
                    to="/Orders/PendingOrders"
                    className="custom-nav-subitem-pending"
                    sx={{ pl: 4 }}
                  >
                    <ListItemIcon><FiClock /></ListItemIcon>
                    <ListItemText primary="Pending Orders" />
                  </ListItem>

                  <ListItem
                    button
                    component={NavLink}
                    to="/Orders/Approved"
                    className="custom-nav-subitem-approved"
                    sx={{ pl: 4 }}
                  >
                    <ListItemIcon><FiThumbsUp /></ListItemIcon>
                    <ListItemText primary="Approved Orders" />
                  </ListItem>

                  <ListItem
                    button
                    component={NavLink}
                    to="/Orders/CompleteOrders"
                    className="custom-nav-subitem-complete"
                    sx={{ pl: 4 }}
                  >
                    <ListItemIcon><FiPackage /></ListItemIcon>
                    <ListItemText primary="Complete Orders" />
                  </ListItem>
                </List>
              </Collapse>
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
  
            <ListItem button component={NavLink} to="/UpdateTirePatterns" className="custom-nav-item-update-patterns">
              <ListItemIcon className="custom-nav-icon-update-patterns"><FiLayers /></ListItemIcon>
              <ListItemText primary="Update Patterns" className="custom-nav-text-update-patterns" />
            </ListItem>
            <Divider />
  
            <ListItem button component={NavLink} to="/Owner/WorkerAttendance" className="custom-nav-item-attendance">
              <ListItemIcon className="custom-nav-icon-attendance"><FiCalendar /></ListItemIcon>
              <ListItemText primary="Attendance" className="custom-nav-text-attendance" />
            </ListItem>
            <Divider />
  
            <ListItem button component={NavLink} to="/OwnerReport" className="custom-nav-item-reports">
              <ListItemIcon className="custom-nav-icon-reports"><FiFileText /></ListItemIcon>
              <ListItemText primary="Reports" className="custom-nav-text-reports" />
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
  