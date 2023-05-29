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

setupIonicReact();

function App() {
    const { loginValido } = useUserContext();

    return (
        <IonApp>
            <IonReactRouter>

                {loginValido ? (
                    <IonSplitPane contentId="main">
                        <Menu />
                        <IonRouterOutlet id="main">
                            <Redirect to="/home" />
                            <Route path="/home" exact={true} component={Home} />
                            <Route path="/empresas" exact={true} component={Clientes} />
                            <Route path="/produtos" exact={true} component={Produtos}></Route>
                            <Route path="/cadastrarCliente" exact={true} component={CadastrarCliente} />
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
