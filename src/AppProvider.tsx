import { CarrinhoProvider } from "context/CarrrinhoContext";
import { UsuarioProvider } from "context/UsuarioContext";
import ApolloClient from "components/Apollo";
import Routes from "routes";
import { ErrorBoundary } from "react-error-boundary";
import { ClientesProvider } from "context/ClientesContext";
import { ProdutosProvider } from "context/ProdutosContext";
import FallbackError from "Error/FallbackError";

export default function AppProvider() {
  return (

    <ErrorBoundary FallbackComponent={FallbackError}>
      <ApolloClient>
        <UsuarioProvider>
          <CarrinhoProvider>
            <ClientesProvider>
              <ProdutosProvider>
                <Routes />
              </ProdutosProvider>
            </ClientesProvider>
          </CarrinhoProvider>
        </UsuarioProvider>
      </ApolloClient>
    </ErrorBoundary>
  );
}
