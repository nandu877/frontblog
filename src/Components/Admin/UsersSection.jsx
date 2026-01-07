import React, { useEffect, useState } from "react";
import { connectToAPI } from "../../Pages/apihandler";
import Loading from "../Loading";

function UsersSection() {
    const [users, setUsers] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [newRole, setNewRole] = useState("");
    const [isLoading, setIsLoading] = useState(false)

    const handleRoleSelect = (user, role) => {
        setSelectedUser(user);
        setNewRole(role);
        setShowModal(true);
    };

    const confirmChange = async () => {
        try {
           setIsLoading(true);
            const response = await connectToAPI(`api/admin/users/${selectedUser.id}/role?role=${newRole}`, "PUT")
            console.log(response)
            if (response.status == 200)
                fetchUsersData();
            closeModal();
        } catch (error) {

        }
        setTimeout(()=>{
            setIsLoading(false)
        },100)
       
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedUser(null);
        setNewRole("");
    };

    const fetchUsersData = async () => {
        try {
            setIsLoading(true);
            const response = await connectToAPI("api/admin/users");
            if (response.status === 200) {
                setUsers(response.data)
            }
        } catch (error) {

        }
        setTimeout(()=>{
            setIsLoading(false);
        },200)
       
    }

    useEffect(() => {
        fetchUsersData();
    }, []);

    return (
        <>
            <div className="users-con">
                {users.map((user) => (
                    <div className="user-card" key={user.id}>
                        <div className="user-info">
                            <p className="user-name">{user.name}</p>
                            <p className="user-email">{user.email}</p>
                        </div>

                        <select
                            value={user.role}
                            onChange={(e) => handleRoleSelect(user, e.target.value)}
                        >
                            <option value="AUTHOR">Author</option>
                            <option value="ADMIN">Admin</option>
                        </select>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Confirm Role Change</h3>
                        <p>
                            Change <b>{selectedUser?.name}</b>'s role to{" "}
                            <b>{newRole}</b>?
                        </p>

                        <div className="modal-actions">
                            <button className="btn cancel" onClick={closeModal}>
                                Cancel
                            </button>
                            <button className="btn confirm" onClick={confirmChange}>
                                Yes, Change
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {
                isLoading && <Loading/>
            }
        </>
    );
}

export default UsersSection;
