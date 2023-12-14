import { useState, useContext, useEffect } from "react";
import { AppContext, WebsocketContext } from "../context";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InitScreenActions from "./modules/parts/init-screen-actions";
import NativeSelect from "@mui/material/NativeSelect";
import { C_API } from "@dogma-project/constants-meta";

function SetPrefix() {
  const { dispatch } = useContext(AppContext);
  const { manager, isReady } = useContext(WebsocketContext);

  const [value, setValue] = useState("");
  const [prefixes, setPrefixes] = useState<string[]>([]);
  const saveValue = () => {
    manager(
      {
        type: C_API.ApiRequestType.prefix,
        action: C_API.ApiRequestAction.set,
        payload: {
          prefix: value,
        },
      },
      () => {
        dispatch({
          type: C_API.ApiRequestAction.set,
          value: {
            prefix: value,
          },
        });
      }
    );
  };

  useEffect(() => {
    manager(
      {
        type: C_API.ApiRequestType.prefixes,
        action: C_API.ApiRequestAction.get,
      },
      (res) => {
        setPrefixes(res.payload || []);
      }
    );
  }, [isReady]);

  return (
    <Container className="d-flex align-items-center justify-content-center flex-row min-vh-100">
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Please, choose prefix to start app.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Prefix is a namespace for your node. You can hold several profiles
            and even run them simultaneously. A new prefix is a new node.
          </Typography>

          {prefixes.length && (
            <NativeSelect
              onChange={(e) => setValue(e.target.value)}
              fullWidth
              inputProps={{
                name: "mda",
                id: "uncontrolled-native",
              }}
              sx={{
                my: 3,
              }}
            >
              <option key="create_new" value={""} defaultValue={""}>
                Create new
              </option>
              {prefixes.map((p, i) => (
                <option key={"prefix-" + i} value={p}>
                  {p}
                </option>
              ))}
            </NativeSelect>
          )}

          <TextField
            fullWidth
            id="standard-basic"
            label="Set prefix"
            variant="standard"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </CardContent>
        <InitScreenActions
          onConfirm={saveValue}
          confirmDisabled={value.length < 3}
        ></InitScreenActions>
      </Card>
    </Container>
  );
}

export default SetPrefix;
