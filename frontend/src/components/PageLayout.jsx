import { AuthenticatedTemplate, useMsal } from '@azure/msal-react';
import { NavigationBar } from './NavigationBar.jsx';

export const PageLayout = (props) => {
    const { instance } = useMsal();

    let activeAccount;

    if (instance) {
        activeAccount = instance.getActiveAccount();
        console.log(activeAccount)
    }
    
    /**
     * Most applications will need to conditionally render certain components based on whether a user is signed in or not.
     * msal-react provides 2 easy ways to do this. AuthenticatedTemplate and UnauthenticatedTemplate components will
     * only render their children if a user is authenticated or unauthenticated, respectively.
     */
    return (
        <>
            <NavigationBar />
            <br />
            <h5>
                <center>Welcome to the Microsoft Authentication Library For React Tutorial</center>
            </h5>
            <AuthenticatedTemplate>
                <p><center>You are logged in {activeAccount ? activeAccount.username : 'Unknown'}</center></p>
            </AuthenticatedTemplate>
            <br />
            {props.children}
            <br />
            <AuthenticatedTemplate>
                <footer>
                    <center>
                        How did we do?
                        <a
                            href="https://forms.office.com/Pages/ResponsePage.aspx?id=v4j5cvGGr0GRqy180BHbR73pcsbpbxNJuZCMKN0lURpUMlRHSkc5U1NLUkxFNEtVN0dEOTFNQkdTWiQlQCN0PWcu"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            {' '}
                            Share your experience!
                        </a>
                    </center>
                </footer>
            </AuthenticatedTemplate>
        </>
    );
}