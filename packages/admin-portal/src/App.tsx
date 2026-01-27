import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AdminLoginPage } from '@/pages/auth/AdminLoginPage';
import { AdminSignupPage } from '@/pages/auth/AdminSignupPage';
import { AdminTwoFAVerify } from '@/pages/auth/AdminTwoFAVerify';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { DashboardPage } from '@/pages/dashboard/DashboardPage';

function App() {
  // TODO: Add real auth state check
  // const isAuthenticated = false;

  return (
    <BrowserRouter>
      {/* Debug Indicator - Remove later */}
      <div className="fixed top-0 left-0 bg-yellow-500 text-black px-2 z-50 text-xs">Admin Portal App Mounted</div>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<AdminLoginPage />} />
        <Route path="/signup" element={<AdminSignupPage />} />
        <Route path="/verify-2fa" element={<AdminTwoFAVerify />} />

        {/* Protected Routes */}
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/users" element={<div className="text-slate-400">User Management Module</div>} />
          <Route path="/health" element={<div className="text-slate-400">System Health Module</div>} />
          <Route path="/audit" element={<div className="text-slate-400">Audit Logs Module</div>} />
          <Route path="/settings" element={<div className="text-slate-400">Settings Module</div>} />
        </Route>

        {/* Redirect root to login for now */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
