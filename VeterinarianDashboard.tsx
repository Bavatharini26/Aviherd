import React, { useState } from 'react';
import { LogOut, Plus, FileText, TrendingUp, Upload, Search, Calendar } from 'lucide-react';
import { User, HealthRecord, AlertData } from '../types';

interface VeterinarianDashboardProps {
  user: User;
  healthRecords: HealthRecord[];
  alerts: AlertData[];
  onLogout: () => void;
  onAddHealthRecord: (record: Omit<HealthRecord, 'id'>) => void;
}

const VeterinarianDashboard: React.FC<VeterinarianDashboardProps> = ({
  user,
  healthRecords,
  alerts,
  onLogout,
  onAddHealthRecord
}) => {
  const [activeTab, setActiveTab] = useState<'records' | 'analytics' | 'add-record'>('records');
  const [searchTerm, setSearchTerm] = useState('');
  const [newRecord, setNewRecord] = useState({
    animalId: '',
    animalType: 'pig' as 'pig' | 'chicken' | 'duck',
    diagnosis: '',
    treatment: '',
    notes: '',
    nextCheckup: '',
    medications: ''
  });

  const filteredRecords = healthRecords.filter(record =>
    record.animalId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.treatment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmitRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (newRecord.animalId && newRecord.diagnosis && newRecord.treatment) {
      const record: Omit<HealthRecord, 'id'> = {
        ...newRecord,
        checkupDate: new Date().toISOString().split('T')[0],
        veterinarian: user.name,
        medications: newRecord.medications ? newRecord.medications.split(',').map(m => m.trim()) : []
      };
      onAddHealthRecord(record);
      setNewRecord({
        animalId: '',
        animalType: 'pig',
        diagnosis: '',
        treatment: '',
        notes: '',
        nextCheckup: '',
        medications: ''
      });
      setActiveTab('records');
    }
  };

  // Analytics data
  const getAnalytics = () => {
    const diseaseCount: { [key: string]: number } = {};
    const animalTypeCount: { [key: string]: number } = {};
    
    healthRecords.forEach(record => {
      diseaseCount[record.diagnosis] = (diseaseCount[record.diagnosis] || 0) + 1;
      animalTypeCount[record.animalType] = (animalTypeCount[record.animalType] || 0) + 1;
    });

    return { diseaseCount, animalTypeCount };
  };

  const analytics = getAnalytics();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Veterinarian Dashboard</h1>
              <p className="text-gray-600">Dr. {user.name}</p>
              {user.clinicName && <p className="text-sm text-gray-500">{user.clinicName}</p>}
            </div>
            
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="border-t">
            <nav className="flex space-x-8">
              {[
                { id: 'records', label: 'Health Records', icon: FileText },
                { id: 'analytics', label: 'Analytics', icon: TrendingUp },
                { id: 'add-record', label: 'New Record', icon: Plus }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'records' && (
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search by Animal ID, diagnosis, or treatment..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Health Records */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b">
                <h3 className="text-lg font-semibold text-gray-900">Patient Health Records</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Animal</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Diagnosis</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Treatment</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Checkup</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredRecords.map((record) => (
                      <tr key={record.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{record.animalId}</div>
                              <div className="text-sm text-gray-500 capitalize">{record.animalType}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(record.checkupDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{record.diagnosis}</div>
                          {record.notes && <div className="text-sm text-gray-500 mt-1">{record.notes}</div>}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{record.treatment}</div>
                          {record.medications && record.medications.length > 0 && (
                            <div className="text-sm text-gray-500 mt-1">
                              Medications: {record.medications.join(', ')}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {record.nextCheckup ? new Date(record.nextCheckup).toLocaleDateString() : 'Not scheduled'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <FileText className="h-8 w-8 text-blue-500" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Total Records</p>
                    <p className="text-2xl font-semibold text-gray-900">{healthRecords.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <TrendingUp className="h-8 w-8 text-green-500" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">This Month</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {healthRecords.filter(r => new Date(r.checkupDate) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Calendar className="h-8 w-8 text-yellow-500" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Upcoming Checkups</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {healthRecords.filter(r => r.nextCheckup && new Date(r.nextCheckup) > new Date()).length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Disease Trends */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b">
                <h3 className="text-lg font-semibold text-gray-900">Common Diagnoses</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {Object.entries(analytics.diseaseCount)
                    .sort(([,a], [,b]) => b - a)
                    .slice(0, 5)
                    .map(([disease, count]) => (
                      <div key={disease} className="flex items-center justify-between">
                        <span className="text-gray-700">{disease}</span>
                        <div className="flex items-center space-x-3">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${(count / Math.max(...Object.values(analytics.diseaseCount))) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900 w-8">{count}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Animal Types */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b">
                <h3 className="text-lg font-semibold text-gray-900">Animal Types Treated</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(analytics.animalTypeCount).map(([type, count]) => (
                    <div key={type} className="text-center">
                      <div className="text-2xl font-semibold text-gray-900">{count}</div>
                      <div className="text-sm text-gray-500 capitalize">{type}s</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'add-record' && (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Add New Health Record</h3>
            </div>
            <form onSubmit={handleSubmitRecord} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Animal ID</label>
                  <input
                    type="text"
                    value={newRecord.animalId}
                    onChange={(e) => setNewRecord({...newRecord, animalId: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., PIG_001, CHICK_025"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Animal Type</label>
                  <select
                    value={newRecord.animalType}
                    onChange={(e) => setNewRecord({...newRecord, animalType: e.target.value as 'pig' | 'chicken' | 'duck'})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="pig">Pig</option>
                    <option value="chicken">Chicken</option>
                    <option value="duck">Duck</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Diagnosis</label>
                <input
                  type="text"
                  value={newRecord.diagnosis}
                  onChange={(e) => setNewRecord({...newRecord, diagnosis: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Primary diagnosis"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Treatment</label>
                <textarea
                  value={newRecord.treatment}
                  onChange={(e) => setNewRecord({...newRecord, treatment: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Treatment provided"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Medications (comma-separated)</label>
                <input
                  type="text"
                  value={newRecord.medications}
                  onChange={(e) => setNewRecord({...newRecord, medications: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Amoxicillin, Vitamin B12"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea
                  value={newRecord.notes}
                  onChange={(e) => setNewRecord({...newRecord, notes: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Additional observations or notes"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Next Checkup Date (Optional)</label>
                <input
                  type="date"
                  value={newRecord.nextCheckup}
                  onChange={(e) => setNewRecord({...newRecord, nextCheckup: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('records')}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default VeterinarianDashboard;