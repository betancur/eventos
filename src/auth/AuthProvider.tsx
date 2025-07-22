import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, AuthState, LoginCredentials, RegisterCredentials } from './types';
import { firebaseAuthApi, firebaseUserApi } from './firebaseAuth';
import { mockAuthApi, mockUserApi, useMockAuth } from './mockAuth';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>;
  register: (credentials: RegisterCredentials) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  updateProfile: (updates: Partial<User>) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null
  });

  const useMock = useMockAuth();

  // Initialize auth state
  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        if (useMock) {
          // Use mock auth - initialize as logged out
          setState({
            user: null,
            loading: false,
            error: null
          });
        } else {
          // Use Firebase
          const { data: { session } } = firebaseAuthApi.getSession();
          
          if (session?.user && mounted) {
            const { data: profile, error } = await firebaseUserApi.getProfile(session.user.uid);
            
            if (profile && !error) {
              const user: User = {
                id: session.user.uid,
                email: session.user.email!,
                name: profile.name,
                avatar_url: profile.avatar_url,
                role: profile.role || 'attendee',
                created_at: profile.created_at,
                updated_at: profile.updated_at
              };
              
              setState({
                user,
                loading: false,
                error: null
              });
            } else {
              setState({
                user: null,
                loading: false,
                error: null
              });
            }
          } else {
            setState({
              user: null,
              loading: false,
              error: null
            });
          }
        }
      } catch (error) {
        if (mounted) {
          setState({
            user: null,
            loading: false,
            error: 'Failed to initialize authentication'
          });
        }
      }
    };

    initializeAuth();

    // Set up auth state listener
    let subscription: any = null;
    
    if (!useMock) {
      const { data: { subscription: authSubscription } } = firebaseAuthApi.onAuthStateChange(async (event: string, session: any) => {
        if (!mounted) return;

        if (event === 'SIGNED_IN' && session?.user) {
          const { data: profile } = await firebaseUserApi.getProfile(session.user.uid);
          
          if (profile) {
            const user: User = {
              id: session.user.uid,
              email: session.user.email!,
              name: profile.name,
              avatar_url: profile.avatar_url,
              role: profile.role || 'attendee',
              created_at: profile.created_at,
              updated_at: profile.updated_at
            };
            
            setState({
              user,
              loading: false,
              error: null
            });
          }
        } else if (event === 'SIGNED_OUT') {
          setState({
            user: null,
            loading: false,
            error: null
          });
        }
      });
      
      subscription = authSubscription;
    }

    return () => {
      mounted = false;
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [useMock]);

  const login = async (credentials: LoginCredentials) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      if (useMock) {
        const { data, error } = await mockAuthApi.signIn(credentials.email, credentials.password);
        
        if (error) {
          setState(prev => ({ ...prev, loading: false, error: error.message }));
          return { success: false, error: error.message };
        }

        if (data?.user) {
          const { data: profile } = await mockUserApi.getProfile(data.user.id);
          
          if (profile) {
            setState({
              user: profile as User,
              loading: false,
              error: null
            });
          }
        }
        
        return { success: true };
      } else {
        const { error } = await firebaseAuthApi.signIn(credentials.email, credentials.password);
        
        if (error) {
          setState(prev => ({ ...prev, loading: false, error: error.message }));
          return { success: false, error: error.message };
        }

        // Auth state change will handle setting the user
        setState(prev => ({ ...prev, loading: false }));
        return { success: true };
      }
    } catch (error: any) {
      const errorMessage = error.message || 'Login failed';
      setState(prev => ({ ...prev, loading: false, error: errorMessage }));
      return { success: false, error: errorMessage };
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      if (useMock) {
        const { data, error } = await mockAuthApi.signUp(
          credentials.email,
          credentials.password,
          {
            name: credentials.name,
            role: credentials.role || 'attendee'
          }
        );
        
        if (error) {
          setState(prev => ({ ...prev, loading: false, error: error.message }));
          return { success: false, error: error.message };
        }

        if (data?.user) {
          await mockUserApi.createProfile({
            id: data.user.id,
            email: data.user.email,
            name: credentials.name,
            role: credentials.role || 'attendee',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });
        }
        
        setState(prev => ({ ...prev, loading: false }));
        return { success: true };
      } else {
        const { error } = await firebaseAuthApi.signUp(
          credentials.email,
          credentials.password,
          {
            name: credentials.name,
            role: credentials.role || 'attendee'
          }
        );
        
        if (error) {
          setState(prev => ({ ...prev, loading: false, error: error.message }));
          return { success: false, error: error.message };
        }

        // Profile is created automatically during signup
        setState(prev => ({ ...prev, loading: false }));
        return { success: true };
      }
    } catch (error: any) {
      const errorMessage = error.message || 'Registration failed';
      setState(prev => ({ ...prev, loading: false, error: errorMessage }));
      return { success: false, error: errorMessage };
    }
  };

  const logout = async () => {
    setState(prev => ({ ...prev, loading: true }));
    
    try {
      if (useMock) {
        await mockAuthApi.signOut();
      } else {
        await firebaseAuthApi.signOut();
      }
      
      setState({
        user: null,
        loading: false,
        error: null
      });
    } catch (error: any) {
      setState(prev => ({ ...prev, loading: false, error: error.message }));
    }
  };

  const resetPassword = async (email: string) => {
    try {
      if (useMock) {
        const { data, error } = await mockAuthApi.resetPassword(email);
        
        if (error) {
          return { success: false, error: error.message };
        }
        
        return { success: true };
      } else {
        const { error } = await firebaseAuthApi.resetPassword(email);
        
        if (error) {
          return { success: false, error: error.message };
        }
        
        return { success: true };
      }
    } catch (error: any) {
      return { success: false, error: error.message || 'Password reset failed' };
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!state.user) {
      return { success: false, error: 'No user logged in' };
    }

    setState(prev => ({ ...prev, loading: true }));
    
    try {
      if (useMock) {
        const { data, error } = await mockUserApi.updateProfile(state.user.id, {
          ...updates,
          updated_at: new Date().toISOString()
        });
        
        if (error) {
          setState(prev => ({ ...prev, loading: false, error: error.message }));
          return { success: false, error: error.message };
        }

        if (data) {
          setState({
            user: data as User,
            loading: false,
            error: null
          });
        }
        
        return { success: true };
      } else {
        const { data, error } = await firebaseUserApi.updateProfile(state.user.id, updates);
        
        if (error) {
          setState(prev => ({ ...prev, loading: false, error: error.message }));
          return { success: false, error: error.message };
        }

        if (data) {
          const updatedUser: User = {
            ...state.user,
            ...updates,
            updated_at: data.updated_at
          };
          
          setState({
            user: updatedUser,
            loading: false,
            error: null
          });
        }
        
        return { success: true };
      }
    } catch (error: any) {
      const errorMessage = error.message || 'Profile update failed';
      setState(prev => ({ ...prev, loading: false, error: errorMessage }));
      return { success: false, error: errorMessage };
    }
  };

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    resetPassword,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
