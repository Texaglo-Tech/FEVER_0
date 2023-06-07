import { useMemo, useState, useCallback, useContext } from 'react';
import WalletContext from './WalletContext';

import { ProviderProps } from '../types';

const WalletProvider = (props: ProviderProps) => {
  const [address, setWalletAddress] = useState("");
  const setAddress = useCallback(async (addr) => {
    setWalletAddress(addr);
    
  }, [address]);

  let wrapperValues = {
    address, 
    setAddress,
  };

  return (    
            <WalletContext.Provider value={wrapperValues}>
              { props.children }
            </WalletContext.Provider>
          );
};

export default WalletProvider;
