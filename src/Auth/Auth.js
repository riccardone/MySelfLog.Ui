import history from '../history';
import auth0 from 'auth0-js';
import { AUTH_CONFIG } from './auth0-variables';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    audience: `https://${AUTH_CONFIG.domain}/userinfo`,
    responseType: 'token id_token',
    scope: 'openid profile'
  });

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  login() {    
    this.auth0.authorize();
  }


  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.auth0.client.userInfo(authResult.accessToken, function (err, profile) {
          if (profile) {
            authResult.profile = profile;
            // Set the time that the access token will expire at
            let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());            
            localStorage.setItem('access_token', authResult.accessToken);
            localStorage.setItem('id_token', authResult.idToken);
            localStorage.setItem('expires_at', expiresAt);
            localStorage.setItem('profileId', authResult.profile.sub);
            localStorage.setItem('profileName', authResult.profile.name);
            localStorage.setItem('profileNickname', authResult.profile.nickname);
            localStorage.setItem('profilePicture', authResult.profile.picture);
            // navigate to the home route
            history.replace('/home');
          } else {
            console.log("client.userInfo is null");
          }
        });
      } else if (err) {
        history.replace('/home');
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }



  getProfile() {
    return new Promise((resolve, reject) => {
      var accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        reject("Access token must exist to fetch profile");
      }

    });
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    history.replace('/home');
  }

  isAuthenticated() {
    // Check whether the current time is past the 
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}
