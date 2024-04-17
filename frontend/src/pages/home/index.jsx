import React from 'react';
import { AuthenticatedTemplate, useMsal, UnauthenticatedTemplate } from '@azure/msal-react';
import { Container } from 'react-bootstrap';
import { IdTokenData } from '../../components/DataDisplay';
import SearchBar from '../../components/SearchBar';

/**
 * Creates the homepage for the website
 */
export const Home = () => {
    const { instance } = useMsal();

    let activeAccount;

    if (instance) {
        activeAccount = instance.getActiveAccount();
        console.log(activeAccount)
    }
    
    return (
        <>
            <h1>
                <center>Case study library</center>
            </h1>
            <AuthenticatedTemplate>
                <p><center>You are logged in {activeAccount ? activeAccount.username : 'Unknown'}</center></p>
            </AuthenticatedTemplate>
            <br />
            <AuthenticatedTemplate>
                {activeAccount ? (
                    <Container>
                        <IdTokenData idTokenClaims={activeAccount.idTokenClaims} />
                    </Container>
                ) : null}
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <h5 className="card-title">Please sign-in to see your profile information.</h5>
            </UnauthenticatedTemplate>
            <br />
            <SearchBar></SearchBar>
            <p2 className="proj-des"> This site is a repository for case studies 
            that are conducted by students enrolled in CS3604: Professionalism in Computing, 
            in which students can browse case studies done by previous students, as well as 
            upload their own case study.</p2>
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
    )
}