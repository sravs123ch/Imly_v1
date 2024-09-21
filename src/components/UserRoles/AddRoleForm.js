import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // For redirection

const AddRoleForm = () => {
  const [roleName, setRoleName] = useState("");
  const [permissionsByModule, setPermissionsByModule] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saveStatus, setSaveStatus] = useState(""); // To display save status messages

  const fetchPermissionsUrl = "https://imly-b2y.onrender.com/api/permissions/getAllPermissions";
  const createOrUpdateRoleUrl = "https://imly-b2y.onrender.com/api/permissions/createOrUpdateRolePermissions";

  const navigate = useNavigate(); // For redirection

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const response = await axios.get(fetchPermissionsUrl);
        const data = response.data;

        const categorizedPermissions = {};

        if (data.Permissions && Array.isArray(data.Permissions)) {
          data.Permissions.forEach((permission) => {
            if (!categorizedPermissions[permission.Module]) {
              categorizedPermissions[permission.Module] = [];
            }
            categorizedPermissions[permission.Module].push(permission);
          });
        }

        setPermissionsByModule(categorizedPermissions);
      } catch (err) {
        setError("Failed to fetch permissions");
      } finally {
        setLoading(false);
      }
    };

    fetchPermissions();
  }, []);

  // Toggle individual checkbox state
  const handleCheckboxChange = (moduleName, permissionId) => {
    setPermissionsByModule((prevState) => {
      const updatedPermissions = { ...prevState };
      updatedPermissions[moduleName] = updatedPermissions[moduleName].map(
        (permission) =>
          permission.ID === permissionId
            ? { ...permission, IsChecked: !permission.IsChecked }
            : permission
      );

      return updatedPermissions;
    });
  };

  // Toggle "Select All" functionality for a specific module
  const handleSelectAllChange = (moduleName, isChecked) => {
    setPermissionsByModule((prevState) => {
      const updatedPermissions = { ...prevState };
      updatedPermissions[moduleName] = updatedPermissions[moduleName].map(
        (permission) => ({
          ...permission,
          IsChecked: isChecked,
        })
      );
      return updatedPermissions;
    });
  };

  // Handle saving the role
  const handleSaveRole = async () => {
    const permissions = [];

    Object.keys(permissionsByModule).forEach((module) => {
      permissionsByModule[module].forEach((permission) => {
        permissions.push({
          permissionId: permission.ID,
          isChecked: permission.IsChecked,
        });
      });
    });

    const roleData = {
      roleId: 0, // Adjust roleId based on your use case
      roleName: roleName,
      storeId: 1, // Change this if you have dynamic store ID
      permissions: permissions,
    };

    try {
      const response = await axios.post(createOrUpdateRoleUrl, roleData);
      setSaveStatus("Role saved successfully!");

      
      setTimeout(() => {
        navigate("/userrole"); 
      }, 1500); 
    } catch (error) {
      console.error("Error saving role:", error);
      setSaveStatus("Error saving role. Please try again.");
    }
  };

  
  const handleClose = () => {
    navigate("/userrole"); 
  };

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-4 ml-10 lg:ml-72 w-auto">
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-6">Add Role</h2>

        {/* Role Name Section */}
        <hr className="border-gray-300 my-4 mt-6" />
        <div className="mb-4 flex justify-center items-center">
          <label className="block font-semibold mr-2">Role Name</label>
          <input
            type="text"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            className="border border-gray-300 p-2 w-1/2 rounded-md"
          />
        </div>
        <hr className="border-gray-300 my-4 mb-6" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.keys(permissionsByModule).map((moduleName) => {
            
            
            const isAllSelected = permissionsByModule[moduleName].every(
              (permission) => permission.IsChecked
            );

            return (
              <div key={moduleName} className="border p-4 rounded-lg shadow bg-[#e5efff]">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-bold">{moduleName}</h2>

                  <label className="text-sm">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      onChange={(e) => handleSelectAllChange(moduleName, e.target.checked)}
                      className="mr-2 form-checkbox h-[12px] w-[12px] text-blue-600"
                    />
                    Select All
                  </label>
                </div>
                <hr className="border-gray-300 my-4 mt-2 mb-4" />

                {permissionsByModule[moduleName].map((permission) => (
                  <div key={permission.ID} className="flex items-center mb-2">
                    <label>
                      <input
                        type="checkbox"
                        checked={permission.IsChecked}
                        onChange={() => handleCheckboxChange(moduleName, permission.ID)}
                        className="mr-2 form-checkbox h-[12px] w-[12px] text-blue-600"
                      />
                      {permission.Name}
                    </label>
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex justify-end space-x-4">
          {saveStatus && <div className="text-red-500">{saveStatus}</div>} {/* Display save status */}
          <button
            className="bg-gray-200 px-4 py-2 rounded shadow"
            onClick={handleClose} // Close button redirects to 'userrole'
          >
            Close
          </button>
          <button
            className="bg-[#003375] text-white px-4 py-2 rounded shadow"
            onClick={handleSaveRole}
          >
            Save Role
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRoleForm;
