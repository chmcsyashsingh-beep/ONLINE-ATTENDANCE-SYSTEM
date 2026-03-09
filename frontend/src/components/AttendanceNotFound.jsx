import { NotebookIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const AttendanceNotFound = () => {
    return (
        <div className='flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center'>
            <div className='bg-primary/10 rounded-full p-8'>
                <NotebookIcon className='size-12 text-primary' />
            </div>
            <h3 className='text-3xl font-bold'>No attendance records yet</h3>
            <p className='text-base-content/70 text-lg'>Start marking attendance for your students.</p>
            <Link to='/create' className='btn btn-primary btn-lg mt-4'>
                Mark First Attendance
            </Link>
        </div>
    );
};

export default AttendanceNotFound;