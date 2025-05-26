import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function DrugByLetter() {
    const { letter } = useParams();
    const [drugs, setDrugs] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDrugs = async () => {
            setLoading(true);
            try {
                // Ямар ч үсгийн хэлбэрийг хүлээн авах
                const res = await fetch(
                    `http://localhost:5001/api/drugs/public?startsWith=${letter}`
                );
                const data = await res.json();
                setDrugs(data.data || []);
            } catch (error) {
                console.error("Error fetching drugs:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDrugs();
    }, [letter]);

    return (
        <div className="px-4 py-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">"{letter.toLowerCase()}" үсгээр эхэлсэн эмнүүд</h1>
            {loading ? (
                <p className="text-center text-gray-500">Ачааллаж байна...</p>
            ) : drugs.length === 0 ? (
                <p className="text-center text-gray-500">Илэрц олдсонгүй</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {drugs.map((drug) => (
                        <div
                            key={drug._id}
                            className="p-4 border rounded-lg hover:shadow-lg transition-shadow cursor-pointer"
                            onClick={() => navigate(`/drug/${drug._id}`)}
                        >
                            <h2 className="text-lg font-semibold">{drug.name}</h2>
                            <p className="text-sm text-gray-600">{drug.drug_class}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}