import './css/App.css'
import { useNavigate } from 'react-router-dom';

function Home() {
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
            <p className="login" onClick={() => navigate('/login')}>{">Login"}</p>
          </div>
        </div>
        <div className="main-wrapper">
          <div className="left-box"></div>
          <div className="center-box drop-shadow">
            <div className="content">
              <p>|-|-|-|</p>
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
