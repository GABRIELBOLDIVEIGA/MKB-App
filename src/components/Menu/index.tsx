import { IonAvatar, IonButton, IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonNote, IonText } from "@ionic/react";
import { useLocation } from "react-router-dom";
import { pricetagOutline, peopleOutline, documentTextOutline, homeOutline, addCircleOutline, fileTrayStackedOutline, settingsOutline, businessOutline } from "ionicons/icons";
import "./Menu.css";
import avatar from "assets/profile.png";
import LogOut from "./LogOut";
import { useUserContext } from "context/UsuarioContext";
import { useEffect, useState } from "react";


interface menuLink {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const menuFuncionario: menuLink[] = [
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
    title: "Cadastrar Cliente",
    url: "/cadastrarCliente",
    iosIcon: businessOutline,
    mdIcon: businessOutline,
  },
];

const menuADM: menuLink[] = [
  {
    title: "Pedidos",
    url: "/pedidos",
    iosIcon: documentTextOutline,
    mdIcon: documentTextOutline,
  },
  {
    title: "Clientes",
    url: "/clientes",
    iosIcon: businessOutline,
    mdIcon: businessOutline,
  },
  {
    title: "Produtos",
    url: "/produto",
    iosIcon: pricetagOutline,
    mdIcon: pricetagOutline,
  },
  {
    title: "Funcionários",
    url: "/funcionarios",
    iosIcon: peopleOutline,
    mdIcon: peopleOutline,
  },
];

const Menu: React.FC = () => {
  const location = useLocation();
  const { usuario } = useUserContext();
  const [menu, setMenu] = useState<menuLink[]>([]);

  useEffect(() => {
    switch (usuario.privilegio) {
      case 0:
        setMenu(menuADM);
        break;
      case 1:
        setMenu(menuFuncionario);
        break;
      default:
        break;
    }
  }, [])

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <div className="menu">
          <IonList id="inbox-list">
            <IonListHeader>
              <IonAvatar className="avatar">
                <img alt="Img de um minecraft" src={avatar} />
              </IonAvatar>
              <IonNote>{usuario.nome}</IonNote>
              <IonNote>{usuario.email}</IonNote>
            </IonListHeader>

            {menu.map((appPage, index) => {
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

          <IonList id="labels-list" className="listaBotoes">
            <IonButton fill="outline">
              <IonIcon slot="start" src={settingsOutline} />
              <IonText>Config.</IonText>
            </IonButton>
            <LogOut />
          </IonList>
        </div>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
