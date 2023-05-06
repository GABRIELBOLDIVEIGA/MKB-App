import { CarrinhoProvider } from "context/CarrrinhoContext";
import { UsuarioProvider } from "context/UsuarioContext";
import App from "./App";
import ApolloClient from "components/ApolloClient";

export default function AppProvider() {
    return (
        <ApolloClient>
            <UsuarioProvider>
                <CarrinhoProvider>
                    <App />
                </CarrinhoProvider>
            </UsuarioProvider>
        </ApolloClient>
    );
}
