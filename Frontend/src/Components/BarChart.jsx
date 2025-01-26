import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const BarChart = ({ users = 1, jobs, applications }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null); // To store chart instance

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // Destroy previous chart if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Create a new chart
    chartInstanceRef.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Users', 'Jobs', 'Applications'],
        datasets: [
          {
            label: 'Data',
            data: [users, jobs, applications],
            backgroundColor: ['#4CAF50', '#FFC107', '#2196F3'],
          },
        ],
      },
      options: {},
    });

    // Cleanup function to destroy chart on unmount
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [users, jobs, applications]); // Add dependencies to re-render when props change

  return <canvas ref={chartRef}></canvas>;
};

export default BarChart;
