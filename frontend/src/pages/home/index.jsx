import React from 'react';
import { AuthenticatedTemplate, useMsal, UnauthenticatedTemplate } from '@azure/msal-react';
import SearchBar from '../../components/SearchBar';
import './home.css'


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
        <div className="home-wrapper">
            <header className="title">
                    <center>Case study library</center>
                </header>
                <AuthenticatedTemplate>
                    <p><center>You are logged in {activeAccount ? activeAccount.username : 'Unknown'}</center></p>
                </AuthenticatedTemplate>
                <br />
                <UnauthenticatedTemplate>
                    <h5 className="card-title">Please sign-in to see your profile information.</h5>
                </UnauthenticatedTemplate>
                <br />
                <SearchBar></SearchBar>
                <p2 className="proj-des"> This site is a repository for case studies 
                that are conducted by students enrolled in CS3604: Professionalism in Computing, 
                in which students can browse case studies done by previous students, as well as 
                upload their own case study.</p2>
        </div>
        </>
    )
}