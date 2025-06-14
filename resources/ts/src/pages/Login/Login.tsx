import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { setError } from '@/store/auth/auth.slice';
import Input from '@/components/shared/Input/Input';
import Button from '@/components/shared/Button/Button';
import './Login.scss';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { loginSchema } from '@/store/auth/auth.types';
import { AuthService } from '@/store/auth/auth.service';

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated, loading, error } = useAppSelector((state) => state.auth);
  const [showPassword, setShowPassword] = React.useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
     mode: "all",
    defaultValues: {
      email: '',
      password: ''
    }
  });

  useEffect(() => {
    if (isAuthenticated) {

        navigate('/products');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    return () => {
      dispatch(setError(''));
    };
  }, [dispatch]);

  const onSubmit = (data: LoginFormInputs) => {
    dispatch(AuthService.loginAsync(data));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-form">
          <h1 className="login-title">Welcome back</h1>
          <p className="login-subtitle">Please enter your details to sign in</p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <>
                  <Input
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                  />
                  {errors.email && (
                    <div className="login-error">{errors.email.message}</div>
                  )}
                </>
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <>
                  <Input
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    icon={
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="password-toggle"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    }
                    {...field}
                  />
                  {errors.password && (
                    <div className="login-error">{errors.password.message}</div>
                  )}
                </>
              )}
            />

            {error && <div className="login-error">{error}</div>}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="login-button"
            >
              Login
            </Button>
          </form>

          <p className="login-signup">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>

          <div className="login-demo">
            <p>Demo credentials:</p>
            <p>Email: user@example.com</p>
            <p>Password: password</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;