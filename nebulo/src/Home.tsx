import './css/App.css'
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { jwtDecode } from 'jwt-decode';
import type { JwtPayload } from 'jwt-decode';

const Home = () => {
  const { token, logout } = useAuth();

  let role = null;
  if (token) {
    try {
      const decoded: any = jwtDecode(token);
      role = decoded.role;
      console.log('Role:', role);
    } catch (e) {
      console.error('Failed to decode token');
    }
  }

  const navigate = useNavigate();

  return (
    <>
      <div className="page-wrapper">
        <div className="header">
          <div className="header-section">
          </div>
          <div className="header-section center">
            <p className="title">- Void - </p>
          </div>
          <div className="header-section left">
            {token ? (
              <p className="login" onClick={() => logout()}>{">Logout"}</p>
            ):(
              <p className="login" onClick={() => navigate('/login')}>{">Login"}</p>
            )}
          </div>
        </div>
        <div className="main-wrapper">
          <div className="left-box"></div>
          <div className="center-box drop-shadow">
            <div className="content">
              {token ? (
                <div>
                  <p>Logged in</p>
                </div>
              ) : (
                  <p>|-|-|-|</p>
              )}
            </div>
          </div>
          <div className="right-box"></div>
        </div>
        <div className="footer">
          © {new Date().getFullYear()} - sibe
        </div>
      </div>
    </>
  )
}

export default Home;
