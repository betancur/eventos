import React from 'react';
import Notification from './Notification';
import { useNotifications } from './NotificationProvider';

const NotificationContainer: React.FC = () => {
  const { notifications, hideNotification } = useNotifications();

  return (
    <>
      {notifications.map((notification, index) => (
        <div
          key={notification.id}
          style={{
            position: 'fixed',
            top: `${20 + index * 80}px`, // Stack notifications vertically
            right: '20px',
            zIndex: 1000 + index
          }}
        >
          <Notification
            type={notification.type}
            message={notification.message}
            isVisible={notification.isVisible}
            onClose={() => hideNotification(notification.id)}
          />
        </div>
      ))}
    </>
  );
};

export default NotificationContainer;
