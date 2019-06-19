import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Main = ({ auth }) => {
  return (
    <div>
      <p>Do you want to see the secret route?</p>
      <Link to="/secret">click here</Link>
      <Link to="/search">search</Link>
      <div>
        <p>Please login first</p>
        {auth.isAuthenticated() ? (
          <Button onClick={auth.logout}>Logout</Button>
        ) : (
          <Button onClick={auth.login}>Login</Button>
        )}
      </div>
    </div>
  );
};

const Button = styled.button`
  padding: 1rem 2rem;
  border-radius: 3px;
  border: 1px solid #ddd;
  font-family: inherit;
  font-size: inherit;
  text-transform: uppercase;
  font-weight: 300;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    border-color: #ccc;
    background: #fcfcfc;
  }
`;

export default Main;
