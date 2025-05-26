import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useDebounce from '../hooks/useDebounce';

export default function Home() {
    const [drugs, setDrugs] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const debouncedSearchQuery = useDebounce(searchQuery, 300);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const getDrugs = async (token, query = "") => {
        const baseUrl = token ? 'http://localhost:5001/api/drugs' : 'http://localhost:5001/api/drugs/search';
        const url = query ? `${baseUrl}?search=${encodeURIComponent(query)}` : baseUrl;

        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await fetch(url, { headers });
        const data = await response.json();
        return data?.data || [];
    };

    useEffect(() => {
        if (!debouncedSearchQuery.trim()) {
            setDrugs([]);
            return;
        }

        setLoading(true);
        getDrugs(token, debouncedSearchQuery)
            .then(data => setDrugs(data))
            .catch(err => console.error("Error fetching drugs:", err))
            .finally(() => setLoading(false));
    }, [token, debouncedSearchQuery]);


    const handleDrugClick = (id) => {
        navigate(`/drug/${id}`);
    };

    return (
        <div className="home-container px-4 py-6 max-w-4xl mx-auto">
            <div className="drug-search-containerr">
                <input
                    type="text"
                    placeholder="Эм хайх"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="search-input w-full p-3 mb-4 border border-gray-300 rounded-md"
                />

                <div className="drug-list-container">
                    {loading ? (
                        <p className="text-center text-gray-500">Ачааллаж байна...</p>
                    ) : !debouncedSearchQuery ? (
                        null  // Энд ямар ч текст гаргахгүй
                    ) : drugs.length === 0 ? (
                        <p className="text-center text-gray-500">Хайлтаар тохирох мэдээлэл олдсонгүй</p>
                    ) : (
                        <ul className="drug-list space-y-3">
                            {drugs.map(drug => (
                                <li
                                    key={drug._id}
                                    className="drug-item cursor-pointer p-3 border border-gray-200 rounded hover:bg-cyan-50"
                                    onClick={() => handleDrugClick(drug._id)}
                                >
                                    <h3 className="drug-name text-lg font-semibold text-cyan-700">{drug.name}</h3>
                                </li>
                            ))}
                        </ul>
                    )}

                </div>
            </div>

            <div className='mt-12'>
                <h2 className='text-xl font-semibold mb-2'>Үсгээр шүүх</h2>
                {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => (
                    <button
                        key={letter}
                        className="bg-cyan-500 text-white px-3 py-2 rounded-full mr-2 mb-2 hover:bg-cyan-600"
                        onClick={() => navigate(`/browse/${letter}`)}
                    >
                        {letter}
                    </button>
                ))}
            </div>

        </div>

    );
}
