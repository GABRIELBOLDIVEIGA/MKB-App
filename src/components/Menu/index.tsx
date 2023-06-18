import { IonAvatar, IonButton, IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonNote, IonText, IonToggle } from "@ionic/react";
import { useLocation } from "react-router-dom";
import { pricetagOutline, peopleOutline, documentTextOutline, homeOutline, addCircleOutline, fileTrayStackedOutline, settingsOutline, businessOutline } from "ionicons/icons";
import "./Menu.css";
import avatar from "assets/profile.png";
import LogOut from "./LogOut";
import { useUserContext } from "context/UsuarioContext";
import { useEffect, useState } from "react";
import styled from "styled-components";


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

const ListHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  border-bottom: 1px solid #4b4b4b;
  padding-bottom: 20px;
`
const Note = styled(IonNote)`
  padding: 0 !important;
  margin: 0 !important;
`
const DivBlue = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* border: 3px solid blue; */
`
const DivGreen = styled.div`
  /* border: 3px dashed green; */
`
const DivRed = styled.div`
/* border: 3px dashed red; */
  width: 100%;
  display: flex;
  justify-content: space-between;
`
const Img = styled.img`
`

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

        <DivBlue>
          <DivGreen>

            <IonList id="inbox-list">
              <ListHeader>
                <IonAvatar >
                  <Img alt="Img de um minecraft" src={avatar} />
                </IonAvatar>
                <Note>{usuario.nome}</Note>
                <Note>{usuario.email}</Note>
              </ListHeader>
            </IonList>


            {menu.map((appPage, index) => {
              return (
                <IonMenuToggle key={index} autoHide={false}>
                  <IonItem className={location.pathname === appPage.url ? "selected" : ""}
                    routerLink={appPage.url}
                    routerDirection="none"
                    lines="none"
                    detail={false}
                  >
                    <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                    <IonLabel>{appPage.title}</IonLabel>
                  </IonItem>
                </IonMenuToggle>
              );
            })}
          </DivGreen>

          <DivRed>
            <IonMenuToggle autoHide={false}>
              <IonButton routerLink="/config" fill="solid">
                <IonIcon slot="start" src={settingsOutline} />
                <IonText>Config.</IonText>
              </IonButton>
            </IonMenuToggle>

            <IonMenuToggle autoHide={false}>
              <LogOut />
            </IonMenuToggle>
          </DivRed>

        </DivBlue>
      
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
