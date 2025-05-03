import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const registerSchema = z.object({
  full_name: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(255, 'Full name must be less than 255 characters'),
  email: z
    .string()
    .email('Invalid email address')
    .max(255, 'Email must be less than 255 characters'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters'),
  role: z
    .enum(['farmer', 'customer'], {
      required_error: "Please select a role",
    }),
});

type RegisterFormData = z.infer<typeof registerSchema>;

const Register = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: 'customer'
    }
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      console.log('Starting registration process with data:', { ...data, password: '[REDACTED]' });
      
      await signUp(data.email, data.password, {
        full_name: data.full_name,
        email: data.email,
        role: data.role
      });

      // Navigate to dashboard after successful registration
      navigate('/dashboard');
    } catch (error: any) {
      // Detailed error logging
      console.error('Registration error details:', {
        error: error,
        message: error.message,
        stack: error.stack,
        name: error.name,
        code: error.code,
        statusCode: error?.status || error?.statusCode,
        response: error?.response,
      });
      
      if (error.message?.toLowerCase().includes('email')) {
        console.log('Setting email error');
        setError('email', {
          message: 'This email is already registered or invalid'
        });
      } else if (error.message?.toLowerCase().includes('role')) {
        console.log('Setting role error');
        setError('role', {
          message: 'Invalid role selected'
        });
      } else {
        console.log('Setting root error');
        setError('root', {
          message: 'Failed to create account. Please try again.'
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="text-center text-3xl font-bold text-slate-900">Create your account</h2>
          <p className="mt-2 text-center text-sm text-slate-600">
            Already have an account?{' '}
            <Link to="/auth/login" className="font-medium text-primary-600 hover:text-primary-500">
              Sign in
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {errors.root && (
            <div className="rounded-md bg-error-50 p-4">
              <p className="text-sm text-error-800">{errors.root.message}</p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="full_name" className="form-label">
                Full Name
              </label>
              <input
                id="full_name"
                type="text"
                {...register('full_name')}
                className="form-input"
                placeholder="Enter your full name"
              />
              {errors.full_name && (
                <p className="mt-1 text-sm text-error-500">{errors.full_name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                id="email"
                type="email"
                {...register('email')}
                className="form-input"
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-error-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                type="password"
                {...register('password')}
                className="form-input"
                placeholder="Create a secure password"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-error-500">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="role" className="form-label">
                I want to
              </label>
              <select
                id="role"
                {...register('role')}
                className="form-input"
              >
                <option value="customer">Buy farm products</option>
                <option value="farmer">Sell my farm products</option>
              </select>
              {errors.role && (
                <p className="mt-1 text-sm text-error-500">{errors.role.message}</p>
              )}
            </div>
          </div>

          <div className="text-sm text-slate-500">
            By creating an account, you agree to our{' '}
            <Link to="/terms" className="text-primary-600 hover:text-primary-500">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-primary-600 hover:text-primary-500">
              Privacy Policy
            </Link>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary w-full"
          >
            {isSubmitting ? 'Creating account...' : 'Create account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;