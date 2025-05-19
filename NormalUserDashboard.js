import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function NormalUserDashboard() {
  const [stores, setStores] = useState([]);
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    axios.get("/stores").then((res) => setStores(res.data));
  }, []);

  const handleRate = async (storeId, rating) => {
    await axios.post(`/stores/${storeId}/rate`, { rating });
    alert("Rating submitted!");
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Rate Stores</h1>
      <ul className="space-y-4">
        {stores.map((store) => (
          <li key={store.id} className="border p-4 rounded">
            <h2 className="text-lg font-semibold">{store.name}</h2>
            <select
              className="mt-2 p-2 border rounded"
              onChange={(e) => handleRate(store.id, Number(e.target.value))}
            >
              <option>Rate this store</option>
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
}