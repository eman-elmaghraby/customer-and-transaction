import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CustomersList from './CustomersList';
import TransactionGraph from './TransactionGraph';
import '../Styles/Dashboard.css';

const Dashboard = () => {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
      // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        const customersResponse = await axios.get('http://localhost:5000/customers');
        const transactionsResponse = await axios.get('http://localhost:5000/transactions');

        const customersWithTransactions = customersResponse.data.map(customer => {
          const customerTransactions = transactionsResponse.data.filter(transaction => transaction.customer_id === customer.id);
          return {
            ...customer,
            transactionAmount: customerTransactions.reduce((acc, t) => acc + t.amount, 0),
            numberOfTransactions: customerTransactions.length
          };
        });

        setCustomers(customersWithTransactions);
        setTransactions(transactionsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <h1>Customer Dashboard</h1>
      <CustomersList customers={customers} />
      <TransactionGraph transactions={transactions} />
    </div>
  );
};

export default Dashboard;
