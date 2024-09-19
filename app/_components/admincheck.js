"use client";
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAdminStatus } from '../_redux/news/admin';
import { useRouter } from 'next/navigation';

const AdminCheck = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    // Function to check authentication and admin status
    const checkAuth = async () => {
      try {
        // Call the API route we created
        const response = await fetch('/api/check-session');
        const data = await response.json();

        if (data.authenticated && data.isAdmin) {
          // Set admin status in Redux
          dispatch(setAdminStatus(true));
          localStorage.setItem('isAdmin', 'true'); // Store in localStorage
          router.push('/admin'); // Redirect to admin page
        } else if (data.authenticated && !data.isAdmin) {
          setError('You do not have admin access.');
        } else {
          router.push('/api/auth/login'); // Redirect to login if not authenticated
        }
      } catch (err) {
        setError('Error checking admin access.');
      } finally {
        setLoading(false); // Stop loading
      }
    };

    checkAuth();
  }, [dispatch, router]);

  if (loading) {
    return <div>Validating...</div>; // Show validation message
  }

  return (
    <div>
      <h1>Admin Access</h1>
      {error && <p>{error}</p>}
    </div>
  );
};

export default AdminCheck;
