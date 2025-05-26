import React, { useEffect, useState, useCallback } from "react";
import Layout from "../components/adminLayout";

const DataTable = React.memo(({ data, onEdit, onDelete, showActions = true }) => {
    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
                    <tr>
                        {data.headers.map((header) => (
                            <th key={header} scope="col" className="px-6 py-3 whitespace-nowrap">
                                {header}
                            </th>
                        ))}
                        {showActions && (
                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                Үйлдэл
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {data.rows.map((row, index) => {
                        const rowId = data.originalData?.[index]?._id || index;
                        return (
                            <tr key={rowId} className="bg-white dark:bg-gray-800">
                                {row.map((cell, cellIndex) =>
                                    cellIndex === 0 ? (
                                        <th
                                            key={cellIndex}
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {cell}
                                        </th>
                                    ) : (
                                        <td
                                            key={cellIndex}
                                            className="px-6 py-4 max-w-[200px] truncate overflow-hidden whitespace-nowrap"
                                            title={cell} 
                                        >
                                            {cell}
                                        </td>

                                    )
                                )}
                                {showActions && (
                                    <td className="px-6 py-4 space-x-2 whitespace-nowrap">
                                        <button
                                            onClick={() => onEdit?.(rowId)}
                                            className="text-blue-600 hover:text-blue-900"
                                        >
                                            Засах
                                        </button>
                                        <button
                                            onClick={() => onDelete?.(rowId)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Устгах
                                        </button>
                                    </td>
                                )}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
});

const EditDrugModal = ({ drugId, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        name: '',
        drug_class: '',
        warnings: '',
        side_effect: '',
        discription: ''
    });

    useEffect(() => {
        const fetchDrug = async () => {
            try {
                const response = await fetch(`http://localhost:5001/api/drugs/public/${drugId}`);
                if (!response.ok) throw new Error('Эм дуудахад алдаа гарлаа');
                const data = await response.json();
                setFormData({
                    name: data.data.name || '',
                    drug_class: data.data.drug_class || '',
                    warnings: data.data.warnings || '',
                    side_effect: data.data.side_effect || '',
                    discription: data.data.discription || ''
                });
            } catch (error) {
                console.error(error.message);
            }
        };
        if (drugId) fetchDrug();
    }, [drugId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5001/api/drugs/${drugId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Шинэчлэхэд алдаа гарлаа');
            }

            onSuccess();
            onClose();
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-96 max-w-full">
                <h2 className="text-xl font-bold mb-4">Эм засах</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2">Эмийн нэр</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Ангилал</label>
                        <input
                            type="text"
                            value={formData.drug_class}
                            onChange={(e) => setFormData({ ...formData, drug_class: e.target.value })}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Сэрэмжлүүлэг</label>
                        <textarea
                            value={formData.warnings}
                            onChange={(e) => setFormData({ ...formData, warnings: e.target.value })}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Хариу үйлдэл</label>
                        <textarea
                            value={formData.side_effect}
                            onChange={(e) => setFormData({ ...formData, side_effect: e.target.value })}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Тайлбар</label>
                        <textarea
                            value={formData.discription}
                            onChange={(e) => setFormData({ ...formData, discription: e.target.value })}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 rounded"
                        >
                            Цуцлах
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded"
                        >
                            Хадгалах
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const DeleteConfirmation = ({ drugId, onClose, onSuccess }) => {
    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:5001/api/drugs/${drugId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Устгах амжилтгүй');
            }

            onSuccess();
            onClose();
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Эм устгах</h2>
                <p>Та итгэлтэй байна уу?</p>
                <div className="flex justify-end space-x-2 mt-4">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">
                        Үгүй
                    </button>
                    <button
                        onClick={handleDelete}
                        className="px-4 py-2 bg-red-500 text-white rounded"
                    >
                        Тийм
                    </button>
                </div>
            </div>
        </div>
    );
};

const AdminDashboard = ({ activeMenu }) => {
    const [tableData, setTableData] = useState({ headers: [], rows: [], originalData: [] });
    const [selectedDrugId, setSelectedDrugId] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            const endpoint = `${activeMenu === "users"
                ? "http://localhost:5001/api/users"
                : "http://localhost:5001/api/drugs"
                }?page=1&limit=100`;

            const response = await fetch(endpoint, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Fetch error");
            }

            const result = await response.json();

            const transformedData =
                activeMenu === "users"
                    ? {
                        headers: ["Нэр", "Имэйл", "Утас", "Эрх"],
                        rows: result.data.map((user) => [
                            user.name,
                            user.email,
                            user.phone_number,
                            user.isAdmin ? "Админ" : "Хэрэглэгч",
                        ]),
                        originalData: result.data,
                    }
                    : {
                        headers: [
                            "Эмийн нэр",
                            "Ангилал",
                            "Сэргийлэх арга",
                            "Хариу үйлдэл",
                            "Тайлбар",
                        ],
                        rows: result.data.map((drug) => [
                            drug.name,
                            drug.drug_class,
                            drug.warnings,
                            drug.side_effect,
                            drug.discription,
                        ]),
                        originalData: result.data,
                    };
                    

            setTableData(transformedData);
        } catch (err) {
            console.error("Fetch error:", err.message);
        }
    }, [activeMenu]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleEdit = (id) => {
        setSelectedDrugId(id);
        setShowEditModal(true);
    };

    const handleDelete = (id) => {
        setSelectedDrugId(id);
        setShowDeleteModal(true);
    };

    const handleSuccess = () => {
        fetchData();
    };

    return (
        <Layout>
            <div className="p-4  rounded-xl shadow">
                <h1 className="text-2xl font-bold mb-4 text-white">
                    Админ самбар - {activeMenu === "users" ? "Хэрэглэгчид" : "Эмийн мэдээлэл"}
                </h1>
                <DataTable
                    data={tableData}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    showActions={activeMenu !== "users"}
                />
                {showEditModal && (
                    <EditDrugModal
                        drugId={selectedDrugId}
                        onClose={() => setShowEditModal(false)}
                        onSuccess={handleSuccess}
                    />
                )}
                {showDeleteModal && (
                    <DeleteConfirmation
                        drugId={selectedDrugId}
                        onClose={() => setShowDeleteModal(false)}
                        onSuccess={handleSuccess}
                    />
                )}
            </div>
        </Layout>
    );
};

export default AdminDashboard;