import Login from "./Components/Login";
import "./App.css"
import Register from "./Components/Register";
import { useContext, useEffect } from "react";
import { AuthContext } from "./Components/AuthContext";
import {Routes,Route, Navigate, useNavigate} from "react-router-dom"
import Home from "./Pages/Home";
import ProtectedRoute from "./Components/ProtectedRoute";
import Admin from "./Pages/Admin";
import Author from "./Pages/Author";
import PostsSection from "./Components/Admin/AdminPosts";
import AdminPosts from "./Components/Admin/AdminPosts";
import UsersSection from "./Components/Admin/UsersSection";
import ProfileSection from "./Components/Admin/ProfileSection";
import AuthorPosts from "./Components/Author/AuthorPosts";
import { Toaster } from "react-hot-toast";
import Loading from "./Components/Loading";

function App() {

  const { login, role, isLogin,loading } = useContext(AuthContext);


  if(loading) return <Loading/>

  return (
   <>
   <Toaster containerClassName="toast"  position="top-right" toastOptions={{duration:2000}}/>
   <Routes>
    <Route path="/" element={<Home/>}/>
    
      <>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Register/>}/>
      </>
    

    <Route element={<ProtectedRoute isLogin={isLogin} role={role} allowdRole={"ADMIN"}/>}>
    <Route path="/admin" element={<Admin/>}>
    <Route index element={<Navigate to="posts" replace />} />
            <Route path="posts" element={<AdminPosts/>} />
            <Route path="users" element={<UsersSection/>} />
            <Route path="profile" element={<ProfileSection/>} />
    </Route>
    </Route>
    <Route element={<ProtectedRoute isLogin={isLogin} role={role} allowdRole={"AUTHOR"}/>}>
    <Route path="/author" element={<Author/>}>
     <Route index element={<Navigate to="posts" replace />} />
            <Route path="posts" element={<AuthorPosts/>} />
            <Route path="profile" element={<ProfileSection/>} />
    </Route>
    </Route>
   </Routes>
   </>
  );
}

export default App;
