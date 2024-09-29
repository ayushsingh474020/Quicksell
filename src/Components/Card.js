import React from 'react';
import Tag from './Tag';

const Card = ({ title, id, tags }) => {
  return (
    <div className="card">
      <h3 style={{ textTransform: 'uppercase', color:"gray"}}>{id}</h3>
      <h3 style={{ margin: '4px 0' }}>{title}</h3>
      <div className="tags-container">
        {tags.map((tag, index) => (
          <Tag key={index} tag={tag} />
        ))}
      </div>
      <style jsx>{`
        .card {
          border: 1px solid #ccc;
          border-radius: 10px; /* Increased border radius */
          padding: 12px; /* Reduced padding for a smaller height */
          margin: 8px 0;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          background-color: #f9f9f9; /* Optional background color */
          transition: box-shadow 0.2s ease-in-out;
        }
        .card:hover {
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Add subtle hover effect */
        }
        h3 {
          font-size: 1.1em; /* ID font size (slightly reduced) */
          margin: 0;
        }
        h4 {
          font-size: 1em; /* Title font size */
          margin: 4px 0;
        }
        .tags-container {
          margin-top: 8px;
          display: flex;
          flex-wrap: wrap;
        }
      `}</style>
    </div>
  );
};

export default Card;
