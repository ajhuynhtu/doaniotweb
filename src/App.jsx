import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

import Welcome from './pages/Welcome';
import CreateSpace from './pages/CreateSpace';
import ConnectDevices from './pages/ConnectDevices';
import LinkDevice from './pages/LinkDevice';
import ConfirmChoices from './pages/ConfirmChoices';
import Dashboard from './pages/Dashboard';
import MapView from './pages/MapView';
import RoomDetail from './pages/RoomDetail';
import DeviceControl from './pages/DeviceControl';
import Devices from './pages/Devices';
import Users from './pages/Users';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Analytics from './pages/Analytics';
import Sidebar from './components/Sidebar';
import './App.css';

function AppContent({ user, loading }) {
  const location = useLocation();

  if (loading) {
    return <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>Loading...</div>;
  }

  // Nếu chưa đăng nhập, chỉ cho phép vào các trang auth
  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}><h2>Forgot Password Page</h2></div>} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  // Nếu đã đăng nhập, hiển thị layout admin
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <div className="page-content" style={{padding: 0}}> 
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/create-space" element={<CreateSpace />} />
              <Route path="/connect-devices" element={<ConnectDevices />} />
              <Route path="/link-device" element={<LinkDevice />} />
              <Route path="/confirm-choices" element={<ConfirmChoices />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/map-view" element={<MapView />} />
              <Route path="/room-detail" element={<RoomDetail />} />
              <Route path="/device-control" element={<DeviceControl />} />
              <Route path="/devices" element={<Devices />} />
              <Route path="/users" element={<Users />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <AppContent user={user} loading={loading} />
    </Router>
  );
}

export default App;
