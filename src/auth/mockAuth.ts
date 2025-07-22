// Mock auth implementation for development
// This will be replaced with real Firebase calls when configured

export const mockUsers = [
  {
    id: '1',
    email: 'admin@eventos.com',
    password: 'password123',
    name: 'Admin User',
    role: 'admin' as const,
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '2',
    email: 'organizer@eventos.com',
    password: 'password123',
    name: 'Event Organizer',
    role: 'organizer' as const,
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '3',
    email: 'attendee@eventos.com',
    password: 'password123',
    name: 'John Attendee',
    role: 'attendee' as const,
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z'
  }
];

// Check if we should use mock data (when Firebase is not configured or disabled)
export const useMockAuth = () => {
  const useMock = process.env.REACT_APP_USE_MOCK_AUTH;
  const firebaseApiKey = process.env.REACT_APP_FIREBASE_API_KEY;
  
  return useMock === 'true' || !firebaseApiKey || firebaseApiKey.includes('your_api_key');
};

export const mockAuthApi = {
  signUp: async (email: string, password: string, metadata: any = {}) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      return { 
        data: null, 
        error: { message: 'User already registered' } 
      };
    }
    
    // Create new user
    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      name: metadata.name || '',
      role: metadata.role || 'attendee',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    mockUsers.push(newUser);
    
    return {
      data: {
        user: {
          id: newUser.id,
          email: newUser.email
        }
      },
      error: null
    };
  },

  signIn: async (email: string, password: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = mockUsers.find(u => u.email === email && u.password === password);
    
    if (!user) {
      return {
        data: null,
        error: { message: 'Invalid login credentials' }
      };
    }
    
    return {
      data: {
        user: {
          id: user.id,
          email: user.email
        }
      },
      error: null
    };
  },

  signOut: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { error: null };
  },

  getCurrentUser: async () => {
    // In a real app, this would check for stored session
    return { data: { user: null }, error: null };
  },

  getSession: async () => {
    return { data: { session: null }, error: null };
  },

  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    // Mock subscription
    return {
      data: {
        subscription: {
          unsubscribe: () => {}
        }
      }
    };
  },

  resetPassword: async (email: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const user = mockUsers.find(u => u.email === email);
    
    if (!user) {
      return {
        data: null,
        error: { message: 'No user found with this email' }
      };
    }
    
    return { data: { message: 'Password reset email sent' }, error: null };
  },

  updatePassword: async (password: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { data: { message: 'Password updated' }, error: null };
  }
};

export const mockUserApi = {
  getProfile: async (userId: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const user = mockUsers.find(u => u.id === userId);
    
    if (!user) {
      return { data: null, error: { message: 'User not found' } };
    }
    
    const { password, ...profile } = user;
    return { data: profile, error: null };
  },

  updateProfile: async (userId: string, updates: any) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const userIndex = mockUsers.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      return { data: null, error: { message: 'User not found' } };
    }
    
    mockUsers[userIndex] = {
      ...mockUsers[userIndex],
      ...updates,
      updated_at: new Date().toISOString()
    };
    
    const { password, ...profile } = mockUsers[userIndex];
    return { data: profile, error: null };
  },

  createProfile: async (profile: any) => {
    // Profile is already created in signUp for mock
    const { password, ...cleanProfile } = profile;
    return { data: cleanProfile, error: null };
  }
};
