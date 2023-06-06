import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import Menu from "components/Menu";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Login from "pages/Login";

import { useUserContext } from "context/UsuarioContext";
import Home from "pages/Home";
import Produtos from "pages/Produtos";
import CadastrarCliente from "pages/CadastrarCliente";
import Clientes from "pages/Clientes";
import FuncionariosADM from "pages/Adm/Funcionarios";
import ProdutosADM from "pages/Adm/Produtos";
import CriarProdutoADM from "pages/Adm/Produtos/CriarProduto";
import PedidosADM from "pages/Adm/Pedidos";
import PedidoDetalhado from "pages/Adm/Pedidos/PedidoDetalhado";
import EditarProduto from "pages/Adm/Produtos/EditarProduto";
import ClientesADM from "pages/Adm/Clientes";
import EditarCliente from "pages/Clientes/EditarCliente";

setupIonicReact();

function App() {
  const { loginValido, usuario } = useUserContext();

  return (
    <IonApp>
      <IonReactRouter>

        {loginValido ? (
          <IonSplitPane contentId="main">
            <Menu />
            <IonRouterOutlet id="main">
              <Redirect to="/home" />
              <Route path="/home" exact={true} component={Home} />
              <Route path="/cadastrarCliente" exact={true} component={CadastrarCliente} />
              {usuario.privilegio === 1 ?
                (
                  <>
                    <Route path="/empresas" exact={true} component={Clientes} />
                    <Route path="/produtos" exact={true} component={Produtos}></Route>
                  </>
                ) :
                (
                  <>
                    <Route path="/funcionarios" exact={true} component={FuncionariosADM} />
                    <Route path="/clientes" exact={true} component={ClientesADM} />
                    <Route path="/cliente/:id" exact={true} component={EditarCliente} />
                    <Route path="/produto" exact={true} component={ProdutosADM} />
                    <Route path="/produto/:id" exact={true} component={EditarProduto} />
                    <Route path="/AdicionarProduto" exact={true} component={CriarProdutoADM} />
                    <Route path="/pedidos" exact={true} component={PedidosADM} />
                    <Route path="/pedidoDetalhado/:id" exact={true} component={PedidoDetalhado} />
                  </>
                )
              }
            </IonRouterOutlet>
          </IonSplitPane>
        ) : (
          <Route path="*">
            <Redirect to="/login" />
            <Route path="/login" component={Login} />
          </Route>
        )}
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
