// Error messages for authentication flows
export type AuthErrorCode = 
  | 'DataInconsistency'
  | 'AccountPending'
  | 'DoesNotExist'
  | 'InvalidCredentials'
  | 'AccountInvalidStatus';

export type AuthStatusCode =
  | 'pending'
  | 'rejected'
  | 'disabled'
  | 'invalid';

export interface AuthError {
  title: string;
  description: string;
}

const errorMessages: Record<AuthErrorCode, AuthError> = {
  DataInconsistency: {
    title: 'Data Inconsistency',
    description: 'There was an issue with your account data. Please contact support for assistance.',
  },
  AccountPending: {
    title: 'Account Onboarding In Progress',
    description: 'Your account setup is not yet complete. Please finish the onboarding process to continue.',
  },
  DoesNotExist: {
    title: 'Account Not Found',
    description: 'No account exists with this email address. Please sign up to create a new account.',
  },
  InvalidCredentials: {
    title: 'Invalid Credentials',
    description: 'The email or password you entered is incorrect. Please try again.',
  },
  AccountInvalidStatus: {
    title: 'Account Status Invalid',
    description: 'Your account status is invalid. Please contact support for more information.',
  },
};

const statusMessages: Record<AuthStatusCode, AuthError> = {
  pending: {
    title: 'Account Pending Approval',
    description: 'Your account is currently under review by our administrators. You will be notified once your account has been approved. This usually takes 1-2 business days.',
  },
  rejected: {
    title: 'Account Application Rejected',
    description: 'Your account application has been rejected. If you believe this is an error, please contact our support team for more information.',
  },
  disabled: {
    title: 'Account Disabled',
    description: 'Your account has been disabled by an administrator. Please contact support if you have questions about this decision.',
  },
  invalid: {
    title: 'Invalid Account Status',
    description: 'Your account has an invalid status. Please contact support for assistance.',
  },
};

export function getAuthError(errorCode: string | null): AuthError | null {
  if (!errorCode) return null;
  
  return errorMessages[errorCode as AuthErrorCode] || {
    title: 'Unknown Error',
    description: 'An unexpected error occurred. Please try again or contact support.',
  };
}

export function getAuthStatus(statusCode: string | null): AuthError | null {
  if (!statusCode) return null;
  
  return statusMessages[statusCode as AuthStatusCode] || {
    title: 'Unknown Status',
    description: 'Your account has an unknown status. Please contact support for assistance.',
  };
}
