import React, { useState } from 'react';
import { Sprout, Users, Shield, Brain, Eye, BarChart3 } from 'lucide-react';
import { User } from '../types';

interface LandingPageProps {
  onLogin: (user: User) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const [showLoginForm, setShowLoginForm] = useState<'farmer' | 'veterinarian' | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    farmName: '',
    clinicName: ''
  });

  const handleLogin = (role: 'farmer' | 'veterinarian') => {
    if (formData.name && formData.email) {
      const user: User = {
        id: Date.now().toString(),
        name: formData.name,
        role,
        email: formData.email,
        ...(role === 'farmer' && { farmName: formData.farmName }),
        ...(role === 'veterinarian' && { clinicName: formData.clinicName })
      };
      onLogin(user);
    }
  };

  const features = [
    {
      icon: Shield,
      title: 'Biosecurity Management',
      description: 'Advanced monitoring and alert systems to protect your livestock'
    },
    {
      icon: Brain,
      title: 'AI-Powered Health Insights',
      description: 'Smart analysis of animal behavior and health patterns'
    },
    {
      icon: Eye,
      title: 'Real-time Monitoring',
      description: 'Camera integration with automated abnormality detection'
    },
    {
      icon: BarChart3,
      title: 'Analytics & Reports',
      description: 'Comprehensive health trends and actionable recommendations'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="bg-green-600 p-2 rounded-lg">
                <Sprout className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">AVIHERD</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Smart Biosecurity for
            <span className="text-green-600 block">Modern Farms</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            AVIHERD empowers farmers and veterinarians with AI-driven insights to maintain optimal 
            animal health and farm biosecurity in pig and poultry operations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowLoginForm('farmer')}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
            >
              Login as Farmer
            </button>
            <button
              onClick={() => setShowLoginForm('veterinarian')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
            >
              Login as Veterinarian
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <feature.icon className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Login Modal */}
        {showLoginForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full mx-4">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {showLoginForm === 'farmer' ? 'Farmer Login' : 'Veterinarian Login'}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter your name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter your email"
                  />
                </div>

                {showLoginForm === 'farmer' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Farm Name</label>
                    <input
                      type="text"
                      value={formData.farmName}
                      onChange={(e) => setFormData({...formData, farmName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Enter farm name"
                    />
                  </div>
                )}

                {showLoginForm === 'veterinarian' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Clinic/Practice Name</label>
                    <input
                      type="text"
                      value={formData.clinicName}
                      onChange={(e) => setFormData({...formData, clinicName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter clinic name"
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => handleLogin(showLoginForm)}
                  className={`flex-1 px-4 py-2 rounded-md text-white font-semibold ${
                    showLoginForm === 'farmer' 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-blue-600 hover:bg-blue-700'
                  } transition-colors`}
                >
                  Login
                </button>
                <button
                  onClick={() => setShowLoginForm(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default LandingPage;