import { IonAvatar, IonButton, IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonNote } from "@ionic/react";
import { useLocation } from "react-router-dom";
import { briefcaseOutline, folderOpenOutline } from "ionicons/icons";
import "./Menu.css";
import avatar from "assets/profile.png";
import LogOut from "./LogOut";
import { UserContext } from "common/context/UserContext";
import { useContext } from "react";

interface AppPage {
    url: string;
    iosIcon: string;
    mdIcon: string;
    title: string;
}

const appPages: AppPage[] = [
    {
        title: "Home",
        url: "/page/home",
        iosIcon: briefcaseOutline,
        mdIcon: briefcaseOutline,
    },
    {
        title: "Novo Pedido",
        url: "/page/novo_pedido",
        iosIcon: briefcaseOutline,
        mdIcon: briefcaseOutline,
    },
    {
        title: "Histórico",
        url: "/page/historico",
        iosIcon: folderOpenOutline,
        mdIcon: folderOpenOutline,
    },
    // {
    //     title: "Empresas",
    //     url: "/page/empresas",
    //     iosIcon: businessOutline,
    //     mdIcon: businessOutline,
    // },
    // {
    //     title: "Usuários",
    //     url: "/page/usuarios",
    //     iosIcon: peopleOutline,
    //     mdIcon: peopleOutline,
    // },
    // {
    //     title: "Orgão",
    //     url: "/page/orgao",
    //     iosIcon: apertureOutline,
    //     mdIcon: apertureOutline,
    // },
];

const Menu: React.FC = () => {
    console.log("Menu")
    const location = useLocation();
    const userContext = useContext(UserContext)
    if (!userContext) return null;
    const { email } = userContext;

    return (
        <IonMenu contentId="main" type="overlay">
            <IonContent>
                <IonList id="inbox-list">
                    <IonListHeader>
                        <IonAvatar className="avatar">
                            <img alt="Img de um minecraft" src={avatar} />
                        </IonAvatar>
                        <IonNote>{email}</IonNote>
                    </IonListHeader>

                    {appPages.map((appPage, index) => {
                        return (
                            <IonMenuToggle key={index} autoHide={true}>
                                <IonItem className={location.pathname === appPage.url ? "selected" : ""} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                                    <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                                    <IonLabel>{appPage.title}</IonLabel>
                                </IonItem>
                            </IonMenuToggle>
                        );
                    })}
                </IonList>

                <IonList id="labels-list">
                    <IonButton fill="outline">Config.</IonButton>
                    <LogOut />
                </IonList>
            </IonContent>
        </IonMenu>
    );
};

export default Menu;
