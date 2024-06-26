import React from 'react';
import './card.scss';

function Card({ name, icon, amount, percentage }) {
  const percentageClass = percentage >= 0 ? 'increase' : 'decrease';

  return (
    <div className="card">
      <div className="card-header">
        <span>{name} | Today</span>
        <i className="bi bi-three-dots"></i>
      </div>
      <div className="card-body">
        <i className={icon}></i>
        <h3>{amount.toLocaleString()}</h3>
        <p className={percentageClass}>
          {Math.abs(percentage * 100).toFixed(1)}% {percentage >= 0 ? 'Increase' : 'Decrease'}
        </p>
      </div>
    </div>
  );
}

export default Card;
