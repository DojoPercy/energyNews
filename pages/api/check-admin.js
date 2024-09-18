// pages/api/check-admin.js
import { admins } from '../../lib/utils'; // Example admin list

export default async function handler(req, res) {
  // Ensure the request method is POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' }); // 405: Method Not Allowed
  }

  const { email } = req.body;

  // Check if email exists in admin list (this could be a DB query in a real app)
  if (!email) {
    return res.status(400).json({ message: 'Email is required' }); // 400: Bad Request if email is missing
  }

  if (admins.includes(email)) {
    return res.status(200).json({ isAdmin: true });
  }

  return res.status(401).json({ isAdmin: false }); // 401: Unauthorized if email is not an admin
}
