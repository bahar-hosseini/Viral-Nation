import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';

const Navbar = () => {
  return (
    <div>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <img
              src="/V-light.png"
              alt="V"
              style={{
                width: '33px',
                height: '32px',
              }}
            />
            <span
              style={{
                fontFamily: 'Roboto',
                fontWeight: 400,
                letterSpacing: '.1rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              iral Nation
            </span>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default Navbar;
