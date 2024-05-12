import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/AdminLayout';
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
const FormElements = () => {
    const navigate = useNavigate();
    const [hostelName, setHostelName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const getToken = () => {
        return localStorage.getItem('token');
    }
    const token = getToken();
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('https://ereside-backend-1.onrender.com/api/v1/deleteWarden', {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ hostelName })
            });
            if (response.ok) {
                const result = await response.json();
                alert(result.message);
                navigate('/ahomepage');
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.error || 'Failed to delete Warden.');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('An error occurred while deleting the Warden.');
        }
    };


    return (
        <DefaultLayout>
            <Breadcrumb pageName="Delete Warden" />

            <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}

                {/* <!-- Time and date --> */}
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="flex flex-col gap-5.5 p-6.5">

                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Hostel Name
                        </label>
                        <div className="relative">

                            <input

                                className="form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                type="text" id="hostelName" value={hostelName} onChange={(e) => setHostelName(e.target.value)} required />

                        </div>
                        <div className="flex justify-center gap-4.5">
                            <button
                                className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                                type="submit" onClick={handleSubmit}
                            >
                                Delete Warden
                            </button>
                        </div>
                    </div>

                </div>


            </div>
        </DefaultLayout>
    );
};

export default FormElements;
