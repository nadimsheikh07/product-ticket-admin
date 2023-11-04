import { CompanyContext } from '@/contexts/CompanyContext';
import { useContext } from 'react';
//

const useCompany = () => {
  const context = useContext(CompanyContext);

  if (!context) throw new Error('Auth context must be use inside AuthProvider');

  return context;
};

export default useCompany;