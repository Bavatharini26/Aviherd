import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { ChatMessage } from '../types';

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AVIHERD health assistant. I can help you with questions about pig and poultry health, biosecurity measures, and common symptoms. What would you like to know?',
      sender: 'bot',
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();

    // Health symptoms
    if (message.includes('cough') || message.includes('respiratory')) {
      return 'Respiratory symptoms in poultry can indicate several conditions:\n\n• **Newcastle Disease** - Often with nasal discharge and head shaking\n• **Infectious Bronchitis** - Common in chickens\n• **Mycoplasma** - Chronic respiratory infection\n\nRecommendations:\n1. Isolate affected birds immediately\n2. Improve ventilation\n3. Contact your veterinarian for proper diagnosis\n4. Consider antibiotic treatment if bacterial\n\nWould you like more specific information about any of these conditions?';
    }

    if (message.includes('diarrhea') || message.includes('loose stool')) {
      return 'Diarrhea in livestock can have various causes:\n\n**Common causes:**\n• Dietary changes or poor feed quality\n• Parasitic infections (coccidia, worms)\n• Bacterial infections (E. coli, Salmonella)\n• Viral infections\n• Stress or overcrowding\n\n**Immediate actions:**\n1. Provide clean, fresh water\n2. Check feed quality\n3. Isolate affected animals if possible\n4. Monitor for dehydration\n5. Contact veterinarian if symptoms persist\n\nWhat type of animals are affected?';
    }

    if (message.includes('pig') && (message.includes('fever') || message.includes('temperature'))) {
      return 'Fever in pigs (normal temperature: 38.7-39.8°C/101.7-103.6°F) can indicate:\n\n**Possible causes:**\n• **Swine Flu** - Often with respiratory symptoms\n• **PRRS** (Porcine Reproductive and Respiratory Syndrome)\n• **Bacterial infections** - Pneumonia, septicemia\n• **African Swine Fever** - Emergency situation!\n\n**Action plan:**\n1. Isolate affected pigs immediately\n2. Monitor temperature regularly\n3. Ensure adequate water intake\n4. Contact veterinarian urgently\n5. Implement strict biosecurity measures\n\nHave you noticed any other symptoms?';
    }

    if (message.includes('biosecurity') || message.includes('prevent')) {
      return 'Essential biosecurity measures for your farm:\n\n**Access Control:**\n• Limit visitor access\n• Disinfection footbaths at entrances\n• Clean protective clothing for visitors\n• Vehicle disinfection protocols\n\n**Animal Management:**\n• Quarantine new animals (minimum 21 days)\n• Regular health monitoring\n• Vaccination schedules\n• Proper waste disposal\n\n**Hygiene Protocols:**\n• Daily cleaning of feeding/watering equipment\n• Regular disinfection of facilities\n• Pest and rodent control\n• Dead animal disposal procedures\n\nWhich area would you like me to elaborate on?';
    }

    if (message.includes('vaccination') || message.includes('vaccine')) {
      return 'Vaccination is crucial for farm health:\n\n**Core vaccines for poultry:**\n• Newcastle Disease\n• Infectious Bronchitis\n• Marek\'s Disease\n• Infectious Bursal Disease (Gumboro)\n\n**Core vaccines for pigs:**\n• Porcine Circovirus (PCV2)\n• Mycoplasma hyopneumoniae\n• Porcine Parvovirus\n• Erysipelas\n\n**Best practices:**\n1. Follow manufacturer\'s storage guidelines\n2. Use proper injection techniques\n3. Maintain cold chain\n4. Keep detailed vaccination records\n5. Consult with your veterinarian for farm-specific schedules\n\nDo you need information about a specific vaccine?';
    }

    if (message.includes('feed') || message.includes('nutrition')) {
      return 'Proper nutrition is fundamental to animal health:\n\n**Feed quality indicators:**\n• No mold, dust, or unusual odors\n• Proper protein and energy levels\n• Fresh and properly stored\n• Appropriate particle size\n\n**Common nutritional issues:**\n• **Vitamin deficiencies** - Can cause various health problems\n• **Mycotoxins** - From moldy feed, very dangerous\n• **Imbalanced minerals** - Affects growth and reproduction\n\n**Best practices:**\n1. Source feed from reputable suppliers\n2. Store in clean, dry conditions\n3. Use feed within recommended timeframes\n4. Provide adequate clean water (3:1 water to feed ratio)\n5. Monitor feed consumption patterns\n\nAre you experiencing any specific feeding issues?';
    }

    if (message.includes('egg') && message.includes('production')) {
      return 'Egg production issues can indicate various problems:\n\n**Common causes of reduced production:**\n• **Stress** - Heat, overcrowding, predators\n• **Disease** - Infectious Bronchitis, Newcastle Disease\n• **Nutrition** - Inadequate protein, calcium, or vitamins\n• **Lighting** - Insufficient or inconsistent light cycles\n• **Parasites** - Internal or external parasites\n\n**Solutions:**\n1. Maintain consistent 14-16 hour light cycles\n2. Ensure balanced layer feed (16-18% protein)\n3. Provide adequate calcium sources\n4. Monitor for signs of illness\n5. Reduce stress factors\n6. Regular parasite control\n\nWhat specific symptoms are you observing?';
    }

    if (message.includes('emergency') || message.includes('urgent')) {
      return '🚨 **EMERGENCY PROTOCOLS:**\n\n**Immediate actions:**\n1. **Isolate** affected animals immediately\n2. **Contact** your veterinarian urgently\n3. **Document** all symptoms and affected animals\n4. **Restrict** movement of people and animals\n5. **Implement** strict disinfection measures\n\n**Signs requiring immediate veterinary attention:**\n• Sudden deaths (>2% mortality)\n• Severe respiratory distress\n• High fever (>40°C/104°F)\n• Neurological symptoms\n• Severe diarrhea with dehydration\n• Complete feed/water refusal\n\n**Emergency contacts should include:**\n• Primary veterinarian\n• Local animal health authorities\n• Diagnostic laboratory\n\nDo you need help with any specific emergency situation?';
    }

    // Default responses
    const defaultResponses = [
      'I can help you with questions about animal health, biosecurity, nutrition, vaccinations, and emergency situations. What specific issue are you facing with your livestock?',
      'Tell me more about the symptoms you\'re observing. Are they affecting pigs, chickens, or other poultry? How many animals are involved?',
      'I\'m here to assist with farm health management. You can ask me about diseases, prevention measures, feeding practices, or emergency protocols. What would you like to know?'
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputText),
        sender: 'bot',
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    'My chickens are coughing, what should I do?',
    'How to prevent disease outbreaks?',
    'Pig shows fever and loss of appetite',
    'Egg production suddenly decreased',
    'What biosecurity measures do I need?'
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm h-[calc(100vh-200px)] flex flex-col">
      <div className="px-6 py-4 border-b bg-green-50">
        <div className="flex items-center space-x-3">
          <div className="bg-green-600 p-2 rounded-full">
            <Bot className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">AVIHERD Health Assistant</h3>
            <p className="text-sm text-gray-600">Ask me about animal health, biosecurity, and farm management</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex items-start space-x-3 max-w-3xl ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                message.sender === 'user' ? 'bg-blue-600' : 'bg-green-600'
              }`}>
                {message.sender === 'user' ? 
                  <User className="h-5 w-5 text-white" /> : 
                  <Bot className="h-5 w-5 text-white" />
                }
              </div>
              <div className={`p-4 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}>
                <div className="whitespace-pre-line">{message.text}</div>
                <div className={`text-xs mt-2 ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                  {new Date(message.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-3">
              <div className="bg-green-600 w-8 h-8 rounded-full flex items-center justify-center">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions */}
      {messages.length === 1 && (
        <div className="px-6 py-4 border-t bg-gray-50">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Quick Questions:</h4>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => setInputText(question)}
                className="text-sm bg-white px-3 py-1 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="px-6 py-4 border-t">
        <div className="flex space-x-3">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me about animal health, symptoms, biosecurity..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
            rows={2}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isTyping}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;