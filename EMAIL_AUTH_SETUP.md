# Email/Password Authentication Setup

## Enable Email/Password Authentication in Supabase

To allow users to register and sign in with email and password, you need to enable this provider in Supabase.

### Steps:

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Navigate to **Authentication → Providers**
4. Find **Email** in the list of providers
5. Click on **Email** to open settings
6. **Enable** the Email provider
7. Configure settings:
   - **Enable email confirmations**: Optional (recommended for production)
   - **Secure email change**: Optional
   - **Double confirm email changes**: Optional
8. Click **Save**

### Email Templates (Optional)

You can customize email templates in **Authentication → Email Templates**:
- **Confirm signup**: Sent when user registers
- **Magic Link**: For passwordless login
- **Change Email Address**: When user changes email
- **Reset Password**: For password recovery

### Testing

After enabling email/password authentication:

1. Open your application
2. Click on **Register** tab
3. Fill in:
   - Full Name
   - Email
   - Password (minimum 6 characters)
   - Confirm Password
4. Click **Register**
5. If email confirmation is enabled, check your email and verify the account
6. Sign in with your email and password

### Notes

- The trigger `on_auth_user_created` will automatically create a user in the `users` table when they register
- Users registered via email/password will have role `user` by default
- To make a user an admin, update their role in the `users` table in Supabase
- Password must be at least 6 characters long
- Email addresses must be unique

