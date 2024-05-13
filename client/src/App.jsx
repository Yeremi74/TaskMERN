import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { AuthProvide } from './context/AuthContext';
import TasksPage from './pages/TasksPage';
import TaskFormPage from './pages/TaskFormPage';
import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage';
import ProtectedRoute from './ProtectedRoute';
import { TaskProvider } from './context/TasksContext';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <AuthProvide>
      <TaskProvider>
        <BrowserRouter>
          <main className='container px-2 mx-auto'>
            <Navbar />
            <Routes>
              <Route path='/' element={<TasksPage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />

              <Route element={<ProtectedRoute />}>
                <Route path='/tasks' element={<TasksPage />} />
                <Route path='/add-task' element={<TaskFormPage />} />
                <Route path='/tasks/:id' element={<TaskFormPage />} />
                <Route path='/profile' element={<ProfilePage />} />
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvide>
  );
};

export default App;
