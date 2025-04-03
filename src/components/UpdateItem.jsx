
// src/components/UpdateItem.jsx
import React, { useState, useEffect } from 'react';

const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`;

const UpdateItem = ({ item, setItem }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
    });

    const [updating, setUpdating] = useState(false);
    const [updateError, setUpdateError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => {
        if (item) {
            setFormData({
                name: item.name || '',
                description: item.description || '',
            });
        }
    }, [item]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdating(true);
        setUpdateError(null);
        setSuccessMessage(null);

        try {
            const response = await fetch(`${API_URI}/${item?.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`Update failed: ${response.status} ${response.statusText}`);
            }

            const updatedItem = await response.json();
            setItem(updatedItem);
            setSuccessMessage('Item updated successfully!');
        } catch (err) {
            setUpdateError(err.message);
        } finally {
            setUpdating(false);
        }
    };

    if (!item) {
        return <div>No item data available. Please try again later.</div>;
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                    ></textarea>
                </div>


                <button type="submit" disabled={updating}>
                    {updating ? 'Updating...' : 'Update'}
                </button>
            </form>

            {successMessage && <p style={{ color: 'blue' }}>{successMessage}</p>}
            {updateError && <p style={{ color: 'brown' }}>{updateError}</p>}
        </div>
    );
};

export default UpdateItem;
