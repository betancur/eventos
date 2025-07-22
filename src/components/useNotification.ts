import { useState, useCallback } from 'react';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

interface NotificationState {
  id: string;
  type: NotificationType;
  message: string;
  isVisible: boolean;
}

export const useNotification = () => {
  const [notifications, setNotifications] = useState<NotificationState[]>([]);

  const showNotification = useCallback((type: NotificationType, message: string, duration?: number) => {
    const id = Date.now().toString();
    const notification: NotificationState = {
      id,
      type,
      message,
      isVisible: true
    };

    setNotifications(prev => [...prev, notification]);

    // Auto-hide notification after duration
    if (duration !== 0) { // 0 means don't auto-hide
      setTimeout(() => {
        setNotifications(prev => 
          prev.map(notification => 
            notification.id === id 
              ? { ...notification, isVisible: false }
              : notification
          )
        );

        // Remove from array after animation completes
        setTimeout(() => {
          setNotifications(prev => prev.filter(notification => notification.id !== id));
        }, 300);
      }, duration || 3000);
    }

    return id;
  }, []);

  const hideNotification = useCallback((id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isVisible: false }
          : notification
      )
    );

    // Remove from array after animation completes
    setTimeout(() => {
      setNotifications(prev => prev.filter(notification => notification.id !== id));
    }, 300);
  }, []);

  const showSuccess = useCallback((message: string, duration?: number) => {
    return showNotification('success', message, duration);
  }, [showNotification]);

  const showError = useCallback((message: string, duration?: number) => {
    return showNotification('error', message, duration);
  }, [showNotification]);

  const showWarning = useCallback((message: string, duration?: number) => {
    return showNotification('warning', message, duration);
  }, [showNotification]);

  const showInfo = useCallback((message: string, duration?: number) => {
    return showNotification('info', message, duration);
  }, [showNotification]);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  return {
    notifications,
    showNotification,
    hideNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    clearAll
  };
};
