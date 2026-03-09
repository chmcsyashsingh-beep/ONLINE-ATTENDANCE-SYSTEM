import api from '../lib/axios';
import { ArrowLeftIcon } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const CreatePage = () => {
    const [name, setName] = useState('');
    const [rollNo, setRollNo] = useState('');
    const [year, setYear] = useState('');
    const [subject, setSubject] = useState('');
    const [date, setDate] = useState('');
    const [status, setStatus] = useState('Present');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/', { name, rollNo: Number(rollNo), year, subject, date, status });
            toast.success('Attendance marked successfully!');
            navigate('/');
        } catch (error) {
            console.log('Error marking attendance', error);
            toast.error('Failed to mark attendance.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen bg-base-200'>
            <div className='container mx-auto px-4 py-8'>
                <div className='max-w-2xl mx-auto'>
                    <Link to={'/'} className='btn btn-ghost mb-6'>
                        <ArrowLeftIcon className='size-5' /> Back to Records
                    </Link>
                    <div className='card bg-base-100 shadow-xl'>
                        <div className='card-body'>
                            <h2 className='card-title text-3xl mb-6'>Mark New Attendance</h2>
                            <form onSubmit={handleSubmit}>
                                <div className='form-control mb-4'>
                                    <label className='label'><span className='label-text'>Student Name</span></label>
                                    <input type="text" placeholder='Full Name' className='input input-bordered' value={name} onChange={(e) => setName(e.target.value)} required />
                                </div>

                                <div className='grid grid-cols-2 gap-4'>
                                    <div className='form-control mb-4'>
                                        <label className='label'><span className='label-text'>Roll Number</span></label>
                                        <input type="number" placeholder='e.g. 101' className='input input-bordered' value={rollNo} onChange={(e) => setRollNo(e.target.value)} required />
                                    </div>
                                    <div className='form-control mb-4'>
                                        <label className='label'><span className='label-text'>Year</span></label>
                                        <input type="text" placeholder='e.g. 2nd Year' className='input input-bordered' value={year} onChange={(e) => setYear(e.target.value)} required />
                                    </div>
                                </div>

                                <div className='grid grid-cols-2 gap-4'>
                                    <div className='form-control mb-4'>
                                        <label className='label'><span className='label-text'>Subject</span></label>
                                        <input type="text" placeholder='e.g. Data Structures' className='input input-bordered' value={subject} onChange={(e) => setSubject(e.target.value)} required />
                                    </div>
                                    <div className='form-control mb-4'>
                                        <label className='label'><span className='label-text'>Date</span></label>
                                        <input type='date' className='input input-bordered' value={date} onChange={(e) => setDate(e.target.value)} required />
                                    </div>
                                </div>

                                <div className='grid grid-cols-2 gap-4'>
                                    <div className='form-control mb-4 col-span-2'>
                                        <label className='label'><span className='label-text'>Status</span></label>
                                        <select className='select select-bordered w-full' value={status} onChange={(e) => setStatus(e.target.value)} required>
                                            <option value="Present">Present</option>
                                            <option value="Absent">Absent</option>
                                        </select>
                                    </div>
                                </div>

                                <div className='card-actions justify-end mt-6'>
                                    <button type='submit' className='btn btn-primary btn-lg' disabled={loading}>
                                        {loading ? "Marking ..." : "Mark Attendance"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePage;