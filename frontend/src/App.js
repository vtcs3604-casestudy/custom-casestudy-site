import './App.css';
import {AuthenticatedTemplate, UnauthenticatedTemplate, useMsal, MsalProvider} from '@azure/msal-react'
import { loginRequest } from './config';

const WrappedView = () => {

  const {instance} = useMsal();
  const activeAccount = instance.getActiveAccount();

  const handleRedirect = () => {
    console.log("Handling redirect")
    instance.loginRedirect({
      ...loginRequest,
      prompt: 'create',
    })
    .catch((error) => console.log(error));
    console.log("Redirect handled")
  };

  return (
    <div className="App">
      <AuthenticatedTemplate>
        {activeAccount ? (
          <p>
            Authenticated Successfully
          </p>
        ) : 
          <p>
            Not authenticated successfully
          </p>
        }
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <button onClick={handleRedirect}>
          Sign Up
        </button>
      </UnauthenticatedTemplate>
    </div>
  );
};

const App = ({ instance }) => {
  return (
    <MsalProvider instance={instance}>
      <WrappedView />
    </MsalProvider>
  )
}

export default App;
