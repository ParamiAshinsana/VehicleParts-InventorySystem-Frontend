import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Batteries from './pages/Batteries.tsx';
import Tires from './pages/Tires.tsx';
import OilFilters from './pages/OilFilters.tsx';

export default function App() {
    return (
        <Router>
            <div className="flex">
                <Sidebar />
                <div className="flex-1 p-8">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/batteries" element={<Batteries />} />
                        <Route path="/tires" element={<Tires />} />
                        <Route path="/oil-filters" element={<OilFilters />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}