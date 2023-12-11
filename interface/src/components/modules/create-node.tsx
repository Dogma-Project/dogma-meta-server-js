import { useContext, useState } from "react";
import { C_Keys, C_Defaults } from "@dogma-project/constants-meta";

import { AppContext } from "../../context";

import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";
import InitScreenActions from "./parts/init-screen-actions";

function CreateNode() {
  const { managerRequest } = useContext(AppContext);

  const [keyLength, setKeyLength] = useState(2048); // edit
  const [nodeName, setNodeName] = useState(C_Defaults.nodeName);

  const saveValue = () => {
    managerRequest("POST", "/keys", {
      params: {
        name: nodeName,
        length: keyLength,
        type: C_Keys.Type.nodeKey,
      },
    });
  };

  return (
    <Container className="d-flex align-items-center justify-content-center flex-row min-vh-100">
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Create Node Key
          </Typography>
          <Typography variant="body2" color="text.secondary">
            A pair of RSA private and pubic keys, which is auto-generated on
            each of your devices as a node of network. SHA256 Fingerprint of a
            public node key used as your Node ID. If someone trusts user as a
            friend, he automatically trusts all connections from nodes,
            associated with his User Key. Node keys are different for all your
            nodes (devices) and you should not keep them or export across
            devices. It has no analogs in centralized network and you shouldn't
            handle it as a user. All that you should know - it is an identifier
            of a current device, which is associated with some user by his ID.
          </Typography>

          <TextField
            fullWidth
            id="standard-basic"
            label="Set prefix"
            variant="standard"
            value={nodeName}
            onChange={(e) => setNodeName(e.target.value)}
            sx={{
              my: 3,
            }}
          />

          <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Set Node Key length
            </InputLabel>
            <NativeSelect
              value={keyLength}
              onChange={(e) => setKeyLength(Number(e.target.value))}
              inputProps={{
                name: "age",
                id: "uncontrolled-native",
              }}
              sx={{
                my: 3,
              }}
            >
              <option value={1024}>1024 bits (not recommended)</option>
              <option value={2048}>2048 bits (recommended)</option>
              <option value={4096}>4096 bits (best choise)</option>
            </NativeSelect>
          </FormControl>
        </CardContent>
        <InitScreenActions
          onConfirm={saveValue}
          confirmDisabled={nodeName.length < 3}
        ></InitScreenActions>
      </Card>
    </Container>
  );
}

export default CreateNode;
