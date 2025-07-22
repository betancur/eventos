import React, { createContext, useContext, ReactNode } from 'react';
import { useNotification, NotificationType } from './useNotification';

interface NotificationContextType {
  showNotification: (type: NotificationType, message: string, duration?: number) => string;
  showSuccess: (message: string, duration?: number) => string;
  showError: (message: string, duration?: number) => string;
  showWarning: (message: string, duration?: number) => string;
  showInfo: (message: string, duration?: number) => string;
  hideNotification: (id: string) => void;
  clearAll: () => void;
  notifications: Array<{
    id: string;
    type: NotificationType;
    message: string;
    isVisible: boolean;
  }>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const notificationHook = useNotification();

  const value: NotificationContextType = {
    ...notificationHook
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
