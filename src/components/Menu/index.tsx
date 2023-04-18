import { IonAvatar, IonButton, IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonNote, IonText } from "@ionic/react";
import { useLocation } from "react-router-dom";
import { homeOutline, addCircleOutline, fileTrayStackedOutline, settingsOutline } from "ionicons/icons";
import "./Menu.css";
import avatar from "assets/profile.png";
import LogOut from "./LogOut";
import { UsuarioContext } from "common/context/UsuarioContext";
import { useContext } from "react";

interface menuLink {
    url: string;
    iosIcon: string;
    mdIcon: string;
    title: string;
}

const menuLinks: menuLink[] = [
    {
        title: "Home",
        url: "/home",
        iosIcon: homeOutline,
        mdIcon: homeOutline,
    },
    {
        title: "Novo Pedido",
        url: "/empresas",
        iosIcon: addCircleOutline,
        mdIcon: addCircleOutline,
    },
    {
        title: "Histórico",
        url: "/historico",
        iosIcon: fileTrayStackedOutline,
        mdIcon: fileTrayStackedOutline,
    },
];

const Menu: React.FC = () => {
    const location = useLocation();
    const userContext = useContext(UsuarioContext);
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

                    {menuLinks.map((appPage, index) => {
                        return (
                            <IonMenuToggle key={index} autoHide={false}>
                                <IonItem className={location.pathname === appPage.url ? "selected" : ""} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                                    <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                                    <IonLabel>{appPage.title}</IonLabel>
                                </IonItem>
                            </IonMenuToggle>
                        );
                    })}
                </IonList>

                <IonList id="labels-list">
                    <IonButton fill="outline">
                        <IonIcon slot="start" src={settingsOutline} />
                        <IonText>Config.</IonText>
                    </IonButton>
                    <LogOut />
                </IonList>
            </IonContent>
        </IonMenu>
    );
};

export default Menu;
