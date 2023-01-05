import { IonBadge, IonCol, IonGrid, IonRow } from '@ionic/react'
import React from 'react'

const Tags = ({ tags }) =>
  <IonGrid>
    <IonRow>
      {tags && tags.map((tag) => (
        <IonCol>
          <IonBadge key={tag} color={'secondary'}>
            {tag}
          </IonBadge>
        </IonCol>
      ))}
    </IonRow>
  </IonGrid>

export default Tags