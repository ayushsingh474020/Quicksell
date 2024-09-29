import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faFlag, faCheckCircle, faExclamationCircle, faCircleNotch, faTasks, faHourglassHalf } from '@fortawesome/free-solid-svg-icons'; // Importing necessary icons

const statusIcons = {
  todo: { icon: faTasks, color: 'blue' },
  inprogress: { icon: faHourglassHalf, color: 'orange' },
  cancelled: { icon: faExclamationCircle, color: 'red' },
  done: { icon: faCheckCircle, color: 'green' },
  backlog: { icon: faFlag, color: 'gray' },
};

const priorityIcons = {
  urgent: { icon: faFlag, color: 'red' },
  high: { icon: faFlag, color: 'orange' },
  medium: { icon: faFlag, color: 'yellow' },
  low: { icon: faFlag, color: 'green' },
  nopriority: { icon: faFlag, color: 'gray' },
};


const getRandomColor = () => {
  const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A6'];
  return colors[Math.floor(Math.random() * colors.length)];
};

const Icon = ({ groupKey, grouping }) => {
  const getIcon = () => {
    if (grouping === "User") {
      const initials = groupKey.split(' ').map(name => name.charAt(0)).join('');
      const backgroundColor = getRandomColor();
      return (
        <div style={{
          backgroundColor,
          color: 'white',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          fontSize: '16px',
          marginRight: '8px',
        }}>
          {initials}
        </div>
      );
    } else if (grouping === "Status") {
      const statusInfo = statusIcons[groupKey.toLowerCase().replace(/\s/g, '')];
      if (statusInfo) {
        return (
          <FontAwesomeIcon
            icon={statusInfo.icon}
            style={{
              marginRight: '8px',
              color: statusInfo.color,
            }}
          />
        );
      } else {
        return <span style={{ marginRight: '8px' }}>?</span>;
      }
    } else if (grouping === "Priority") {
      const priorityInfo = priorityIcons[groupKey.toLowerCase().replace(/\s/g, '')];
      if (priorityInfo) {
        return (
          <FontAwesomeIcon
            icon={priorityInfo.icon}
            style={{
              marginRight: '8px',
              color: priorityInfo.color,
            }}
          />
        );
      } else {
        return <span style={{ marginRight: '8px' }}>?</span>;
      }
    } else {
      return <FontAwesomeIcon icon={faFlag} style={{ marginRight: '8px' }} />;
    }
  };

  return (
    <div>
      {getIcon()}
    </div>
  );
};

export default Icon;
