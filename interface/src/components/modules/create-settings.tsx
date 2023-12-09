import { useContext, useState } from "react";
import {
  C_Connection,
  C_Event,
  C_Defaults,
} from "@dogma-project/constants-meta";

import { AppContext } from "../../context";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

function CreateSettings() {
  const { apiRequest } = useContext(AppContext);

  const [router, setRouter] = useState(C_Defaults.router);

  const [dhtAnnounce, setDhtAnnounce] = useState(C_Connection.Group.friends);
  const [dhtLookup, setDhtLookup] = useState(C_Connection.Group.friends);
  const [dhtBootstrap, setDhtBootstrap] = useState(C_Connection.Group.friends);

  const [localDiscovery, setLocalDiscovery] = useState(
    C_Defaults.localDiscovery
  );
  const [autoDefine, setAutoDefine] = useState(C_Defaults.autoDefineIp);
  const [external, setExternal] = useState(C_Defaults.external);

  const saveValue = () => {
    const params: {
      [key in C_Event.Type.Config]?: string | boolean | number;
    } = {
      [C_Event.Type.configRouter]: router,
      [C_Event.Type.configDhtAnnounce]: dhtAnnounce,
      [C_Event.Type.configDhtLookup]: dhtLookup,
      [C_Event.Type.configDhtBootstrap]: dhtBootstrap,
      [C_Event.Type.configLocalDiscovery]: localDiscovery,
      [C_Event.Type.configAutoDefine]: autoDefine,
      [C_Event.Type.configExternal]: autoDefine ? external : "",
    };
    apiRequest("PUT", "/config", { params });
  };

  return (
    <Container className="d-flex align-items-center justify-content-center flex-row min-vh-100">
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Initial settings
          </Typography>

          <TextField
            fullWidth
            id="standard-basic"
            label="Router port "
            variant="standard"
            type="number"
            value={router}
            onChange={(e) => setRouter(Number(e.target.value))}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{
              my: 3,
            }}
          />

          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  DHT announce
                </InputLabel>
                <NativeSelect
                  value={dhtAnnounce}
                  onChange={(e) => setDhtAnnounce(Number(e.target.value))}
                  inputProps={{
                    name: "age",
                    id: "uncontrolled-native",
                  }}
                  sx={{
                    my: 3,
                  }}
                >
                  <option value={C_Connection.Group.all}>All</option>
                  <option value={C_Connection.Group.friends}>Friends</option>
                  <option value={C_Connection.Group.selfUser}>
                    Self nodes
                  </option>
                  <option value={C_Connection.Group.nobody}>Nobody</option>
                </NativeSelect>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  DHT lookup
                </InputLabel>
                <NativeSelect
                  value={dhtLookup}
                  onChange={(e) => setDhtLookup(Number(e.target.value))}
                  inputProps={{
                    name: "age",
                    id: "uncontrolled-native",
                  }}
                  sx={{
                    my: 3,
                  }}
                >
                  <option value={C_Connection.Group.all}>All</option>
                  <option value={C_Connection.Group.friends}>Friends</option>
                  <option value={C_Connection.Group.selfUser}>
                    Self nodes
                  </option>
                  <option value={C_Connection.Group.nobody}>Nobody</option>
                </NativeSelect>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  DHT bootstrap
                </InputLabel>
                <NativeSelect
                  value={dhtBootstrap}
                  onChange={(e) => setDhtBootstrap(Number(e.target.value))}
                  inputProps={{
                    name: "age",
                    id: "uncontrolled-native",
                  }}
                  sx={{
                    my: 3,
                  }}
                >
                  <option value={C_Connection.Group.all}>All</option>
                  <option value={C_Connection.Group.friends}>Friends</option>
                  <option value={C_Connection.Group.selfUser}>
                    Self nodes
                  </option>
                  <option value={C_Connection.Group.nobody}>Nobody</option>
                </NativeSelect>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={localDiscovery}
                    onChange={(e) => setLocalDiscovery(e.target.checked)}
                  />
                }
                sx={{
                  my: 1,
                }}
                label="Local discovery"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={autoDefine}
                    onChange={(e) => setAutoDefine(e.target.checked)}
                  />
                }
                sx={{
                  my: 1,
                }}
                label="Auto define IP"
              />
            </Grid>
          </Grid>

          {autoDefine && (
            <TextField
              id="outlined-basic"
              label="External IP check services"
              variant="outlined"
              value={external}
              multiline
              fullWidth
              minRows={3}
              sx={{
                my: 3,
              }}
              onChange={(e) => setExternal(e.target.value)}
            />
          )}
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "right",
          }}
        >
          <Button
            onClick={saveValue}
            disabled={router < 1024 || router > 65536}
          >
            Next
          </Button>
          <Button disabled>Exit</Button>
        </CardActions>
      </Card>
    </Container>
  );
}

export default CreateSettings;
