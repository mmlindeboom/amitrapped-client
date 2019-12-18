import {
  Dimmer,
  Loader
} from 'semantic-ui-react'

export default function({ isLoading = false }) {
  return (
    <div>
      { isLoading && <Dimmer active inverted><Loader></Loader></Dimmer> }
    </div>
  )
}