import { IonBadge, IonItem } from '@ionic/react'
import React from 'react'

const Tags = ({ tags }) =>
<IonItem>
{tags && tags.map((tag) => (
  <IonBadge key={tag} color={'secondary'} style={{marginRight: '0.5rem'}}>
    {tag}
  </IonBadge>
))}
</IonItem>

export default Tags