import { Link } from 'react-router-dom';

export default function Sidebar() {
    return (
        <div className="w-64 bg-gray-800 text-white h-screen p-4">
            <h1 className="text-2xl font-bold mb-6">Auto Parts</h1>
            <nav>
                <ul className="space-y-2">
                    <li>
                        <Link
                            to="/batteries"
                            className="block px-4 py-2 rounded hover:bg-gray-700 transition"
                        >
                            Batteries
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/tires"
                            className="block px-4 py-2 rounded hover:bg-gray-700 transition"
                        >
                            Tires
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/oil-filters"
                            className="block px-4 py-2 rounded hover:bg-gray-700 transition"
                        >
                            Oil Filters
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}