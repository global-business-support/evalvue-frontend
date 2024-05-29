import React, { useState } from 'react';

function CompanyList() {
  const [companies, setCompanies] = useState([
    { id: 1, name: "Company A" },
    { id: 2, name: "Company B" },
    { id: 3, name: "Company C" }
  ]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [employees, setEmployees] = useState([]);

  // Function to fetch employees for a selected company
  const fetchEmployees = (companyId) => {
    // Dummy API endpoint - replace with your actual API endpoint
    // In a real scenario, you would make an API call here
    const dummyEmployees = [
      { id: 1, name: "Employee 1", position: "Developer" },
      { id: 2, name: "Employee 2", position: "Manager" },
      { id: 3, name: "Employee 3", position: "Designer" }
    ];
    
    // Simulate API call delay with setTimeout
    setTimeout(() => {
      setEmployees(dummyEmployees);
      setSelectedCompany(companyId);
    }, 1000);
  };

  return (
    <div>
      <h1>Company List</h1>
      <ul>
        {companies.map(company => (
          <li key={company.id}>
            {company.name}
            <button onClick={() => fetchEmployees(company.id)}>View</button>
          </li>
        ))}
      </ul>
      {selectedCompany && (
        <div>
          <h2>{companies.find(company => company.id === selectedCompany).name}</h2>
          <h3>Employees:</h3>
          <ul>
            {employees.map(employee => (
              <li key={employee.id}>
                {employee.name} - {employee.position}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CompanyList;
