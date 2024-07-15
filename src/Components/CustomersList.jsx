import React, { useState } from 'react';
import CustomerDetails from './CustomerDetails';
import '../Styles/CustomersList.css';

const CustomersList = ({ customers }) => {
  const [filter, setFilter] = useState('');
  const [filterBy, setFilterBy] = useState('name');


   // Handle changes in filter input
   
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleFilterByChange = (e) => {
    setFilterBy(e.target.value);
  };

  const filteredCustomers = customers.filter((customer) => {
    if (filterBy === 'name') {
      return customer.name.toLowerCase().includes(filter.toLowerCase());
    } else if (filterBy === 'transactionAmount') {
      return customer.transactionAmount?.toString().includes(filter) || false; // Ensure it’s not undefined
    }
    return true;
  });
  

  return (
    <div className="customers-list">
      <h2>Customers List</h2>
      <div className="filter">
        <select value={filterBy} onChange={handleFilterByChange}>
          <option value="name">Name</option>
          <option value="transactionAmount">Transaction Amount</option>
        </select>
        <input
          type="text"
          value={filter}
          onChange={handleFilterChange}
          placeholder={`Filter by ${filterBy}`}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Transaction Amount</th>
            <th>Number of Transactions</th>
            <th>Transaction Amount Over Time</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer) => (
            <CustomerDetails key={customer.id} customer={customer} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomersList;
