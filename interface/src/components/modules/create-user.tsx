import { useContext, useState } from "react";
import { C_Keys, C_Defaults, C_API } from "@dogma-project/constants-meta";

import { WebsocketContext } from "../../context";

import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";
import InitScreenActions from "./parts/init-screen-actions";

function CreateUser() {
  const { isReady, send } = useContext(WebsocketContext);
  const [keyLength, setKeyLength] = useState(4096); // edit
  const [userName, setUserName] = useState(C_Defaults.userName);

  const saveValue = () => {
    if (isReady) {
      send({
        type: C_API.ApiRequestType.keys,
        action: C_API.ApiRequestAction.set,
        payload: {
          name: userName,
          length: keyLength,
          type: C_Keys.Type.userKey,
        },
      });
    } else {
      console.warn("WS not ready");
    }
  };

  // useEffect(() => {
  //   if (value && value.type === C_API.ApiRequestType.keys) {
  //     console.log("KEYS", value);
  //     // handle errors
  //   }
  // }, [value]);

  return (
    <Container className="d-flex align-items-center justify-content-center flex-row min-vh-100">
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Create User Key
          </Typography>
          <Typography variant="body2" color="text.secondary">
            A pair of RSA private and pubic keys, which is your main identifier
            as an user of network. SHA256 Fingerprint of a public user key used
            as your User ID. When someone adds friend's user_id, he
            automatically allows all connections from nodes, associated with
            User Key. User key is just one for all your nodes (devices) and you
            should keep it as a proof of your identity. Closest analog in
            centralized networks is login+password credentials.
          </Typography>

          <TextField
            fullWidth
            id="standard-basic"
            label="Set prefix"
            variant="standard"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            sx={{
              my: 3,
            }}
          />

          <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Set User Key length
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
              <option value={2048}>2048 bits</option>
              <option value={4096}>4096 bits (recommended)</option>
            </NativeSelect>
          </FormControl>
        </CardContent>
        <InitScreenActions
          onConfirm={saveValue}
          confirmDisabled={userName.length < 3}
        ></InitScreenActions>
      </Card>
    </Container>
  );
}

export default CreateUser;
