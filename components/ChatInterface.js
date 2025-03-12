import { useState, useRef, useEffect } from 'react';
import { FiSend, FiUser, FiCpu, FiInfo } from 'react-icons/fi';

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
      } else if (lowercaseInput.includes('hemoglobin') || lowercaseInput.includes('iron')) {
        mockResponse = bloodTestResults?.hemoglobin
          ? `Your hemoglobin level is ${bloodTestResults.hemoglobin.value} ${bloodTestResults.hemoglobin.unit}, which is ${bloodTestResults.hemoglobin.status}. The reference range is ${bloodTestResults.hemoglobin.reference}. Hemoglobin is the protein in your red blood cells that carries oxygen from your lungs to the rest of your body.`
          : 'I don\'t see hemoglobin results in your uploaded data. Would you like to know more about hemoglobin in general?';
      } else if (lowercaseInput.includes('white') || lowercaseInput.includes('wbc')) {
        mockResponse = bloodTestResults?.whiteCellCount
          ? `Your white blood cell count is ${bloodTestResults.whiteCellCount.value} ${bloodTestResults.whiteCellCount.unit}, which is ${bloodTestResults.whiteCellCount.status}. The reference range is ${bloodTestResults.whiteCellCount.reference}. White blood cells are part of your immune system and help your body fight infection.`
          : 'I don\'t see white blood cell count results in your uploaded data. Would you like to know more about white blood cells in general?';
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
    <div className="bg-gray-900 rounded-lg border border-gray-700 h-[500px] flex flex-col">
      <div className="p-4 border-b border-gray-700 flex items-center">
        <FiCpu className="h-5 w-5 text-primary-400 mr-2" />
        <div>
          <h3 className="text-lg font-medium text-white">Ask About Your Results</h3>
          <p className="text-sm text-gray-400">
            Chat with our AI to get personalized insights
          </p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-800/30">
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
                className={`p-3 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-primary-600/80 text-white'
                    : 'bg-gray-700 text-gray-200'
                }`}
              >
                <div className="flex items-center mb-1">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      message.role === 'user' ? 'bg-primary-500' : 'bg-gray-600'
                    }`}
                  >
                    {message.role === 'user' ? (
                      <FiUser className="w-3 h-3 text-white" />
                    ) : (
                      <FiCpu className="w-3 h-3 text-white" />
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
            <div className="bg-gray-700 text-gray-200 p-3 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center">
                  <FiCpu className="w-3 h-3 text-white" />
                </div>
                <span className="text-xs font-medium">AI Assistant</span>
              </div>
              <div className="flex items-center space-x-1 mt-2">
                <div className="w-2 h-2 rounded-full bg-primary-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-primary-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-primary-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t border-gray-700 bg-gray-800/20">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about your results..."
            className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            disabled={isLoading}
          />
          <button
            type="submit"
            className={`btn btn-primary p-2 rounded-lg ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading}
            aria-label="Send message"
          >
            <FiSend className="h-5 w-5" />
          </button>
        </form>
        <div className="flex items-center mt-3 text-xs text-gray-400">
          <FiInfo className="h-3 w-3 mr-1" />
          <p>
            Try asking: "What does my cholesterol mean?" or "How can I improve my results?"
          </p>
        </div>
      </div>
    </div>
  );
} 