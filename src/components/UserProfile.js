import React, { useState, useContext, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContext } from '../Contexts/UserContext';

const UserProfile = () => {
    const { users, setUsers, loggedInUser, setLoggedInUser } = useContext(UserContext);
    const { username = '', email = '', dateOfBirth = ''} = loggedInUser || {};
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [newUsername, setNewUsername] = useState(username);
    const [newEmail, setNewEmail] = useState(email);
    const [showChangeUsernameForm, setShowChangeUsernameForm] = useState(false);
    const [showChangeEmailForm, setShowChangeEmailForm] = useState(false);
    const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
    const passwordFormRef = useRef(null);

    const handleChangeUsername = () => {
        if (newUsername !== '') {
            setUsers(users.map(user =>
                user.username === loggedInUser.username ? { ...user, username: newUsername } : user
            ));
            setLoggedInUser({ ...loggedInUser, username: newUsername });
            alert("Nazwa użytkownika została pomyślnie zmieniona");
            setNewUsername('');
            setShowChangeUsernameForm(false);
        } else {
            alert('Please input new username');
        }
    };

    const handleChangeEmail = () => {
        if (newEmail !== '') {
            setUsers(users.map(user =>
                user.email === loggedInUser.email ? { ...user, email: newEmail } : user
            ));
            setLoggedInUser({ ...loggedInUser, email: newEmail });
            alert("Email został pomyślnie zmieniony");
            setNewEmail('');
            setShowChangeEmailForm(false);
        } else {
            alert('Please input new email');
        }
    };

    const handleChangePassword = () => {
        if (loggedInUser.password === oldPassword) {
            if (newPassword === confirmPassword) {
                setUsers(users.map(user =>
                    user.username === loggedInUser.username ? { ...user, password: newPassword } : user
                ));
                setLoggedInUser({ ...loggedInUser, password: newPassword });
                alert('Hasło zostało pomyślnie zmienione');
            } else {
                alert('Nowe hasło nie pasuje do potwierdzenia');
            }
        } else {
            alert('Stare hasło jest nieprawidłowe');
        }
    };

    const handleScrollToPasswordForm = () => {
        setShowChangePasswordForm(true);
        passwordFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div className="container mt-5">
            <div className="card mt-4" style={{ maxWidth: "400px", margin:"auto" }}>
                <div className="card-body">
                    <div className="mb-3">
                        <label className="form-label"><strong>Nazwa użytkownika:</strong></label>
                        <div className="d-flex justify-content-between">
                            <p>{username}</p>
                            <button className="btn btn-primary btn-sm" onClick={() => setShowChangeUsernameForm(!showChangeUsernameForm)}>
                                Change
                            </button>
                        </div>
                        {showChangeUsernameForm && (
                            <div className="d-flex justify-content-between">
                                <input type="text" value={newUsername} onChange={e => setNewUsername(e.target.value)} className="form-control mr-2" />
                                <button className="btn btn-primary btn-sm" onClick={handleChangeUsername}>
                                    Confirm
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="mb-3">
                        <label className="form-label"><strong>Email:</strong></label>
                        <div className="d-flex justify-content-between">
                            <p>{email}</p>
                            <button className="btn btn-primary btn-sm" onClick={() => setShowChangeEmailForm(!showChangeEmailForm)}>
                                Change
                            </button>
                        </div>
                        {showChangeEmailForm && (
                            <div className="d-flex justify-content-between">
                                <input type="text" value={newEmail} onChange={e => setNewEmail(e.target.value)} className="form-control mr-2" />
                                <button className="btn btn-primary btn-sm" onClick={handleChangeEmail}>
                                    Confirm
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="mb-3">
                        <label className="form-label"><strong>Data urodzenia:</strong></label>
                        <p>{dateOfBirth}</p>
                    </div>

                    <button className="btn btn-primary" onClick={handleScrollToPasswordForm}>
                        Change password
                    </button>
                </div>
            </div>

            {showChangePasswordForm && (
                <div className="card mt-4" style={{ maxWidth: "400px", margin:"auto"}} ref={passwordFormRef}>
                    <div className="card-body">
                        <h3 className="card-title">Change password</h3>
                        <div className="mb-3">
                            <label className="form-label">Old password:</label>
                            <input
                                type="password"
                                value={oldPassword}
                                onChange={e => setOldPassword(e.target.value)}
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">New password:</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={e => setNewPassword(e.target.value)}
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Confirm password:</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                className="form-control"
                            />
                        </div>
                        <button className="btn btn-primary" onClick={handleChangePassword}>
                            Confirm
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
