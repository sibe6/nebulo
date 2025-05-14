import { useState } from 'react';
import { useAuthFetch } from './useAuthFetch';
import './css/Profile.css';

const Profile = () => {
  const authFetch = useAuthFetch();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordAgain, setNewPasswordAgain] = useState('');
  const [message, setMessage] = useState('');

  const handleChangePassword = async () => {
    if (newPassword !== newPasswordAgain) {
      setMessage('New Passwords do not match');
      return;
    }

    try {
      const res = await authFetch('/api/profile/changePassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      if (res.ok) {
        setCurrentPassword('');
        setNewPassword('');
        setMessage('Password updated successfully.');
      } else {
        const error = await res.text();
        setMessage(`Failed to update password: ${error}`);
      }
    } catch (err) {
      setMessage('An error occurred while updating the password.');
    }
  };

  return (
    <div>
      {message && <p>{message}</p>}

      <div className="change-password">
        <h3>Change Password</h3>
        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="New Password Again"
          value={newPasswordAgain}
          onChange={(e) => setNewPasswordAgain(e.target.value)}
        />
        <button onClick={handleChangePassword}>Update Password</button>
      </div>
    </div>
  );
};

export default Profile;