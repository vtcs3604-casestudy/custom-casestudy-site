/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { MsalProvider } from '@azure/msal-react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Home } from './pages/home';
import { Search } from './pages/search'

import { NavigationBar } from './components/NavigationBar';
import './styles/App.css';

/**
 * msal-react is built on the React context API and all parts of your app that require authentication must be
 * wrapped in the MsalProvider component. You will first need to initialize an instance of PublicClientApplication
 * then pass this to MsalProvider as a prop. All components underneath MsalProvider will have access to the
 * PublicClientApplication instance via context as well as all hooks and components provided by msal-react. For more, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/getting-started.md
 */
const App = ({ instance }) => {
    
    return (
        <BrowserRouter>
            <MsalProvider instance={instance}>
                <div className="App">
                    <NavigationBar/>
                    <br/>
                    <Routes>
                        <Route path='/' element={<Home/>} />
                        <Route path='/search' element={<Search/>} />
                    </Routes>
                </div>
            </MsalProvider>
        </BrowserRouter>
    );
};

export default App;
