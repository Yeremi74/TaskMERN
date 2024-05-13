import { useForm } from 'react-hook-form';
import { useTasks } from '../context/TasksContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const TaskFormPage = () => {
  const { register, handleSubmit, setValue } = useForm();

  const { tasks, createTask, getUniqueTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task = await getUniqueTask(params.id);
        console.log(task);
        setValue('title', task.title);
        setValue('description', task.description);
      }
    }

    loadTask();
  }, []);

  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');

  const onSubmit = handleSubmit((data) => {
    let errors = {};

    if (data.description.trim() === '') {
      errors.description = 'Description is Empty';
    }

    if (data.title.trim() === '') {
      errors.title = 'Title is Empty';
    }

    setDescriptionError(errors.description || '');
    setTitleError(errors.title || '');

    if (Object.keys(errors).length === 0) {
      if (params.id) {
        updateTask(params.id, data);
      } else {
        createTask(data);
      }
      navigate('/tasks');
    }
  });

  return (
    <div className='flex items-center justify-center h-[calc(100vh-100px)]'>
      <div className='w-full max-w-md p-10 rounded-md bg-zinc-800'>
        <h1 className='text-2xl font-bold'>Add Task</h1>
        <form onSubmit={onSubmit}>
          <div className='my-2'>
            <input
              type='text'
              placeholder='Title'
              {...register('title')}
              autoFocus
              className='w-full px-4 py-2 text-white rounded-md bg-zinc-700'
            />
            {titleError && <p className='text-red-500'>{titleError}</p>}
          </div>
          <div className='my-2'>
            <textarea
              rows='3'
              placeholder='Description'
              {...register('description')}
              className='w-full px-4 py-2 text-white rounded-md bg-zinc-700'
            ></textarea>
            {descriptionError && (
              <p className='text-red-500'>{descriptionError}</p>
            )}
          </div>
          <button className='px-4 py-1 bg-indigo-500 rounded-sm'>Save</button>
        </form>
      </div>
    </div>
  );
};

export default TaskFormPage;
