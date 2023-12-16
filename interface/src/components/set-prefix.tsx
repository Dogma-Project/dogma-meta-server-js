import { useState, useContext, useEffect } from "react";
import { AppContext, WebsocketContext } from "../context";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InitScreenActions from "./modules/parts/init-screen-actions";
import { C_API } from "@dogma-project/constants-meta";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

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

  // height: 100vh;
  // width: 100vw;
  // align-items: center;
  // justify-content: center;

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
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
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="select-prefix-options">Select prefix</InputLabel>
              <Select
                onChange={(e) => setValue(String(e.target.value))}
                inputProps={{
                  name: "prefixes",
                  id: "select-prefix-options",
                }}
                sx={{
                  my: 3,
                }}
              >
                <MenuItem key="create_new" value={""}>
                  Create new
                </MenuItem>
                {prefixes.map((p, i) => (
                  <MenuItem key={"prefix-" + i} value={p}>
                    {p}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          <TextField
            fullWidth
            id="standard-basic"
            label="Or create a new prefix"
            variant="outlined"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </CardContent>
        <InitScreenActions
          onConfirm={saveValue}
          confirmDisabled={value.length < 3}
        ></InitScreenActions>
      </Card>
    </Box>
  );
}

export default SetPrefix;
