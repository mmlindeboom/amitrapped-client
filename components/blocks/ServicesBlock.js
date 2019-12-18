import { useState, useEffect } from 'react'
import {
  Grid,
  Header
} from "semantic-ui-react";
import WorkshopCardGroup from "../cards/WorkshopCardGroup";
import ProfileCard from "../cards/ProfileCard";
import ExtraCard from "../cards/ExtraCard";
export default function({services, onUpdate, editable = false}) {
  const [servicesState, setServicesState] = useState(services || [])

  useEffect(() => {
    setServicesState(services)
  }, [services])
  return (
    <div>
       <Grid celled="internally" relaxed>
        {/* {loading && <Dimmer active inverted><Loader></Loader></Dimmer>} */}
        <Grid.Row stretched>
          <Grid.Column>
            <Header>Journey to Digital Wellness</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column>
            <WorkshopCardGroup
              cards={servicesState.filter(service => service.tag === "workshop")}
              editable={editable}
            />
          </Grid.Column>
          <Grid.Column>
            {servicesState
              .filter(service => service.tag === "profile")
              .map((card, i)=> (
                <ProfileCard card={card} editable={editable} onUpdate={onUpdate} key={i}/>
              ))}
          </Grid.Column>
        </Grid.Row>
      </Grid>
      {servicesState
        .filter(service => service.tag === "extra")
        .map((card, i) => (
          <ExtraCard card={card} editable={editable} onUpdate={onUpdate} key={i}></ExtraCard>
        ))}
    </div>
  )
}