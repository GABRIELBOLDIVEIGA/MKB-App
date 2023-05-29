import React, { useState } from "react";
import { IonAlert, IonButton, IonIcon } from "@ionic/react";
import { logOutOutline } from "ionicons/icons";
import "./LogOut.css";
import { useUserContext } from "context/UsuarioContext";

const LogOut: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { removeUser } = useUserContext();

  return (
    <React.Fragment>
      <IonButton
        color="danger"
        fill="outline"
        onClick={() => {
          setIsOpen(!isOpen);
          removeUser();
        }}
      >
        <IonIcon slot="start" icon={logOutOutline} />
        Sair
      </IonButton>
      <IonAlert
        header="Deseja Sair ?"
        buttons={[
          {
            text: "Voltar",
            role: "cancel",
            cssClass: "alert-button-cancel",
            handler: () => {
              setIsOpen(!isOpen);
            },
          },
          {
            text: "Sair",
            role: "confirm",
            cssClass: "alert-button-confirm",
            handler: () => {
              window.location.href = "/login";
            },
          },
        ]}
        isOpen={isOpen}
      ></IonAlert>
    </React.Fragment>
  );
};

export default LogOut;
