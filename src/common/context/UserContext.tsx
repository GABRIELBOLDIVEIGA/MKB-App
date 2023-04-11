import { createContext, useState, useContext } from "react";

interface CurrentUserContextType {
    nome: string;
    setNome: React.Dispatch<React.SetStateAction<string>>;
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    loginValido: boolean;
    setLoginValido: React.Dispatch<React.SetStateAction<boolean>>;

    senha: string;
}

export const UserContext = createContext<CurrentUserContextType | null>(null);
UserContext.displayName = "Usuario";

type Props = {
    children: string | JSX.Element | JSX.Element[];
};

export const UsuarioProvider = ({ children }: Props) => {
    const [nome, setNome] = useState("GabrielBoldi");
    const [email, setEmail] = useState("gabriel.boldi@gmail.com");
    const [loginValido, setLoginValido] = useState<boolean>(true);
    const [senha, setSenha] = useState("123456");

    return (
        <UserContext.Provider
            value={{
                nome,
                setNome,
                email,
                setEmail,
                loginValido,
                setLoginValido,
                senha,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const userContext = useContext(UserContext)
    if (!userContext) return null;

    const { 
        nome, 
        setNome, 
        email, 
        setEmail, 
        loginValido, 
        setLoginValido 
    } = userContext;


    

    return {
        nome , 
        setNome, 
        email, 
        setEmail, 
        loginValido, 
        setLoginValido 
    };
};
