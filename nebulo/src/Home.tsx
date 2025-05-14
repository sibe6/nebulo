import './css/App.css'
import { useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { jwtDecode } from 'jwt-decode';
import type { JwtPayload } from 'jwt-decode';

const Home = () => {
  const { token, logout } = useAuth();

  let role = null;
  let username = null;

  if (token) {
    try {
      const decoded: any = jwtDecode(token);
      role = decoded.role;
      username = decoded.username;
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
          <div className="header-section right">
            {role ? (
              <p className="role">{`Logged in as: ${username}`}</p>
            ) : (
              <>
              </>
            )}
          </div>
          <div className="header-section center">
            <p className="title">- Void - </p>
          </div>
          <div className="header-section left">
            {token ? (
              <p className="login" onClick={() => logout()}>{">Log Out"}</p>
            ):(
              <p className="login" onClick={() => navigate('/login')}>{">Login"}</p>
            )}
          </div>
        </div>
        <div className="main-wrapper">
          <div className="left-box"></div>
          <div className="center-box drop-shadow">
              {token ? (
                <div className="content">
                  <Outlet />
                </div>
              ) : (
                <div className="empty">
                  <p>|-|-|-|</p>
                </div>
              )}
          </div>
          <div className="right-box">
            {token ? (
              <>
                <p onClick={() => navigate('/')}>home</p>
                <p onClick={() => navigate('/streams')}>streams</p>
              </>
            ) : (
              <>
              </>
            )}
          </div>
        </div>
        <div className="footer">
          © {new Date().getFullYear()} - sibe
        </div>
      </div>
    </>
  )
}

export default Home;
