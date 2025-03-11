import { useState, useRef, useEffect } from 'react';
import { FiSend, FiUser, FiCpu } from 'react-icons/fi';

export default function ChatInterface({ bloodTestResults }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I can help answer questions about your blood test results. What would you like to know?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message to chat
    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    
    // Clear input field
    setInput('');
    
    // Set loading state
    setIsLoading(true);
    
    try {
      // In a real app, you would send this to your API
      // const response = await fetch('/api/ai-analysis', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     message: input,
      //     bloodTestResults,
      //   }),
      // });
      
      // if (!response.ok) {
      //   throw new Error('Failed to get response');
      // }
      
      // const data = await response.json();
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate a mock response based on the user's question
      let mockResponse = '';
      const lowercaseInput = input.toLowerCase();
      
      if (lowercaseInput.includes('cholesterol')) {
        mockResponse = bloodTestResults?.cholesterol 
          ? `Your total cholesterol is ${bloodTestResults.cholesterol.value} ${bloodTestResults.cholesterol.unit}, which is ${bloodTestResults.cholesterol.status}. The reference range is ${bloodTestResults.cholesterol.reference}. Cholesterol is a waxy substance found in your blood that's needed for building healthy cells. However, high levels can increase your risk of heart disease.`
          : 'I don\'t see cholesterol results in your uploaded data. Would you like to know more about cholesterol in general?';
      } else if (lowercaseInput.includes('triglycerides')) {
        mockResponse = bloodTestResults?.triglycerides
          ? `Your triglycerides level is ${bloodTestResults.triglycerides.value} ${bloodTestResults.triglycerides.unit}, which is ${bloodTestResults.triglycerides.status}. The reference range is ${bloodTestResults.triglycerides.reference}. Triglycerides are a type of fat in your blood that your body uses for energy.`
          : 'I don\'t see triglycerides results in your uploaded data. Would you like to know more about triglycerides in general?';
      } else if (lowercaseInput.includes('glucose') || lowercaseInput.includes('sugar')) {
        mockResponse = bloodTestResults?.glucose
          ? `Your blood glucose level is ${bloodTestResults.glucose.value} ${bloodTestResults.glucose.unit}, which is ${bloodTestResults.glucose.status}. The reference range is ${bloodTestResults.glucose.reference}. Glucose is your body's main source of energy and comes from the food you eat.`
          : 'I don\'t see glucose results in your uploaded data. Would you like to know more about blood glucose in general?';
      } else if (lowercaseInput.includes('hdl') || lowercaseInput.includes('good cholesterol')) {
        mockResponse = bloodTestResults?.hdl
          ? `Your HDL cholesterol is ${bloodTestResults.hdl.value} ${bloodTestResults.hdl.unit}, which is ${bloodTestResults.hdl.status}. The reference range is ${bloodTestResults.hdl.reference}. HDL (High-Density Lipoprotein) is often called "good cholesterol" because it helps remove other forms of cholesterol from your bloodstream.`
          : 'I don\'t see HDL cholesterol results in your uploaded data. Would you like to know more about HDL cholesterol in general?';
      } else if (lowercaseInput.includes('ldl') || lowercaseInput.includes('bad cholesterol')) {
        mockResponse = bloodTestResults?.ldl
          ? `Your LDL cholesterol is ${bloodTestResults.ldl.value} ${bloodTestResults.ldl.unit}, which is ${bloodTestResults.ldl.status}. The reference range is ${bloodTestResults.ldl.reference}. LDL (Low-Density Lipoprotein) is often called "bad cholesterol" because it can build up in your artery walls and increase your risk of heart disease.`
          : 'I don\'t see LDL cholesterol results in your uploaded data. Would you like to know more about LDL cholesterol in general?';
      } else if (lowercaseInput.includes('improve') || lowercaseInput.includes('better') || lowercaseInput.includes('lower') || lowercaseInput.includes('reduce')) {
        mockResponse = 'To improve your blood test results, consider these general recommendations:\n\n1. Maintain a balanced diet rich in fruits, vegetables, whole grains, and lean proteins.\n2. Limit saturated fats, trans fats, and cholesterol in your diet.\n3. Exercise regularly, aiming for at least 150 minutes of moderate activity per week.\n4. Maintain a healthy weight.\n5. Limit alcohol consumption.\n6. Don\'t smoke.\n7. Manage stress through techniques like meditation or yoga.\n\nFor personalized advice, please consult with your healthcare provider.';
      } else if (lowercaseInput.includes('normal') || lowercaseInput.includes('range') || lowercaseInput.includes('reference')) {
        mockResponse = 'Normal ranges for common blood tests include:\n\n- Total Cholesterol: Less than 200 mg/dL\n- HDL Cholesterol: Greater than 40 mg/dL for men, greater than 50 mg/dL for women\n- LDL Cholesterol: Less than 100 mg/dL is optimal\n- Triglycerides: Less than 150 mg/dL\n- Fasting Blood Glucose: 70-99 mg/dL\n\nThese ranges may vary slightly depending on the laboratory and your specific health conditions.';
      } else {
        mockResponse = 'I\'m here to help you understand your blood test results. You can ask me about specific markers like cholesterol, triglycerides, glucose, or HDL/LDL levels. You can also ask about normal ranges, what your results mean, or how to improve your health metrics.';
      }
      
      // Add assistant response to chat
      setMessages((prev) => [...prev, { role: 'assistant', content: mockResponse }]);
      
    } catch (error) {
      console.error('Error getting AI response:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'I apologize, but I encountered an error processing your question. Please try again.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md h-[500px] flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Ask About Your Results</h3>
        <p className="text-sm text-gray-500">
          Chat with our AI to get answers about your blood test results
        </p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`flex items-start space-x-2 max-w-[80%] ${
                message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div
                className={`p-2 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-primary-100 text-primary-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <div className="flex items-center mb-1">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      message.role === 'user' ? 'bg-primary-200' : 'bg-gray-200'
                    }`}
                  >
                    {message.role === 'user' ? (
                      <FiUser className="w-4 h-4" />
                    ) : (
                      <FiCpu className="w-4 h-4" />
                    )}
                  </div>
                  <span className="text-xs font-medium ml-2">
                    {message.role === 'user' ? 'You' : 'AI Assistant'}
                  </span>
                </div>
                <div className="text-sm whitespace-pre-line">{message.content}</div>
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-800 p-2 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                  <FiCpu className="w-4 h-4" />
                </div>
                <span className="text-xs font-medium">AI Assistant</span>
              </div>
              <div className="flex items-center space-x-1 mt-2">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about your results..."
            className="input flex-1"
            disabled={isLoading}
          />
          <button
            type="submit"
            className={`btn btn-primary ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            <FiSend className="h-5 w-5" />
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-2">
          Example questions: "What does my cholesterol mean?", "How can I improve my results?"
        </p>
      </div>
    </div>
  );
} 