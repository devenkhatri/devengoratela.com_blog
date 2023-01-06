import { IonBadge } from '@ionic/react'
import React from 'react'

const Tags = ({ tags }) =>
  <div>
      {tags && tags.map((tag) => (
          <IonBadge key={tag} color={'secondary'} style={{marginRight: '0.25rem', padding: '0.4rem'}}>
            {tag}
          </IonBadge>
      ))}
  </div>

export default Tags