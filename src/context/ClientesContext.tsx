import { useClientes } from "graphQL/clientes/hooks";
import { Cliente } from "interface/Cliente";
import { createContext, useContext, useEffect, useState } from "react";

type ClienteContextType = {
    clientes: Cliente[] | undefined;
    setClientes: React.Dispatch<React.SetStateAction<Cliente[] | undefined>>;
}

const DEFAULT_VALUE = {
    clientes: [],
    setClientes: () => { }
}

export const ClientesContext = createContext<ClienteContextType>(DEFAULT_VALUE);
ClientesContext.displayName = "Clientes";

interface IProps {
    children: string | JSX.Element | JSX.Element[];
  }
export const ClientesProvider = ({children}:IProps) => {
    const [clientes, setClientes] = useState<Cliente[] | undefined>();
    return <ClientesContext.Provider
        value={{clientes, setClientes}}
    >
        {children}
    </ClientesContext.Provider>
}

export const useClientesContext = () => {
    const clienteContext = useContext(ClientesContext);
    const { clientes, setClientes } = clienteContext;
    const { data, loading, error } = useClientes();

    setClientes(data);

    return {clientes, loading, error}
}