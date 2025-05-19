import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const UserDashboard = () => {
  const { auth, logout } = useContext(AuthContext);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchStores = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/stores', {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      setStores(res.data);
    } catch (err) {
      toast.error('Failed to load stores.');
    } finally {
      setLoading(false);
    }
  };

  const rateStore = async (storeId, rating) => {
    try {
      await axios.post(
        `http://localhost:5000/api/ratings/${storeId}`,
        { rating },
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );
      toast.success('Rating submitted.');
    } catch (err) {
      toast.error('Rating failed.');
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">User Dashboard</h2>
        <button className="text-red-500" onClick={logout}>Logout</button>
      </div>
      {loading ? (
        <p>Loading stores...</p>
      ) : (
        <ul className="space-y-4">
          {stores.map(store => (
            <li key={store.id} className="border p-3 rounded shadow">
              <p><strong>{store.name}</strong></p>
              <div className="flex gap-2 mt-2">
                {[1, 2, 3, 4, 5].map(n => (
                  <button
                    key={n}
                    onClick={() => rateStore(store.id, n)}
                    className="text-sm px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                  >
                    {n} ⭐
                  </button>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserDashboard;