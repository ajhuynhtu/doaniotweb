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
import ACControl from './pages/ACControl';
import Devices from './pages/Devices';
import Users from './pages/Users';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import VerifyCode from './pages/VerifyCode';
import Register from './pages/Register';
import OnboardingProfile from './pages/OnboardingProfile';
import EmptySpace from './pages/EmptySpace';
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
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-code" element={<VerifyCode />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}><h2>Forgot Password Page</h2></div>} />
        {/* Nếu không phải các route trên thì chuyển về login (mặc định cho user chưa đăng nhập) */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  // Nếu đã đăng nhập, hiển thị layout admin
  // Kiểm tra nếu là trang OnboardingProfile thì render riêng (không có Sidebar)
  if (location.pathname === '/onboarding-profile') {
    return (
      <Routes>
        <Route path="/onboarding-profile" element={<OnboardingProfile />} />
        <Route path="*" element={<Navigate to="/onboarding-profile" replace />} />
      </Routes>
    );
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <div className="page-content" style={{padding: 0}}> 
            <Routes>
              <Route path="/" element={<Navigate to="/onboarding-profile" replace />} />
              <Route path="/onboarding-profile" element={<Navigate to="/onboarding-profile" replace />} />
              <Route path="/empty-space" element={<EmptySpace />} />
              <Route path="/create-space" element={<CreateSpace />} />
              <Route path="/connect-devices" element={<ConnectDevices />} />
              <Route path="/link-device" element={<LinkDevice />} />
              <Route path="/confirm-choices" element={<ConfirmChoices />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/map-view" element={<MapView />} />
              <Route path="/room-detail" element={<RoomDetail />} />
              <Route path="/device-control" element={<DeviceControl />} />
              <Route path="/ac-control" element={<ACControl />} />
              <Route path="/devices" element={<Devices />} />
              <Route path="/users" element={<Users />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Logic Splash Screen: Hiện 5 giây rồi tắt
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
    }, 5000);

    // Logic Firebase Auth
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      clearTimeout(splashTimer);
      unsubscribe();
    };
  }, []);

  // Nếu đang trong 3 giây đầu tiên, hiển thị Welcome Page (Splash Screen)
  if (showSplash) {
    return <Welcome />;
  }

  return (
    <Router>
      <AppContent user={user} loading={loading} />
    </Router>
  );
}

export default App;
