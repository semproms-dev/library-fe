import { Outlet, Link, useLocation } from "@tanstack/react-router";
import "./App.css";

function App() {
    const location = useLocation();
    
    return (
        <div className="app-container">
            <h1>Library</h1>
            <div className="tabs-container">
                <Link 
                    to="/" 
                    className={`tab ${location.pathname === '/' ? 'active' : ''}`}
                >
                    Search books
                </Link>
                <Link 
                    to="/about" 
                    className={`tab ${location.pathname === '/about' ? 'active' : ''}`}
                >
                    Insert books
                </Link>
            </div>
            <div className="tab-content">
                <Outlet />
            </div>
        </div>
    );
}

export default App;
