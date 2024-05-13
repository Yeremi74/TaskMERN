import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signIn, errors: signinErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    signIn(data);
  });

  useEffect(() => {
    if (isAuthenticated) navigate('/tasks');
  }, [isAuthenticated]);

  return (
    <div className='flex items-center justify-center h-[calc(100vh-100px)]'>
      <div className='w-full max-w-md p-10 rounded-md bg-zinc-800'>
        <h1 className='text-2xl font-bold'>Login</h1>
        {signinErrors.map((error, i) => (
          <div className='p-2 my-2 text-center text-white bg-red-500' key={i}>
            {error}
          </div>
        ))}
        <form onSubmit={onSubmit}>
          <input
            type='email'
            {...register('email', { required: true })}
            className='w-full px-4 py-2 my-2 text-white rounded-md bg-zinc-700'
            placeholder='Email'
          />
          {errors.email && <p className='text-red-500'>Email is required</p>}
          <input
            type='password'
            {...register('password', { required: true })}
            className='w-full px-4 py-2 my-2 text-white rounded-md bg-zinc-700'
            placeholder='Password'
          />
          {errors.password && (
            <p className='text-red-500'>Password is required</p>
          )}
          <button type='submit' className='px-4 py-1 bg-indigo-500 rounded-sm'>
            Login
          </button>
        </form>
        <p className='flex justify-between gap-x-2'>
          Dont have an account?
          <Link to='/register' className='text-sky-500'>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
