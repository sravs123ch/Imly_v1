// import React, { useState, useEffect, useContext } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { PaymentContext } from "../../Context/paymentContext";

// function Paymentform() {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const { paymentDetails } = useContext(PaymentContext);

//     const isEditMode = Boolean(
//         location.state?.paymentDetails?.payment || paymentDetails?.payment
//     );

//     const [formData, setFormData] = useState({
//         TenantID: 1,
//         PaymentMethod: "",
//         PaymentDate: "",
//         OrderNumber: "",
//         CustomerName: "",
//         Amount: "",
//     });

//     useEffect(() => {
//         if (isEditMode) {
//             const orderId = location.state?.paymentDetails?.payment?.OrderID || paymentDetails?.payment?.OrderID;
//             if (orderId) {
//                 // Simulate fetching payment details locally for edit mode
//                 const payment = {
//                     TenantID: 1,
//                     PaymentMethod: "Credit Card",
//                     PaymentDate: "2024-09-01",
//                     OrderID: "123456",
//                     CustomerID: "John Doe",
//                     TotalAmount: "150.00",
//                 };
//                 setFormData({
//                     TenantID: payment.TenantID || "",
//                     PaymentMethod: payment.PaymentMethod || "",
//                     PaymentDate: payment.PaymentDate || "",
//                     OrderNumber: payment.OrderID || "",
//                     CustomerName: payment.CustomerID || "",
//                     Amount: payment.TotalAmount || "",
//                 });
//             }
//         }
//     }, [isEditMode, location.state?.paymentDetails?.payment, paymentDetails?.payment]);

//     const handleFormChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//     };

//     const handleFormSubmit = (event) => {
//         event.preventDefault();
//         console.log("Form submitted:", formData);
//         navigate("/Payments");
//     };

//     const handleUpdateSubmit = (event) => {
//         event.preventDefault();
//         console.log("Form updated:", formData);
//         navigate("/Payments");
//     };

//     const handleCancel = () => {
//         navigate("/Payments");
//     };

//     return (
//         <div className="px-4 sm:px-6 lg:px-8 pt-4 ml-10 lg:ml-72 w-auto">
//             <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
//                 <form onSubmit={isEditMode ? handleUpdateSubmit : handleFormSubmit}>
//                     <div className="flex justify-between items-center mb-6">
//                         <h2 className="text-xl font-semibold mb-4 px-24">Payments</h2>
//                     </div>
//                     <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8 px-16 md:px-24">
//                         {/* Payment Method */}
//                         <div className="flex items-center">
//                             <div className="w-full">
//                                 <label
//                                     htmlFor="PaymentMethod"
//                                     className="block text-sm font-medium text-gray-700"
//                                 >
//                                     Payment Method
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="PaymentMethod"
//                                     name="PaymentMethod"
//                                     value={formData.PaymentMethod || ""}
//                                     onChange={handleFormChange}
//                                     required
//                                     className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                                 />
//                             </div>
//                         </div>
//                         {/* Payment Date */}
//                         <div className="flex items-center">
//                             <div className="w-full">
//                                 <label
//                                     htmlFor="PaymentDate"
//                                     className="block text-sm font-medium text-gray-700"
//                                 >
//                                     Payment Date
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="PaymentDate"
//                                     name="PaymentDate"
//                                     value={formData.PaymentDate || ""}
//                                     onChange={handleFormChange}
//                                     required
//                                     className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                                 />
//                             </div>
//                         </div>

//                         {/* Order Number */}
//                         <div>
//                             <label
//                                 htmlFor="OrderNumber"
//                                 className="block text-sm font-medium text-gray-700"
//                             >
//                                 Order Number
//                             </label>
//                             <input
//                                 type="text"
//                                 id="OrderNumber"
//                                 name="OrderNumber"
//                                 value={formData.OrderNumber || ""}
//                                 onChange={handleFormChange}
//                                 required
//                                 className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                             />
//                         </div>

//                         {/* Customer Name */}
//                         <div>
//                             <label
//                                 htmlFor="CustomerName"
//                                 className="block text-sm font-medium text-gray-700"
//                             >
//                                 Customer Name
//                             </label>
//                             <input
//                                 type="text"
//                                 id="CustomerName"
//                                 name="CustomerName"
//                                 value={formData.CustomerName || ""}
//                                 onChange={handleFormChange}
//                                 className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                             />
//                         </div>

//                         {/* Amount */}
//                         <div>
//                             <label
//                                 htmlFor="Amount"
//                                 className="block text-sm font-medium text-gray-700"
//                             >
//                                 Amount
//                             </label>
//                             <input
//                                 type="text"
//                                 id="Amount"
//                                 name="Amount"
//                                 value={formData.Amount || ""}
//                                 onChange={handleFormChange}
//                                 required
//                                 className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                             />
//                         </div>
//                         <div className="mt-6 flex justify-end gap-4">
//                             <button
//                                 type="submit"
//                                 className="inline-flex justify-center rounded-md border border-transparent bg-custom-darkblue py-2 px-4 text-sm font-medium text-white hover:text-black shadow-sm hover:bg-custom-lightblue focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//                             >
//                                 {isEditMode ? "Update Payment" : "Create Payment"}
//                             </button>
//                             <button
//                                 type="button"
//                                 onClick={handleCancel}
//                                 className="inline-flex justify-center rounded-md border border-transparent bg-red-500 py-2 px-4 text-sm font-medium text-white hover:text-black shadow-sm hover:bg-red-200"
//                             >
//                                 Cancel
//                             </button>
//                         </div>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default Paymentform;



import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { PaymentContext } from "../../Context/paymentContext"

function Paymentform() {
    const navigate = useNavigate();
    const location = useLocation();
    const { paymentDetails } = useContext(PaymentContext);

    const isEditMode = Boolean(
        location.state?.paymentDetails?.payment || paymentDetails?.payment
    );

    const [formData, setFormData] = useState({
        TenantID: 1,
        PaymentMethod: "",
        PaymentDate: "",
        OrderNumber: "",
        CustomerName: "",
        Amount: "",
    });

    // State for handling loading, error, and search
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [orderDetails, setOrderDetails] = useState(null);
    const [orderId, setOrderId] = useState('');

    // State for stepper modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [availableOrders, setAvailableOrders] = useState([]);

    useEffect(() => {
        if (isEditMode) {
            const orderId = location.state?.paymentDetails?.payment?.OrderID || paymentDetails?.payment?.OrderID;
            if (orderId) {
                setLoading(true);
                axios
                    .get(
                        `https://imlystudios-backend-mqg4.onrender.com/api/payments/payment/${orderId}`
                        
                    )
                    .then((response) => {
                        const payment = response.data;
                        setFormData({
                            TenantID: payment.TenantID || "",
                            PaymentMethod: payment.PaymentMethod || "",
                            PaymentDate: payment.PaymentDate || "",
                            OrderNumber: payment.OrderID || "",
                            CustomerName: payment.CustomerID || "",
                            Amount: payment.TotalAmount || "",
                        });
                    })
                    .catch((err) => {
                        setError("Failed to fetch payment details.");
                        console.error("Error fetching payment details:", err);
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            }
        }
    }, [isEditMode, location.state?.paymentDetails?.payment, paymentDetails?.payment]);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // const handleSearchSubmit = (e) => {
    //     e.preventDefault();
        
    //     // Check if orderId is valid before making the request
    //     if (!orderId) {
    //         setError("Order ID is required.");
    //         return;
    //     }
    
    //     console.log("Fetching order details for Order ID:", orderId);
    
    //     setLoading(true); // Start loading
    
    //     axios
    //         .get(`https://imlystudios-backend-mqg4.onrender.com/api/payments/payment/${orderId}`)
    //         .then((response) => {
    //             setOrderDetails(response.data); // Save the order details
    
    //             // Populate the form with the fetched order details
    //             setFormData({
    //                 ...formData,
    //                 OrderNumber: response.data.OrderID,
    //                 CustomerName: response.data.CustomerName,
    //                 Amount: response.data.BalanceAmount,
    //                 // Update other form fields as necessary
    //             });
    
    //             setError(null); // Clear previous errors
    //         })
    //         .catch((err) => {
    //             setError("Failed to fetch order details.");
    //             console.error("Error fetching order details:", err);
    //         })
    //         .finally(() => {
    //             setLoading(false); // Stop loading
    //         });
    // };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        
        // Check if orderId is valid before making the request
        if (!orderId) {
            setError("Order ID is required.");
            return;
        }
        
        console.log("Fetching order details for Order ID:", orderId);
        
        setLoading(true); // Start loading
        
        axios
            .get(`https://imlystudios-backend-mqg4.onrender.com/api/payments/payment/${orderId}`)
            .then((response) => {
                const payment = response.data.data[0]; // Access the first item in the data array
                
                // Save the order details
                setOrderDetails(payment); 
    
                // Populate the form with the fetched order details
                setFormData({
                    TenantID: payment.TenantID || "",
                    PaymentMethod: payment.PaymentMethod || "",
                    PaymentDate: new Date(payment.PaymentDate).toISOString().slice(0, 10) || "", // Format date
                    OrderNumber: payment.OrderID || "",
                    CustomerName: payment.CustomerID || "",
                    Amount: payment.TotalAmount || "",
                    BalanceAmount: payment.BalenceAmount || "", // Add balance amount
                });
                
                setError(null); // Clear previous errors
            })
            .catch((err) => {
                setError("Failed to fetch order details.");
                console.error("Error fetching order details:", err);
            })
            .finally(() => {
                setLoading(false); // Stop loading
            });
    };
    
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        setOrderId(value); // Make sure `orderId` gets updated correctly
    };
        

    // Function to fetch available order IDs
    const fetchAvailableOrders = () => {
        setLoading(true);
        axios.get('https://imlystudios-backend-mqg4.onrender.com/api/payments/orders')
            .then(response => {
                setAvailableOrders(response.data);
            })
            .catch((error) => {
                setError("Error fetching available orders.");
                console.error("Error fetching available orders:", error);
            })
            .finally(() => setLoading(false));
    };

    const handleOpenModal = () => {
        fetchAvailableOrders();
        setIsModalOpen(true);
    };

    const handleSelectOrderId = (orderId) => {
        setOrderId(orderId);
        setSearchQuery(orderId);
        setIsModalOpen(false);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        console.log("Form submitted:", formData);
        navigate("/Payments");
    };

    const handleUpdateSubmit = (event) => {
        event.preventDefault();
        console.log("Form updated:", formData);
        navigate("/Payments");
    };
    

    const handleCancel = () => {
        navigate("/Payments");
    };

    return (
        <div className="px-4 sm:px-6 lg:px-8 pt-4 ml-10 lg:ml-72 w-auto">
            <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
                <form onSubmit={isEditMode ? handleUpdateSubmit : handleFormSubmit}>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold mb-4 px-24">Payments</h2>
                    </div>
                     <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8 px-16 md:px-24">
                       
                        <div className="col-span-2">
                            <label htmlFor="searchOrder" className="block text-sm font-medium text-gray-700">
                                Search Order ID
                            </label>
                            <form onSubmit={handleSearchSubmit} className="flex gap-4">
                                <input
                                    type="text"
                                    id="searchOrder"
                                    name="searchOrder"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    placeholder="Enter Order ID"
                                    required
                                    className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                             
                                 <button
            type="button"  
            onClick={handleSearchSubmit}  
            className="inline-flex justify-center rounded-md border border-transparent bg-custom-darkblue py-2 px-4 text-sm font-medium text-white hover:text-black shadow-sm hover:bg-custom-lightblue focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
            Search
        </button>
                            </form>
                        </div> 


                         {/* Modal for Stepper */}
                         {isModalOpen && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                                <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                                    <h2 className="text-lg font-semibold mb-4">Select Order ID</h2>
                                    <div className="space-y-2">
                                        {loading ? (
                                            <p>Loading...</p>
                                        ) : (
                                            availableOrders.map((order) => (
                                                <div key={order.OrderID}>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleSelectOrderId(order.OrderID)}
                                                        className="block w-full text-left p-2 bg-gray-100 rounded hover:bg-gray-200"
                                                    >
                                                        Order ID: {order.OrderID}
                                                    </button>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="mt-4 inline-flex justify-center rounded-md border border-transparent bg-red-500 py-2 px-4 text-sm font-medium text-white hover:text-black shadow-sm hover:bg-red-200"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        )}
                        {/* Payment Method */}
                        <div className="flex items-center">
                            <div className="w-full">
                                <label htmlFor="PaymentMethod" className="block text-sm font-medium text-gray-700">
                                    Payment Method
                                </label>
                                <input
                                    type="text"
                                    id="PaymentMethod"
                                    name="PaymentMethod"
                                    value={formData.PaymentMethod || ""}
                                    onChange={handleFormChange}
                                    required
                                    className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        {/* Payment Date */}
                        <div className="flex items-center">
                            <div className="w-full">
                                <label htmlFor="PaymentDate" className="block text-sm font-medium text-gray-700">
                                    Payment Date
                                </label>
                                <input
                                    type="text"
                                    id="PaymentDate"
                                    name="PaymentDate"
                                    value={formData.PaymentDate || ""}
                                    onChange={handleFormChange}
                                    required
                                    className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        {/* Order Number */}
                        <div>
                            <label htmlFor="OrderNumber" className="block text-sm font-medium text-gray-700">
                                Order Number
                            </label>
                            <input
                                type="text"
                                id="OrderNumber"
                                name="OrderNumber"
                                value={formData.OrderNumber || ""}
                                onChange={handleFormChange}
                                required
                                className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>

                        {/* Customer Name */}
                        <div>
                            <label htmlFor="CustomerName" className="block text-sm font-medium text-gray-700">
                                Customer Name
                            </label>
                            <input
                                type="text"
                                id="CustomerName"
                                name="CustomerName"
                                value={formData.CustomerName || ""}
                                onChange={handleFormChange}
                                className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>

                        {/* Amount */}
                        <div>
                            <label htmlFor="Amount" className="block text-sm font-medium text-gray-700">
                                Amount
                            </label>
                            <input
                                type="text"
                                id="Amount"
                                name="Amount"
                                value={formData.Amount || ""}
                                onChange={handleFormChange}
                                required
                                className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>

                        {/* Balance Amount */}
                        <div>
                            <label htmlFor="BalanceAmount" className="block text-sm font-medium text-gray-700">
                                Balance Amount
                            </label>
                            <input
                                type="text"
                                id="BalanceAmount"
                                name="BalanceAmount"
                                value={orderDetails?.BalanceAmount || ""}
                                readOnly
                                className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 bg-gray-100 sm:text-sm"
                            />
                        </div>

                        <div className="mt-6 flex justify-end gap-4">
                            <button
                                type="submit"
                                className="inline-flex justify-center rounded-md border border-transparent bg-custom-darkblue py-2 px-4 text-sm font-medium text-white hover:text-black shadow-sm hover:bg-custom-lightblue focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                {isEditMode ? "Update Payment" : "Create Payment"}
                            </button>
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="inline-flex justify-center rounded-md border border-transparent bg-red-500 py-2 px-4 text-sm font-medium text-white hover:text-black shadow-sm hover:bg-red-200"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Paymentform;

      