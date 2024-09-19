import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { admins } from '../../lib/utils'; // List of admin emails

export default async function handler(req, res) {
  try {
    const { getUser, isAuthenticated } = await getKindeServerSession(req, res);

    // Check if the user is authenticated
    if (!(await isAuthenticated())) {
      return res.status(401).json({ authenticated: false });
    }

    const user = await getUser();
    const userEmail = user.email;

    // Check if the email is in the admin list
    if (admins.includes(userEmail)) {
      return res.status(200).json({ authenticated: true, isAdmin: true });
    } else {
      return res.status(200).json({ authenticated: true, isAdmin: false });
    }
  } catch (error) {
    console.error('Error in session check:', error);
    return res.status(500).json({ authenticated: false });
  }
}
