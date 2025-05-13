import './css/Login.css';
import { useState } from 'react';

function Login() {
  const [isOpen, setIsOpen] = useState(false);

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

          <div className={`login-form ${isOpen ? 'visible' : ''}`}>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button>Login</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;