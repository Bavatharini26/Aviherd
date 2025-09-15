import React from 'react';
import { X, AlertTriangle, CheckCircle, Clock, Bell } from 'lucide-react';
import { AlertData } from '../types';

interface NotificationPanelProps {
  alerts: AlertData[];
  onClose: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ alerts, onClose }) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'border-l-red-500 bg-red-50';
      case 'high': return 'border-l-orange-500 bg-orange-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      default: return 'border-l-blue-500 bg-blue-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'resolved': return <CheckCircle className="h-4 w-4 text-green-600" />;
      default: return <Clock className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    const colors = {
      critical: 'bg-red-100 text-red-800',
      high: 'bg-orange-100 text-orange-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-blue-100 text-blue-800'
    };
    return colors[severity as keyof typeof colors] || colors.low;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto">
            {alerts.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <Bell className="h-12 w-12 opacity-30 mb-3" />
                <p className="text-lg font-medium">No notifications</p>
                <p className="text-sm">All systems are running normally</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {alerts.map((alert) => (
                  <div key={alert.id} className={`p-4 border-l-4 ${getSeverityColor(alert.severity)} hover:bg-gray-50 transition-colors`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {getStatusIcon(alert.status)}
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getSeverityBadge(alert.severity)}`}>
                            {alert.severity.toUpperCase()}
                          </span>
                        </div>
                        
                        <h4 className="text-sm font-semibold text-gray-900 mb-1">
                          {alert.title}
                        </h4>
                        
                        <p className="text-xs text-gray-600 mb-2">
                          {alert.description}
                        </p>
                        
                        <div className="flex flex-col space-y-1 text-xs text-gray-500">
                          <div className="flex items-center space-x-4">
                            <span>📍 {alert.location}</span>
                            {alert.animalId && <span>🐷 {alert.animalId}</span>}
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="capitalize">Status: {alert.status}</span>
                            <span>{new Date(alert.timestamp).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {alerts.length > 0 && (
            <div className="px-6 py-4 border-t bg-gray-50">
              <div className="text-sm text-gray-600">
                <span className="font-medium">{alerts.filter(a => a.status === 'active').length}</span> active alerts
                {alerts.filter(a => a.severity === 'critical').length > 0 && (
                  <span className="ml-2 text-red-600 font-medium">
                    ({alerts.filter(a => a.severity === 'critical').length} critical)
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationPanel;