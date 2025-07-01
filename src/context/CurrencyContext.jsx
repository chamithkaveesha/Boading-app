import { createContext, useContext, useState } from 'react';

const CurrencyContext = createContext();

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('LKR'); // Default currency
  
  const formatCurrency = (amount) => {
    return `${currency} ${Math.abs(amount)}`;
  };

  const formatCurrencyWithSign = (amount) => {
    const sign = amount >= 0 ? '+' : '-';
    return `${sign}${currency} ${Math.abs(amount)}`;
  };

  return (
    <CurrencyContext.Provider value={{ 
      currency, 
      setCurrency, 
      formatCurrency, 
      formatCurrencyWithSign 
    }}>
      {children}
    </CurrencyContext.Provider>
  );
};
