import { createContext, useState, useContext } from "react";

interface CurrentUserContextType {
    nome: string;
    setNome: React.Dispatch<React.SetStateAction<string>>;
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    loginValido: boolean;
    setLoginValido: React.Dispatch<React.SetStateAction<boolean>>;
    senha: string;
    setSenha: React.Dispatch<React.SetStateAction<string>>;
}

const DEFAULT_VALUE = {
    nome: "",
    setNome: () => {},
    email: "",
    setEmail: () => {},
    loginValido: true,
    setLoginValido: () => {},
    senha: "",
    setSenha: () => {},
};

export const UsuarioContext = createContext<CurrentUserContextType>(DEFAULT_VALUE);
UsuarioContext.displayName = "Usuario";

type Props = {
    children: string | JSX.Element | JSX.Element[];
};

export const UsuarioProvider = ({ children }: Props) => {
    const [nome, setNome] = useState("GabrielBoldi");
    const [email, setEmail] = useState("gabriel.boldi@gmail.com");
    const [loginValido, setLoginValido] = useState<boolean>(false);
    const [senha, setSenha] = useState("123456");

    return (
        <UsuarioContext.Provider
            value={{
                nome,
                setNome,
                email,
                setEmail,
                loginValido,
                setLoginValido,
                senha,
                setSenha
            }}
        >
            {children}
        </UsuarioContext.Provider>
    );
};

export const useUsuarioContext = () => {
    const userContext = useContext(UsuarioContext);
    if (!userContext) return null;

    const { nome, setNome, email, setEmail, loginValido, setLoginValido } = userContext;

    return {
        nome,
        setNome,
        email,
        setEmail,
        loginValido,
        setLoginValido,
    };
};
