import { CarrinhoProvider } from "context/CarrrinhoContext";
import { UsuarioProvider } from "context/UsuarioContext";
import ApolloClient from "components/Apollo";
import Routes from "routes";
import { ErrorBoundary } from "react-error-boundary";
import { ClientesProvider } from "context/ClientesContext";
import { ProdutosProvider } from "context/ProdutosContext";
import Error from "Error";

export default function AppProvider() {
  return (
    <ErrorBoundary fallback={<Error />}>
      <ApolloClient>
        <ErrorBoundary fallback={<Error />}>
          <UsuarioProvider>
            <ErrorBoundary fallback={<Error />}>
              <CarrinhoProvider>
                <ErrorBoundary fallback={<Error />}>
                  <ClientesProvider>
                    <ProdutosProvider>
                      <Routes />
                    </ProdutosProvider>
                  </ClientesProvider>
                </ErrorBoundary>
              </CarrinhoProvider>
            </ErrorBoundary>
          </UsuarioProvider>
        </ErrorBoundary>
      </ApolloClient>
    </ErrorBoundary>
  );
}
