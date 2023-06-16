import { CarrinhoProvider } from "context/CarrrinhoContext";
import { UsuarioProvider } from "context/UsuarioContext";
import ApolloClient from "components/Apollo";
import Routes from "routes";
import { ErrorBoundary } from "react-error-boundary";
import { ClientesProvider } from "context/ClientesContext";
import { ProdutosProvider } from "context/ProdutosContext";

export default function AppProvider() {
  return (
    <ErrorBoundary fallback={<div>Algo deu errado no Apollo Client</div>}>
      <ApolloClient>
        <ErrorBoundary fallback={<div>Algo deu errado no Usuario</div>}>
          <UsuarioProvider>
            <ErrorBoundary fallback={<div>Algo deu errado no Carrinho</div>}>
              <CarrinhoProvider>
                <ErrorBoundary fallback={<div>Algo deu errado nas Rotas</div>}>
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
