// This is a mock API route for AI analysis of blood test results
// In a real application, you would integrate with OpenAI or another AI service

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, bloodTestResults } = req.body;

    // Validate request body
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // In a real implementation, you would:
    // 1. Use the OpenAI API or another AI service to analyze the message and blood test results
    // 2. Format the response appropriately
    // 3. Log the interaction for future training

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Generate a mock response based on the user's question
    let aiResponse = '';
    const lowercaseMessage = message.toLowerCase();
    
    if (lowercaseMessage.includes('cholesterol')) {
      aiResponse = bloodTestResults?.cholesterol 
        ? `Your total cholesterol is ${bloodTestResults.cholesterol.value} ${bloodTestResults.cholesterol.unit}, which is ${bloodTestResults.cholesterol.status}. The reference range is ${bloodTestResults.cholesterol.reference}. Cholesterol is a waxy substance found in your blood that's needed for building healthy cells. However, high levels can increase your risk of heart disease.`
        : 'I don\'t see cholesterol results in your uploaded data. Would you like to know more about cholesterol in general?';
    } else if (lowercaseMessage.includes('triglycerides')) {
      aiResponse = bloodTestResults?.triglycerides
        ? `Your triglycerides level is ${bloodTestResults.triglycerides.value} ${bloodTestResults.triglycerides.unit}, which is ${bloodTestResults.triglycerides.status}. The reference range is ${bloodTestResults.triglycerides.reference}. Triglycerides are a type of fat in your blood that your body uses for energy.`
        : 'I don\'t see triglycerides results in your uploaded data. Would you like to know more about triglycerides in general?';
    } else if (lowercaseMessage.includes('glucose') || lowercaseMessage.includes('sugar')) {
      aiResponse = bloodTestResults?.glucose
        ? `Your blood glucose level is ${bloodTestResults.glucose.value} ${bloodTestResults.glucose.unit}, which is ${bloodTestResults.glucose.status}. The reference range is ${bloodTestResults.glucose.reference}. Glucose is your body\'s main source of energy and comes from the food you eat.`
        : 'I don\'t see glucose results in your uploaded data. Would you like to know more about blood glucose in general?';
    } else if (lowercaseMessage.includes('improve') || lowercaseMessage.includes('better') || lowercaseMessage.includes('lower') || lowercaseMessage.includes('reduce')) {
      aiResponse = 'To improve your blood test results, consider these general recommendations:\n\n1. Maintain a balanced diet rich in fruits, vegetables, whole grains, and lean proteins.\n2. Limit saturated fats, trans fats, and cholesterol in your diet.\n3. Exercise regularly, aiming for at least 150 minutes of moderate activity per week.\n4. Maintain a healthy weight.\n5. Limit alcohol consumption.\n6. Don\'t smoke.\n7. Manage stress through techniques like meditation or yoga.\n\nFor personalized advice, please consult with your healthcare provider.';
    } else {
      aiResponse = 'I\'m here to help you understand your blood test results. You can ask me about specific markers like cholesterol, triglycerides, glucose, or HDL/LDL levels. You can also ask about normal ranges, what your results mean, or how to improve your health metrics.';
    }

    // Return the AI response
    return res.status(200).json({
      response: aiResponse,
    });
  } catch (error) {
    console.error('AI analysis error:', error);
    return res.status(500).json({ error: 'Failed to process your request' });
  }
} 