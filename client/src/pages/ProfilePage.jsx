import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const { user } = useAuth();
  console.log(user);
  return (
    <div>
      <p>ProfilePage</p>
      {user.rol === 'admin' && <p>el usuario es admin</p>}
    </div>
  );
};

export default ProfilePage;
