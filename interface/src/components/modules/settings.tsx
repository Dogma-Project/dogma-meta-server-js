import { useContext, useEffect, useState } from "react";
import {
  C_Connection,
  C_Event,
  C_Defaults,
  C_API,
} from "@dogma-project/constants-meta";

import { WebsocketContext } from "../../context";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import SettingsRouter from "./settings-parts/router";
import SettingsDht from "./settings-parts/dht";
import SettingsSwitch from "./settings-parts/switch";
import SettingsExternal from "./settings-parts/external";
import SaveCardAction from "./parts/save-card-action";

export default function SettingsPage() {
  const { isReady, value, send } = useContext(WebsocketContext);

  const [router, setRouter] = useState(0);

  const [dhtAnnounce, setDhtAnnounce] = useState(C_Connection.Group.nobody);
  const [dhtLookup, setDhtLookup] = useState(C_Connection.Group.nobody);
  const [dhtBootstrap, setDhtBootstrap] = useState(C_Connection.Group.nobody);

  const [localDiscovery, setLocalDiscovery] = useState(false);
  const [autoDefine, setAutoDefine] = useState(false);
  const [external, setExternal] = useState(C_Defaults.external);

  type Configs = {
    [key in C_Event.Type.Config]?: string | boolean | number;
  };

  const saveValue = () => {
    if (isReady) {
      const params: Configs = {
        [C_Event.Type.configRouter]: router,
        [C_Event.Type.configDhtAnnounce]: dhtAnnounce,
        [C_Event.Type.configDhtLookup]: dhtLookup,
        [C_Event.Type.configDhtBootstrap]: dhtBootstrap,
        [C_Event.Type.configLocalDiscovery]: localDiscovery,
        [C_Event.Type.configAutoDefine]: autoDefine,
        [C_Event.Type.configExternal]: external || C_Defaults.external,
      };
      send({
        type: C_API.ApiRequestType.settings,
        action: C_API.ApiRequestAction.set,
        payload: params,
      });
    }
  };

  useEffect(() => {
    send({
      type: C_API.ApiRequestType.settings,
      action: C_API.ApiRequestAction.get,
    });
  }, []);

  useEffect(() => {
    if (value && value.type === C_API.ApiRequestType.settings) {
      const object = value.payload.settings as Configs;
      if (object[C_Event.Type.configRouter] !== undefined) {
        setRouter(Number(object[C_Event.Type.configRouter]));
      }
      if (object[C_Event.Type.configDhtAnnounce] !== undefined) {
        setDhtAnnounce(Number(object[C_Event.Type.configDhtAnnounce]));
      }
      if (object[C_Event.Type.configDhtLookup] !== undefined) {
        setDhtLookup(Number(object[C_Event.Type.configDhtLookup]));
      }
      if (object[C_Event.Type.configDhtBootstrap] !== undefined) {
        setDhtBootstrap(Number(object[C_Event.Type.configDhtBootstrap]));
      }
      if (object[C_Event.Type.configLocalDiscovery] !== undefined) {
        setLocalDiscovery(!!object[C_Event.Type.configLocalDiscovery]);
      }
      if (object[C_Event.Type.configAutoDefine] !== undefined) {
        setAutoDefine(!!object[C_Event.Type.configAutoDefine]);
      }
      if (object[C_Event.Type.configExternal] !== undefined) {
        setExternal(object[C_Event.Type.configExternal] as string);
      }
    }
  }, [value]);

  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5">
          Settings
        </Typography>

        <SettingsRouter router={router} setRouter={setRouter}></SettingsRouter>

        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <SettingsDht
              value={dhtAnnounce}
              label="DHT Announce"
              setter={setDhtAnnounce}
            ></SettingsDht>
          </Grid>
          <Grid item xs={12} md={4}>
            <SettingsDht
              value={dhtLookup}
              label="DHT lookup"
              setter={setDhtLookup}
            ></SettingsDht>
          </Grid>
          <Grid item xs={12} md={4}>
            <SettingsDht
              value={dhtBootstrap}
              label="DHT bootstrap"
              setter={setDhtBootstrap}
            ></SettingsDht>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <SettingsSwitch
              value={localDiscovery}
              label="Local discovery"
              setter={setLocalDiscovery}
            ></SettingsSwitch>
          </Grid>
          <Grid item xs={12} md={6}>
            <SettingsSwitch
              value={autoDefine}
              label="Auto define IP"
              setter={setAutoDefine}
            ></SettingsSwitch>
          </Grid>
        </Grid>

        <SettingsExternal
          setter={setExternal}
          value={external}
          label="External IP check services"
          disabled={!autoDefine}
        ></SettingsExternal>
      </CardContent>
      <SaveCardAction
        onConfirm={saveValue}
        confirmDisabled={router < 1024 || router > 65536}
      ></SaveCardAction>
    </Card>
  );
}
