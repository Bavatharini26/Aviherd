import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import FarmerDashboard from './components/FarmerDashboard';
import VeterinarianDashboard from './components/VeterinarianDashboard';
import { User, AlertData, HealthRecord, Report } from './types';
import { mockAlerts, mockHealthRecords, mockReports } from './data/mockData';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [alerts, setAlerts] = useState<AlertData[]>([]);
  const [healthRecords, setHealthRecords] = useState<HealthRecord[]>([]);
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    // Load mock data
    setAlerts(mockAlerts);
    setHealthRecords(mockHealthRecords);
    setReports(mockReports);

    // Check for stored user session
    const storedUser = localStorage.getItem('aviherd_user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('aviherd_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('aviherd_user');
  };

  const addAlert = (alert: Omit<AlertData, 'id'>) => {
    const newAlert: AlertData = {
      ...alert,
      id: Date.now().toString(),
    };
    setAlerts(prev => [newAlert, ...prev]);
  };

  const addHealthRecord = (record: Omit<HealthRecord, 'id'>) => {
    const newRecord: HealthRecord = {
      ...record,
      id: Date.now().toString(),
    };
    setHealthRecords(prev => [newRecord, ...prev]);
  };

  if (!currentUser) {
    return <LandingPage onLogin={handleLogin} />;
  }

  if (currentUser.role === 'farmer') {
    return (
      <FarmerDashboard
        user={currentUser}
        alerts={alerts}
        reports={reports}
        onLogout={handleLogout}
        onAddAlert={addAlert}
      />
    );
  }

  return (
    <VeterinarianDashboard
      user={currentUser}
      healthRecords={healthRecords}
      alerts={alerts}
      onLogout={handleLogout}
      onAddHealthRecord={addHealthRecord}
    />
  );
}

export default App;