import { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import {
  Message,
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
  const [editModalOpen, setEditModalOpen] = useState(false)
  return (
    <Message info>
      {editable && (
        <ServiceModal
          text="Edit Extra"
          values={card}
          action={updateService}
        ></ServiceModal>
      )}
      <Message.Header>
        <div dangerouslySetInnerHTML={{__html: card.title}}></div>
      </Message.Header>
      <div dangerouslySetInnerHTML={{__html: card.body}}></div>

    </Message>
  )
}