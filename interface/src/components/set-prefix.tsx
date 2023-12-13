import { useState, useContext, useEffect } from "react";
import { AppContext } from "../context";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InitScreenActions from "./modules/parts/init-screen-actions";
import NativeSelect from "@mui/material/NativeSelect";

function SetPrefix() {
  const {
    state: { prefixes },
    managerRequest,
    dispatch,
  } = useContext(AppContext);

  const [value, setValue] = useState("");

  const saveValue = () => {
    managerRequest("PUT", "/prefix/" + value, {
      cb: () => {
        dispatch({
          type: "set",
          value: {
            prefix: value,
          },
        });
      },
    });
  };

  useEffect(() => {
    managerRequest("GET", "/prefixes", {
      cb: (data) => {
        if (Array.isArray(data)) {
          dispatch({
            type: "set",
            value: {
              prefixes: data,
            },
          });
        }
      },
    });
  }, []);

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
