import { useEffect, useState, useCallback } from 'react';
import { useAuthFetch } from './useAuthFetch';

interface PendingUser {
  _id: string;
  username: string;
  createdAt: string;
}

interface User {
  _id: string;
  username: string;
  role: string;
  createdAt: string;
}

const AdminDashboard = () => {
  const authFetch = useAuthFetch();
  const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [activeTab, setActiveTab] = useState<'pending' | 'all'>('pending');

  const fetchPendingUsers = useCallback(async () => {
    try {
      const res = await authFetch('/api/admin/pendingUsers');
      if (res.ok) {
        const data = await res.json();
        setPendingUsers(data);
      } else {
        console.error('Failed to fetch pending users:', await res.text());
      }
    } catch (err) {
      console.error('Error fetching pending users:', err);
    }
  }, [authFetch]);

  const fetchAllUsers = useCallback(async () => {
    try {
      const res = await authFetch('/api/admin/allUsers');
      if (res.ok) {
        const data = await res.json();
        setAllUsers(data);
      } else {
        console.error('Failed to fetch all users:', await res.text());
      }
    } catch (err) {
      console.error('Error fetching all users:', err);
    }
  }, [authFetch]);

  useEffect(() => {
    fetchPendingUsers();
    fetchAllUsers();
  }, [fetchPendingUsers, fetchAllUsers]);

  const approveUser = async (userId: string) => {
    try {
      const res = await authFetch(`/api/admin/approveUser/${userId}`, {
        method: 'POST',
      });
      if (res.ok) {
        setPendingUsers((prev) => prev.filter((user) => user._id !== userId));
      } else {
        console.error('Failed to approve user:', await res.text());
      }
    } catch (err) {
      console.error('Error approving user:', err);
    }
  };

  const disapproveUser = async (userId: string) => {
    try {
      const res = await authFetch(`/api/admin/disapproveUser/${userId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setPendingUsers((prev) => prev.filter((user) => user._id !== userId));
      } else {
        console.error('Failed to disapprove user:', await res.text());
      }
    } catch (err) {
      console.error('Error disapproving user:', err);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div className="tabs">
        <button
          className={activeTab === 'pending' ? 'active' : ''}
          onClick={() => setActiveTab('pending')}
        >
          Pending Users
        </button>
        <button
          className={activeTab === 'all' ? 'active' : ''}
          onClick={() => setActiveTab('all')}
        >
          All Users
        </button>
      </div>

      {activeTab === 'pending' && (
        <div>
          <h2>Pending Users</h2>
          {pendingUsers.length === 0 ? (
            <p>No pending users</p>
          ) : (
            <ul>
              {pendingUsers.map((user) => (
                <li key={user._id}>
                  <p>
                    {user.username} (Created At: {new Date(user.createdAt).toLocaleString()})
                  </p>
                  <button onClick={() => approveUser(user._id)}>Approve</button>
                  <button onClick={() => disapproveUser(user._id)}>Disapprove</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {activeTab === 'all' && (
        <div>
          <h2>All Users</h2>
          {allUsers.length === 0 ? (
            <p>No users found</p>
          ) : (
            <ul>
              {allUsers.map((user) => (
                <li key={user._id}>
                  <p>
                    {user.username} (Role: {user.role}, Created At: {new Date(user.createdAt).toLocaleString()})
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
