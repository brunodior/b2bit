import  { ReactNode } from 'react';
import  {UserProvider}  from '../context/UserContext';

interface MockUserProviderProps {
  children: ReactNode;
  value?: any;
}

export const MockUserProvider = ({ children }: MockUserProviderProps) => {
  return (
    <UserProvider>
      {children}
    </UserProvider>
  );
};
