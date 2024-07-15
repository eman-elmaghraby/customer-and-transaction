import React, { useState, useEffect } from 'react';
import TransactionGraph from './TransactionGraph';
import '../Styles/CustomerDetails.css';
import axios from 'axios';

const CustomerDetails = ({ customer }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {

      // Fetch transactions for the selected customer
      
    axios.get(`http://localhost:5000/transactions?customer_id=${customer.id}`)
      .then(response => setTransactions(response.data))
      .catch(error => console.error('Error fetching transactions:', error));
  }, [customer.id]);

  const totalTransactionAmount = transactions.reduce((total, transaction) => total + transaction.amount, 0);
  const numberOfTransactions = transactions.length;

  return (
    <tr>
      <td>{customer.id}</td>
      <td>{customer.name}</td>
      <td>{totalTransactionAmount}</td>
      <td>{numberOfTransactions}</td>
      <td>
        <TransactionGraph transactions={transactions} />
      </td>
    </tr>
  );
};

export default CustomerDetails;
