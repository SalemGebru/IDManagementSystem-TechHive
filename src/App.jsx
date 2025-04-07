import { useState,useEffect } from 'react'
import { Route,Routes } from 'react-router'
import Signin from './pages/SignIn'
import EmployeeDashboard from './pages/EmployeeDashboard'
import Profile from './pages/profile'
import Notices from './pages/Notices'
import UserManagement from './pages/UserManagement'
import EmployeeManagement from './pages/EmployeeManagement'
import IdManagement from './pages/IdManagement'
import TemplateSettings from './pages/TemplateSettings'


import './i18n';
import './App.css'

function App() {
  useEffect(() => {
    const user = {
      email: 'employee@example.com',
      password: 'employee123',
      name:'Clandestine Miles',
      role:'Customer service',
      id:'Emp/0000'
    };
    localStorage.setItem('user', JSON.stringify(user)); 
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Signin/>}/>
        <Route path="/employee/dashboard" element={<EmployeeDashboard/>}/>
        <Route path="/employee/profile" element={<Profile/>}/>
        <Route path="/employee/notifications" element={<Notices/>}/>
        <Route path="/usermanagement" element={<UserManagement/>}/>
        <Route path="/employeemanagement" element={<EmployeeManagement/>}/>
        <Route path="/idmanagement" element={<IdManagement/>}/>
        <Route path="/templatesettings" element={<TemplateSettings/>}/>
      </Routes>
    </>
  )
}

export default App
