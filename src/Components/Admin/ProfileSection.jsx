import React, { useState } from "react";

function ProfileSection() {
  const[user,setUser]=useState(JSON.parse(localStorage.getItem("user")) || {})
  return (
    <div className="profile-section">
      <div className="profile-card">
          <h2 className="profile-name">{user.name}</h2>
          <p className="profile-email">{user.email}</p>
      </div>
    </div>
  );
}

export default ProfileSection;
