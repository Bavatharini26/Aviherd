import { AlertData, HealthRecord, Report } from '../types';

export const mockAlerts: AlertData[] = [
  {
    id: '1',
    type: 'health',
    severity: 'high',
    title: 'Respiratory Symptoms Detected',
    description: 'Multiple chickens showing signs of respiratory distress in Coop A',
    animalId: 'CHICK_001-005',
    location: 'Coop A, Section 2',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    status: 'active'
  },
  {
    id: '2',
    type: 'activity',
    severity: 'medium',
    title: 'Unusual Inactivity',
    description: 'Pig #3 showing reduced movement and feeding activity',
    animalId: 'PIG_003',
    location: 'Pen 3, Block B',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    status: 'investigating'
  },
  {
    id: '3',
    type: 'hygiene',
    severity: 'medium',
    title: 'Water System Alert',
    description: 'Water quality parameters outside normal range in Block C',
    location: 'Block C Water Station',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    status: 'active'
  },
  {
    id: '4',
    type: 'temperature',
    severity: 'critical',
    title: 'Temperature Spike',
    description: 'Brooder temperature exceeded 35°C in Nursery 1',
    location: 'Nursery 1',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    status: 'active'
  }
];

export const mockHealthRecords: HealthRecord[] = [
  {
    id: '1',
    animalId: 'PIG_001',
    animalType: 'pig',
    checkupDate: '2024-12-15',
    veterinarian: 'Dr. Sarah Johnson',
    diagnosis: 'Routine health check - Normal',
    treatment: 'Vitamin B12 injection',
    notes: 'Animal shows good weight gain and activity levels',
    nextCheckup: '2024-01-15',
    medications: ['Vitamin B12', 'Deworming tablet']
  },
  {
    id: '2',
    animalId: 'CHICK_012',
    animalType: 'chicken',
    checkupDate: '2024-12-14',
    veterinarian: 'Dr. Michael Chen',
    diagnosis: 'Minor respiratory infection',
    treatment: 'Antibiotic course - Tylosin',
    notes: 'Isolated from flock, showing improvement after 3 days',
    nextCheckup: '2024-12-21',
    medications: ['Tylosin', 'Electrolyte solution']
  },
  {
    id: '3',
    animalId: 'PIG_007',
    animalType: 'pig',
    checkupDate: '2024-12-13',
    veterinarian: 'Dr. Sarah Johnson',
    diagnosis: 'Skin irritation due to parasites',
    treatment: 'Topical treatment and antiparasitic',
    notes: 'External parasites detected, pen hygiene improved',
    medications: ['Ivermectin', 'Antiseptic spray']
  }
];

export const mockReports: Report[] = [
  {
    id: '1',
    title: 'Weekly Hygiene Assessment',
    type: 'hygiene',
    generatedDate: '2024-12-16',
    summary: 'Overall farm hygiene score: 8.2/10. Water quality excellent, minor issues in feed storage.',
    details: 'Comprehensive assessment of all farm areas including water systems, feed storage, animal housing, and waste management.',
    recommendations: [
      'Improve ventilation in feed storage area',
      'Weekly water system cleaning schedule',
      'Update bedding in Pen 5 and 6'
    ]
  },
  {
    id: '2',
    title: 'Disease Trend Analysis',
    type: 'disease_trend',
    generatedDate: '2024-12-15',
    summary: 'Respiratory issues trending upward (15% increase this month). Recommend increased ventilation and air quality monitoring.',
    details: 'Analysis of health records over the past 3 months shows seasonal increase in respiratory conditions, particularly in poultry.',
    recommendations: [
      'Install additional ventilation fans',
      'Implement daily air quality monitoring',
      'Review biosecurity protocols for visitor access',
      'Consider prophylactic treatment for high-risk animals'
    ]
  },
  {
    id: '3',
    title: 'Activity Monitoring Summary',
    type: 'activity',
    generatedDate: '2024-12-14',
    summary: 'Animal activity levels within normal ranges. Some decreased activity in older animals noted.',
    details: 'AI monitoring system tracked movement patterns, feeding behavior, and social interactions across all farm areas.',
    recommendations: [
      'Monitor elderly animals more closely',
      'Adjust feeding schedule for better distribution',
      'Regular exercise programs for confined animals'
    ]
  }
];