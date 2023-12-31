import React, {useContext} from 'react';
import { AdminContext } from '../Contexts/AdminContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../AdminLogin.css';

const AdminLogin = () => {
    const { adminLogin, setAdminLogin, adminPassword, setAdminPassword, handleAdminLogin  } = useContext(AdminContext);
    return (
        <div className="AdminLogin-container">
            <div className="card" style={{ maxWidth: '400px', margin: 'auto' }}>
                <div className="card-body">
                    <h2 className="card-title text-center mb-4">Logowanie Admina do SmartLibrary</h2>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Kod logowania:</label>
                            <input
                                value={adminLogin}
                                onChange={(e) => setAdminLogin(e.target.value)}
                                placeholder="Podaj kod logowania"
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Hasło:</label>
                            <input
                                type="password"
                                value={adminPassword}
                                onChange={(e) => setAdminPassword(e.target.value)}
                                placeholder="Hasło"
                                className="form-control"
                            />
                        </div>
                        <button type="button" onClick={handleAdminLogin} className="btn btn-sm btn-primary">
                            Zaloguj
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
