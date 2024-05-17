import  { ReactNode } from 'react';
import { Context } from '../context/UserContext';

interface MockUserProviderProps {
  children: ReactNode;
  value?: any;
}

export const MockUserProvider = ({ children, value }: MockUserProviderProps) => {
  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
};
