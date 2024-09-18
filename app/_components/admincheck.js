
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
        body: JSON.stringify({ email }), // Ensure `email` is defined before making the request
      });
  
      console.log('Response status:', response.status); // Log the status to help debug issues
  
      // If response is not OK, throw an error to go to the catch block
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Response data:', data); // Log response data for debugging
  
      if (data.isAdmin) {
        console.log('Response data true:', data); 
        dispatch(setAdminStatus(true));
        router.push('/admin');
      } else {
        setError('You do not have admin access.');
      }
    } catch (err) {
      console.error('Error:', err); // Log the error for debugging
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
