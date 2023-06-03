import { IonCard, IonCardContent, IonCol, IonGrid, IonRow, IonSkeletonText } from '@ionic/react'

export default function CardSkeleton() {
  return (
    <IonCard>
      <IonCardContent>
        <IonGrid>
          <IonRow>
            <IonSkeletonText style={{ height: "35px" }} animated={true} />
            <IonCol>
              <IonSkeletonText style={{ height: "15px", width: "75%" }} animated={true} />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonSkeletonText style={{ height: "15px" }} animated={true} />
            </IonCol>
            <IonCol>
              <IonSkeletonText style={{ height: "15px", width: "80%" }} animated={true} />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonSkeletonText style={{ height: "15px" }} animated={true} />
            </IonCol>
            <IonCol>
              <IonSkeletonText style={{ height: "15px", width: "80%" }} animated={true} />
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonSkeletonText style={{ height: "20px", width: "80%" }} animated={true} />
        <IonSkeletonText style={{ height: "20px", width: "80%" }} animated={true} />
      </IonCardContent>
    </IonCard>
  )
}
