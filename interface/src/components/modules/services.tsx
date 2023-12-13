import { useContext, useEffect } from "react";
import { AppContext, WebsocketContext } from "../../context";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { C_API } from "@dogma-project/constants-meta";

function Services() {
  const { state } = useContext(AppContext);
  const { send } = useContext(WebsocketContext);

  useEffect(() => {
    send({
      type: C_API.ApiRequestType.services,
      action: C_API.ApiRequestAction.get,
    });
  }, []);

  return (
    <Card>
      <CardContent>
        <List>
          {state.services.map((service) => (
            <ListItem
              key={service.service}
              disableGutters
              secondaryAction={
                <IconButton aria-label="comment">
                  <HelpRoundedIcon />
                </IconButton>
              }
            >
              <ListItemText primary={service.service + ":" + service.state} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

export default Services;
