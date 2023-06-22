import './App.css';
import React, {useState} from "react";
import NavBar from "./components/NavBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { UserContext } from './UserContext';

import Registration from './components/Registration';
import Login from "./components/Login";
import News from './components/News';
import Branchces from './components/Branchces'
import AboutUs  from "./components/AboutUs";
import Home from "./components/Home"
import SuggestBook from "./components/SuggestBook";
import UserProfile from "./components/UserProfile";
import Contact from "./components/Contact";
import TermsOfUse from "./components/TermsOfUse";
function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [users, setUsers] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [userType, setUserType] = useState("");

    return (
        <UserContext.Provider value={{ isAuthenticated, setIsAuthenticated, users, setUsers, loggedInUser, setLoggedInUser}}>
            <Router>
                <div>
                    <NavBar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
                    <Routes>
                        <Route path="Home" element={<Home />} />
                        <Route path="/UserProfile" element={<UserProfile loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} users={users} setUsers={setUsers} />} />
                        <Route path="/Branchces" element={<Branchces />} />
                        <Route path="/Login" element={<Login users={users} setUsers={setUsers} setIsAuthenticated={setIsAuthenticated} setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser} />} />
                        <Route path="/Registration" element={<Registration users={users} setUsers={setUsers} />} />
                        <Route path="/News" element={<News />} />
                        <Route path="/AboutUs" element={<AboutUs />} />
                        <Route path="/SuggestBook" element={<SuggestBook />} />
                        <Route path="/Contact" element={<Contact />} />
                        <Route path="/TermsOfUse" element={<TermsOfUse />} />
                    </Routes>
                </div>
            </Router>
        </UserContext.Provider>

    );

}

export default App;
