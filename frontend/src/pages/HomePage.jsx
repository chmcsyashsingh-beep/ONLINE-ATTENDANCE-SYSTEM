import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import api from '../lib/axios';
import toast from 'react-hot-toast';
import AttendanceCard from '../components/AttendanceCard';
import AttendanceNotFound from '../components/AttendanceNotFound';

const HomePage = () => {
    const [attendances, setAttendances] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [filterYear, setFilterYear] = useState('');

    useEffect(() => {
        const fetchAttendances = async () => {
            try {
                const res = await api.get('/');
                setAttendances(res.data);
            } catch (error) {
                toast.error("Failed to load records");
            } finally {
                setLoading(false);
            }
        };
        fetchAttendances();
    }, []);

    const total = attendances.length;
    const presentCount = attendances.filter(a => a.status === 'Present').length;
    const percentage = total > 0 ? Math.round((presentCount / total) * 100) : 0;

    const years = [...new Set(attendances.map(a => a.year).filter(Boolean))].sort();

    const filteredAttendances = attendances.filter(att => {
        const nameMatch = att.name ? att.name.toLowerCase().includes(searchTerm.toLowerCase()) : false;
        const rollMatch = att.rollNo ? att.rollNo.toString().toLowerCase().includes(searchTerm.toLowerCase()) : false;
        const matchesSearch = nameMatch || rollMatch;
        const matchesStatus = !filterStatus || att.status === filterStatus;
        const matchesYear = !filterYear || att.year === filterYear;
        return matchesSearch && matchesStatus && matchesYear;
    });

    return (
        <div className='min-h-screen bg-base-200'>
            <Navbar />

            <div className='max-w-7xl mx-auto p-4 mt-6'>
                {/* Stats */}
                {!loading && total > 0 && (
                    <div className="stats shadow-xl bg-base-100 w-full mb-10 grid grid-cols-2 md:grid-cols-4">
                        <div className="stat place-items-center"><div className="stat-title">TOTAL RECORDS</div><div className="stat-value text-5xl text-primary">{total}</div></div>
                        <div className="stat place-items-center"><div className="stat-title">PRESENT</div><div className="stat-value text-5xl text-success">{presentCount}</div></div>
                        <div className="stat place-items-center"><div className="stat-title">ABSENT</div><div className="stat-value text-5xl text-error">{total - presentCount}</div></div>
                        <div className="stat place-items-center"><div className="stat-title">ATTENDANCE RATE</div><div className="stat-value text-5xl text-secondary">{percentage}<span className="text-2xl">%</span></div></div>
                    </div>
                )}

                {/* Search & Filter bar */}
                {!loading && total > 0 && (
                    <div className='flex flex-col md:flex-row gap-3 mb-6'>
                        <input
                            type='text'
                            placeholder='Search by name or roll no...'
                            className='input input-bordered flex-1'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <select
                            className='select select-bordered w-full md:w-48'
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value=''>All Status</option>
                            <option value='Present'>Present</option>
                            <option value='Absent'>Absent</option>
                        </select>
                        <select
                            className='select select-bordered w-full md:w-48'
                            value={filterYear}
                            onChange={(e) => setFilterYear(e.target.value)}
                        >
                            <option value=''>All Years</option>
                            {years.map(yr => (
                                <option key={yr} value={yr}>{yr}</option>
                            ))}
                        </select>
                    </div>
                )}

                {loading && <div className='text-center text-primary py-20 text-2xl font-medium'>Loading attendance records...</div>}
                {!loading && total === 0 && <AttendanceNotFound />}
                {filteredAttendances.length > 0 && (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {filteredAttendances.map((attendance) => (
                            <AttendanceCard key={attendance._id} attendance={attendance} setAttendances={setAttendances} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;