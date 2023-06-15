import { IonButton, IonIcon, IonItem } from '@ionic/react'

interface Props {
  routerLink: string;
  routerDirection?: "none" | "forward" | "back" | "root" | undefined;
  size?: "default" | "small" | "large" | undefined;
  colorButton?: "primary" | "secondary" | "tertiary" | "success" | "warning" | "danger" | "light" | "medium" | "dark";
  colorIcon?: "primary" | "secondary" | "tertiary" | "success" | "warning" | "danger" | "light" | "medium" | "dark";
  slotIcon?: string;
  slotButton?: string;
  icon?: string;
  text?: string;
  disabled?: boolean;
}

export default function ButtonRouter({disabled = false, slotButton = "", routerLink, routerDirection = "none", size = "default", colorButton = "primary", colorIcon = "dark", slotIcon = "start", icon, text }: Props) {
  return (
    <IonItem lines="none">
      <IonButton disabled={disabled} style={{ width: "100%" }} slot={slotButton}  routerLink={routerLink} routerDirection={routerDirection} size={size} color={colorButton}>
        {icon ?
          (
            <IonIcon color={colorIcon} slot={slotIcon} icon={icon} />
          ) :
          (
            <></>
          )
        }
        {text}
      </IonButton>
    </IonItem>
  )
}