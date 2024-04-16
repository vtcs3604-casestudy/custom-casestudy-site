import React from 'react';
import { AuthenticatedTemplate, useMsal } from '@azure/msal-react';

/**
 * Creates a dummy search page
 */
export const Search = () => {
    const { instance } = useMsal();

    let activeAccount;

    if (instance) {
        activeAccount = instance.getActiveAccount();
        console.log(activeAccount)
    }
    
    return (
        <>
            <h5>
                <center>Welcome to the Dummy Search Page</center>
            </h5>
            <AuthenticatedTemplate>
                <p><center>You are logged in {activeAccount ? activeAccount.username : 'Unknown'}</center></p>
            </AuthenticatedTemplate>
        </>
    )
}