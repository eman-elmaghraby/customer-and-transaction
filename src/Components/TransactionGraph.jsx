import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import '../Styles/TransactionGraph.css';

// Register the required components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler);

const aggregateTransactions = (transactions) => {
  const aggregated = {};

  transactions.forEach(transaction => {
    const date = new Date(transaction.date).toISOString().split('T')[0];
    if (!aggregated[date]) {
      aggregated[date] = 0;
    }
    aggregated[date] += transaction.amount;
  });

  const labels = Object.keys(aggregated);
  const data = Object.values(aggregated);

  return {
    labels,
    datasets: [
      {
        label: 'Total Transaction Amount',
        data,
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };
};

const TransactionGraph = ({ transactions }) => {
  const chartData = aggregateTransactions(transactions);

  return (
    <div className="transaction-graph">
      <h2>Transaction Amount Over Time</h2>
      <Line data={chartData} />
    </div>
  );
};

export default TransactionGraph;
