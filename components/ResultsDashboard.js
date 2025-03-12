import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { FiAlertCircle, FiCheckCircle, FiInfo, FiActivity, FiList, FiBook } from 'react-icons/fi';

// Register Chart.js components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ResultsDashboard({ results }) {
  const [activeTab, setActiveTab] = useState('overview');

  if (!results || Object.keys(results).length === 0) {
    return (
      <div className="text-center py-12 text-gray-300">
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
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'rgba(229, 231, 235, 0.9)' // text-gray-200
        }
      },
      title: {
        display: true,
        text: 'Your Blood Test Results',
        color: 'rgba(229, 231, 235, 0.9)' // text-gray-200
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
        grid: {
          color: 'rgba(75, 85, 99, 0.2)' // text-gray-600 with low opacity
        },
        ticks: {
          color: 'rgba(209, 213, 219, 0.8)' // text-gray-300
        }
      },
      x: {
        grid: {
          color: 'rgba(75, 85, 99, 0.2)' // text-gray-600 with low opacity
        },
        ticks: {
          color: 'rgba(209, 213, 219, 0.8)' // text-gray-300
        }
      }
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
        icon: FiBook,
        items: [
          'Increase intake of soluble fiber (oats, beans, fruits)',
          'Reduce saturated fats and trans fats',
          'Include omega-3 rich foods like fatty fish',
          'Consider plant sterols and stanols',
        ]
      });
      
      recommendations.push({
        category: 'Lifestyle',
        icon: FiActivity,
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
        icon: FiActivity,
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
      icon: FiCheckCircle,
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
    <div className="card-dark p-6">
      <div className="border-b border-gray-700">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`${
              activeTab === 'overview'
                ? 'border-primary-500 text-primary-400'
                : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-500'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
          >
            <FiActivity className="mr-2" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab('insights')}
            className={`${
              activeTab === 'insights'
                ? 'border-primary-500 text-primary-400'
                : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-500'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
          >
            <FiInfo className="mr-2" />
            Insights
          </button>
          <button
            onClick={() => setActiveTab('recommendations')}
            className={`${
              activeTab === 'recommendations'
                ? 'border-primary-500 text-primary-400'
                : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-500'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
          >
            <FiList className="mr-2" />
            Recommendations
          </button>
        </nav>
      </div>

      <div className="py-6">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <h2 className="text-xl font-bold text-white">Blood Test Overview</h2>
            
            <div className="h-80">
              <Bar data={chartData} options={chartOptions} />
            </div>
            
            <div className="mt-8">
              <h3 className="text-lg font-medium text-white mb-4">Detailed Results</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead>
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Marker</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Your Value</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Reference Range</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {Object.entries(results).map(([key, item]) => (
                      <tr key={key} className="hover:bg-gray-800">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200">
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {item.value} {item.unit}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {item.reference}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${item.status === 'normal' 
                              ? 'bg-green-100 text-green-800' 
                              : item.status === 'borderline' 
                                ? 'bg-yellow-100 text-yellow-800' 
                                : item.status === 'high' 
                                  ? 'bg-red-100 text-red-800' 
                                  : 'bg-blue-100 text-blue-800'}`}>
                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'insights' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white">Key Insights</h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              {insights.map((insight, index) => (
                <div 
                  key={index} 
                  className={`border rounded-lg p-4 ${
                    insight.type === 'warning' 
                      ? 'border-yellow-500 bg-yellow-500/10' 
                      : insight.type === 'success' 
                        ? 'border-green-500 bg-green-500/10' 
                        : 'border-blue-500 bg-blue-500/10'
                  }`}
                >
                  <div className="flex items-start">
                    <div className={`flex-shrink-0 ${
                      insight.type === 'warning' 
                        ? 'text-yellow-400' 
                        : insight.type === 'success' 
                          ? 'text-green-400' 
                          : 'text-blue-400'
                    }`}>
                      <insight.icon className="h-6 w-6" />
                    </div>
                    <div className="ml-3">
                      <h3 className={`text-sm font-medium ${
                        insight.type === 'warning' 
                          ? 'text-yellow-300' 
                          : insight.type === 'success' 
                            ? 'text-green-300' 
                            : 'text-blue-300'
                      }`}>
                        {insight.title}
                      </h3>
                      <div className="mt-2 text-sm text-gray-300">
                        <p>{insight.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'recommendations' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white">Personalized Recommendations</h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              {recommendations.map((recommendation, index) => (
                <div key={index} className="border border-gray-700 rounded-lg p-4 bg-gray-800/50">
                  <h3 className="text-lg font-medium text-white flex items-center">
                    {recommendation.icon && <recommendation.icon className="mr-2 text-primary-400" />}
                    {recommendation.category}
                  </h3>
                  <ul className="mt-4 space-y-2">
                    {recommendation.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <span className="text-primary-400 mr-2">•</span>
                        <span className="text-sm text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
              <div className="flex items-center">
                <FiInfo className="h-5 w-5 text-gray-400" />
                <p className="ml-3 text-sm text-gray-300">
                  These recommendations are generated based on your test results and general health guidelines. 
                  Always consult with a healthcare professional before making significant changes to your diet, exercise routine, or medication.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 