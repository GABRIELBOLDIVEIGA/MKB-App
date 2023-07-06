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

import { lazy, useContext, Suspense, useEffect } from "react";
import { IonApp, IonProgressBar, IonRouterOutlet, IonSplitPane, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route, Switch } from "react-router-dom";
import { useUserContext } from "context/UsuarioContext";
import Menu from "components/Menu";
import Home from "pages/Home";
import Login from "pages/Login";
import FuncionariosADM from "pages/Adm/Funcionarios";
import ClientesADM from "pages/Adm/Clientes";
import EditarCliente from "pages/Adm/Clientes/EditarCliente";
import ProdutosADM from "pages/Adm/Produtos";
import EditarProduto from "pages/Adm/Produtos/EditarProduto";
import CadastrarProduto from "pages/Adm/Produtos/CadastrarProduto";
import PedidosADM from "pages/Adm/Pedidos";
import PedidoDetalhado from "pages/Adm/Pedidos/PedidoDetalhado";
import Clientes from "pages/Clientes";
import Produtos from "pages/Produtos";
import CadastrarCliente from "pages/CadastrarCliente";
import CadastrarFuncionario from "pages/Adm/Funcionarios/CadastrarFuncionario";
import EditarFuncionario from "pages/Adm/Funcionarios/Editarfuncionario";
import EsqueciSenha from "pages/EsqueciSenha";
import Config from "pages/Config";
import AlterarSenha from "pages/Config/AlterarSenha";
import Avatarconfig from "pages/Config/Avatar";
import LoadUsuarios from "pages/DEV/LoadUsuarios";
import LoadClientes from "pages/DEV/LoadClientes";
import LoadProdutos from "pages/DEV/LoadProdutos";

setupIonicReact();

export default function Routes() {
  const { loginValido, usuario } = useUserContext();

  if (loginValido) {
    return (
      <IonApp>
        <Suspense fallback={<IonProgressBar type="indeterminate" />}></Suspense>
        <IonReactRouter>
          <IonSplitPane contentId="main">
            <Menu />
            <IonRouterOutlet id="main">
              {usuario.privilegio === 1 ?
                (
                  <>
                    <Route path="/login">
                      <Redirect to="/home" />
                    </Route>
                    <Route path="/home" component={Home} />
                    <Route path="/empresas" exact={true} component={Clientes} />
                    <Route path="/produtos" exact={true} component={Produtos}></Route>
                    <Route path="/cadastrarCliente" exact={true} component={CadastrarCliente} />
                  </>
                ) :
                (
                  <>
                    <Route path="/login">
                      <Redirect to="/pedidos" />
                    </Route>
                    <Route path="/home">
                      <Redirect to="/pedidos" />
                    </Route>
                    <Route path="/funcionarios" exact={true} component={FuncionariosADM} />
                    <Route path="/funcionarios/EditarFuncionario/:id" exact={true} component={EditarFuncionario} />
                    <Route path="/clientes" exact={true} component={ClientesADM} />
                    <Route path="/cliente/:id" exact={true} component={EditarCliente} />
                    <Route path="/produto" exact={true} component={ProdutosADM} />
                    <Route path="/produto/:id" exact={true} component={EditarProduto} />
                    <Route path="/AdicionarProduto" exact={true} component={CadastrarProduto} />
                    <Route path="/pedidos" exact={true} component={PedidosADM} />
                    <Route path="/pedidoDetalhado/:id" exact={true} component={PedidoDetalhado} />
                    <Route path="/cadastrarFuncionario" exact={true} component={CadastrarFuncionario} />
                    <Route path="/cadastrarCliente" exact={true} component={CadastrarCliente} />
                    <Route path="/empresas" exact={true} component={Clientes} />
                    <Route path="/produtos" exact={true} component={Produtos}></Route>

                    {/* <Route path="/loadProdutos" exact={true} component={LoadProdutos}></Route>
                    <Route path="/loadUsuarios" exact={true} component={LoadUsuarios}></Route>
                    <Route path="/loadClientes" exact={true} component={LoadClientes}></Route> */}
                  </>
                )
              }
              <Route path="/config" exact={true} component={Config}></Route>
              <Route path="/alterarSenha" exact={true} component={AlterarSenha}></Route>
              <Route path="/avatar" exact={true} component={Avatarconfig}></Route>
              
            </IonRouterOutlet>
          </IonSplitPane>
        </IonReactRouter>
      </IonApp>
    )
  } else {
    return (
      <IonApp>
        <Suspense fallback={<IonProgressBar type="indeterminate" />}>
          <IonReactRouter>
            <Route path="/">
              <Redirect to="/login" />
              <Route path="/login" exact={true} component={Login} />
              <Route path="/esqueciSenha" exact={true} component={EsqueciSenha} />
            </Route>
          </IonReactRouter>
        </Suspense>
      </IonApp>
    )
  }


}
