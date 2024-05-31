import React, { useEffect, useState } from 'react';
import "../../../static/styles/css/notification-toggle.css";
import { client } from '../../util/client';
function NotificationToggle() {

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
  
    client.get(`${process.env.REACT_APP_API_URL}/v1/auth/auction/alarm`)
      .then(response => {
        setNotifications(response.data.data); 
      })
      .catch(error => {
        console.error('알림 데이터를 가져오는데 실패했습니다:', error);
      });
  }, []);

  return (
    <div className="notification-toggle">
      <div className="notification-toggle-header">
        <h2>알림</h2>
      </div>
      <div className="notification-toggle-body">
        {notifications.length === 0 ? (
            <p className="empty-notification-message">알림이 없습니다.</p>
          ) : (
            <ul>
              {notifications.map((notification, index) => (
                <li key={index}>{notification}</li>
              ))}
            </ul>
          )}
      </div>
    </div>
  );
}

export default NotificationToggle;
