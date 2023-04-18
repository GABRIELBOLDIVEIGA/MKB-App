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

import { UsuarioContext } from "common/context/UsuarioContext";
import { useContext } from "react";
import Home from "pages/Home";
import Produtos from "pages/Produtos";
import Historico from "pages/Historico";
import Empresas from "pages/Empresa";


setupIonicReact();

function App() {
    const userContext = useContext(UsuarioContext);
    if (!userContext) return null;
    const { loginValido } = userContext;

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
                        <Redirect to="/home" />
                            <Route path="/home" exact={true} component={Home} />
                            <Route path="/empresas" exact={true} component={Empresas} />
                            <Route path="/produtos" exact={true} component={Produtos}></Route>
                            <Route path="/historico" exact={true} component={Historico} />
                           
                            {/* <Switch>
                                <Route path="/page/processos" exact={true} component={PaginaProcessos} />
                                <Route path="/page/processo/:id" component={PaginaProcessoDetalhado} />
                            </Switch> */}
                            
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
