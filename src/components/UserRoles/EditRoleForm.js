import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const EditRoleForm = () => {
  const location = useLocation();
  const { roleId,roleName } = location.state || {};
//   const { roleId} = location.state || {};
  const [updatedRoleName, setUpdatedRoleName]=useState(roleName);
  const [permissionsByModule, setPermissionsByModule] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);




  

  const fetchPermissionsUrl = `https://imly-b2y.onrender.com/api/permissions/getAllPermissionsByRoleId/${roleId}`; 
  const updateRoleUrl = `https://imly-b2y.onrender.com/api/roles/${roleId}/updatePermissions`; 

  
  

  useEffect(() => {
    const fetchRolePermissions = async () => {
      try {
        const response = await axios.get(fetchPermissionsUrl);
        const data = response.data;

        const categorizedPermissions = {};

        if (data && Array.isArray(data)) {
          data.forEach((permission) => {
            const module = permission.PermissionName.split(" ")[1]; 
            if (!categorizedPermissions[module]) {
              categorizedPermissions[module] = [];
            }
            categorizedPermissions[module].push({
              ID: permission.PermissionId,
              Name: permission.PermissionName,
              IsChecked: permission.IsChecked,
            });
          });
        }

        setPermissionsByModule(categorizedPermissions);
      } catch (err) {
        setError("Failed to fetch role permissions");
      } finally {
        setLoading(false);
      }
    };

    fetchRolePermissions();
  }, [roleId]);

  // Handle checkbox state change for each permission
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

  // Handle "Select All" change for each module
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

  // Handle form submission
  const handleSubmit = async () => {
    const updatedPermissions = [];

    Object.keys(permissionsByModule).forEach((moduleName) => {
      permissionsByModule[moduleName].forEach((permission) => {
        updatedPermissions.push({
          PermissionId: permission.ID,
          IsChecked: permission.IsChecked,
        });
      });
    });

    try {
      await axios.post(updateRoleUrl, {
        roleName,
        permissions: updatedPermissions,
      });
      alert("Role updated successfully");
    } catch (error) {
      console.error("Failed to update role permissions:", error);
      alert("Error updating role");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-4 ml-10 lg:ml-72 w-auto">
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-6">Edit Role</h2>

        {/* Role Name Section */}
        <hr className="border-gray-300 my-4 mt-6" />
        <div className="mb-4 flex justify-center items-center">
          <label className="block font-semibold mr-2">Role Name</label>
          <input
            type="text"
            value={roleName}
            onChange={(e) => setUpdatedRoleName(e.target.value)}
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
              <div
                key={moduleName}
                className="border p-4 rounded-lg shadow bg-[#e5efff]"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-bold">{moduleName}</h2>

                  <label className="text-sm">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      onChange={(e) =>
                        handleSelectAllChange(moduleName, e.target.checked)
                      }
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
                        onChange={() =>
                          handleCheckboxChange(moduleName, permission.ID)
                        }
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
          <button className="bg-gray-200 px-4 py-2 rounded shadow">
            Close
          </button>
          <button
            className="bg-[#003375] text-white px-4 py-2 rounded shadow"
            onClick={handleSubmit}
          >
            Update Role
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditRoleForm;
