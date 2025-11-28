# Admin Authentication System

## Overview

The SkillMatch platform now has a secure, separate admin authentication system using username/password credentials (not OAuth).

## Features

- **Separate Admin Table**: Admin accounts are stored in a dedicated `admin` table, isolated from regular user accounts
- **Credentials-Based Login**: Username and password authentication (no Google OAuth for admins)
- **Session Management**: Admin status stored in NextAuth session with `isAdmin` flag
- **Protected Routes**: All `/admin/*` routes check for admin authentication
- **Protected API Routes**: All `/api/admin/*` endpoints validate admin access

## Setup

### 1. Create Admin Table

Run the SQL script to create the admin table:

```bash
mysql -u your_username -p your_database < admin.create.table.sql
```

This will:
- Create the `admin` table
- Add a default admin account with credentials:
  - **Username**: `admin`
  - **Password**: `admin123`
  - ⚠️ **IMPORTANT**: Change this password immediately in production!

### 2. Install Dependencies

Make sure `bcryptjs` is installed:

```bash
npm install bcryptjs
npm install --save-dev @types/bcryptjs
```

### 3. Admin Login

Access the admin login page at:
```
http://localhost:3000/admin-login
```

## Creating New Admin Accounts

To create a new admin account, run this SQL query (replace values as needed):

```sql
INSERT INTO admin (username, password_hash, full_name, email, is_active)
VALUES (
  'newadmin',
  '$2a$10$HashedPasswordHere',  -- Use bcrypt to hash the password
  'Admin Full Name',
  'admin@example.com',
  1
);
```

To generate a password hash using Node.js:

```javascript
const bcrypt = require('bcryptjs');
const password = 'your-secure-password';
const hash = bcrypt.hashSync(password, 10);
console.log(hash);
```

## How It Works

### Authentication Flow

1. Admin visits `/admin-login`
2. Enters username and password
3. NextAuth validates credentials against `admin` table using bcrypt
4. On success, creates session with:
   - `role_id: 2` (admin role)
   - `isAdmin: true` (admin flag)
   - Admin user details

### Authorization Checks

**Frontend (Pages)**
- `src/app/(site)/admin/layout.tsx` checks session and redirects to `/admin-login` if not admin

**Backend (API Routes)**
- All `/api/admin/*` routes use `isAdmin()` helper function
- Validates `role_id === 2` OR `isAdmin === true`

### Helper Functions

Located in `src/lib/admin-auth.ts`:

```typescript
// Check if current session has admin access
await isAdmin(): Promise<boolean>

// Throw error if not admin (use in API routes)
await requireAdmin(): Promise<void>
```

## Security Notes

### ⚠️ Production Checklist

1. **Change default admin password immediately**
2. **Use strong passwords** (min 12 characters, mixed case, numbers, symbols)
3. **Enable HTTPS** for all admin routes
4. **Set secure session cookies** in production
5. **Implement rate limiting** on login endpoint
6. **Add audit logging** for admin actions
7. **Regular password rotation** policy

### Password Security

- Passwords are hashed using bcrypt with 10 salt rounds
- Never store plain text passwords
- Password hashes are 60 characters long
- Bcrypt automatically handles salt generation

## Admin Permissions

Admins can:
- ✅ View and manage all companies
- ✅ Approve/reject/disable company accounts
- ✅ View and manage all job posts
- ✅ Approve/reject/disable job postings
- ✅ View and manage student accounts
- ✅ Edit student basic information
- ✅ View analytics dashboard
- ✅ Access all system data

Regular users (OJT/Companies) cannot access admin routes.

## Troubleshooting

### "Unauthorized" Error
- Verify you're logged in as admin
- Check session contains `isAdmin: true` or `role_id: 2`
- Clear cookies and try logging in again

### Login Not Working
- Verify admin table exists in database
- Check username and password are correct
- Verify `is_active = 1` for the admin account
- Check console for error messages

### Session Not Persisting
- Verify `NEXTAUTH_SECRET` is set in `.env`
- Check `NEXTAUTH_URL` matches your app URL
- Clear browser cookies and try again

## File Structure

```
src/
├── app/
│   ├── (auth)/
│   │   └── admin-login/
│   │       └── page.tsx           # Admin login page
│   └── (site)/
│       └── admin/
│           ├── layout.tsx         # Admin auth guard
│           └── ...                # Admin pages
├── api/
│   └── admin/
│       └── ...                    # Admin API routes
├── lib/
│   ├── auth.ts                    # NextAuth config (includes admin provider)
│   └── admin-auth.ts              # Admin auth helpers
└── services/
    └── auth/
        └── auth.admin.service.ts  # Admin credentials provider
```

## Database Schema

```sql
CREATE TABLE `admin` (
  `admin_id` int(11) AUTO_INCREMENT PRIMARY KEY,
  `username` varchar(50) NOT NULL UNIQUE,
  `password_hash` varchar(255) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `last_login` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Future Enhancements

- [ ] Password reset functionality
- [ ] Two-factor authentication (2FA)
- [ ] Admin role levels (super admin, moderator, etc.)
- [ ] Audit log for admin actions
- [ ] Rate limiting on login attempts
- [ ] Account lockout after failed attempts
- [ ] Email notifications for admin activities
