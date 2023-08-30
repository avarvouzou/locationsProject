import type { Dispatch, ReactElement, ReactNode, SetStateAction } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import '@/styles/globals.css'
import {createContext, useContext, useEffect, useState} from "react";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

type CurrencyType = 'usd' | 'eur';
type CurrencyContextType = {
  currency: CurrencyType;
  setCurrency: React.Dispatch<React.SetStateAction<CurrencyType>>;
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [currency, setCurrency] = useState<CurrencyType>('usd');
  useEffect(() => {
    const localStorageCurrency = localStorage.getItem('currency') as CurrencyType | null;
    if (localStorageCurrency) {
      setCurrency(localStorageCurrency);
    }
  }, []);

  const setLocalCurrency: Dispatch<SetStateAction<CurrencyType>> = (value: SetStateAction<CurrencyType>) => {
    setCurrency(value);
    localStorage.setItem('currency', value.toString());
  };

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)

  return getLayout(
    <CurrencyContext.Provider value={{ currency, setCurrency: setLocalCurrency }}>
      <Component {...pageProps} />
    </CurrencyContext.Provider>
  )
}

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};