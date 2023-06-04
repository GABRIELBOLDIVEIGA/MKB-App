import { IonItem, IonText } from "@ionic/react";

interface Props { 
  label?: string;
  dados?: string | undefined;
  lines?: "full" | "inset" | "none" | undefined;
  size?: number;
  color?: "primary" | "secondary" | "tertiary" | "success" | "warning" | "danger" | "light" | "medium" | "dark";
}

export default function CampoTexto({color = "dark",size = 1, lines = "none", label, dados = ""} : Props) {
  return (
    <IonItem lines={lines}>
      <IonText color={color}><strong style={{fontSize: `${size}rem`}}>{`${label} `}</strong>{dados}</IonText>
    </IonItem>
  )
}
