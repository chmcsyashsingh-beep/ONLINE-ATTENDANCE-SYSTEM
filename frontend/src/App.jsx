import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import AttendanceDetailPage from './pages/AttendanceDetailPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/create" element={<CreatePage />} />
                <Route path="/attendance/:id" element={<AttendanceDetailPage />} />
            </Routes>
        </Router>
    );
}

export default App;