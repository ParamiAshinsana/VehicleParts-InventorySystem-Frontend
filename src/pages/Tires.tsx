import { useEffect, useState } from 'react';

interface Tire {
    id: number;
    name: string;
    parttype: string;
    brand: string;
    quantity: number;
    price: number;
    status: string;
}

export default function Batteries() {
    const [batteries, setBatteries] = useState<Tire[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newBattery, setNewBattery] = useState<Omit<Tire, 'id'>>({
        name: '',
        parttype: 'Tire',
        brand: '',
        quantity: 0,
        price: 0,
        status: 'Available'
    });

    useEffect(() => {
        const fetchBatteries = async () => {
            try {
                const response = await fetch('http://localhost:5000/tires/getTires');
                if (!response.ok) {
                    throw new Error('Failed to fetch batteries');
                }
                const data = await response.json();
                setBatteries(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchBatteries();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:5000/batteries/deleteBattery/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Failed to delete battery');
            }

            setBatteries(batteries.filter(battery => battery.id !== id));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to delete battery');
        }
    };

    const handleAddSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/batteries/addBattery', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newBattery),
            });

            if (!response.ok) {
                throw new Error('Failed to add battery');
            }

            const addedBattery = await response.json();
            setBatteries([...batteries, addedBattery]);
            setShowAddForm(false);
            setNewBattery({
                name: '',
                parttype: 'Battery',
                brand: '',
                quantity: 0,
                price: 0,
                status: 'Available'
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to add battery');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewBattery({
            ...newBattery,
            [name]: name === 'quantity' || name === 'price' ? Number(value) : value
        });
    };

    if (loading) return <div className="p-4">Loading...</div>;
    if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Tires</h1>
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
                    onClick={() => setShowAddForm(!showAddForm)}
                >
                    {showAddForm ? 'Cancel' : 'Add Tire'}
                </button>
            </div>

            {showAddForm && (
                <form onSubmit={handleAddSubmit} className="mb-6 p-4 bg-gray-50 rounded-lg shadow">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={newBattery.name}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Part Type</label>
                            <input
                                type="text"
                                name="parttype"
                                value={newBattery.parttype}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                            <input
                                type="text"
                                name="brand"
                                value={newBattery.brand}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                            <input
                                type="text"
                                name="quantity"
                                value={newBattery.quantity}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                min="0"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                            <input
                                type="text"
                                name="price"
                                value={newBattery.price}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                min="0"
                                step="0.01"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select
                                name="status"
                                value={newBattery.status}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                            >
                                <option value="Available">Available</option>
                                <option value="In Stock">In Stock</option>
                                <option value="Out of Stock">Out of Stock</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-4">
                        <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            )}

            <div className="overflow-x-auto shadow-md rounded-lg">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Part Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {batteries.length > 0 ? (
                        batteries.map((battery) => (
                            <tr key={battery.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{battery.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{battery.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{battery.parttype}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{battery.brand}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{battery.quantity}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${battery.price.toFixed(2)}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${battery.status === 'In Stock' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {battery.status}
                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button
                                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                                        onClick={() => {}}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="text-red-600 hover:text-red-900"
                                        onClick={() => handleDelete(battery.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={8} className="px-6 py-4 text-center text-sm text-gray-500">
                                No batteries found
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}