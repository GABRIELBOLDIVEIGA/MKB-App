import { CarrinhoProvider } from "common/context/CarrrinhoContext";
import { UsuarioProvider } from "common/context/UsuarioContext";
import App from "./App";

export default function AppProvider() {
    return (
        <UsuarioProvider>
            <CarrinhoProvider>
                <App />
            </CarrinhoProvider>
        </UsuarioProvider>
    );
}
