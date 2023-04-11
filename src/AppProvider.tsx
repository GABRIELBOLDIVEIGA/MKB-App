import { UsuarioProvider } from "common/context/UserContext";
import App from "./App";

export default function AppProvider() {
    return (
        <UsuarioProvider>
            <App />
        </UsuarioProvider>
    );
}
