import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { FiAlertCircle, FiCheckCircle, FiInfo, FiActivity, FiList, FiBook } from 'react-icons/fi';

// Register Chart.js components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Helper to parse value string (e.g., "150 mg/dL" or "150") to float
const parseValue = (valueString) => {
  if (typeof valueString === 'number') return valueString;
  if (typeof valueString === 'string') {
    const match = valueString.match(/^[\d.]+/);
    return match ? parseFloat(match[0]) : NaN;
  }
  return NaN;
};

const getStatusColor = (status, type = 'rgba', opacity = 0.6) => {
  status = status ? status.toLowerCase() : 'unknown';
  switch (status) {
    case 'low':
      return type === 'rgb' ? 'rgb(59, 130, 246)' : `rgba(59, 130, 246, ${opacity})`; // Blue
    case 'normal':
      return type === 'rgb' ? 'rgb(16, 185, 129)' : `rgba(16, 185, 129, ${opacity})`; // Green
    case 'borderline':
      return type === 'rgb' ? 'rgb(245, 158, 11)' : `rgba(245, 158, 11, ${opacity})`; // Yellow
    case 'high':
      return type === 'rgb' ? 'rgb(239, 68, 68)' : `rgba(239, 68, 68, ${opacity})`; // Red
    case 'inconclusive':
    case 'unknown':
    default:
      return type === 'rgb' ? 'rgb(107, 114, 128)' : `rgba(107, 114, 128, ${opacity})`; // Gray
  }
};

export default function ResultsDashboard({ results }) {
  const [activeTab, setActiveTab] = useState('overview');

  // results is now { findings: Array, summary: string, normalRanges: Object }
  if (!results || !results.findings || results.findings.length === 0) {
    // Display AI summary even if findings are empty or there's an error indicated in findings
    if (results && results.summary) {
      return (
        <div className="card-dark p-6">
          <h2 className="text-xl font-bold text-white mb-4">AI Summary</h2>
          <p className="text-gray-300 whitespace-pre-wrap">{results.summary}</p>
          {results.findings && results.findings.length > 0 && results.findings[0].test === "Analysis Error" && (
            <div className="mt-4 p-4 bg-red-900/50 border border-red-700 rounded-md">
              <p className="text-red-300">{results.findings[0].comment}</p>
            </div>
          )}
        </div>
      );
    }
    return (
      <div className="text-center py-12 text-gray-300">
        <p>No analysis results to display. Please upload your blood test results.</p>
      </div>
    );
  }
  
  const { findings, summary, normalRanges } = results;

  // Prepare data for the chart
  const chartData = {
    labels: findings.map(item => item.test),
    datasets: [
      {
        label: 'Your Values',
        data: findings.map(item => parseValue(item.value)), // Use helper to parse
        backgroundColor: findings.map(item => getStatusColor(item.status, 'rgba')),
        borderColor: findings.map(item => getStatusColor(item.status, 'rgb')),
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
        labels: { color: 'rgba(229, 231, 235, 0.9)' }
      },
      title: {
        display: true,
        text: 'Your Blood Test Results Overview',
        color: 'rgba(229, 231, 235, 0.9)'
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const finding = findings[context.dataIndex];
            if (!finding) return '';
            
            const lines = [];
            lines.push(`${finding.test}: ${finding.value || 'N/A'} ${finding.unit || ''}`);
            lines.push(`Status: ${finding.status ? finding.status.charAt(0).toUpperCase() + finding.status.slice(1) : 'N/A'}`);
            if (finding.referenceRange) {
              lines.push(`Reference: ${finding.referenceRange}`);
            }
            if (finding.comment) { // Changed from recommendation to comment for tooltip
              lines.push(`Comment: ${finding.comment}`);
            }
            return lines;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false, // Allow for better visualization if values are far from zero
        grid: { color: 'rgba(75, 85, 99, 0.2)' },
        ticks: { color: 'rgba(209, 213, 219, 0.8)' }
      },
      x: {
        grid: { color: 'rgba(75, 85, 99, 0.2)' },
        ticks: { color: 'rgba(209, 213, 219, 0.8)' }
      }
    },
  };
  
  // Updated Insights and Recommendations to use AI summary and findings
  const aiSummaryInsight = {
    type: 'info',
    title: 'AI General Summary',
    description: summary || "The AI did not provide an overall summary.",
    icon: FiInfo,
  };

  const abnormalFindingsInsights = findings
    .filter(finding => finding.status && finding.status.toLowerCase() !== 'normal' && finding.status.toLowerCase() !== 'unknown' && finding.status.toLowerCase() !== 'inconclusive')
    .map(finding => ({
      type: (finding.status.toLowerCase() === 'high' || finding.status.toLowerCase() === 'low') ? 'warning' : 'info',
      title: `${finding.test} is ${finding.status}`,
      description: `${finding.comment || 'No specific comment provided by AI.'} (Value: ${finding.value} ${finding.unit || ''}, Range: ${finding.referenceRange || 'N/A'})`,
      icon: FiAlertCircle,
    }));

  const displayedInsights = [aiSummaryInsight, ...abnormalFindingsInsights];
  
  if (displayedInsights.length === 1 && !summary) { // Only aiSummaryInsight and summary is empty
     displayedInsights.push({
        type: 'info',
        title: 'No Specific Insights',
        description: 'The AI analysis did not highlight specific issues or the summary was not available.',
        icon: FiInfo,
      });
  }


  // Recommendations can be more generic or also taken from summary if available
  const generalRecommendations = [
    {
      category: 'General Advice from AI',
      icon: FiBook,
      items: summary ? summary.split('\n').filter(line => line.trim().length > 5) : ["No specific recommendations provided in the summary. Please refer to the detailed findings and consult a healthcare professional."],
    },
    {
      category: 'Standard Health Practices',
      icon: FiCheckCircle,
      items: [
        'Maintain a balanced diet and stay hydrated.',
        'Engage in regular physical activity.',
        'Ensure adequate sleep (7-9 hours per night).',
        'Manage stress effectively.',
        'Attend regular check-ups with your healthcare provider.',
        'Discuss any concerns or abnormal results from this report with your doctor.',
      ]
    }
  ];
  // Further, individual finding comments could be listed as recommendations if they are actionable.
  const findingBasedRecommendations = findings
    .filter(f => f.comment && (f.status.toLowerCase() !== 'normal' && f.status.toLowerCase() !== 'unknown' && f.status.toLowerCase() !== 'inconclusive'))
    .map(f => ({
      category: `Regarding ${f.test} (${f.status})`,
      icon: FiAlertCircle,
      items: [f.comment]
    }));
  
  const displayedRecommendations = [...findingBasedRecommendations, ...generalRecommendations];

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
            
            {findings && findings.length > 0 && findings[0].test !== "Analysis Error" ? (
              <div className="h-80 md:h-96"> {/* Adjusted height for responsiveness */}
                <Bar data={chartData} options={chartOptions} />
              </div>
            ) : (
              <p className="text-gray-400">Chart data is unavailable due to missing or erroneous findings.</p>
            )}
            
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
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Comment</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {findings.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-800">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200">
                          {item.test || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {`${item.value || 'N/A'} ${item.unit || ''}`.trim()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {item.referenceRange || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${item.status && item.status.toLowerCase() === 'normal' 
                              ? 'bg-green-700 text-green-100' 
                              : (item.status && (item.status.toLowerCase() === 'borderline' || item.status.toLowerCase() === 'inconclusive'))
                                ? 'bg-yellow-700 text-yellow-100' 
                                : (item.status && (item.status.toLowerCase() === 'high' || item.status.toLowerCase() === 'low'))
                                  ? 'bg-red-700 text-red-100' 
                                  : 'bg-gray-700 text-gray-100'}`}>
                            {item.status ? item.status.charAt(0).toUpperCase() + item.status.slice(1) : 'Unknown'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-normal text-sm text-gray-400 max-w-xs"> {/* Allow wrapping for comments */}
                          {item.comment || 'N/A'}
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
            <h2 className="text-xl font-bold text-white">Key Insights from AI</h2>
            
            <div className="grid gap-6 md:grid-cols-1"> {/* Changed to 1 column for better readability of summary */}
              {displayedInsights.map((insight, index) => (
                <div 
                  key={index} 
                  className={`border rounded-lg p-4 ${
                    insight.type === 'warning' 
                      ? 'border-yellow-600 bg-yellow-700/20' 
                    : insight.type === 'success' // Success type might not be used now
                      ? 'border-green-600 bg-green-700/20' 
                    : 'border-blue-600 bg-blue-700/20' // Default to info
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
                          ? 'text-yellow-200' 
                          : insight.type === 'success' 
                          ? 'text-green-200' 
                        : 'text-blue-200'
                      }`}>
                        {insight.title}
                      </h3>
                      <div className="mt-2 text-sm text-gray-300">
                        <p className="whitespace-pre-wrap">{insight.description}</p>
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
            <h2 className="text-xl font-bold text-white">AI-Generated Advice & General Recommendations</h2>
            
            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2"> {/* Adjusted grid for better layout */}
              {displayedRecommendations.map((recommendation, index) => (
                <div key={index} className="border border-gray-700 rounded-lg p-4 bg-gray-800/50">
                  <h3 className="text-lg font-medium text-white flex items-center">
                    {recommendation.icon && <recommendation.icon className="mr-2 text-primary-400" />}
                    {recommendation.category}
                  </h3>
                  <ul className="mt-4 space-y-2">
                    {recommendation.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <span className="text-primary-400 mr-2">•</span>
                        <span className="text-sm text-gray-300 whitespace-pre-wrap">{item}</span>
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