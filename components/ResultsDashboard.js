import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { FiAlertCircle, FiCheckCircle, FiInfo } from 'react-icons/fi';

// Register Chart.js components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ResultsDashboard({ results }) {
  const [activeTab, setActiveTab] = useState('overview');

  if (!results || Object.keys(results).length === 0) {
    return (
      <div className="text-center py-12">
        <p>No results to display. Please upload your blood test results.</p>
      </div>
    );
  }

  // Prepare data for the chart
  const chartData = {
    labels: Object.keys(results).map(key => key.charAt(0).toUpperCase() + key.slice(1)),
    datasets: [
      {
        label: 'Your Values',
        data: Object.values(results).map(item => item.value),
        backgroundColor: Object.values(results).map(item => {
          switch (item.status) {
            case 'low':
              return 'rgba(59, 130, 246, 0.6)'; // Blue
            case 'normal':
              return 'rgba(16, 185, 129, 0.6)'; // Green
            case 'borderline':
              return 'rgba(245, 158, 11, 0.6)'; // Yellow
            case 'high':
              return 'rgba(239, 68, 68, 0.6)'; // Red
            default:
              return 'rgba(107, 114, 128, 0.6)'; // Gray
          }
        }),
        borderColor: Object.values(results).map(item => {
          switch (item.status) {
            case 'low':
              return 'rgb(59, 130, 246)';
            case 'normal':
              return 'rgb(16, 185, 129)';
            case 'borderline':
              return 'rgb(245, 158, 11)';
            case 'high':
              return 'rgb(239, 68, 68)';
            default:
              return 'rgb(107, 114, 128)';
          }
        }),
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Your Blood Test Results',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.dataset.label || '';
            const value = context.raw || 0;
            const dataIndex = context.dataIndex;
            const key = Object.keys(results)[dataIndex];
            const unit = results[key].unit;
            const status = results[key].status;
            const reference = results[key].reference;
            
            return [
              `${label}: ${value} ${unit}`,
              `Status: ${status.charAt(0).toUpperCase() + status.slice(1)}`,
              `Reference: ${reference}`
            ];
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Generate insights based on results
  const generateInsights = () => {
    const insights = [];
    
    // Check cholesterol levels
    if (results.cholesterol) {
      if (results.cholesterol.status === 'high') {
        insights.push({
          type: 'warning',
          title: 'High Cholesterol',
          description: 'Your total cholesterol is above the recommended range. Consider dietary changes and consult with your healthcare provider.',
          icon: FiAlertCircle,
        });
      } else if (results.cholesterol.status === 'borderline') {
        insights.push({
          type: 'info',
          title: 'Borderline Cholesterol',
          description: 'Your total cholesterol is at the upper end of the normal range. Consider lifestyle modifications to prevent it from increasing.',
          icon: FiInfo,
        });
      }
    }
    
    // Check triglycerides
    if (results.triglycerides) {
      if (results.triglycerides.status === 'high') {
        insights.push({
          type: 'warning',
          title: 'High Triglycerides',
          description: 'Your triglyceride levels are elevated. This may increase your risk of heart disease. Consider reducing sugar and refined carbohydrate intake.',
          icon: FiAlertCircle,
        });
      } else if (results.triglycerides.status === 'borderline') {
        insights.push({
          type: 'info',
          title: 'Borderline Triglycerides',
          description: 'Your triglyceride levels are at the upper end of the normal range. Consider reducing sugar intake and increasing physical activity.',
          icon: FiInfo,
        });
      }
    }
    
    // Check glucose
    if (results.glucose) {
      if (results.glucose.status === 'high') {
        insights.push({
          type: 'warning',
          title: 'Elevated Blood Glucose',
          description: 'Your blood glucose level is higher than the normal range. This may indicate prediabetes or diabetes. Consult with your healthcare provider.',
          icon: FiAlertCircle,
        });
      } else if (results.glucose.status === 'low') {
        insights.push({
          type: 'warning',
          title: 'Low Blood Glucose',
          description: 'Your blood glucose level is lower than the normal range. This may cause symptoms like fatigue and dizziness. Consider more regular meals.',
          icon: FiAlertCircle,
        });
      }
    }
    
    // Add a positive insight if most values are normal
    const normalCount = Object.values(results).filter(item => item.status === 'normal').length;
    if (normalCount >= Object.keys(results).length / 2) {
      insights.push({
        type: 'success',
        title: 'Mostly Normal Results',
        description: 'Many of your values are within normal ranges, which is a positive sign for your overall health.',
        icon: FiCheckCircle,
      });
    }
    
    return insights.length > 0 ? insights : [
      {
        type: 'info',
        title: 'Basic Analysis',
        description: 'We\'ve analyzed your results. For more detailed insights, consult with a healthcare professional.',
        icon: FiInfo,
      }
    ];
  };

  const insights = generateInsights();

  // Generate recommendations based on results
  const generateRecommendations = () => {
    const recommendations = [];
    
    // Check cholesterol and related markers
    if ((results.cholesterol && results.cholesterol.status !== 'normal') || 
        (results.ldl && results.ldl.status === 'high') ||
        (results.triglycerides && results.triglycerides.status !== 'normal')) {
      recommendations.push({
        category: 'Diet',
        items: [
          'Increase intake of soluble fiber (oats, beans, fruits)',
          'Reduce saturated fats and trans fats',
          'Include omega-3 rich foods like fatty fish',
          'Consider plant sterols and stanols',
        ]
      });
      
      recommendations.push({
        category: 'Lifestyle',
        items: [
          'Aim for at least 150 minutes of moderate exercise weekly',
          'Maintain a healthy weight',
          'Limit alcohol consumption',
          'Quit smoking if applicable',
        ]
      });
    }
    
    // Check glucose
    if (results.glucose && results.glucose.status !== 'normal') {
      recommendations.push({
        category: 'Blood Sugar Management',
        items: [
          'Monitor carbohydrate intake',
          'Choose complex carbohydrates over simple sugars',
          'Regular physical activity to improve insulin sensitivity',
          'Maintain consistent meal timing',
        ]
      });
    }
    
    // General recommendations
    recommendations.push({
      category: 'General Health',
      items: [
        'Stay hydrated by drinking plenty of water',
        'Aim for 7-9 hours of quality sleep',
        'Manage stress through mindfulness, meditation, or other techniques',
        'Schedule regular follow-up appointments with your healthcare provider',
      ]
    });
    
    return recommendations;
  };

  const recommendations = generateRecommendations();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`${
              activeTab === 'overview'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('details')}
            className={`${
              activeTab === 'details'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Detailed Results
          </button>
          <button
            onClick={() => setActiveTab('insights')}
            className={`${
              activeTab === 'insights'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Insights & Recommendations
          </button>
        </nav>
      </div>

      <div className="mt-6">
        {activeTab === 'overview' && (
          <div>
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900">Results Overview</h3>
              <p className="mt-1 text-sm text-gray-500">
                A visual representation of your blood test results
              </p>
            </div>
            <div className="h-80">
              <Bar data={chartData} options={chartOptions} />
            </div>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {insights.slice(0, 2).map((insight, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-md ${
                    insight.type === 'warning'
                      ? 'bg-yellow-50'
                      : insight.type === 'success'
                      ? 'bg-green-50'
                      : 'bg-blue-50'
                  }`}
                >
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <insight.icon
                        className={`h-5 w-5 ${
                          insight.type === 'warning'
                            ? 'text-yellow-400'
                            : insight.type === 'success'
                            ? 'text-green-400'
                            : 'text-blue-400'
                        }`}
                        aria-hidden="true"
                      />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-800">{insight.title}</h3>
                      <p className="mt-2 text-sm text-gray-700">{insight.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'details' && (
          <div>
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900">Detailed Results</h3>
              <p className="mt-1 text-sm text-gray-500">
                Comprehensive breakdown of all your test markers
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Test
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Your Result
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reference Range
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {Object.entries(results).map(([key, value]) => (
                    <tr key={key}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {value.value} {value.unit}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {value.reference}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            value.status === 'normal'
                              ? 'bg-green-100 text-green-800'
                              : value.status === 'borderline'
                              ? 'bg-yellow-100 text-yellow-800'
                              : value.status === 'high' || value.status === 'low'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {value.status.charAt(0).toUpperCase() + value.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'insights' && (
          <div>
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900">Insights & Recommendations</h3>
              <p className="mt-1 text-sm text-gray-500">
                AI-generated insights and personalized recommendations based on your results
              </p>
            </div>
            
            <div className="mb-8">
              <h4 className="text-md font-medium text-gray-800 mb-4">Key Insights</h4>
              <div className="space-y-4">
                {insights.map((insight, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-md ${
                      insight.type === 'warning'
                        ? 'bg-yellow-50'
                        : insight.type === 'success'
                        ? 'bg-green-50'
                        : 'bg-blue-50'
                    }`}
                  >
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <insight.icon
                          className={`h-5 w-5 ${
                            insight.type === 'warning'
                              ? 'text-yellow-400'
                              : insight.type === 'success'
                              ? 'text-green-400'
                              : 'text-blue-400'
                          }`}
                          aria-hidden="true"
                        />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-gray-800">{insight.title}</h3>
                        <p className="mt-2 text-sm text-gray-700">{insight.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-md font-medium text-gray-800 mb-4">Recommendations</h4>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {recommendations.map((rec, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                    <h5 className="text-sm font-semibold text-gray-900 mb-3">{rec.category}</h5>
                    <ul className="space-y-2">
                      {rec.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start">
                          <span className="text-primary-500 mr-2">•</span>
                          <span className="text-sm text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-8 bg-gray-50 p-4 rounded-md">
              <p className="text-sm text-gray-500">
                <strong>Disclaimer:</strong> These insights and recommendations are generated by AI and are not a substitute for professional medical advice. Always consult with a healthcare provider before making any changes to your health regimen.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 