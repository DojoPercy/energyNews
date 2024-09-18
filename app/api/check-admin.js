// pages/api/check-admin.js
import { admins } from '../../lib/utils'; // Example admin list

export default async function handler(req, res) {
  const { email } = req.body;

  // Check if email exists in admin list (this could be a DB query in a real app)
  if (admins.includes(email)) {
    return res.status(200).json({ isAdmin: true });
  }

  return res.status(401).json({ isAdmin: false });
}
