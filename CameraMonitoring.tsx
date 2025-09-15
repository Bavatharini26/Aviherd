import React, { useState, useEffect } from 'react';
import { Camera, Play, Pause, AlertTriangle, CheckCircle, RefreshCw, Zap } from 'lucide-react';
import { AlertData } from '../types';

interface CameraMonitoringProps {
  onAlert: (alert: Omit<AlertData, 'id'>) => void;
}

const CameraMonitoring: React.FC<CameraMonitoringProps> = ({ onAlert }) => {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [detectedAnomalies, setDetectedAnomalies] = useState<any[]>([]);
  const [systemStatus, setSystemStatus] = useState<'online' | 'offline' | 'processing'>('offline');

  const cameras = [
    { id: 'cam_001', location: 'Pig Pen A', status: 'active', lastAlert: null },
    { id: 'cam_002', location: 'Chicken Coop 1', status: 'active', lastAlert: '2 hours ago' },
    { id: 'cam_003', location: 'Feed Storage', status: 'maintenance', lastAlert: null },
    { id: 'cam_004', location: 'Water Station', status: 'active', lastAlert: '1 day ago' },
  ];

  const mockDetections = [
    {
      id: 1,
      type: 'activity',
      severity: 'medium',
      description: 'Unusual inactivity detected in Pig #7',
      location: 'Pig Pen A',
      confidence: 0.87,
      timestamp: new Date(),
    },
    {
      id: 2,
      type: 'hygiene',
      severity: 'high',
      description: 'Water contamination indicators detected',
      location: 'Water Station',
      confidence: 0.92,
      timestamp: new Date(),
    },
    {
      id: 3,
      type: 'health',
      severity: 'critical',
      description: 'Abnormal breathing patterns in multiple chickens',
      location: 'Chicken Coop 1',
      confidence: 0.95,
      timestamp: new Date(),
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isMonitoring) {
      setSystemStatus('processing');
      
      interval = setInterval(() => {
        // Simulate AI detection with random chance
        if (Math.random() < 0.3) {
          const randomDetection = mockDetections[Math.floor(Math.random() * mockDetections.length)];
          const newDetection = {
            ...randomDetection,
            id: Date.now(),
            timestamp: new Date()
          };

          setDetectedAnomalies(prev => [newDetection, ...prev.slice(0, 9)]);

          // Create alert
          onAlert({
            type: newDetection.type as any,
            severity: newDetection.severity as any,
            title: `AI Detection: ${newDetection.description}`,
            description: `Automated monitoring system detected potential issue with ${newDetection.confidence * 100}% confidence`,
            location: newDetection.location,
            timestamp: newDetection.timestamp.toISOString(),
            status: 'active'
          });
        }
      }, 8000); // Check every 8 seconds for demo
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isMonitoring, onAlert]);

  const startMonitoring = () => {
    setIsMonitoring(true);
    setSystemStatus('online');
  };

  const stopMonitoring = () => {
    setIsMonitoring(false);
    setSystemStatus('offline');
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-100 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      default: return 'text-blue-600 bg-blue-100 border-blue-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-600';
      case 'processing': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${systemStatus === 'online' ? 'bg-green-100' : systemStatus === 'processing' ? 'bg-blue-100' : 'bg-gray-100'}`}>
              <Camera className={`h-8 w-8 ${getStatusColor(systemStatus)}`} />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">AI Camera Monitoring System</h3>
              <p className={`text-sm font-medium ${getStatusColor(systemStatus)}`}>
                Status: {systemStatus.toUpperCase()}
                {isMonitoring && <span className="ml-2">🔴 LIVE</span>}
              </p>
            </div>
          </div>

          <div className="flex space-x-3">
            {!isMonitoring ? (
              <button
                onClick={startMonitoring}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Play className="h-5 w-5" />
                <span>Start Monitoring</span>
              </button>
            ) : (
              <button
                onClick={stopMonitoring}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Pause className="h-5 w-5" />
                <span>Stop Monitoring</span>
              </button>
            )}
          </div>
        </div>

        {/* AI Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center space-x-2 mb-2">
              <Zap className="h-5 w-5 text-blue-600" />
              <h4 className="font-medium text-blue-900">Activity Detection</h4>
            </div>
            <p className="text-sm text-blue-700">Monitors animal movement patterns and feeding behavior</p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="flex items-center space-x-2 mb-2">
              <RefreshCw className="h-5 w-5 text-green-600" />
              <h4 className="font-medium text-green-900">Hygiene Analysis</h4>
            </div>
            <p className="text-sm text-green-700">Detects cleanliness issues and contamination signs</p>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <h4 className="font-medium text-orange-900">Health Monitoring</h4>
            </div>
            <p className="text-sm text-orange-700">Identifies abnormal behavior and potential health issues</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Camera Status */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Camera Status</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {cameras.map((camera) => (
                <div key={camera.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      camera.status === 'active' ? 'bg-green-500' : 
                      camera.status === 'maintenance' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                    <div>
                      <div className="font-medium text-gray-900">{camera.location}</div>
                      <div className="text-sm text-gray-500 capitalize">{camera.status}</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {camera.lastAlert ? `Last alert: ${camera.lastAlert}` : 'No recent alerts'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Detections */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-semibold text-gray-900">AI Detections</h3>
            {isMonitoring && (
              <p className="text-sm text-gray-600 mt-1">Real-time anomaly detection active</p>
            )}
          </div>
          <div className="p-6">
            {detectedAnomalies.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Camera className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No anomalies detected</p>
                <p className="text-sm mt-1">
                  {isMonitoring ? 'System is monitoring...' : 'Start monitoring to see detections'}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {detectedAnomalies.slice(0, 5).map((detection) => (
                  <div key={detection.id} className={`p-3 rounded-lg border ${getSeverityColor(detection.severity)}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <AlertTriangle className="h-4 w-4" />
                          <span className="text-sm font-medium">{detection.type.toUpperCase()}</span>
                          <span className="text-xs">
                            {(detection.confidence * 100).toFixed(0)}% confidence
                          </span>
                        </div>
                        <p className="text-sm font-medium">{detection.description}</p>
                        <p className="text-xs mt-1">{detection.location}</p>
                      </div>
                      <div className="text-xs">
                        {detection.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mock Video Feed */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Live Feed Preview</h3>
          <p className="text-sm text-gray-600">Simulated camera feeds from key locations</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cameras.slice(0, 2).map((camera) => (
              <div key={camera.id} className="relative">
                <div className="bg-gray-900 rounded-lg aspect-video flex items-center justify-center">
                  <div className="text-center text-white">
                    <Camera className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <div className="font-medium">{camera.location}</div>
                    <div className="text-sm opacity-75">
                      {isMonitoring ? 'LIVE FEED' : 'FEED OFFLINE'}
                    </div>
                    {isMonitoring && (
                      <div className="absolute top-3 right-3 bg-red-600 text-white px-2 py-1 text-xs rounded">
                        ● REC
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">
              * This is a simulation. In production, this would show actual camera feeds processed by OpenCV.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CameraMonitoring;