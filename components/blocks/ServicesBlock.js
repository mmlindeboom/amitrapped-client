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
    if (services && services.length) {
      setServicesState(services)
    }

  }, [services])
  return (
    <div>
       <Grid relaxed celled="internally">
        {/* {loading && <Dimmer active inverted><Loader></Loader></Dimmer>} */}
        <Grid.Row stretched>
          <Grid.Column>
            <Header>Journey to Digital Wellness</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid stackable columns={2} celled="internally" >
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
          </Grid>
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