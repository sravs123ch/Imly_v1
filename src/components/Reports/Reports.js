// import React, { useState } from 'react';
// import FormWizard from 'react-form-wizard-component';
// import 'react-form-wizard-component/dist/style.css';
// import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/20/solid';

// function AddOrders() {
//   const [orderDetails, setOrderDetails] = useState({
//     name: '',
//     orderStatus: 'Pending',
//     email: '',
//     deliveryDate: '',
//     phone: '',
//     address: '',
//     createdBy: '',
//     design: '',
//     type: 'Kitchen, Wardrobe, Living',
//   });

//   const [submittedOrders, setSubmittedOrders] = useState([]);
//   const [errors, setErrors] = useState({});
//   const [showAlert, setShowAlert] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setOrderDetails({ ...orderDetails, [name]: value });
//   };

//   const handleSubmit = () => {
//     const newErrors = {};
//     if (!orderDetails.name) newErrors.name = 'Name is required';
//     if (!orderDetails.orderStatus) newErrors.orderStatus = 'Order Status is required';
//     if (!orderDetails.email) newErrors.email = 'Email is required';
//     if (!orderDetails.deliveryDate) newErrors.deliveryDate = 'Expected Delivery Date is required';
//     if (!orderDetails.phone) newErrors.phone = 'Phone is required';
//     if (!orderDetails.address) newErrors.address = 'Address is required';
//     if (!orderDetails.createdBy) newErrors.createdBy = 'Created By is required';
//     if (!orderDetails.design) newErrors.design = 'Design is required';
//     if (!orderDetails.type) newErrors.type = 'Type is required';

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     // Add the current order to the list of submitted orders
//     setSubmittedOrders([...submittedOrders, orderDetails]);
//     setErrors({});
//     setShowAlert(true);

//     // Clear the form
//     setOrderDetails({
//       name: '',
//       orderStatus: 'Pending',
//       email: '',
//       deliveryDate: '',
//       phone: '',
//       address: '',
//       createdBy: '',
//       design: '',
//       type: 'Kitchen, Wardrobe, Living',
//     });
//   };

//   const handleComplete = () => {
//     handleSubmit();
//     console.log("Form completed!");
//   };

//   const tabChanged = ({ prevIndex, nextIndex }) => {
//     console.log("prevIndex", prevIndex);
//     console.log("nextIndex", nextIndex);
//   };

//   return (
//     <div className="max-w-6xl mx-auto ml-80 mt-10 p-6 bg-white shadow-lg rounded-lg">
//       <h2 className="text-2xl font-bold text-gray-700 mb-6">Add Order</h2>

//       {/* Success Alert */}
//       {showAlert && (
//         <div className="rounded-md bg-green-50 p-4 mb-4">
//           <div className="flex">
//             <div className="flex-shrink-0">
//               <CheckCircleIcon aria-hidden="true" className="h-5 w-5 text-green-400" />
//             </div>
//             <div className="ml-3">
//               <p className="text-sm font-medium text-green-800">Order successfully added!</p>
//             </div>
//             <div className="ml-auto pl-3">
//               <button
//                 onClick={() => setShowAlert(false)}
//                 className="inline-flex rounded-md bg-green-50 p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
//               >
//                 <span className="sr-only">Dismiss</span>
//                 <XMarkIcon aria-hidden="true" className="h-5 w-5" />
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Form Wizard */}
//       <FormWizard inlineStep={true} onComplete={handleComplete} onTabChange={tabChanged}>
//         {/* Form Steps here */}
//         <FormWizard.TabContent title="Customer Details" icon="ti-user">
//           <div className="grid grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={orderDetails.name}
//                 onChange={handleChange}
//                 className={`mt-1 p-2 w-full border rounded-md ${errors.name ? 'border-red-500' : ''}`}
//               />
//               {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Order Status</label>
//               <select
//                 name="orderStatus"
//                 value={orderDetails.orderStatus}
//                 onChange={handleChange}
//                 className={`mt-1 p-2 w-full border rounded-md ${errors.orderStatus ? 'border-red-500' : ''}`}
//               >
//                 <option value="Select a status">Select a Status</option>
//                 <option value="Pending">Pending</option>
//                 <option value="Processed">Processed</option>
//               </select>
//               {errors.orderStatus && <p className="text-red-500 text-sm">{errors.orderStatus}</p>}
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={orderDetails.email}
//                 onChange={handleChange}
//                 className={`mt-1 p-2 w-full border rounded-md ${errors.email ? 'border-red-500' : ''}`}
//               />
//               {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Exp Delivery Date</label>
//               <input
//                 type="date"
//                 name="deliveryDate"
//                 value={orderDetails.deliveryDate}
//                 onChange={handleChange}
//                 className={`mt-1 p-2 w-full border rounded-md ${errors.deliveryDate ? 'border-red-500' : ''}`}
//               />
//               {errors.deliveryDate && <p className="text-red-500 text-sm">{errors.deliveryDate}</p>}
//             </div>
//           </div>
//         </FormWizard.TabContent>

//         <FormWizard.TabContent title="Order Details" icon="ti-settings">
//           <div className="grid grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Phone</label>
//               <input
//                 type="tel"
//                 name="phone"
//                 value={orderDetails.phone}
//                 onChange={handleChange}
//                 className={`mt-1 p-2 w-full border rounded-md ${errors.phone ? 'border-red-500' : ''}`}
//               />
//               {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Address</label>
//               <input
//                 type="text"
//                 name="address"
//                 value={orderDetails.address}
//                 onChange={handleChange}
//                 className={`mt-1 p-2 w-full border rounded-md ${errors.address ? 'border-red-500' : ''}`}
//               />
//               {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Created By</label>
//               <input
//                 type="text"
//                 name="createdBy"
//                 value={orderDetails.createdBy}
//                 onChange={handleChange}
//                 className={`mt-1 p-2 w-full border rounded-md ${errors.createdBy ? 'border-red-500' : ''}`}
//               />
//               {errors.createdBy && <p className="text-red-500 text-sm">{errors.createdBy}</p>}
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Design</label>
//               <input
//                 type="text"
//                 name="design"
//                 value={orderDetails.design}
//                 onChange={handleChange}
//                 className={`mt-1 p-2 w-full border rounded-md ${errors.design ? 'border-red-500' : ''}`}
//               />
//               {errors.design && <p className="text-red-500 text-sm">{errors.design}</p>}
//             </div>
//           </div>
//         </FormWizard.TabContent>

//         <FormWizard.TabContent title="Product Type" icon="ti-check">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Type</label>
//             <select
//               name="type"
//               value={orderDetails.type}
//               onChange={handleChange}
//               className={`mt-1 p-2 w-full border rounded-md ${errors.type ? 'border-red-500' : ''}`}
//             >
//               <option value="Select a type">Select a Type</option>
//               <option value="Kitchen, Wardrobe, Living">Kitchen, Wardrobe, Living</option>
//             </select>
//             {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}
//           </div>
//         </FormWizard.TabContent>
//       </FormWizard>

//       {/* Report Section */}
//       <div className="mt-10">
//         <h3 className="text-xl font-bold text-gray-700 mb-4">Submitted Orders Report</h3>
//         {submittedOrders.length === 0 ? (
//           <p className="text-gray-500">No orders submitted yet.</p>
//         ) : (
//           <table className="min-w-full bg-white">
//             <thead>
//               <tr>
//                 <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Name</th>
//                 <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Order Status</th>
//                 <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Email</th>
//                 <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Delivery Date</th>
//                 <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Phone</th>
//                 <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Address</th>
//                 <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Created By</th>
//                 <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Design</th>
//                 <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Type</th>
//               </tr>
//             </thead>
//             <tbody>
//               {submittedOrders.map((order, index) => (
//                 <tr key={index} className="border-b">
//                   <td className="px-4 py-2 text-sm text-gray-600">{order.name}</td>
//                   <td className="px-4 py-2 text-sm text-gray-600">{order.orderStatus}</td>
//                   <td className="px-4 py-2 text-sm text-gray-600">{order.email}</td>
//                   <td className="px-4 py-2 text-sm text-gray-600">{order.deliveryDate}</td>
//                   <td className="px-4 py-2 text-sm text-gray-600">{order.phone}</td>
//                   <td className="px-4 py-2 text-sm text-gray-600">{order.address}</td>
//                   <td className="px-4 py-2 text-sm text-gray-600">{order.createdBy}</td>
//                   <td className="px-4 py-2 text-sm text-gray-600">{order.design}</td>
//                   <td className="px-4 py-2 text-sm text-gray-600">{order.type}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// }

// export default AddOrders;


// import React, { useState } from 'react';
// import FormWizard from 'react-form-wizard-component';
// import 'react-form-wizard-component/dist/style.css';
// import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/20/solid';

// function AddOrders() {
//   const [orderDetails, setOrderDetails] = useState({
//     name: '',
//     orderStatus: 'Pending',
//     email: '',
//     deliveryDate: '',
//     phone: '',
//     address: '',
//     createdBy: '',
//     design: '',
//     type: 'Kitchen, Wardrobe, Living',
//   });

//   const [submittedOrders, setSubmittedOrders] = useState([]);
//   const [errors, setErrors] = useState({});
//   const [showAlert, setShowAlert] = useState(false);
//   const [view, setView] = useState('form'); // 'form' or 'report'

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setOrderDetails({ ...orderDetails, [name]: value });
//   };

//   const handleSubmit = () => {
//     const newErrors = {};
//     if (!orderDetails.name) newErrors.name = 'Name is required';
//     if (!orderDetails.orderStatus) newErrors.orderStatus = 'Order Status is required';
//     if (!orderDetails.email) newErrors.email = 'Email is required';
//     if (!orderDetails.deliveryDate) newErrors.deliveryDate = 'Expected Delivery Date is required';
//     if (!orderDetails.phone) newErrors.phone = 'Phone is required';
//     if (!orderDetails.address) newErrors.address = 'Address is required';
//     if (!orderDetails.createdBy) newErrors.createdBy = 'Created By is required';
//     if (!orderDetails.design) newErrors.design = 'Design is required';
//     if (!orderDetails.type) newErrors.type = 'Type is required';

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     // Add the current order to the list of submitted orders
//     setSubmittedOrders([...submittedOrders, orderDetails]);
//     setErrors({});
//     setShowAlert(true);

//     // Clear the form
//     setOrderDetails({
//       name: '',
//       orderStatus: 'Pending',
//       email: '',
//       deliveryDate: '',
//       phone: '',
//       address: '',
//       createdBy: '',
//       design: '',
//       type: 'Kitchen, Wardrobe, Living',
//     });
//   };

//   const handleComplete = () => {
//     handleSubmit();
//     console.log("Form completed!");
//   };

//   const tabChanged = ({ prevIndex, nextIndex }) => {
//     console.log("prevIndex", prevIndex);
//     console.log("nextIndex", nextIndex);
//   };

//   return (
//     <div className="max-w-6xl ml-80 mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
//       <div className="flex justify-between mb-6">
//         <button
//           onClick={() => setView('form')}
//           className={`px-4 py-2 rounded-md ${view === 'form' ? 'bg-gray-700 text-white' : 'bg-gray-300'}`}
//         >
//           Form
//         </button>
//         <button
//           onClick={() => setView('report')}
//           className={`px-4 py-2 rounded-md ${view === 'report' ? 'bg-gray-700 text-white' : 'bg-gray-300'}`}
//         >
//           Report
//         </button>
//       </div>

//       {view === 'form' && (
//         <>
//           {/* Success Alert */}
//           {showAlert && (
//             <div className="rounded-md bg-green-50 p-4 mb-4">
//               <div className="flex">
//                 <div className="flex-shrink-0">
//                   <CheckCircleIcon aria-hidden="true" className="h-5 w-5 text-green-400" />
//                 </div>
//                 <div className="ml-3">
//                   <p className="text-sm font-medium text-green-800">Order successfully added!</p>
//                 </div>
//                 <div className="ml-auto pl-3">
//                   <button
//                     onClick={() => setShowAlert(false)}
//                     className="inline-flex rounded-md bg-green-50 p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
//                   >
//                     <span className="sr-only">Dismiss</span>
//                     <XMarkIcon aria-hidden="true" className="h-5 w-5" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Form Wizard */}
//           <FormWizard inlineStep={true} onComplete={handleComplete} onTabChange={tabChanged}>
//             {/* Form Steps here */}
//             <FormWizard.TabContent title="Customer Details" icon="ti-user">
//               <div className="grid grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Name</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={orderDetails.name}
//                     onChange={handleChange}
//                     className={`mt-1 p-2 w-full border rounded-md ${errors.name ? 'border-red-500' : ''}`}
//                   />
//                   {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Order Status</label>
//                   <select
//                     name="orderStatus"
//                     value={orderDetails.orderStatus}
//                     onChange={handleChange}
//                     className={`mt-1 p-2 w-full border rounded-md ${errors.orderStatus ? 'border-red-500' : ''}`}
//                   >
//                     <option value="Select a status">Select a Status</option>
//                     <option value="Pending">Pending</option>
//                     <option value="Processed">Processed</option>
//                   </select>
//                   {errors.orderStatus && <p className="text-red-500 text-sm">{errors.orderStatus}</p>}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Email</label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={orderDetails.email}
//                     onChange={handleChange}
//                     className={`mt-1 p-2 w-full border rounded-md ${errors.email ? 'border-red-500' : ''}`}
//                   />
//                   {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Exp Delivery Date</label>
//                   <input
//                     type="date"
//                     name="deliveryDate"
//                     value={orderDetails.deliveryDate}
//                     onChange={handleChange}
//                     className={`mt-1 p-2 w-full border rounded-md ${errors.deliveryDate ? 'border-red-500' : ''}`}
//                   />
//                   {errors.deliveryDate && <p className="text-red-500 text-sm">{errors.deliveryDate}</p>}
//                 </div>
//               </div>
//             </FormWizard.TabContent>

//             <FormWizard.TabContent title="Order Details" icon="ti-settings">
//               <div className="grid grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Phone</label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={orderDetails.phone}
//                     onChange={handleChange}
//                     className={`mt-1 p-2 w-full border rounded-md ${errors.phone ? 'border-red-500' : ''}`}
//                   />
//                   {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Address</label>
//                   <input
//                     type="text"
//                     name="address"
//                     value={orderDetails.address}
//                     onChange={handleChange}
//                     className={`mt-1 p-2 w-full border rounded-md ${errors.address ? 'border-red-500' : ''}`}
//                   />
//                   {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Created By</label>
//                   <input
//                     type="text"
//                     name="createdBy"
//                     value={orderDetails.createdBy}
//                     onChange={handleChange}
//                     className={`mt-1 p-2 w-full border rounded-md ${errors.createdBy ? 'border-red-500' : ''}`}
//                   />
//                   {errors.createdBy && <p className="text-red-500 text-sm">{errors.createdBy}</p>}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Design</label>
//                   <input
//                     type="text"
//                     name="design"
//                     value={orderDetails.design}
//                     onChange={handleChange}
//                     className={`mt-1 p-2 w-full border rounded-md ${errors.design ? 'border-red-500' : ''}`}
//                   />
//                   {errors.design && <p className="text-red-500 text-sm">{errors.design}</p>}
//                 </div>
//               </div>
//             </FormWizard.TabContent>

//             <FormWizard.TabContent title="Product Type" icon="ti-check">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Type</label>
//                 <select
//                   name="type"
//                   value={orderDetails.type}
//                   onChange={handleChange}
//                   className={`mt-1 p-2 w-full border rounded-md ${errors.type ? 'border-red-500' : ''}`}
//                 >
//                   <option value="Select a type">Select a Type</option>
//                   <option value="Kitchen, Wardrobe, Living">Kitchen, Wardrobe, Living</option>
//                 </select>
//                 {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}
//               </div>
//             </FormWizard.TabContent>
//           </FormWizard>
//         </>
//       )}

//       {view === 'report' && (
//         <div className="mt-10">
//           <h3 className="text-xl font-bold text-gray-700 mb-4">Submitted Orders Report</h3>
//           {submittedOrders.length === 0 ? (
//             <p className="text-gray-500">No orders submitted yet.</p>
//           ) : (
//             <table className="min-w-full bg-white">
//               <thead>
//                 <tr>
//                   <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Name</th>
//                   <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Order Status</th>
//                   <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Email</th>
//                   <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Delivery Date</th>
//                   <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Phone</th>
//                   <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Address</th>
//                   <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Created By</th>
//                   <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Design</th>
//                   <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Type</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {submittedOrders.map((order, index) => (
//                   <tr key={index} className="border-b">
//                     <td className="px-4 py-2 text-sm text-gray-600">{order.name}</td>
//                     <td className="px-4 py-2 text-sm text-gray-600">{order.orderStatus}</td>
//                     <td className="px-4 py-2 text-sm text-gray-600">{order.email}</td>
//                     <td className="px-4 py-2 text-sm text-gray-600">{order.deliveryDate}</td>
//                     <td className="px-4 py-2 text-sm text-gray-600">{order.phone}</td>
//                     <td className="px-4 py-2 text-sm text-gray-600">{order.address}</td>
//                     <td className="px-4 py-2 text-sm text-gray-600">{order.createdBy}</td>
//                     <td className="px-4 py-2 text-sm text-gray-600">{order.design}</td>
//                     <td className="px-4 py-2 text-sm text-gray-600">{order.type}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default AddOrders;


// import React, { useState } from 'react';

// function ReportGenerator() {
//   const [salesReport, setSalesReport] = useState({
//     dateRange: { startDate: '', endDate: '' },
//     productCategory: '',
//     salesChannel: '',
//     region: '',
//     customerDemographics: {
//       ageGroup: '',
//       gender: '',
//       incomeBracket: '',
//     },
//     includeTopSellingProducts: false,
//   });

//   const [inventoryReport, setInventoryReport] = useState({
//     dateRange: { startDate: '', endDate: '' },
//     productCategory: '',
//     stockLevelThreshold: '',
//     showOutOfStockItems: false,
//     showSlowMovingItems: false,
//     generateReorderRecommendations: false,
//   });

//   const [customerFeedbackReport, setCustomerFeedbackReport] = useState({
//     dateRange: { startDate: '', endDate: '' },
//     productCategory: '',
//     feedbackType: '',
//     filterByNpsScore: '',
//     includeCustomerComments: false,
//   });

//   const handleInputChange = (reportType, field, value) => {
//     switch (reportType) {
//       case 'salesReport':
//         setSalesReport({ ...salesReport, [field]: value });
//         break;
//       case 'inventoryReport':
//         setInventoryReport({ ...inventoryReport, [field]: value });
//         break;
//       case 'customerFeedbackReport':
//         setCustomerFeedbackReport({ ...customerFeedbackReport, [field]: value });
//         break;
//       default:
//         break;
//     }
//   };

//   const handleDemographicsChange = (field, value) => {
//     setSalesReport({
//       ...salesReport,
//       customerDemographics: { ...salesReport.customerDemographics, [field]: value },
//     });
//   };

//   const handleSubmit = (reportType) => {
//     switch (reportType) {
//       case 'salesReport':
//         console.log('Sales Report:', salesReport);
//         break;
//       case 'inventoryReport':
//         console.log('Inventory Report:', inventoryReport);
//         break;
//       case 'customerFeedbackReport':
//         console.log('Customer Feedback Report:', customerFeedbackReport);
//         break;
//       default:
//         break;
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
//       <h2 className="text-2xl font-bold mb-4">Report Generator</h2>

//       {/* Sales Report Form */}
//       <div className="mb-8">
//         <h3 className="text-xl font-semibold mb-4">Sales Report</h3>
//         <div className="grid grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Start Date</label>
//             <input
//               type="date"
//               value={salesReport.dateRange.startDate}
//               onChange={(e) =>
//                 handleInputChange('salesReport', 'dateRange', {
//                   ...salesReport.dateRange,
//                   startDate: e.target.value,
//                 })
//               }
//               className="mt-1 p-2 w-full border rounded-md"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">End Date</label>
//             <input
//               type="date"
//               value={salesReport.dateRange.endDate}
//               onChange={(e) =>
//                 handleInputChange('salesReport', 'dateRange', {
//                   ...salesReport.dateRange,
//                   endDate: e.target.value,
//                 })
//               }
//               className="mt-1 p-2 w-full border rounded-md"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Product Category</label>
//             <select
//               value={salesReport.productCategory}
//               onChange={(e) => handleInputChange('salesReport', 'productCategory', e.target.value)}
//               className="mt-1 p-2 w-full border rounded-md"
//             >
//               <option value="">Select Category</option>
//               {['Kitchen', 'Wardrobe', 'Both'].map((option, i) => (
//                 <option key={i} value={option}>
//                   {option}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Sales Channel</label>
//             <select
//               value={salesReport.salesChannel}
//               onChange={(e) => handleInputChange('salesReport', 'salesChannel', e.target.value)}
//               className="mt-1 p-2 w-full border rounded-md"
//             >
//               <option value="">Select Channel</option>
//               {['Online', 'In-store', 'All'].map((option, i) => (
//                 <option key={i} value={option}>
//                   {option}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Region</label>
//             <select
//               value={salesReport.region}
//               onChange={(e) => handleInputChange('salesReport', 'region', e.target.value)}
//               className="mt-1 p-2 w-full border rounded-md"
//             >
//               <option value="">Select Region</option>
//               {['North', 'South', 'East', 'West', 'All'].map((option, i) => (
//                 <option key={i} value={option}>
//                   {option}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Age Group</label>
//             <select
//               value={salesReport.customerDemographics.ageGroup}
//               onChange={(e) => handleDemographicsChange('ageGroup', e.target.value)}
//               className="mt-1 p-2 w-full border rounded-md"
//             >
//               <option value="">Select Age Group</option>
//               {['18-25', '26-35', '36-50', '50+'].map((option, i) => (
//                 <option key={i} value={option}>
//                   {option}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Gender</label>
//             <select
//               value={salesReport.customerDemographics.gender}
//               onChange={(e) => handleDemographicsChange('gender', e.target.value)}
//               className="mt-1 p-2 w-full border rounded-md"
//             >
//               <option value="">Select Gender</option>
//               {['Male', 'Female', 'Other'].map((option, i) => (
//                 <option key={i} value={option}>
//                   {option}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Income Bracket</label>
//             <select
//               value={salesReport.customerDemographics.incomeBracket}
//               onChange={(e) => handleDemographicsChange('incomeBracket', e.target.value)}
//               className="mt-1 p-2 w-full border rounded-md"
//             >
//               <option value="">Select Income Bracket</option>
//               {['Low', 'Middle', 'High'].map((option, i) => (
//                 <option key={i} value={option}>
//                   {option}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="col-span-2">
//             <label className="flex items-center">
//               <input
//                 type="checkbox"
//                 checked={salesReport.includeTopSellingProducts}
//                 onChange={(e) => handleInputChange('salesReport', 'includeTopSellingProducts', e.target.checked)}
//                 className="form-checkbox h-4 w-4"
//               />
//               <span className="ml-2 text-sm font-medium text-gray-700">Include Top-Selling Products</span>
//             </label>
//           </div>
//           <div className="col-span-2">
//             <button
//               onClick={() => handleSubmit('salesReport')}
//               className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//             >
//               Generate Report
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Inventory Report Form */}
//       <div className="mb-8">
//         <h3 className="text-xl font-semibold mb-4">Inventory Report</h3>
//         <div className="grid grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Start Date</label>
//             <input
//               type="date"
//               value={inventoryReport.dateRange.startDate}
//               onChange={(e) =>
//                 handleInputChange('inventoryReport', 'dateRange', {
//                   ...inventoryReport.dateRange,
//                   startDate: e.target.value,
//                 })
//               }
//               className="mt-1 p-2 w-full border rounded-md"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">End Date</label>
//             <input
//               type="date"
//               value={inventoryReport.dateRange.endDate}
//               onChange={(e) =>
//                 handleInputChange('inventoryReport', 'dateRange', {
//                   ...inventoryReport.dateRange,
//                   endDate: e.target.value,
//                 })
//               }
//               className="mt-1 p-2 w-full border rounded-md"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Product Category</label>
//             <select
//               value={inventoryReport.productCategory}
//               onChange={(e) => handleInputChange('inventoryReport', 'productCategory', e.target.value)}
//               className="mt-1 p-2 w-full border rounded-md"
//             >
//               <option value="">Select Category</option>
//               {['Kitchen', 'Wardrobe', 'Both'].map((option, i) => (
//                 <option key={i} value={option}>
//                   {option}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Stock Level Threshold</label>
//             <input
//               type="number"
//               value={inventoryReport.stockLevelThreshold}
//               onChange={(e) => handleInputChange('inventoryReport', 'stockLevelThreshold', e.target.value)}
//               className="mt-1 p-2 w-full border rounded-md"
//               placeholder="Enter threshold value"
//             />
//           </div>
//           <div className="col-span-2">
//             <label className="flex items-center">
//               <input
//                 type="checkbox"
//                 checked={inventoryReport.showOutOfStockItems}
//                 onChange={(e) => handleInputChange('inventoryReport', 'showOutOfStockItems', e.target.checked)}
//                 className="form-checkbox h-4 w-4"
//               />
//               <span className="ml-2 text-sm font-medium text-gray-700">Show Out-of-Stock Items</span>
//             </label>
//           </div>
//           <div className="col-span-2">
//             <label className="flex items-center">
//               <input
//                 type="checkbox"
//                 checked={inventoryReport.showSlowMovingItems}
//                 onChange={(e) => handleInputChange('inventoryReport', 'showSlowMovingItems', e.target.checked)}
//                 className="form-checkbox h-4 w-4"
//               />
//               <span className="ml-2 text-sm font-medium text-gray-700">Show Slow-Moving Items</span>
//             </label>
//           </div>
//           <div className="col-span-2">
//             <label className="flex items-center">
//               <input
//                 type="checkbox"
//                 checked={inventoryReport.generateReorderRecommendations}
//                 onChange={(e) => handleInputChange('inventoryReport', 'generateReorderRecommendations', e.target.checked)}
//                 className="form-checkbox h-4 w-4"
//               />
//               <span className="ml-2 text-sm font-medium text-gray-700">Generate Reorder Recommendations</span>
//             </label>
//           </div>
//           <div className="col-span-2">
//             <button
//               onClick={() => handleSubmit('inventoryReport')}
//               className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//             >
//               Generate Report
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Customer Feedback Report Form */}
//       <div>
//         <h3 className="text-xl font-semibold mb-4">Customer Feedback Report</h3>
//         <div className="grid grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Start Date</label>
//             <input
//               type="date"
//               value={customerFeedbackReport.dateRange.startDate}
//               onChange={(e) =>
//                 handleInputChange('customerFeedbackReport', 'dateRange', {
//                   ...customerFeedbackReport.dateRange,
//                   startDate: e.target.value,
//                 })
//               }
//               className="mt-1 p-2 w-full border rounded-md"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">End Date</label>
//             <input
//               type="date"
//               value={customerFeedbackReport.dateRange.endDate}
//               onChange={(e) =>
//                 handleInputChange('customerFeedbackReport', 'dateRange', {
//                   ...customerFeedbackReport.dateRange,
//                   endDate: e.target.value,
//                 })
//               }
//               className="mt-1 p-2 w-full border rounded-md"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Product Category</label>
//             <select
//               value={customerFeedbackReport.productCategory}
//               onChange={(e) => handleInputChange('customerFeedbackReport', 'productCategory', e.target.value)}
//               className="mt-1 p-2 w-full border rounded-md"
//             >
//               <option value="">Select Category</option>
//               {['Kitchen', 'Wardrobe', 'Both'].map((option, i) => (
//                 <option key={i} value={option}>
//                   {option}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Feedback Type</label>
//             <select
//               value={customerFeedbackReport.feedbackType}
//               onChange={(e) => handleInputChange('customerFeedbackReport', 'feedbackType', e.target.value)}
//               className="mt-1 p-2 w-full border rounded-md"
//             >
//               <option value="">Select Feedback Type</option>
//               {['Satisfaction Score', 'Reviews', 'Complaints', 'Customization Feedback'].map((option, i) => (
//                 <option key={i} value={option}>
//                   {option}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="col-span-2">
//             <label className="block text-sm font-medium text-gray-700">Filter by NPS Score</label>
//             <input
//               type="number"
//               value={customerFeedbackReport.filterByNpsScore}
//               onChange={(e) => handleInputChange('customerFeedbackReport', 'filterByNpsScore', e.target.value)}
//               className="mt-1 p-2 w-full border rounded-md"
//               placeholder="Enter NPS threshold"
//             />
//           </div>
//           <div className="col-span-2">
//             <label className="flex items-center">
//               <input
//                 type="checkbox"
//                 checked={customerFeedbackReport.includeCustomerComments}
//                 onChange={(e) => handleInputChange('customerFeedbackReport', 'includeCustomerComments', e.target.checked)}
//                 className="form-checkbox h-4 w-4"
//               />
//               <span className="ml-2 text-sm font-medium text-gray-700">Include Customer Comments</span>
//             </label>
//           </div>
//           <div className="col-span-2">
//             <button
//               onClick={() => handleSubmit('customerFeedbackReport')}
//               className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//             >
//               Generate Report
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ReportGenerator;


// import React, { useState } from 'react';

// function ReportGenerator() {
//   const [salesReport, setSalesReport] = useState({
//     dateRange: { startDate: '', endDate: '' },
//     productCategory: '',
//     salesChannel: '',
//     region: '',
//     customerDemographics: {
//       ageGroup: '',
//       gender: '',
//       incomeBracket: '',
//     },
//     includeTopSellingProducts: false,
//   });

//   const [inventoryReport, setInventoryReport] = useState({
//     dateRange: { startDate: '', endDate: '' },
//     productCategory: '',
//     stockLevelThreshold: '',
//     showOutOfStockItems: false,
//     showSlowMovingItems: false,
//     generateReorderRecommendations: false,
//   });

//   const [customerFeedbackReport, setCustomerFeedbackReport] = useState({
//     dateRange: { startDate: '', endDate: '' },
//     productCategory: '',
//     feedbackType: '',
//     filterByNpsScore: '',
//     includeCustomerComments: false,
//   });

//   const [generatedReport, setGeneratedReport] = useState(null);

//   const handleInputChange = (reportType, field, value) => {
//     switch (reportType) {
//       case 'salesReport':
//         setSalesReport({ ...salesReport, [field]: value });
//         break;
//       case 'inventoryReport':
//         setInventoryReport({ ...inventoryReport, [field]: value });
//         break;
//       case 'customerFeedbackReport':
//         setCustomerFeedbackReport({ ...customerFeedbackReport, [field]: value });
//         break;
//       default:
//         break;
//     }
//   };

//   const handleDemographicsChange = (field, value) => {
//     setSalesReport({
//       ...salesReport,
//       customerDemographics: { ...salesReport.customerDemographics, [field]: value },
//     });
//   };

//   const handleSubmit = (reportType) => {
//     let reportData;
//     switch (reportType) {
//       case 'salesReport':
//         reportData = salesReport;
//         break;
//       case 'inventoryReport':
//         reportData = inventoryReport;
//         break;
//       case 'customerFeedbackReport':
//         reportData = customerFeedbackReport;
//         break;
//       default:
//         return;
//     }
//     setGeneratedReport({ reportType, data: reportData });
//   };

//   const renderTable = (reportType, data) => {
//     switch (reportType) {
//       case 'salesReport':
//         return (
//           <table className="min-w-full bg-white border border-gray-200 rounded-md">
//             <thead>
//               <tr>
//                 <th className="border px-4 py-2">Field</th>
//                 <th className="border px-4 py-2">Value</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td className="border px-4 py-2">Start Date</td>
//                 <td className="border px-4 py-2">{data.dateRange.startDate}</td>
//               </tr>
//               <tr>
//                 <td className="border px-4 py-2">End Date</td>
//                 <td className="border px-4 py-2">{data.dateRange.endDate}</td>
//               </tr>
//               <tr>
//                 <td className="border px-4 py-2">Product Category</td>
//                 <td className="border px-4 py-2">{data.productCategory}</td>
//               </tr>
//               <tr>
//                 <td className="border px-4 py-2">Sales Channel</td>
//                 <td className="border px-4 py-2">{data.salesChannel}</td>
//               </tr>
//               <tr>
//                 <td className="border px-4 py-2">Region</td>
//                 <td className="border px-4 py-2">{data.region}</td>
//               </tr>
//               <tr>
//                 <td className="border px-4 py-2">Age Group</td>
//                 <td className="border px-4 py-2">{data.customerDemographics.ageGroup}</td>
//               </tr>
//               <tr>
//                 <td className="border px-4 py-2">Gender</td>
//                 <td className="border px-4 py-2">{data.customerDemographics.gender}</td>
//               </tr>
//               <tr>
//                 <td className="border px-4 py-2">Income Bracket</td>
//                 <td className="border px-4 py-2">{data.customerDemographics.incomeBracket}</td>
//               </tr>
//               <tr>
//                 <td className="border px-4 py-2">Include Top-Selling Products</td>
//                 <td className="border px-4 py-2">{data.includeTopSellingProducts ? 'Yes' : 'No'}</td>
//               </tr>
//             </tbody>
//           </table>
//         );
//       case 'inventoryReport':
//         return (
//           <table className="min-w-full bg-white border border-gray-200 rounded-md">
//             <thead>
//               <tr>
//                 <th className="border px-4 py-2">Field</th>
//                 <th className="border px-4 py-2">Value</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td className="border px-4 py-2">Start Date</td>
//                 <td className="border px-4 py-2">{data.dateRange.startDate}</td>
//               </tr>
//               <tr>
//                 <td className="border px-4 py-2">End Date</td>
//                 <td className="border px-4 py-2">{data.dateRange.endDate}</td>
//               </tr>
//               <tr>
//                 <td className="border px-4 py-2">Product Category</td>
//                 <td className="border px-4 py-2">{data.productCategory}</td>
//               </tr>
//               <tr>
//                 <td className="border px-4 py-2">Stock Level Threshold</td>
//                 <td className="border px-4 py-2">{data.stockLevelThreshold}</td>
//               </tr>
//               <tr>
//                 <td className="border px-4 py-2">Show Out of Stock Items</td>
//                 <td className="border px-4 py-2">{data.showOutOfStockItems ? 'Yes' : 'No'}</td>
//               </tr>
//               <tr>
//                 <td className="border px-4 py-2">Show Slow-Moving Items</td>
//                 <td className="border px-4 py-2">{data.showSlowMovingItems ? 'Yes' : 'No'}</td>
//               </tr>
//               <tr>
//                 <td className="border px-4 py-2">Generate Reorder Recommendations</td>
//                 <td className="border px-4 py-2">{data.generateReorderRecommendations ? 'Yes' : 'No'}</td>
//               </tr>
//             </tbody>
//           </table>
//         );
//       case 'customerFeedbackReport':
//         return (
//           <table className="min-w-full bg-white border border-gray-200 rounded-md">
//             <thead>
//               <tr>
//                 <th className="border px-4 py-2">Field</th>
//                 <th className="border px-4 py-2">Value</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td className="border px-4 py-2">Start Date</td>
//                 <td className="border px-4 py-2">{data.dateRange.startDate}</td>
//               </tr>
//               <tr>
//                 <td className="border px-4 py-2">End Date</td>
//                 <td className="border px-4 py-2">{data.dateRange.endDate}</td>
//               </tr>
//               <tr>
//                 <td className="border px-4 py-2">Product Category</td>
//                 <td className="border px-4 py-2">{data.productCategory}</td>
//               </tr>
//               <tr>
//                 <td className="border px-4 py-2">Feedback Type</td>
//                 <td className="border px-4 py-2">{data.feedbackType}</td>
//               </tr>
//               <tr>
//                 <td className="border px-4 py-2">Filter by NPS Score</td>
//                 <td className="border px-4 py-2">{data.filterByNpsScore}</td>
//               </tr>
//               <tr>
//                 <td className="border px-4 py-2">Include Customer Comments</td>
//                 <td className="border px-4 py-2">{data.includeCustomerComments ? 'Yes' : 'No'}</td>
//               </tr>
//             </tbody>
//           </table>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
//       <h2 className="text-2xl font-bold mb-4">Report Generator</h2>

//       {/* Sales Report Form */}
//       <div className="mb-8">
//         <h3 className="text-xl font-semibold mb-4">Sales Report</h3>
//         <div className="grid grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Start Date</label>
//             <input
//               type="date"
//               value={salesReport.dateRange.startDate}
//               onChange={(e) =>
//                 handleInputChange('salesReport', 'dateRange', {
//                   ...salesReport.dateRange,
//                   startDate: e.target.value,
//                 })
//               }
//               className="mt-1 p-2 w-full border rounded-md"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">End Date</label>
//             <input
//               type="date"
//               value={salesReport.dateRange.endDate}
//               onChange={(e) =>
//                 handleInputChange('salesReport', 'dateRange', {
//                   ...salesReport.dateRange,
//                   endDate: e.target.value,
//                 })
//               }
//               className="mt-1 p-2 w-full border rounded-md"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Product Category</label>
//             <select
//               value={salesReport.productCategory}
//               onChange={(e) => handleInputChange('salesReport', 'productCategory', e.target.value)}
//               className="mt-1 p-2 w-full border rounded-md"
//             >
//               <option value="">Select Category</option>
//               {['Kitchen', 'Wardrobe', 'Both'].map((option, i) => (
//                 <option key={i} value={option}>
//                   {option}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Sales Channel</label>
//             <select
//               value={salesReport.salesChannel}
//               onChange={(e) => handleInputChange('salesReport', 'salesChannel', e.target.value)}
//               className="mt-1 p-2 w-full border rounded-md"
//             >
//               <option value="">Select Channel</option>
//               {['Online', 'In-Store', 'Both'].map((option, i) => (
//                 <option key={i} value={option}>
//                   {option}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Region</label>
//             <select
//               value={salesReport.region}
//               onChange={(e) => handleInputChange('salesReport', 'region', e.target.value)}
//               className="mt-1 p-2 w-full border rounded-md"
//             >
//               <option value="">Select Region</option>
//               {['North', 'South', 'East', 'West'].map((option, i) => (
//                 <option key={i} value={option}>
//                   {option}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Age Group</label>
//             <select
//               value={salesReport.customerDemographics.ageGroup}
//               onChange={(e) => handleDemographicsChange('ageGroup', e.target.value)}
//               className="mt-1 p-2 w-full border rounded-md"
//             >
//               <option value="">Select Age Group</option>
//               {['18-24', '25-34', '35-44', '45-54', '55+'].map((option, i) => (
//                 <option key={i} value={option}>
//                   {option}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Gender</label>
//             <select
//               value={salesReport.customerDemographics.gender}
//               onChange={(e) => handleDemographicsChange('gender', e.target.value)}
//               className="mt-1 p-2 w-full border rounded-md"
//             >
//               <option value="">Select Gender</option>
//               {['Male', 'Female', 'Other'].map((option, i) => (
//                 <option key={i} value={option}>
//                   {option}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Income Bracket</label>
//             <select
//               value={salesReport.customerDemographics.incomeBracket}
//               onChange={(e) => handleDemographicsChange('incomeBracket', e.target.value)}
//               className="mt-1 p-2 w-full border rounded-md"
//             >
//               <option value="">Select Income Bracket</option>
//               {['Under $25,000', '$25,000 - $49,999', '$50,000 - $74,999', '$75,000 - $99,999', '$100,000+'].map((option, i) => (
//                 <option key={i} value={option}>
//                   {option}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="col-span-2">
//             <label className="flex items-center">
//               <input
//                 type="checkbox"
//                 checked={salesReport.includeTopSellingProducts}
//                 onChange={(e) => handleInputChange('salesReport', 'includeTopSellingProducts', e.target.checked)}
//                 className="form-checkbox h-4 w-4"
//               />
//               <span className="ml-2 text-sm font-medium text-gray-700">Include Top-Selling Products</span>
//             </label>
//           </div>
//           <div className="col-span-2">
//             <button
//               onClick={() => handleSubmit('salesReport')}
//               className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//             >
//               Generate Report
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Inventory Report Form */}
//       <div className="mb-8">
//         <h3 className="text-xl font-semibold mb-4">Inventory Report</h3>
//         <div className="grid grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Start Date</label>
//             <input
//               type="date"
//               value={inventoryReport.dateRange.startDate}
//               onChange={(e) =>
//                 handleInputChange('inventoryReport', 'dateRange', {
//                   ...inventoryReport.dateRange,
//                   startDate: e.target.value,
//                 })
//               }
//               className="mt-1 p-2 w-full border rounded-md"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">End Date</label>
//             <input
//               type="date"
//               value={inventoryReport.dateRange.endDate}
//               onChange={(e) =>
//                 handleInputChange('inventoryReport', 'dateRange', {
//                   ...inventoryReport.dateRange,
//                   endDate: e.target.value,
//                 })
//               }
//               className="mt-1 p-2 w-full border rounded-md"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Product Category</label>
//             <select
//               value={inventoryReport.productCategory}
//               onChange={(e) => handleInputChange('inventoryReport', 'productCategory', e.target.value)}
//               className="mt-1 p-2 w-full border rounded-md"
//             >
//               <option value="">Select Category</option>
//               {['Kitchen', 'Wardrobe', 'Both'].map((option, i) => (
//                 <option key={i} value={option}>
//                   {option}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Stock Level Threshold</label>
//             <input
//               type="number"
//               value={inventoryReport.stockLevelThreshold}
//               onChange={(e) => handleInputChange('inventoryReport', 'stockLevelThreshold', e.target.value)}
//               className="mt-1 p-2 w-full border rounded-md"
//             />
//           </div>
//           <div className="col-span-2">
//             <label className="flex items-center">
//               <input
//                 type="checkbox"
//                 checked={inventoryReport.showOutOfStockItems}
//                 onChange={(e) => handleInputChange('inventoryReport', 'showOutOfStockItems', e.target.checked)}
//                 className="form-checkbox h-4 w-4"
//               />
//               <span className="ml-2 text-sm font-medium text-gray-700">Show Out of Stock Items</span>
//             </label>
//           </div>
//           <div className="col-span-2">
//             <label className="flex items-center">
//               <input
//                 type="checkbox"
//                 checked={inventoryReport.showSlowMovingItems}
//                 onChange={(e) => handleInputChange('inventoryReport', 'showSlowMovingItems', e.target.checked)}
//                 className="form-checkbox h-4 w-4"
//               />
//               <span className="ml-2 text-sm font-medium text-gray-700">Show Slow-Moving Items</span>
//             </label>
//           </div>
//           <div className="col-span-2">
//             <label className="flex items-center">
//               <input
//                 type="checkbox"
//                 checked={inventoryReport.generateReorderRecommendations}
//                 onChange={(e) => handleInputChange('inventoryReport', 'generateReorderRecommendations', e.target.checked)}
//                 className="form-checkbox h-4 w-4"
//               />
//               <span className="ml-2 text-sm font-medium text-gray-700">Generate Reorder Recommendations</span>
//             </label>
//           </div>
//           <div className="col-span-2">
//             <button
//               onClick={() => handleSubmit('inventoryReport')}
//               className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//             >
//               Generate Report
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Customer Feedback Report Form */}
//       <div className="mb-8">
//         <h3 className="text-xl font-semibold mb-4">Customer Feedback Report</h3>
//         <div className="grid grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Start Date</label>
//             <input
//               type="date"
//               value={customerFeedbackReport.dateRange.startDate}
//               onChange={(e) =>
//                 handleInputChange('customerFeedbackReport', 'dateRange', {
//                   ...customerFeedbackReport.dateRange,
//                   startDate: e.target.value,
//                 })
//               }
//               className="mt-1 p-2 w-full border rounded-md"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">End Date</label>
//             <input
//               type="date"
//               value={customerFeedbackReport.dateRange.endDate}
//               onChange={(e) =>
//                 handleInputChange('customerFeedbackReport', 'dateRange', {
//                   ...customerFeedbackReport.dateRange,
//                   endDate: e.target.value,
//                 })
//               }
//               className="mt-1 p-2 w-full border rounded-md"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Product Category</label>
//             <select
//               value={customerFeedbackReport.productCategory}
//               onChange={(e) => handleInputChange('customerFeedbackReport', 'productCategory', e.target.value)}
//               className="mt-1 p-2 w-full border rounded-md"
//             >
//               <option value="">Select Category</option>
//               {['Kitchen', 'Wardrobe', 'Both'].map((option, i) => (
//                 <option key={i} value={option}>
//                   {option}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Feedback Type</label>
//             <select
//               value={customerFeedbackReport.feedbackType}
//               onChange={(e) => handleInputChange('customerFeedbackReport', 'feedbackType', e.target.value)}
//               className="mt-1 p-2 w-full border rounded-md"
//             >
//               <option value="">Select Feedback Type</option>
//               {['Positive', 'Negative', 'Neutral'].map((option, i) => (
//                 <option key={i} value={option}>
//                   {option}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Filter by NPS Score</label>
//             <input
//               type="number"
//               value={customerFeedbackReport.filterByNpsScore}
//               onChange={(e) => handleInputChange('customerFeedbackReport', 'filterByNpsScore', e.target.value)}
//               className="mt-1 p-2 w-full border rounded-md"
//             />
//           </div>
//           <div className="col-span-2">
//             <label className="flex items-center">
//               <input
//                 type="checkbox"
//                 checked={customerFeedbackReport.includeCustomerComments}
//                 onChange={(e) => handleInputChange('customerFeedbackReport', 'includeCustomerComments', e.target.checked)}
//                 className="form-checkbox h-4 w-4"
//               />
//               <span className="ml-2 text-sm font-medium text-gray-700">Include Customer Comments</span>
//             </label>
//           </div>
//           <div className="col-span-2">
//             <button
//               onClick={() => handleSubmit('customerFeedbackReport')}
//               className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//             >
//               Generate Report
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Display Report */}
//       {generatedReport && (
//         <div className="mt-8">
//           <h3 className="text-xl font-semibold mb-4">Generated Report: {generatedReport.reportType.replace(/([A-Z])/g, ' $1')}</h3>
//           {renderTable(generatedReport.reportType, generatedReport.data)}
//         </div>
//       )}
//     </div>
//   );
// }

// export default ReportGenerator;


// import React, { useState } from 'react';
// import {  useNavigate } from 'react-router-dom';
// import * as XLSX from 'xlsx';
// import { jsPDF } from 'jspdf';

// function ReportGenerator() {
//   const [activeTab, setActiveTab] = useState('salesReport');
//   const navigate = useNavigate()


//   const [salesReport, setSalesReport] = useState({
//     dateRange: { startDate: '', endDate: '' },
//     productCategory: '',
//     salesChannel: '',
//     region: '',
//     customerDemographics: {
//       ageGroup: '',
//       gender: '',
//       incomeBracket: '',
//     },
//     includeTopSellingProducts: false,
//   });

//   const [inventoryReport, setInventoryReport] = useState({
//     dateRange: { startDate: '', endDate: '' },
//     productCategory: '',
//     stockLevelThreshold: '',
//     showOutOfStockItems: false,
//     showSlowMovingItems: false,
//     generateReorderRecommendations: false,
//   });

//   const [customerFeedbackReport, setCustomerFeedbackReport] = useState({
//     dateRange: { startDate: '', endDate: '' },
//     productCategory: '',
//     feedbackType: '',
//     filterByNpsScore: '',
//     includeCustomerComments: false,
//   });

//   const [generatedReport, setGeneratedReport] = useState(null);

//   const handleInputChange = (reportType, field, value) => {
//     switch (reportType) {
//       case 'salesReport':
//         setSalesReport({ ...salesReport, [field]: value });
//         break;
//       case 'inventoryReport':
//         setInventoryReport({ ...inventoryReport, [field]: value });
//         break;
//       case 'customerFeedbackReport':
//         setCustomerFeedbackReport({ ...customerFeedbackReport, [field]: value });
//         break;
//       default:
//         break;
//     }
//   };

//   const handleDemographicsChange = (field, value) => {
//     setSalesReport({
//       ...salesReport,
//       customerDemographics: { ...salesReport.customerDemographics, [field]: value },
//     });
//   };

//   const handleSubmit = (reportType) => {
//     let reportData;
//     switch (reportType) {
//       case 'salesReport':
//         reportData = salesReport;
//         break;
//       case 'inventoryReport':
//         reportData = inventoryReport;
//         break;
//       case 'customerFeedbackReport':
//         reportData = customerFeedbackReport;
//         break;
//       default:
//         return;
//     }
//     setGeneratedReport({ reportType, data: reportData });
//   };
//   // const exportToExcel = (reportType, data) => {
//   //   const ws = XLSX.utils.json_to_sheet(data);
//   //   const wb = XLSX.utils.book_new();
//   //   XLSX.utils.book_append_sheet(wb, ws, `${reportType} Report`);
//   //   XLSX.writeFile(wb, `${reportType}_report.xlsx`);
//   // };

//   // const exportToPDF = (reportType, data) => {
//   //   const doc = new jsPDF();
//   //   doc.setFontSize(12);

//   //   doc.text(`${reportType.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} Report`, 10, 10);

//   //   let yOffset = 20;
//   //   data.forEach((report, index) => {
//   //     if (yOffset > 270) { // Check if page is full
//   //       doc.addPage();
//   //       yOffset = 10;
//   //     }
//   //     doc.text(`${index + 1}. ${JSON.stringify(report)}`, 10, yOffset);
//   //     yOffset += 10;
//   //   });

//   //   doc.save(`${reportType}_report.pdf`);
//   // };

//   const exportToExcel = (reportType, data) => {
//     const dataArray = Array.isArray(data) ? data : [data];
//     const ws = XLSX.utils.json_to_sheet(dataArray);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, `${reportType} Report`);
//     XLSX.writeFile(wb, `${reportType}_report.xlsx`);
//   };
  
//   const exportToPDF = (reportType, data) => {
//     const dataArray = Array.isArray(data) ? data : [data];
//     const doc = new jsPDF();
//     doc.setFontSize(12);
  
//     doc.text(`${reportType.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} Report`, 10, 10);
  
//     let yOffset = 20;
//     dataArray.forEach((report, index) => {
//       if (yOffset > 270) { // Check if page is full
//         doc.addPage();
//         yOffset = 10;
//       }
//       doc.text(`${index + 1}. ${JSON.stringify(report)}`, 10, yOffset);
//       yOffset += 10;
//     });
  
//     doc.save(`${reportType}_report.pdf`);
//   };
  

//   const renderTable = (reportType, data) => {
//     switch (reportType) {
//       case 'salesReport':
//         return (
//           <table className="min-w-full bg-white border border-gray-200 rounded-md">
//             <thead>
//               <tr>
//                 <th className="border px-4 py-2">Field</th>
//                 <th className="border px-4 py-2">Value</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td className="border px-4 py-2">Start Date</td>
//                 <td className="border px-4 py-2">{data.dateRange.startDate}</td>
//               </tr>
//               <tr>
//                 <td className="border px-4 py-2">End Date</td>
//                 <td className="border px-4 py-2">{data.dateRange.endDate}</td>
//               </tr>
//               <tr>
//                 <td className="border px-4 py-2">Product Category</td>
//                 <td className="border px-4 py-2">{data.productCategory}</td>
//               </tr>
//               <tr>
//                 <td className="border px-4 py-2">Sales Channel</td>
//                 <td className="border px-4 py-2">{data.salesChannel}</td>
//               </tr>
//               <tr>
//                 <td className="border px-4 py-2">Region</td>
//                 <td className="border px-4 py-2">{data.region}</td>
//               </tr>
//               <tr>
//                 <td className="border px-4 py-2">Age Group</td>
//                 <td className="border px-4 py-2">{data.customerDemographics.ageGroup}</td>
//               </tr>
//               <tr>
//                 <td className="border px-4 py-2">Gender</td>
//                 <td className="border px-4 py-2">{data.customerDemographics.gender}</td>
//               </tr>
//               <tr>
//                 <td className="border px-4 py-2">Income Bracket</td>
//                 <td className="border px-4 py-2">{data.customerDemographics.incomeBracket}</td>
//               </tr>
//               <tr>
//                 <td className="border px-4 py-2">Include Top-Selling Products</td>
//                 <td className="border px-4 py-2">{data.includeTopSellingProducts ? 'Yes' : 'No'}</td>
//               </tr>
//             </tbody>
//           </table>
//         );
//       case 'inventoryReport':
//         return (
//           <table className="min-w-full bg-white border border-gray-200 rounded-md">
//             <thead>
//               <tr>
//                 <th className="border px-4 py-2">Field</th>
//                 <th className="border px-4 py-2">Value</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td className="border px-4 py-2">Start Date</td>
//                 <td className="border px-4 py-2">{data.dateRange.startDate}</td>
//               </tr>
//               <tr>
//                 <td className="border px-4 py-2">End Date</td>
//                 <td className="border px-4 py-2">{data.dateRange.endDate}</td>
//               </tr>
//               <tr>
//                 <td className="border px-4 py-2">Product Category</td>
//                 <td className="border px-4 py-2">{data.productCategory}</td>
//               </tr>
//               <tr>
//                 <td className="border px-4 py-2">Stock Level Threshold</td>
//                 <td className="border px-4 py-2">{data.stockLevelThreshold}</td>
//               </tr>
//               <tr>
//                 <td className="border px-4 py-2">Show Out of Stock Items</td>
//                 <td className="border px-4 py-2">{data.showOutOfStockItems ? 'Yes' : 'No'}</td>
//               </tr>
//               <tr>
//                 <td className="border px-4 py-2">Show Slow-Moving Items</td>
//                 <td className="border px-4 py-2">{data.showSlowMovingItems ? 'Yes' : 'No'}</td>
//               </tr>
//               <tr>
//                 <td className="border px-4 py-2">Generate Reorder Recommendations</td>
//                 <td className="border px-4 py-2">{data.generateReorderRecommendations ? 'Yes' : 'No'}</td>
//               </tr>
//             </tbody>
//           </table>
//         );
//       case 'customerFeedbackReport':
//         return (
//           <table className="min-w-full bg-white border border-gray-200 rounded-md">
//             <thead>
//               <tr>
//                 <th className="border px-4 py-2">Field</th>
//                 <th className="border px-4 py-2">Value</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td className="border px-4 py-2">Start Date</td>
//                 <td className="border px-4 py-2">{data.dateRange.startDate}</td>
//               </tr>
//               <tr>
//                 <td className="border px-4 py-2">End Date</td>
//                 <td className="border px-4 py-2">{data.dateRange.endDate}</td>
//               </tr>
//               <tr>
//                 <td className="border px-4 py-2">Product Category</td>
//                 <td className="border px-4 py-2">{data.productCategory}</td>
//               </tr>
//               <tr>
//                 <td className="border px-4 py-2">Feedback Type</td>
//                 <td className="border px-4 py-2">{data.feedbackType}</td>
//               </tr>
//               <tr>
//                 <td className="border px-4 py-2">Filter by NPS Score</td>
//                 <td className="border px-4 py-2">{data.filterByNpsScore}</td>
//               </tr>
//               <tr>
//                 <td className="border px-4 py-2">Include Customer Comments</td>
//                 <td className="border px-4 py-2">{data.includeCustomerComments ? 'Yes' : 'No'}</td>
//               </tr>
//             </tbody>
//           </table>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     // <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
//     <div className="px-4 sm:px-6 lg:px-8 pt-4  ml-10 lg:ml-80 w-auto p-6 bg-white shadow-lg rounded-lg  mt-10 mx-10 mb-10 ">

//       <h2 className="text-2xl font-bold mb-4">Report Generator</h2>

//       {/* Tab Navigation */}
//       <div className="flex space-x-4 mb-6">
//         <button
//           onClick={() => setActiveTab('salesReport')}
//           className={`px-4 py-2 rounded-md ${activeTab === 'salesReport' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
//         >
//           Sales Report
//         </button>
//         <button
//           onClick={() => setActiveTab('inventoryReport')}
//           className={`px-4 py-2 rounded-md ${activeTab === 'inventoryReport' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
//         >
//           Inventory Report
//         </button>
//         <button
//           onClick={() => setActiveTab('customerFeedbackReport')}
//           className={`px-4 py-2 rounded-md ${activeTab === 'customerFeedbackReport' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
//         >
//           Customer Feedback
//         </button>
//         {/* <button           className="px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white   bg-gray-200 text-gray-700"
//         onClick={()=> navigate('/ReportsStatic')}
//         >All Repots</button> */}
//       </div>

//       {/* Form Fields */}
//       {activeTab === 'salesReport' && (
//         <>
//           {/* Sales Report Fields */}
//           {/* <div>
//             <label className="block mb-2">Start Date</label>
//             <input
//               type="date"
//               value={salesReport.dateRange.startDate}
//               onChange={(e) => handleInputChange('salesReport', 'dateRange', { ...salesReport.dateRange, startDate: e.target.value })}
//               className="border rounded p-2 w-full"
//             />
//           </div> */}
//           <div className="mb-8">
//   <h3 className="text-xl font-semibold mb-4">Sales Report</h3>
//   <div className="grid grid-cols-1 gap-6">
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//       <div>
//         <label className="block text-sm font-medium text-gray-700">Start Date</label>
//         <input
//           type="date"
//           value={salesReport.dateRange.startDate}
//           onChange={(e) =>
//             handleInputChange('salesReport', 'dateRange', {
//               ...salesReport.dateRange,
//               startDate: e.target.value,
//             })
//           }
//           className="mt-1 p-2 w-full border rounded-md"
//         />
//       </div>
//       <div>
//         <label className="block text-sm font-medium text-gray-700">End Date</label>
//         <input
//           type="date"
//           value={salesReport.dateRange.endDate}
//           onChange={(e) =>
//             handleInputChange('salesReport', 'dateRange', {
//               ...salesReport.dateRange,
//               endDate: e.target.value,
//             })
//           }
//           className="mt-1 p-2 w-full border rounded-md"
//         />
//       </div>
//       <div>
//         <label className="block text-sm font-medium text-gray-700">Product Category</label>
//         <select
//           value={salesReport.productCategory}
//           onChange={(e) => handleInputChange('salesReport', 'productCategory', e.target.value)}
//           className="mt-1 p-2 w-full border rounded-md"
//         >
//           <option value="">Select Category</option>
//           {['Kitchen', 'Wardrobe', 'Both'].map((option, i) => (
//             <option key={i} value={option}>
//               {option}
//             </option>
//           ))}
//         </select>
//       </div>
//     </div>
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//       <div>
//         <label className="block text-sm font-medium text-gray-700">Sales Channel</label>
//         <select
//           value={salesReport.salesChannel}
//           onChange={(e) => handleInputChange('salesReport', 'salesChannel', e.target.value)}
//           className="mt-1 p-2 w-full border rounded-md"
//         >
//           <option value="">Select Channel</option>
//           {['Online', 'In-Store', 'Both'].map((option, i) => (
//             <option key={i} value={option}>
//               {option}
//             </option>
//           ))}
//         </select>
//       </div>
//       <div>
//         <label className="block text-sm font-medium text-gray-700">Region</label>
//         <select
//           value={salesReport.region}
//           onChange={(e) => handleInputChange('salesReport', 'region', e.target.value)}
//           className="mt-1 p-2 w-full border rounded-md"
//         >
//           <option value="">Select Region</option>
//           {['North', 'South', 'East', 'West'].map((option, i) => (
//             <option key={i} value={option}>
//               {option}
//             </option>
//           ))}
//         </select>
//       </div>
//       <div>
//         <label className="block text-sm font-medium text-gray-700">Age Group</label>
//         <select
//           value={salesReport.customerDemographics.ageGroup}
//           onChange={(e) => handleDemographicsChange('ageGroup', e.target.value)}
//           className="mt-1 p-2 w-full border rounded-md"
//         >
//           <option value="">Select Age Group</option>
//           {['18-24', '25-34', '35-44', '45-54', '55+'].map((option, i) => (
//             <option key={i} value={option}>
//               {option}
//             </option>
//           ))}
//         </select>
//       </div>
//     </div>
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//       <div>
//         <label className="block text-sm font-medium text-gray-700">Gender</label>
//         <select
//           value={salesReport.customerDemographics.gender}
//           onChange={(e) => handleDemographicsChange('gender', e.target.value)}
//           className="mt-1 p-2 w-full border rounded-md"
//         >
//           <option value="">Select Gender</option>
//           {['Male', 'Female', 'Other'].map((option, i) => (
//             <option key={i} value={option}>
//               {option}
//             </option>
//           ))}
//         </select>
//       </div>
//       <div>
//         <label className="block text-sm font-medium text-gray-700">Income Bracket</label>
//         <select
//           value={salesReport.customerDemographics.incomeBracket}
//           onChange={(e) => handleDemographicsChange('incomeBracket', e.target.value)}
//           className="mt-1 p-2 w-full border rounded-md"
//         >
//           <option value="">Select Income Bracket</option>
//           {['Under $25,000', '$25,000 - $49,999', '$50,000 - $74,999', '$75,000 - $99,999', '$100,000+'].map((option, i) => (
//             <option key={i} value={option}>
//               {option}
//             </option>
//           ))}
//         </select>
//       </div>
//     </div>
//     <div className="flex items-center space-x-2">
//       <input
//         type="checkbox"
//         checked={salesReport.includeTopSellingProducts}
//         onChange={(e) => handleInputChange('salesReport', 'includeTopSellingProducts', e.target.checked)}
//         className="form-checkbox h-4 w-4"
//       />
//       <label className="text-sm font-medium text-gray-700">Include Top-Selling Products</label>
//     </div>
//     <div className="mt-4">
//       <button
//         onClick={() => handleSubmit('salesReport')}
//         className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//       >
//         Generate Report
//       </button>
    
//     </div>
//   </div>
// </div>

//           {/* Other fields for Sales Report */}
         
//           {/* More fields for Sales Report */}
//           {/* Add fields similar to the existing ones for Inventory Report and Customer Feedback */}
//         </>
//       )}

//       {activeTab === 'inventoryReport' && (
//         <>
//           {/* Inventory Report Fields */}
//           {/* <div>
//             <label className="block mb-2">Start Date</label>
//             <input
//               type="date"
//               value={inventoryReport.dateRange.startDate}
//               onChange={(e) => handleInputChange('inventoryReport', 'dateRange', { ...inventoryReport.dateRange, startDate: e.target.value })}
//               className="border rounded p-2 w-full"
//             />
//           </div> */}
//           {/* Other fields for Inventory Report */}
//           {/* Add similar fields for Inventory Report */}
//           <div className="mb-8">
//         <h3 className="text-xl font-semibold mb-4">Inventory Report</h3>
//          <div className="grid grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Start Date</label>
//              <input
//               type="date"
//               value={inventoryReport.dateRange.startDate}
//               onChange={(e) =>
//                 handleInputChange('inventoryReport', 'dateRange', {
//                   ...inventoryReport.dateRange,
//                   startDate: e.target.value,
//                 })
//               }
//               className="mt-1 p-2 w-full border rounded-md"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">End Date</label>
//             <input
//               type="date"
//               value={inventoryReport.dateRange.endDate}
//               onChange={(e) =>
//                 handleInputChange('inventoryReport', 'dateRange', {
//                   ...inventoryReport.dateRange,
//                   endDate: e.target.value,
//                 })
//               }
//               className="mt-1 p-2 w-full border rounded-md"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Product Category</label>
//             <select
//               value={inventoryReport.productCategory}
//               onChange={(e) => handleInputChange('inventoryReport', 'productCategory', e.target.value)}
//               className="mt-1 p-2 w-full border rounded-md"
//             >
//               <option value="">Select Category</option>
//               {['Kitchen', 'Wardrobe', 'Both'].map((option, i) => (
//                 <option key={i} value={option}>
//                   {option}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Stock Level Threshold</label>
//             <input
//               type="number"
//               value={inventoryReport.stockLevelThreshold}
//               onChange={(e) => handleInputChange('inventoryReport', 'stockLevelThreshold', e.target.value)}
//               className="mt-1 p-2 w-full border rounded-md"
//             />
//           </div>
//           <div className="col-span-2">
//             <label className="flex items-center">
//               <input
//                 type="checkbox"
//                 checked={inventoryReport.showOutOfStockItems}
//                 onChange={(e) => handleInputChange('inventoryReport', 'showOutOfStockItems', e.target.checked)}
//                 className="form-checkbox h-4 w-4"
//               />
//               <span className="ml-2 text-sm font-medium text-gray-700">Show Out of Stock Items</span>
//             </label>
//           </div>
//           <div className="col-span-2">
//             <label className="flex items-center">
//               <input
//                 type="checkbox"
//                 checked={inventoryReport.showSlowMovingItems}
//                 onChange={(e) => handleInputChange('inventoryReport', 'showSlowMovingItems', e.target.checked)}
//                 className="form-checkbox h-4 w-4"
//               />
//               <span className="ml-2 text-sm font-medium text-gray-700">Show Slow-Moving Items</span>
//             </label>
//           </div>
//           <div className="col-span-2">
//             <label className="flex items-center">
//               <input
//                 type="checkbox"
//                 checked={inventoryReport.generateReorderRecommendations}
//                 onChange={(e) => handleInputChange('inventoryReport', 'generateReorderRecommendations', e.target.checked)}
//                 className="form-checkbox h-4 w-4"
//               />
//               <span className="ml-2 text-sm font-medium text-gray-700">Generate Reorder Recommendations</span>
//             </label>
//           </div>
//           <div className="col-span-2">
//             <button
//               onClick={() => handleSubmit('inventoryReport')}
//               className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//             >
//               Generate Report
//             </button>
//           </div>
//         </div>
//       </div>
//         </>
//       )}

//       {activeTab === 'customerFeedbackReport' && (
//         <>
//           {/* Customer Feedback Report Fields */}
//           {/* <div>
//             <label className="block mb-2">Start Date</label>
//             <input
//               type="date"
//               value={customerFeedbackReport.dateRange.startDate}
//               onChange={(e) => handleInputChange('customerFeedbackReport', 'dateRange', { ...customerFeedbackReport.dateRange, startDate: e.target.value })}
//               className="border rounded p-2 w-full"
//             />
//           </div> */}
//           {/* Other fields for Customer Feedback Report */}
//           {/* Add similar fields for Customer Feedback Report */}
//           <div className="mb-8">
//          <h3 className="text-xl font-semibold mb-4">Customer Feedback Report</h3>
//         <div className="grid grid-cols-2 gap-6">
//           <div>
//              <label className="block text-sm font-medium text-gray-700">Start Date</label>
//             <input
//               type="date"
//               value={customerFeedbackReport.dateRange.startDate}
//               onChange={(e) =>
//                 handleInputChange('customerFeedbackReport', 'dateRange', {
//                   ...customerFeedbackReport.dateRange,
//                   startDate: e.target.value,
//                 })
//               }
//               className="mt-1 p-2 w-full border rounded-md"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">End Date</label>
//             <input
//               type="date"
//               value={customerFeedbackReport.dateRange.endDate}
//               onChange={(e) =>
//                 handleInputChange('customerFeedbackReport', 'dateRange', {
//                   ...customerFeedbackReport.dateRange,
//                   endDate: e.target.value,
//                 })
//               }
//               className="mt-1 p-2 w-full border rounded-md"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Product Category</label>
//             <select
//               value={customerFeedbackReport.productCategory}
//               onChange={(e) => handleInputChange('customerFeedbackReport', 'productCategory', e.target.value)}
//               className="mt-1 p-2 w-full border rounded-md"
//             >
//               <option value="">Select Category</option>
//               {['Kitchen', 'Wardrobe', 'Both'].map((option, i) => (
//                 <option key={i} value={option}>
//                   {option}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Feedback Type</label>
//             <select
//               value={customerFeedbackReport.feedbackType}
//               onChange={(e) => handleInputChange('customerFeedbackReport', 'feedbackType', e.target.value)}
//               className="mt-1 p-2 w-full border rounded-md"
//             >
//               <option value="">Select Feedback Type</option>
//               {['Positive', 'Negative', 'Neutral'].map((option, i) => (
//                 <option key={i} value={option}>
//                   {option}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Filter by NPS Score</label>
//             <input
//               type="number"
//               value={customerFeedbackReport.filterByNpsScore}
//               onChange={(e) => handleInputChange('customerFeedbackReport', 'filterByNpsScore', e.target.value)}
//               className="mt-1 p-2 w-full border rounded-md"
//             />
//           </div>
//           <div className="col-span-2">
//             <label className="flex items-center">
//               <input
//                 type="checkbox"
//                 checked={customerFeedbackReport.includeCustomerComments}
//                 onChange={(e) => handleInputChange('customerFeedbackReport', 'includeCustomerComments', e.target.checked)}
//                 className="form-checkbox h-4 w-4"
//               />
//               <span className="ml-2 text-sm font-medium text-gray-700">Include Customer Comments</span>
//             </label>
//           </div>
//           <div className="col-span-2">
//             <button
//               onClick={() => handleSubmit('customerFeedbackReport')}
//               className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//             >
//               Generate Report
//             </button>
//           </div>
//         </div>
//       </div>

//         </>
//       )}

//       {/* Submit Button */}
//       {/* <div className="mt-4">
//         <button
//           onClick={() => handleSubmit(activeTab)}
//           className="bg-blue-500 text-white px-4 py-2 rounded-md"
//         >
//           Generate Report
//         </button>
//       </div> */}

//       {/* Generated Report Display */}
//       {generatedReport && (
//         <div className="mt-6">
//           <h3 className="text-xl font-semibold mb-4">
//             Generated {generatedReport.reportType.replace(/([a-z])([A-Z])/g, '$1 $2')} Report
//           </h3>
//           {renderTable(generatedReport.reportType, generatedReport.data)}
//           <div className="mt-4">
//             <button
//               onClick={() => exportToExcel(generatedReport.reportType, generatedReport.data)}
//               className="mr-4 px-4 py-2 bg-green-500 text-white rounded-md"
//             >
//               Export to Excel
//             </button>
//             <button
//               onClick={() => exportToPDF(generatedReport.reportType, generatedReport.data)}
//               className="px-4 py-2 bg-red-500 text-white rounded-md"
//             >
//               Export to PDF
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ReportGenerator;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import * as XLSX from 'xlsx';
// import { jsPDF } from 'jspdf';

// function ReportGenerator() {
//   const [activeTab, setActiveTab] = useState('salesReport');
//   const navigate = useNavigate();

//   const [salesReport, setSalesReport] = useState({
//     dateRange: { startDate: '', endDate: '' },
//     productCategory: '',
//     store: '',  // Added store field
//   });

//   const [generatedReport, setGeneratedReport] = useState(null);

//   const handleInputChange = (field, value) => {
//     setSalesReport({ ...salesReport, [field]: value });
//   };

//   const handleSubmit = () => {
//     setGeneratedReport({ reportType: 'salesReport', data: salesReport });
//   };

//   const exportToExcel = (reportType, data) => {
//     const dataArray = Array.isArray(data) ? data : [data];
//     const ws = XLSX.utils.json_to_sheet(dataArray);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, `${reportType} Report`);
//     XLSX.writeFile(wb, `${reportType}_report.xlsx`);
//   };

//   const exportToPDF = (reportType, data) => {
//     const dataArray = Array.isArray(data) ? data : [data];
//     const doc = new jsPDF();
//     doc.setFontSize(12);

//     doc.text(`${reportType.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} Report`, 10, 10);

//     let yOffset = 20;
//     dataArray.forEach((report, index) => {
//       if (yOffset > 270) { // Check if page is full
//         doc.addPage();
//         yOffset = 10;
//       }
//       doc.text(`${index + 1}. ${JSON.stringify(report)}`, 10, yOffset);
//       yOffset += 10;
//     });

//     doc.save(`${reportType}_report.pdf`);
//   };

//   const renderTable = (data) => {
//     return (
//       <table className="min-w-full bg-white border border-gray-200 rounded-md">
//         <thead>
//           <tr>
//             <th className="border px-4 py-2">Field</th>
//             <th className="border px-4 py-2">Value</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td className="border px-4 py-2">Start Date</td>
//             <td className="border px-4 py-2">{data.dateRange.startDate}</td>
//           </tr>
//           <tr>
//             <td className="border px-4 py-2">End Date</td>
//             <td className="border px-4 py-2">{data.dateRange.endDate}</td>
//           </tr>
//           <tr>
//             <td className="border px-4 py-2">Product Category</td>
//             <td className="border px-4 py-2">{data.productCategory}</td>
//           </tr>
//           <tr>
//             <td className="border px-4 py-2">Store</td>
//             <td className="border px-4 py-2">{data.store}</td>
//           </tr>
//         </tbody>
//       </table>
//     );
//   };

//   return (
//     <div className="px-4 sm:px-6 lg:px-8 pt-4 ml-10 lg:ml-80 w-auto p-6 bg-white shadow-lg rounded-lg mt-10 mx-10 mb-10">
//       <h2 className="text-2xl font-bold mb-4">Report Generator</h2>

//       <div className="flex space-x-4 mb-6">
//         <button
//           onClick={() => setActiveTab('salesReport')}
//           className={`px-4 py-2 rounded-md ${activeTab === 'salesReport' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
//         >
//           Sales Report
//         </button>
//       </div>

//       {activeTab === 'salesReport' && (
//         <>
//           <div className="mb-8">
//             <h3 className="text-xl font-semibold mb-4">Sales Report</h3>
//             <div className="grid grid-cols-1 gap-6">
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Start Date</label>
//                   <input
//                     type="date"
//                     value={salesReport.dateRange.startDate}
//                     onChange={(e) => handleInputChange('dateRange', { ...salesReport.dateRange, startDate: e.target.value })}
//                     className="mt-1 p-2 w-full border rounded-md"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">End Date</label>
//                   <input
//                     type="date"
//                     value={salesReport.dateRange.endDate}
//                     onChange={(e) => handleInputChange('dateRange', { ...salesReport.dateRange, endDate: e.target.value })}
//                     className="mt-1 p-2 w-full border rounded-md"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Product Category</label>
//                   <select
//                     value={salesReport.productCategory}
//                     onChange={(e) => handleInputChange('productCategory', e.target.value)}
//                     className="mt-1 p-2 w-full border rounded-md"
//                   >
//                     <option value="">Select Category</option>
//                     {['Kitchen', 'Wardrobe', 'Both'].map((option, i) => (
//                       <option key={i} value={option}>
//                         {option}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Store</label>
//                   <select
//                     value={salesReport.store}
//                     onChange={(e) => handleInputChange('store', e.target.value)}
//                     className="mt-1 p-2 w-full border rounded-md"
//                   >
//                     <option value="">Select Store</option>
//                     {['Store 1', 'Store 2', 'Store 3'].map((option, i) => (
//                       <option key={i} value={option}>
//                         {option}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="flex space-x-4">
//             <button
//               onClick={handleSubmit}
//               className="bg-blue-500 text-white px-4 py-2 rounded-md"
//             >
//               Generate Report
//             </button>
//             {generatedReport && (
//               <>
//                 <button
//                   onClick={() => exportToExcel('salesReport', generatedReport.data)}
//                   className="bg-green-500 text-white px-4 py-2 rounded-md"
//                 >
//                   Export to Excel
//                 </button>
//                 <button
//                   onClick={() => exportToPDF('salesReport', generatedReport.data)}
//                   className="bg-red-500 text-white px-4 py-2 rounded-md"
//                 >
//                   Export to PDF
//                 </button>
//               </>
//             )}
//           </div>

//           {generatedReport && renderTable(generatedReport.data)}
//         </>
//       )}
//     </div>
//   );
// }

// export default ReportGenerator;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';

function ReportGenerator() {
  const [activeTab, setActiveTab] = useState('salesReport');
  const navigate = useNavigate();

  const [salesReport, setSalesReport] = useState({
    dateRange: { startDate: '', endDate: '' },
    productCategory: '',
    store: '', // Added store field
  });

  const [paymentReport, setPaymentReport] = useState({
    dateRange: { startDate: '', endDate: '' },
    productCategory: '',
    store: '',
  });

  const [returnReport, setReturnReport] = useState({
    dateRange: { startDate: '', endDate: '' },
    productCategory: '',
    store: '',
  });

  const [customerFeedback, setCustomerFeedback] = useState({
    dateRange: { startDate: '', endDate: '' },
    productCategory: '',
    store: '',
  });

  const [generatedReport, setGeneratedReport] = useState(null);

  const handleInputChange = (reportType, field, value) => {
    if (reportType === 'salesReport') {
      setSalesReport({ ...salesReport, [field]: value });
    } else if (reportType === 'paymentReport') {
      setPaymentReport({ ...paymentReport, [field]: value });
    } else if (reportType === 'returnReport') {
      setReturnReport({ ...returnReport, [field]: value });
    } else if (reportType === 'customerFeedback') {
      setCustomerFeedback({ ...customerFeedback, [field]: value });
    }
  };

  const handleSubmit = (reportType) => {
    if (reportType === 'salesReport') {
      setGeneratedReport({ reportType: 'salesReport', data: salesReport });
    } else if (reportType === 'paymentReport') {
      setGeneratedReport({ reportType: 'paymentReport', data: paymentReport });
    } else if (reportType === 'returnReport') {
      setGeneratedReport({ reportType: 'returnReport', data: returnReport });
    } else if (reportType === 'customerFeedback') {
      setGeneratedReport({ reportType: 'customerFeedback', data: customerFeedback });
    }
  };

  const exportToExcel = (reportType, data) => {
    const dataArray = Array.isArray(data) ? data : [data];
    const ws = XLSX.utils.json_to_sheet(dataArray);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, `${reportType} Report`);
    XLSX.writeFile(wb, `${reportType}_report.xlsx`);
  };

  const exportToPDF = (reportType, data) => {
    const dataArray = Array.isArray(data) ? data : [data];
    const doc = new jsPDF();
    doc.setFontSize(12);

    doc.text(`${reportType.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} Report`, 10, 10);

    let yOffset = 20;
    dataArray.forEach((report, index) => {
      if (yOffset > 270) { // Check if page is full
        doc.addPage();
        yOffset = 10;
      }
      doc.text(`${index + 1}. ${JSON.stringify(report)}`, 10, yOffset);
      yOffset += 10;
    });

    doc.save(`${reportType}_report.pdf`);
  };

  const renderTable = (data) => {
    return (
      <table className="min-w-full bg-white border border-gray-200 rounded-md mt-6">
        <thead>
          <tr>
            <th className="border px-4 py-2">Field</th>
            <th className="border px-4 py-2">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2">Start Date</td>
            <td className="border px-4 py-2">{data.dateRange.startDate}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">End Date</td>
            <td className="border px-4 py-2">{data.dateRange.endDate}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Product Category</td>
            <td className="border px-4 py-2">{data.productCategory}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Store</td>
            <td className="border px-4 py-2">{data.store}</td>
          </tr>
        </tbody>
      </table>
    );
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-4 ml-10 lg:ml-80 w-auto p-6 bg-white shadow-lg rounded-lg mt-10 mx-10 mb-10">
      <h2 className="text-2xl font-bold mb-4">Report Generator</h2>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('salesReport')}
          className={`px-4 py-2 rounded-md ${activeTab === 'salesReport' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Sales Report
        </button>
        <button
          onClick={() => setActiveTab('paymentReport')}
          className={`px-4 py-2 rounded-md ${activeTab === 'paymentReport' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Payment Report
        </button>
        <button
          onClick={() => setActiveTab('returnReport')}
          className={`px-4 py-2 rounded-md ${activeTab === 'returnReport' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Return Report
        </button>
        <button
          onClick={() => setActiveTab('customerFeedback')}
          className={`px-4 py-2 rounded-md ${activeTab === 'customerFeedback' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Customer Feedback
        </button>
      </div>

      {activeTab === 'salesReport' && (
        <>
          <div className="mb-8 ml-40">
            <h3 className="text-xl font-semibold mb-4">Sales Report</h3>
            <div className="grid grid-cols-1 gap-6">
              <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                <div className='flex gap-40'>
                  <label className="text-xs mt-2 font-medium text-gray-700">Start Date:</label>
                  <input
                    type="date"
                    value={salesReport.dateRange.startDate}
                    onChange={(e) => handleInputChange('salesReport', 'dateRange', { ...salesReport.dateRange, startDate: e.target.value })}
                    className="mt-1 p-1 w-1/3 border rounded-md"
                  />
                </div>
                <div className='flex gap-40'>
                  <label className="mt-2 text-xs font-medium text-gray-700">End Date</label>
                  <input
                    type="date"
                    value={salesReport.dateRange.endDate}
                    onChange={(e) => handleInputChange('salesReport', 'dateRange', { ...salesReport.dateRange, endDate: e.target.value })}
                    className="mt-1 p-1 w-1/3 border rounded-md"
                  />
                </div>
                <div className='flex gap-28'>
                  <label className="mt-2 text-xs font-medium text-gray-700">Product Category</label>
                  <select
                    value={salesReport.productCategory}
                    onChange={(e) => handleInputChange('salesReport', 'productCategory', e.target.value)}
                    className="mt-1 p-1 w-1/3 border rounded-md"
                  >
                    <option value="">Select Category</option>
                    {['Kitchen', 'Wardrobe', 'Both'].map((option, i) => (
                      <option key={i} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='flex gap-44'>
                  <label className="mt-2 text-xs font-medium text-gray-700">Store</label>
                  <select
                    value={salesReport.store}
                    onChange={(e) => handleInputChange('salesReport', 'store', e.target.value)}
                    className="mt-1 p-1 w-1/3 border rounded-md"
                  >
                    <option value="">Select Store</option>
                    {['HSR layout Imly store', 'JP nagar Imly store ', 'Jayanagar Imly store '].map((option, i) => (
                      <option key={i} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => handleSubmit('salesReport')}
              className="bg-custom-blue text-white px-4 py-2 rounded-md"
            >
              Generate Report
            </button>
            {generatedReport && generatedReport.reportType === 'salesReport' && (
              <>
                <button
                  onClick={() => exportToExcel('salesReport', generatedReport.data)}
                  className="bg-custom-blue text-white px-4 py-2 rounded-md"
                >
                  Export to Excel
                </button>
                <button
                  onClick={() => exportToPDF('salesReport', generatedReport.data)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  Export to PDF
                </button>
              </>
            )}
          </div>

          {generatedReport && generatedReport.reportType === 'salesReport' && renderTable(generatedReport.data)}
        </>
      )}

      {activeTab === 'paymentReport' && (
        <>
          <div className="mb-8 ml-40">
            <h3 className="text-xl font-semibold mb-4">Payment Report</h3>
            <div className="grid grid-cols-1 gap-6">
              <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                <div className='flex gap-40'>
                  <label className="mt-2 text-xs font-medium text-gray-700">Start Date</label>
                  <input
                    type="date"
                    value={paymentReport.dateRange.startDate}
                    onChange={(e) => handleInputChange('paymentReport', 'dateRange', { ...paymentReport.dateRange, startDate: e.target.value })}
                    className="mt-1 p-1 w-1/3 border rounded-md"
                  />
                </div>
                <div className='flex gap-40'>
                  <label className="block text-xs font-medium text-gray-700">End Date</label>
                  <input
                    type="date"
                    value={paymentReport.dateRange.endDate}
                    onChange={(e) => handleInputChange('paymentReport', 'dateRange', { ...paymentReport.dateRange, endDate: e.target.value })}
                    className="mt p-1 w-1/3 border rounded-md"
                  />
                </div>
                <div className='flex gap-28'>
                  <label className="mt-2 text-xs font-medium text-gray-700">Product Category</label>
                  <select
                    value={paymentReport.productCategory}
                    onChange={(e) => handleInputChange('paymentReport', 'productCategory', e.target.value)}
                    className="mt-1 p-1 w-1/3 border rounded-md"
                  >
                    <option value="">Select Category</option>
                    {['Kitchen', 'Wardrobe', 'Both'].map((option, i) => (
                      <option key={i} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='flex gap-44'>
                  <label className="mt-2 text-xs font-medium text-gray-700">Store</label>
                  <select
                    value={paymentReport.store}
                    onChange={(e) => handleInputChange('paymentReport', 'store', e.target.value)}
                    className="mt-1 p-1 w-1/3 border rounded-md"
                  >
                    <option value="">Select Store</option>
                    {['HSR layout Imly store', 'JP nagar Imly store ', 'Jayanagar Imly store '].map((option, i) => (
                      <option key={i} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => handleSubmit('paymentReport')}
              className="bg-custom-blue text-white px-4 py-2 rounded-md"
            >
              Generate Report
            </button>
            {generatedReport && generatedReport.reportType === 'paymentReport' && (
              <>
                <button
                  onClick={() => exportToExcel('paymentReport', generatedReport.data)}
                  className="bg-custom-blue text-white px-4 py-2 rounded-md"
                >
                  Export to Excel
                </button>
                <button
                  onClick={() => exportToPDF('paymentReport', generatedReport.data)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  Export to PDF
                </button>
              </>
            )}
          </div>

          {generatedReport && generatedReport.reportType === 'paymentReport' && renderTable(generatedReport.data)}
        </>
      )}

      {activeTab === 'returnReport' && (
        <>
          <div className="mb-8 ml-40">
            <h3 className="text-xl font-semibold mb-4">Return Report</h3>
            <div className="grid grid-cols-1 gap-6">
              <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                <div className='flex gap-40'>
                  <label className="mt-2 text-xs font-medium text-gray-700">Start Date</label>
                  <input
                    type="date"
                    value={returnReport.dateRange.startDate}
                    onChange={(e) => handleInputChange('returnReport', 'dateRange', { ...returnReport.dateRange, startDate: e.target.value })}
                    className="mt-1 p-1 w-1/3 border rounded-md"
                  />
                </div>
                <div className='flex gap-40'>
                  <label className="mt-2 text-xs font-medium text-gray-700">End Date</label>
                  <input
                    type="date"
                    value={returnReport.dateRange.endDate}
                    onChange={(e) => handleInputChange('returnReport', 'dateRange', { ...returnReport.dateRange, endDate: e.target.value })}
                    className="mt-1 p-1 w-1/3 border rounded-md"
                  />
                </div>
                <div className='flex gap-28'>
                  <label className="mt-2 text-xs font-medium text-gray-700">Product Category</label>
                  <select
                    value={returnReport.productCategory}
                    onChange={(e) => handleInputChange('returnReport', 'productCategory', e.target.value)}
                    className="mt-1 p-1 w-1/3 border rounded-md"
                  >
                    <option value="">Select Category</option>
                    {['Kitchen', 'Wardrobe', 'Both'].map((option, i) => (
                      <option key={i} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='flex gap-44'>
                  <label className="mt-2 text-xs font-medium text-gray-700">Store</label>
                  <select
                    value={returnReport.store}
                    onChange={(e) => handleInputChange('returnReport', 'store', e.target.value)}
                    className="mt-1 p-1 w-1/3 border rounded-md"
                  >
                    <option value="">Select Store</option>
                    {['Store 1', 'Store 2', 'Store 3'].map((option, i) => (
                      <option key={i} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => handleSubmit('returnReport')}
              className="bg-custom-blue text-white px-4 py-2 rounded-md"
            >
              Generate Report
            </button>
            {generatedReport && generatedReport.reportType === 'returnReport' && (
              <>
                <button
                  onClick={() => exportToExcel('returnReport', generatedReport.data)}
                  className="bg-custom-blue text-white px-4 py-2 rounded-md"
                >
                  Export to Excel
                </button>
                <button
                  onClick={() => exportToPDF('returnReport', generatedReport.data)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  Export to PDF
                </button>
              </>
            )}
          </div>

          {generatedReport && generatedReport.reportType === 'returnReport' && renderTable(generatedReport.data)}
        </>
      )}

      {activeTab === 'customerFeedback' && (
        <>
          <div className="mb-8 ml-40">
            <h3 className="text-xl font-semibold mb-4">Customer Feedback</h3>
            <div className="grid grid-cols-1 gap-6">
              <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                <div className='flex gap-40'>
                  <label className="mt-2 text-xs font-medium text-gray-700">Start Date</label>
                  <input
                    type="date"
                    value={customerFeedback.dateRange.startDate}
                    onChange={(e) => handleInputChange('customerFeedback', 'dateRange', { ...customerFeedback.dateRange, startDate: e.target.value })}
                    className="mt-1 p-1 w-1/3 border rounded-md"
                  />
                </div>
                <div className='flex gap-40'>
                  <label className="mt-2 text-xs font-medium text-gray-700">End Date</label>
                  <input
                    type="date"
                    value={customerFeedback.dateRange.endDate}
                    onChange={(e) => handleInputChange('customerFeedback', 'dateRange', { ...customerFeedback.dateRange, endDate: e.target.value })}
                    className="mt-1 p-1 w-1/3 border rounded-md"
                  />
                </div>
                <div className='flex gap-28'>
                  <label className="block text-xs font-medium text-gray-700">Product Category</label>
                  <select
                    value={customerFeedback.productCategory}
                    onChange={(e) => handleInputChange('customerFeedback', 'productCategory', e.target.value)}
                    className="mt-1 p-1 w-1/3 border rounded-md"
                  >
                    <option value="">Select Category</option>
                    {['Kitchen', 'Wardrobe', 'Both'].map((option, i) => (
                      <option key={i} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='flex gap-44'>
                  <label className="block text-xs font-medium text-gray-700">Store</label>
                  <select
                    value={customerFeedback.store}
                    onChange={(e) => handleInputChange('customerFeedback', 'store', e.target.value)}
                    className="mt-1 p-1 w-1/3 border rounded-md"
                  >
                    <option value="">Select Store</option>
                    {['HSR layout Imly store', 'JP nagar Imly store ', 'Jayanagar Imly store '].map((option, i) => (
                      <option key={i} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => handleSubmit('customerFeedback')}
              className="bg-custom-blue text-white px-4 py-2 rounded-md"
            >
              Generate Report
            </button>
            {generatedReport && generatedReport.reportType === 'customerFeedback' && (
              <>
                <button
                  onClick={() => exportToExcel('customerFeedback', generatedReport.data)}
                  className="bg-custom-blue text-white px-4 py-2 rounded-md"
                >
                  Export to Excel
                </button>
                <button
                  onClick={() => exportToPDF('customerFeedback', generatedReport.data)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  Export to PDF
                </button>
              </>
            )}
          </div>

          {generatedReport && generatedReport.reportType === 'customerFeedback' && renderTable(generatedReport.data)}
        </>
      )}
    </div>
  );
}

export default ReportGenerator;
