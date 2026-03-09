import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from "../lib/axios";
import toast from "react-hot-toast";
import { LoaderIcon, Trash2Icon, ArrowLeftIcon } from "lucide-react";

const AttendanceDetailPage = () => {
    const [attendance, setAttendance] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const res = await api.get(`/${id}`);
                setAttendance(res.data);
            } catch (error) {
                toast.error("Failed to fetch the record");
            } finally {
                setLoading(false);
            }
        };
        fetchAttendance();
    }, [id]);

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this record?")) return;
        try {
            await api.delete(`/${id}`);
            toast.success("Record deleted successfully");
            navigate("/");
        } catch (error) {
            toast.error("Failed to delete record");
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await api.put(`/${id}`, attendance);
            toast.success("Record updated successfully");
            navigate("/");
        } catch (error) {
            toast.error("Failed to update record");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="min-h-screen bg-base-200 flex items-center justify-center"><LoaderIcon className="animate-spin size-12 text-primary" /></div>;

    return (
        <div className="min-h-screen bg-base-200">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <Link to="/" className="btn btn-ghost"><ArrowLeftIcon className="size-5" />Back to Records</Link>
                        <button onClick={handleDelete} className="btn btn-error btn-outline"><Trash2Icon className="size-5" /> Delete Record</button>
                    </div>

                    <div className="card bg-base-100 shadow-2xl">
                        <div className="card-body">
                            {/* Form fields */}
                            <div className="form-control mb-5"><label className="label"><span className="label-text font-medium">Student Name</span></label>
                                <input type="text" className="input input-bordered input-lg" value={attendance.name} onChange={(e) => setAttendance({ ...attendance, name: e.target.value })} />
                            </div>
                            
                            <div className="form-control mb-5"><label className="label"><span className="label-text font-medium">Roll Number</span></label>
                                <input type="number" className="input input-bordered input-lg" value={attendance.rollNo} onChange={(e) => setAttendance({ ...attendance, rollNo: e.target.value })} />
                            </div>

                            <div className="form-control mb-5"><label className="label"><span className="label-text font-medium">Year</span></label>
                                <input type="text" className="input input-bordered input-lg" value={attendance.year} onChange={(e) => setAttendance({ ...attendance, year: e.target.value })} />
                            </div>

                            <div className="form-control mb-5"><label className="label"><span className="label-text font-medium">Subject</span></label>
                                <input type="text" className="input input-bordered input-lg" value={attendance.subject} onChange={(e) => setAttendance({ ...attendance, subject: e.target.value })} />
                            </div>

                            <div className="form-control mb-5"><label className="label"><span className="label-text font-medium">Date</span></label>
                                <input type="date" className="input input-bordered input-lg" value={attendance.date} onChange={(e) => setAttendance({ ...attendance, date: e.target.value })} />
                            </div>

                            <div className="form-control mb-5"><label className="label"><span className="label-text font-medium">Status</span></label>
                                <select className="select select-bordered w-full" value={attendance.status} onChange={(e) => setAttendance({ ...attendance, status: e.target.value })}>
                                    <option value="Present">Present</option>
                                    <option value="Absent">Absent</option>
                                </select>
                            </div>

                            <div className="card-actions justify-end mt-8">
                                <button className="btn btn-primary btn-lg" disabled={saving} onClick={handleSave}>
                                    {saving ? "Saving Changes ..." : "Save Changes"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AttendanceDetailPage;