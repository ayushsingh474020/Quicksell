import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Components/Card";
import Icon from "../Components/Icon";
import './HomePage.css';

const HomePage = () => {
  const groupingOptions = ["Status", "User", "Priority"];
  const orderingOptions = ["Priority", "Title"];
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState("Status");
  const [ordering, setOrdering] = useState("Priority");
  const [list, setList] = useState({});

  const priorityHeadings = {
    4: "Urgent",
    3: "High",
    2: "Medium",
    1: "Low",
    0: "No priority",
  };

  const allStatuses = ["Todo", "Backlog", "In progress", "Done", "Cancelled"];

  useEffect(() => {
    fetchInfo();
  }, []);

  useEffect(() => {
    if (tickets.length && users.length) {
      groupCards(); // Call only if data is available
    }
  }, [tickets, users, grouping, ordering]);

  const fetchInfo = async () => {
    try {
      const { data } = await axios.get(
        "https://api.quicksell.co/v1/internal/frontend-assignment"
      );
      setTickets(data.tickets);
      setUsers(data.users);
      console.log("Tickets", data.tickets);
      console.log("Users", data.users);
    } catch (error) {
      console.log(error);
    }
  };

  const groupCards = () => {
    const cards = {};
    const userMap = {};
    users.forEach(user => {
      userMap[user.id] = user.name.split(' ')[0];
    });

    if (grouping === "Status") {
      allStatuses.forEach(status => {
        cards[status] = [];
      });

      tickets.forEach(ticket => {
        cards[ticket.status].push({
          id: ticket.id,
          title: ticket.title,
          tags: ticket.tag,
          priority: ticket.priority,
        });
      });
    } else if (grouping === "Priority") {
      tickets.forEach(ticket => {
        const priorityKey = ticket.priority;
        const heading = priorityHeadings[priorityKey] || "Unknown Priority";
        if (!cards[heading]) {
          cards[heading] = [];
        }
        cards[heading].push({
          id: ticket.id,
          title: ticket.title,
          tags: ticket.tag,
          priority: ticket.priority,
        });
      });
    } else {
      tickets.forEach(ticket => {
        const username = userMap[ticket.userId] || "Unknown User";
        if (!cards[username]) {
          cards[username] = [];
        }
        cards[username].push({
          id: ticket.id,
          title: ticket.title,
          tags: ticket.tag,
          priority: ticket.priority,
        });
      });
    }

    for (let key in cards) {
      if (ordering === "Priority") {
        cards[key].sort((a, b) => a.priority - b.priority);
      } else {
        cards[key].sort((a, b) => a.title.localeCompare(b.title));
      }
    }

    setList(cards);
    console.log("List", cards);
  };

  const handleOptionsChange = (event) => {
    const { name, value } = event.target;
    if (name === "grouping") {
      setGrouping(value);
    } else if (name === "ordering") {
      setOrdering(value);
    }
  };

  return (
    <div style={{ backgroundColor: '#f0f0f0', padding: '20px', height: "100%" }}>
      <div className="options">
        <select className="dropdown" name="grouping" value={grouping} onChange={handleOptionsChange}>
          {groupingOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <select className="dropdown" name="ordering" value={ordering} onChange={handleOptionsChange}>
          {orderingOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="content">
        {Object.entries(list).map(([groupKey, tickets]) => (
          <div key={groupKey} className="group">
          <h3 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Icon groupKey={groupKey} grouping={grouping} />
              <span style={{ marginRight: '8px' }}>{groupKey} {tickets.length}</span>
              {/* <span style={{ color: "gray", marginLeft: "15px" }}>{tickets.length}</span> */}
            </div>
            <span style={{ cursor: 'pointer', fontSize: '30px' }}>+ ---</span>
          </h3>
            {tickets.length === 0 ? (
              <p>No tickets available</p>
            ) : (
              tickets.map((ticket) => (
                <Card
                  key={ticket.id}
                  title={ticket.title}
                  id={ticket.id}
                  tags={ticket.tags}
                />
              ))
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
