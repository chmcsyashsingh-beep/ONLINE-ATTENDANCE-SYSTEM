import { Link, useLocation } from 'react-router-dom';
import { UserCircle, Calendar, BookOpen, MapPin, Clock, Edit2, Trash2 } from "lucide-react";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { useState } from "react";

const AttendanceCard = ({ attendance, setAttendances }) => {
    const [showModal, setShowModal] = useState(false);
    const location = useLocation();
    const isActive = location.pathname === `/attendance/${attendance._id}`;

    const handleDelete = async () => {
        try {
            await api.delete(`/${attendance._id}`);
            setAttendances((prev) => prev.filter((a) => a._id !== attendance._id));
            toast.success("Record deleted successfully");
        } catch {
            toast.error("Failed to delete record");
        } finally {
            setShowModal(false);
        }
    };

    return (
        <>
            <Link to={`/attendance/${attendance._id}`} className={`relative block rounded-2xl bg-base-100 p-6 border-2 transition-all duration-300 ${isActive ? "border-primary shadow-2xl" : "border-base-300"} hover:border-primary hover:shadow-2xl`}>
                <div className="flex justify-between items-start">
                    <p className="text-xs text-base-content/60 font-mono truncate max-w-[140px]">{attendance.rollNo}</p>
                    <span className={`badge ${attendance.status === 'Present' ? 'badge-success' : 'badge-error'} text-white font-medium`}>{attendance.status}</span>
                </div>

                <div className="mt-5 space-y-3">
                    <div className="flex items-center gap-3">
                        <UserCircle className="size-5 text-primary" />
                        <p className="font-semibold text-lg line-clamp-1">{attendance.name}</p>
                    </div>
                    <div className="flex items-center gap-2 text-base-content/70 text-sm">
                        <MapPin className="size-4" /> <span>{attendance.year}</span>
                    </div>
                    <div className="flex items-center gap-2 text-base-content/70 text-sm">
                        <BookOpen className="size-4" /> <span className="line-clamp-1">{attendance.subject}</span>
                    </div>
                </div>

                <div className="mt-8 flex justify-between items-center text-xs">
                    <div className="flex items-center gap-2 text-base-content/60">
                        <Calendar className="size-4" />
                        <span>{formatDate(attendance.date)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-base-content/60">
                        <Clock className="size-4" />
                        <span>{attendance.createdAt ? formatDate(attendance.createdAt) : ''}</span>
                    </div>

                    <div className="flex items-center gap-5">
                        <div className="tooltip tooltip-warning" data-tip="Edit record">
                            <Edit2 className="size-4 text-warning hover:scale-110 transition" />
                        </div>
                        <div className="tooltip tooltip-error" data-tip="Delete record">
                            <button onClick={(e) => { e.preventDefault(); setShowModal(true); }} className="text-error hover:scale-110 transition">
                                <Trash2 className="size-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </Link>

            {showModal && (
                <dialog className="modal modal-open">
                    <div className="modal-box max-w-md">
                        <h3 className="font-bold text-lg text-error flex items-center gap-2">
                            <Trash2 className="size-5" /> Delete Record
                        </h3>
                        <p className="py-4 text-base-content/70">
                            Are you sure you want to delete attendance for <span className="font-semibold">{attendance.name}</span> ({attendance.rollNo})?<br />This action cannot be undone.
                        </p>
                        <div className="modal-action">
                            <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
                            <button className="btn btn-error flex items-center gap-2" onClick={handleDelete}>
                                <Trash2 className="size-4" /> Delete
                            </button>
                        </div>
                    </div>
                </dialog>
            )}
        </>
    );
};

export default AttendanceCard;