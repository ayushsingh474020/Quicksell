import React from 'react';

const Tag = ({ tag }) => {
  return (
    <span className="tag-box">
      {tag}
      <style jsx>{`
        .tag-box {
          display: inline-block;
          padding: 4px 8px;
          margin: 20px 0px 0px 0px ;
          color: gray;
          border: 2px solid gray;
          background-color: whitw; /* Light grey background */
          border-radius: 4px; /* Rounded corners */
          font-size: 0.85em; /* Slightly smaller text */
        }
      `}</style>
    </span>
  );
};

export default Tag;
