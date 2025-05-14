import './css/Login.css';
import './css/Animations.css';
import { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (!res.ok) throw new Error('Login failed');
      setLoading(false);
      const data = await res.json();
      login(data.token);
      navigate('/');
    } catch (err) {
      setLoading(false);
      setError('Invalid credentials');
    }
  };

  return (
    <>
      <div className="login-page">
        <div className={`forsen ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(true)}>
          <div className="forsen-left">
            ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠋
            ⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠋⠁⠄⠄
            ⣿⣿⣿⣿⣿⣿⡿⠋⠁⠄⠄⠄⠄⢸
            ⣿⣿⣿⣿⣿⡟⠁⠄⠄⠄⠄⠄⠉⣛
            ⣿⣿⣿⡿⠋⠄⠄⠄⠄⠄⠄⣾⣿⡟
            ⣿⣿⣿⡇⠄⠄⠄⠄⠄⠄⠄⣻⣿⣿
            ⣿⣿⣿⣇⠄⠄⠄⠄⠄⠄⢰⣿⣿⣿
            ⣿⣿⣿⣿⠄⠄⠄⠄⠄⠄⠸⣿⣿⣿
            ⣿⣿⣿⣿⡄⠄⠄⠄⠄⠄⠄⣠⣿⣿
            ⣿⣿⣿⣿⣿⣧⠄⠄⢀⣴⣿⣿⣟⣉
            ⣿⣿⣿⣿⡿⠟⢀⣴⣿⣿⣿⣿⣿⣿
            ⠛⠋⠉⠁⠄⣠⣾⣿⣿⣿⣿⣿⣿⣿
            ⠄⠄⠄⠄⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿
            ⠄⠄⢀⣰⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿
          </div>
          <div className="forsen-right">
            ⠉⠉⠉⠄⠈⠉⠙⠿⣿⣿⣿⣿⣿⣿
            ⠄⣀⣤⣴⣶⣤⣤⣀⠈⢿⣿⣿⣿⣿
            ⣿⣿⣿⣿⣿⣿⣿⣿⣷⡄⢻⣿⣿⣿
            ⣛⣛⡛⢻⣿⣿⣿⣿⣿⣿⡀⢻⣿⣿
            ⢱⣆⠄⠿⢿⣿⣿⣯⠬⣙⡇⠘⣿⣿
            ⣭⣵⣦⠄⣠⣿⡈⢿⣀⣸⡇⠄⣿⣿
            ⣿⣿⡿⠃⢨⠟⣷⣿⣿⣿⠃⠄⢿⣿
            ⠟⠁⠄⠄⠄⠄⠹⣿⣿⣿⠄⠄⠄⣿
            ⡿⢂⣀⢸⣦⠄⠄⣹⣿⠇⠄⠄⣼⣿
            ⣴⣿⠇⣠⣾⠂⠄⠈⠄⠄⢀⣼⣿⣿
            ⣿⣵⣿⡿⣣⠄⠄⠄⠄⣰⣿⣿⠿⠋
            ⣿⣿⣵⡿⠃⠄⠄⠄⢠⣿⠟⠁⠄⠄
            ⣿⡿⠋⠄⠄⠄⠄⠄⠈⠁⠄⠄⠄⠄
            ⠋⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
          </div>

          <form onSubmit={handleLogin}> 
          <div className={`login-form ${isOpen ? 'visible' : ''}`}>
              <p onClick={() => navigate('/register')}>Create user</p>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <input onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username" />
              <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
              <button type="submit" disabled={loading}>
                {loading ? <span className="loading-dots"><span>.</span><span>.</span><span>.</span></span> : 'Login'}
              </button>
          </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;