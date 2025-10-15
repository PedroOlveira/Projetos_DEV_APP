import React, { createContext, useState, useContext } from "react";

interface CepData {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
}

interface CepContextType {
  ceps: CepData[];
  addCep: (data: CepData) => void;
}

const CepContext = createContext<CepContextType>({} as CepContextType);

export const CepProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ceps, setCeps] = useState<CepData[]>([]);

  const addCep = (data: CepData) => {
    if (!data.cep) return;
    setCeps(prev => {
      if (prev.find(c => c.cep === data.cep)) return prev;
      return [...prev, data];
    });
  };

  return <CepContext.Provider value={{ ceps, addCep }}>{children}</CepContext.Provider>;
};

export const useCep = () => useContext(CepContext);