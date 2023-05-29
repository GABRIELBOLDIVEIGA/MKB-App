import { createContext, useState, useContext, useEffect } from "react";
import { Usuario } from "interface/Usuario";

interface CurrentUserContextType {
    loginValido: boolean;
    setLoginValido: React.Dispatch<React.SetStateAction<boolean>>;

    usuario: Usuario;
    setUsuario: React.Dispatch<React.SetStateAction<Usuario>>
}

const DEFAULT_CONTEXT = {
    loginValido: false,
    setLoginValido: () => { },

    usuario: {},
    setUsuario: () => { },
};

export const UserContext = createContext<CurrentUserContextType>(DEFAULT_CONTEXT);
UserContext.displayName = "Usuario";

type Props = {
    children: string | JSX.Element | JSX.Element[];
};

export const UsuarioProvider = ({ children }: Props) => {
    const [loginValido, setLoginValido] = useState<boolean>(false);
    const [usuario, setUsuario] = useState<Usuario>({});

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            setLoginValido(true);
            setUsuario(JSON.parse(user));
        }
    }, []);

    return (
        <UserContext.Provider
            value={{
                loginValido,
                setLoginValido,
                usuario: usuario,
                setUsuario: setUsuario
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const userContext = useContext(UserContext);
    const { loginValido, setLoginValido, usuario, setUsuario } = userContext;

    useEffect(() => {
        const usuario = localStorage.getItem("user");

        if (usuario) {
            setUsuario(JSON.parse(usuario))
        }
    }, [])

    const saveUser = (userData: Usuario) => {
        if (userData) {
            localStorage.setItem("user", JSON.stringify(userData));
            setUsuario(userData);
            setLoginValido(true)
        }
    }

    const removeUser = () => { 
        localStorage.removeItem("user")
        setLoginValido(false)
    }

    return {
        loginValido,
        usuario,
        saveUser,
        removeUser
    };
};