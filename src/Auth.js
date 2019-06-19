// import React from 'react';
import Auth0 from 'auth0-js';
const LOGIN_SUCCESS_PAGE = '/secret';
const LOGIN_FAILURE_PAGE = '/';

export default class Auth {
  auth0 = new Auth0.WebAuth({
    domain: 'dev-6x9ktfav.auth0.com',
    clientID: 'JFAQtRSRmKg1ADGbHJIMqpstptxQe21e',
    redirectUri: 'http://localhost:3000/callback',
    audience: 'https://dev-6x9ktfav.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openId'
  });

  constructor() {
    this.login = this.login.bind(this);
  }

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResults) => {
      if (authResults && authResults.accessToken && authResults.idToken) {
        let expiresAt = JSON.stringify(
          authResults.expiresIn * 1000 + new Date().getTime()
        );
        localStorage.setItem('access_token', authResults.accessToken);
        localStorage.setItem('id_token', authResults.idToken);
        localStorage.setItem('expires_at', expiresAt);
        // eslint-disable-next-line no-restricted-globals
        location.hash = '';
        // eslint-disable-next-line no-restricted-globals
        location.pathname = LOGIN_SUCCESS_PAGE;
      } else if (err) {
        // eslint-disable-next-line no-restricted-globals
        location.pathname = LOGIN_FAILURE_PAGE;
        console.log(err);
      }
    });
  }

  isAuthenticated() {
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    if (!expiresAt) return false;
    return new Date().getTime() < expiresAt;
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // eslint-disable-next-line no-restricted-globals
    location.pathname = LOGIN_FAILURE_PAGE;
  }
}

// https://login.connectourkids.org/login?state=g6Fo2SBKZGxmS29jQ0R5bkUyY2F0ejdiUEdFLUI4WkFSNUx4SKN0aWTZIE5ubnVpOUdOeUN4N1MtRGZXXzJFR0dtS3NTdkpQUDN0o2NpZNkgaTVOR29ma2w3WjRqRWV4QTdZVGJhc3JMVDhwY0tMRFU&client=i5NGofkl7Z4jEexA7YTbasrLT8pcKLDU&protocol=oauth2&response_type=token%20id_token&redirect_uri=https%3A%2F%2Fsearch.connectourkids.org%2Fcallback&scope=openid%20profile&login_hint=signUp&nonce=cz9x4QOR2h4JY9~4TdVsKZfvkOhxX57p&auth0Client=eyJuYW1lIjoiYXV0aDAuanMiLCJ2ZXJzaW9uIjoiOS4xMC4xIn0%3D
