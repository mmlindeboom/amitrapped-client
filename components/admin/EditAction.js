import { useState, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Button } from "semantic-ui-react";

import { CREATE_SERVICE } from "../../data/admin";
import ServiceModal from "../modals/ServiceModal";
import ServicesBlock from '../blocks/ServicesBlock';

const Home = ({ services = [], refetch }) => {
  const [createService, { data, error, loading }] = useMutation(
    CREATE_SERVICE,
    {
      onCompleted() {
        refetch();
      }
    }
  );

  const [createModalOpen, setCreateModalOpen] = useState(false);

  return (
    <div>
      <ServiceModal
        text="Create Service"
        open={createModalOpen}
        setOpen={setCreateModalOpen}
        action={createService}
        controlled
      ></ServiceModal>
      <Button onClick={() => setCreateModalOpen(true)}>Create Service</Button>
      <ServicesBlock services={services} editable onUpdate={refetch}></ServicesBlock>
    </div>
  );
};

export default Home;
