
"use client";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAdminStatus } from '../_redux/news/admin';
import { useRouter } from 'next/navigation';

const AdminCheck = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();

  const handleCheckEmail = async () => {
    try {
   
      const response = await fetch('/api/check-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (data.isAdmin) {
        
        dispatch(setAdminStatus(true));
        router.push('/admin');
      } else {
        setError('You do not have admin access.');
      }
    } catch (err) {
      setError('Error checking admin access.');
    }
  };

  return (
    <div>
      <h1>Admin Access</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter admin email"
      />
      <button onClick={handleCheckEmail}>Check Admin</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default AdminCheck;