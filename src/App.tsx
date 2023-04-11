import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route, Switch } from "react-router-dom";
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

import { UserContext } from "common/context/UserContext";
import { useContext } from "react";
import Home from "pages/Home";
import NovoPedido from "pages/NovoPedido";
import Historico from "pages/Historico";


setupIonicReact();

function App() {
    const userContext = useContext(UserContext);
    if (!userContext) return null;
    const { loginValido } = userContext;

    console.log("APP")

    return (
        <IonApp>
            <IonReactRouter>
                <Route path="/" exact={true}>
                    <Redirect to="/login" />
                </Route>
                {/* <Route path="/fazerCadastro" exact={true} component={PaginaCadatrosUsuario} /> */}

                {loginValido ? (
                    <IonSplitPane contentId="main">
                        <Menu />
                        <IonRouterOutlet id="main">
                        <Redirect to="/page/home" />
                            <Route path="/page/home" exact={true} component={Home} />
                            <Route path="/page/novo_pedido" exact={true} component={NovoPedido} />
                            <Route path="/page/historico" exact={true} component={Historico} />
                            {/* <Redirect to="/page/pj" />
                            <Route path="/page/pj" exact={true} component={PaginaPJ} />
                            <Switch>
                                <Route path="/page/processos" exact={true} component={PaginaProcessos} />
                                <Route path="/page/processo/:id" component={PaginaProcessoDetalhado} />
                            </Switch>
                            <Route path="/page/processo/cadastro" exact={true} component={PaginaCadastroProcesso} />
                            <Route path="/page/empresas" exact={true} component={PaginaEmpresas} />
                            <Route path="/page/usuarios" exact={true} component={PaginaUsuarios} />
                            <Route path="/page/orgao" exact={true} component={PaginaOrgao} /> */}
                        </IonRouterOutlet>
                    </IonSplitPane>
                ) : (
                    <Route path="/login" component={Login} />
                )}
            </IonReactRouter>
        </IonApp>
    );
}

export default App;
