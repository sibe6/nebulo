import './css/Login.css';
import './css/Animations.css';
import { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (!res.ok) throw new Error('Registration failed');
      setLoading(false);
      setError('Registration successful, wait for approval');
      navigate('/login');
    } catch (err) {
      setLoading(false);
      setError('Registration failed');
    }
  };

  return (
    <>
      <div className="login-page">
        <div className={`forsen ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(true)}>

          <form onSubmit={handleRegister}> 
          <div className={`login-form ${isOpen ? 'visible' : ''}`}>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <input onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username" />
              <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
              <input onChange={(e) => setPasswordAgain(e.target.value)} type="password" placeholder="Password again" />
              <button type="submit" disabled={loading}>
                {loading ? <span className="loading-dots"><span>.</span><span>.</span><span>.</span></span> : 'Register'}
              </button>
          </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;