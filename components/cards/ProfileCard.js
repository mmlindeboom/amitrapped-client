import { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import {
  Image,
  Header,
  Segment,
  Label
} from "semantic-ui-react";
import ServiceModal from '../modals/ServiceModal'
import { UPDATE_SERVICE } from '../../data/admin'

export default function({ card, editable, onUpdate}) {
  const [updateService, { data, error, loading }] = useMutation(
    UPDATE_SERVICE,
    {
      onCompleted() {
        onUpdate();
      }
    }
  );

  return (
    <Segment basic>
      {editable && (
        <ServiceModal
          text="Edit Profile"
          values={card}
          action={updateService}
        ></ServiceModal>
      )}
      <Header header><div dangerouslySetInnerHTML={{__html: card.title}}></div></Header>
      <Image src="/static/samantha-profile.png" floated="right" />
      <div dangerouslySetInnerHTML={{__html: card.body}}></div>
    </Segment>
)
}