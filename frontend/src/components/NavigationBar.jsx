import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import { Navbar } from "react-bootstrap";
import { loginRequest } from "../authConfig";
import { Link } from "react-router-dom";

export const NavigationBar = () => {
  const { instance } = useMsal();

  let activeAccount;

  if (instance) {
    activeAccount = instance.getActiveAccount();
  }

  const handleLoginPopup = () => {
    /**
     * When using popup and silent APIs, we recommend setting the redirectUri to a blank page or a page
     * that does not implement MSAL. Keep in mind that all redirect routes must be registered with the application
     * For more information, please follow this link: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/login-user.md#redirecturi-considerations
     */
    instance
      .loginPopup({
        ...loginRequest,
        redirectUri: "/redirect",
      })
      .catch((error) => console.log(error));
  };

  const handleLogoutPopup = () => {
    instance
      .logoutPopup({
        mainWindowRedirectUri: "/", // redirects the top level app after logout
        account: instance.getActiveAccount(),
      })
      .catch((error) => console.log(error));
  };

  /**
   * Most applications will need to conditionally render certain components based on whether a user is signed in or not.
   * msal-react provides 2 easy ways to do this. AuthenticatedTemplate and UnauthenticatedTemplate components will
   * only render their children if a user is authenticated or unauthenticated, respectively.
   */
  return (
    <>
      <Navbar style={{ backgroundColor: '#861f41' }} variant="dark" className="navbarStyle" expand="md"> 
      
        <a className="navbar-brand" href="/">
            Home
        </a>
            <ul className="mr-auto">
                <li>
                    <Link to="/search">Search</Link>
                </li>
                <AuthenticatedTemplate>
                    <li>
                        <Link to="/search">Edit Profile</Link>
                    </li>
                </AuthenticatedTemplate>
            </ul>
        <AuthenticatedTemplate>
          <div className="collapse navbar-collapse justify-content-end">
            <button onClick={handleLogoutPopup} style={{ backgroundColor: '#E5751F', color: '#ffffff', borderRadius: '5px' }}>Log Out</button>
          </div>
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <div className="collapse navbar-collapse justify-content-end" >
            <button onClick={handleLoginPopup} style={{ backgroundColor: '#E5751F', color: '#ffffff', borderRadius: '5px' }}>Log In</button>
          </div>
        </UnauthenticatedTemplate>
      </Navbar>
    </>
  );
};
