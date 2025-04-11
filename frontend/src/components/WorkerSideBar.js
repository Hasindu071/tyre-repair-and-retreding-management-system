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
  FiClipboard,
  FiCalendar,
  FiUser,
  FiPackage
} from 'react-icons/fi';
import MenuIcon from '@mui/icons-material/Menu';
import '../styles/WorkerSideBar.css';

const navItems = [
  { text: 'Dashboard', icon: <FiHome />, path: '/WorkerDashboard' },
  { text: 'My Tasks', icon: <FiClipboard />, path: '/view-tasks' },
  { text: 'Update Progress', icon: <FiUser />, path: '/update-progress' },
  { text: 'Complete Task', icon: <FiUser />, path: '/complete-task' },
  { text: 'Attendance', icon: <FiCalendar />, path: '/WokerAttendance' },
  { text: 'Stocks', icon: <FiPackage />, path: '/Worker/Stocks' }
];

const WorkerSideBar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => setOpen(!open);

  return (
    <Box className="sidebar-container">
      {isMobile && (
        <AppBar position="sticky" sx={{ bgcolor: '#1e1e2f' }}>
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={toggleDrawer}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">Worker Panel</Typography>
          </Toolbar>
        </AppBar>
      )}

      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={open || !isMobile}
        onClose={toggleDrawer}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            background: 'rgb(51, 49, 55)',
            color: '#fff',
            boxShadow: '2px 0 8px rgba(0,0,0,0.2)'
          }
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h5" className="sidebar-title">Worker Panel</Typography>
        </Box>
        <Divider sx={{ borderColor: '#2d2d3a' }} />
        <List>
          {navItems.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'active' : ''}`
              }
            >
              <ListItem button>
                <span className="gradient-bar" />
                <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            </NavLink>
          ))}
        </List>
      </Drawer>

      <Box sx={{ marginLeft: isMobile ? 0 : 240, p: 2 }}>
        {/* Main content here */}
      </Box>
    </Box>
  );
};

export default WorkerSideBar;
