export interface User {
  id: string;
  name: string;
  role: 'farmer' | 'veterinarian';
  email: string;
  farmName?: string;
  clinicName?: string;
}

export interface AlertData {
  id: string;
  type: 'health' | 'hygiene' | 'activity' | 'temperature';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  animalId?: string;
  location: string;
  timestamp: string;
  status: 'active' | 'resolved' | 'investigating';
}

export interface HealthRecord {
  id: string;
  animalId: string;
  animalType: 'pig' | 'chicken' | 'duck';
  checkupDate: string;
  veterinarian: string;
  diagnosis: string;
  treatment: string;
  notes: string;
  nextCheckup?: string;
  medications?: string[];
}

export interface Report {
  id: string;
  title: string;
  type: 'hygiene' | 'activity' | 'health_summary' | 'disease_trend';
  generatedDate: string;
  summary: string;
  details: string;
  recommendations: string[];
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
}