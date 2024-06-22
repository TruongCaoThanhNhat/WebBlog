import React from 'react';
import './dashboard.scss';
import Card from './Card';

function Dashboard() {
  const data = [
    {
      _id: 1,
      name: "Sales",
      icon: "bi bi-cart",
      amount: 145,
      percentage: 0.12,
    },
    {
      _id: 2,
      name: "Revenue",
      icon: "bi bi-currency-dollar",
      amount: 3246,
      percentage: 0.08,
    },
    {
      _id: 3,
      name: "Customers",
      icon: "bi bi-people",
      amount: 1244,
      percentage: -0.11,
    }
  ];

  return (
    <section className="dashboard section">
      <div className="dashboard-container">
        {data.map((card) => (
          <div key={card._id} className="col-lg-3">
            <Card
              name={card.name}
              icon={card.icon}
              amount={card.amount}
              percentage={card.percentage}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Dashboard;
