import { useMutation } from '@apollo/react-hooks'
import { useState, useEffect, useCallback } from 'react'
import {
  Button,
  Item,
  Form,
  Loader,
  Dimmer,
  Segment,
  Placeholder
} from 'semantic-ui-react'
import ReactQuill from 'react-quill'
import { useDropzone } from 'react-dropzone'
import { Dropper } from '../Dropper'
import { UPDATE_TRAP, CREATE_DIRECT_UPLOAD_MUTATION, ATTACH_TRAP_IMAGE_MUTATION } from '../../data/admin'
import { getFileMetadata, directUpload } from '../../lib/upload'

const localImage = (name) => `/static/traps/${name.toLowerCase().split(' ').join('-')}.png`
const EditTrapForm = ({trap}) => {
  const [createDirectUpload, {uploadData, uploadError, uploadLoading}] = useMutation(CREATE_DIRECT_UPLOAD_MUTATION)
  const [attachTrapImage, {imageData}] = useMutation(ATTACH_TRAP_IMAGE_MUTATION)
  const [updateTrap, {data, error, loading}] = useMutation(UPDATE_TRAP)
  const [imageFile, setImageFile] = useState(null)

  const onDrop = useCallback(file => {
    const reader = new FileReader();
    reader.readAsDataURL(file[0])
    setImageFile(file[0])
    reader.onload = () => {
      setImagePath(reader.result)
    }
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(trap.name)
  const [description, setDescription] = useState(trap.description)
  const [imagePath, setImagePath] = useState(trap.imageUrl || localImage(name))

  const handleSubmit = async () => {

    if (imageFile) {
      await getFileMetadata(imageFile).then((input) => {
        return createDirectUpload({variables: {...input}}).then(({data: {createDirectUpload: {directUpload: {url, headers, signedBlobId}}}}) => {
            return directUpload(url, JSON.parse(headers), imageFile).then(() => {
              attachTrapImage({ variables: {id: trap.id, blobId: signedBlobId}})
            })
          })
      })
    }
    updateTrap({variables: {id: trap.id, name: name, description, name}})
    setEditing(false)
  }

  useEffect((() => {
    if (data && data.updateTrap) {
      setName(data.updateTrap.name)
      setDescription(data.updateTrap.description)
    }
  }), [data])

  return (
    <Segment stacked>
      <Item.Group>
          { loading && <Dimmer active inverted><Loader></Loader></Dimmer> }

            {editing &&
              <Item>
                <Item.Content style={{marginRight: 25, textAlign: 'center' }}>
                  <Dropper root={getRootProps} input={getInputProps} active={isDragActive}>
                    <Item.Image size="small"
                      src={imagePath}
                      bordered
                    />
                  </Dropper>
                </Item.Content>
                <Item.Content verticalAlign="middle">
                  <Form onSubmit={handleSubmit}>
                    <Form.Input label="Name"
                      defaultValue={name}
                      onChange={(e) => setName(e.target.value)}></Form.Input>

                    <Form.Field as={ReactQuill}
                      value={description}
                      onChange={(val) => setDescription(val)}
                      modules={{toolbar: [['bold', 'italic', 'underline']]}}
                    />
                    {/* <Form.TextArea label="Description"
                      defaultValue={description}
                      style={{ minHeight: 200 }}
                      onChange={(e) => setDescription(e.target.value)}></Form.TextArea> */}
                    <Form.Group>
                      <Button onClick={() => setEditing(false)}>Cancel</Button>
                      <Form.Field control={Button} primary>Save</Form.Field>
                    </Form.Group>

                  </Form>
                </Item.Content>
              </Item>
            }

            {!editing &&
              <Item>
              <Item.Image size="small" src={imagePath} />
              <Item.Content verticalAlign="middle">
                <Item.Header>{name}</Item.Header>
                <Item.Meta>Pillar: {trap.pillar.name}</Item.Meta>
                <Item.Description><p dangerouslySetInnerHTML={{ __html: description }}></p></Item.Description>
                <Item.Extra>
                  <Button primary onClick={() => setEditing(true)}>Edit</Button>
                </Item.Extra>
              </Item.Content>
              </Item>
            }

      </Item.Group>
    </Segment>
  )
}

export default EditTrapForm