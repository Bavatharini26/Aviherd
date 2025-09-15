import React, { useState } from 'react';
import { LogOut, Bell, MessageCircle, Camera, BarChart3, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { User, AlertData, Report } from '../types';
import Chatbot from './Chatbot';
import CameraMonitoring from './CameraMonitoring';
import NotificationPanel from './NotificationPanel';

interface FarmerDashboardProps {
  user: User;
  alerts: AlertData[];
  reports: Report[];
  onLogout: () => void;
  onAddAlert: (alert: Omit<AlertData, 'id'>) => void;
}

const FarmerDashboard: React.FC<FarmerDashboardProps> = ({
  user,
  alerts,
  reports,
  onLogout,
  onAddAlert
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'chatbot' | 'camera' | 'reports'>('overview');
  const [showNotifications, setShowNotifications] = useState(false);

  const activeAlerts = alerts.filter(alert => alert.status === 'active');
  const criticalAlerts = alerts.filter(alert => alert.severity === 'critical');

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-blue-600 bg-blue-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <AlertTriangle className="h-4 w-4" />;
      case 'resolved': return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Farmer Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user.name}</p>
              {user.farmName && <p className="text-sm text-gray-500">{user.farmName}</p>}
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Bell className="h-6 w-6" />
                {activeAlerts.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {activeAlerts.length}
                  </span>
                )}
              </button>
              
              <button
                onClick={onLogout}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-t">
            <nav className="flex space-x-8">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'chatbot', label: 'Health Assistant', icon: MessageCircle },
                { id: 'camera', label: 'Live Monitoring', icon: Camera },
                { id: 'reports', label: 'Reports', icon: BarChart3 }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Notifications Panel */}
      {showNotifications && (
        <NotificationPanel
          alerts={alerts}
          onClose={() => setShowNotifications(false)}
        />
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <AlertTriangle className="h-8 w-8 text-red-500" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Critical Alerts</p>
                    <p className="text-2xl font-semibold text-gray-900">{criticalAlerts.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Bell className="h-8 w-8 text-yellow-500" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Active Alerts</p>
                    <p className="text-2xl font-semibold text-gray-900">{activeAlerts.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <BarChart3 className="h-8 w-8 text-green-500" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Health Score</p>
                    <p className="text-2xl font-semibold text-gray-900">8.2/10</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-8 w-8 text-blue-500" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Animals Monitored</p>
                    <p className="text-2xl font-semibold text-gray-900">247</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Alerts */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b">
                <h3 className="text-lg font-semibold text-gray-900">Recent Health Alerts</h3>
              </div>
              <div className="divide-y">
                {alerts.slice(0, 5).map((alert) => (
                  <div key={alert.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                            {alert.severity.toUpperCase()}
                          </span>
                          <span className="flex items-center space-x-1 text-sm text-gray-500">
                            {getStatusIcon(alert.status)}
                            <span className="capitalize">{alert.status}</span>
                          </span>
                        </div>
                        <h4 className="mt-2 text-lg font-medium text-gray-900">{alert.title}</h4>
                        <p className="mt-1 text-gray-600">{alert.description}</p>
                        <div className="mt-2 text-sm text-gray-500">
                          <span>Location: {alert.location}</span>
                          {alert.animalId && <span className="ml-4">Animal: {alert.animalId}</span>}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(alert.timestamp).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'chatbot' && (
          <Chatbot />
        )}

        {activeTab === 'camera' && (
          <CameraMonitoring onAlert={onAddAlert} />
        )}

        {activeTab === 'reports' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b">
                <h3 className="text-lg font-semibold text-gray-900">AI-Generated Reports</h3>
              </div>
              <div className="divide-y">
                {reports.map((report) => (
                  <div key={report.id} className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-lg font-medium text-gray-900">{report.title}</h4>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-2">
                          {report.type.replace('_', ' ').toUpperCase()}
                        </span>
                        <p className="mt-3 text-gray-600">{report.summary}</p>
                        <div className="mt-4">
                          <h5 className="font-medium text-gray-900">Recommendations:</h5>
                          <ul className="mt-2 list-disc list-inside text-gray-600 space-y-1">
                            {report.recommendations.map((rec, index) => (
                              <li key={index}>{rec}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        Generated: {new Date(report.generatedDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default FarmerDashboard;