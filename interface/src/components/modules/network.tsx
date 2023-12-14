import { useContext, useEffect, useState } from "react";
import { AppContext, WebsocketContext } from "../../context";
import { C_API } from "@dogma-project/constants-meta";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StarIcon from "@mui/icons-material/Star";

function Network() {
  const {
    state: { network },
    dispatch,
  } = useContext(AppContext);
  const { isReady, value, send } = useContext(WebsocketContext);

  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  useEffect(() => {
    if (isReady) {
      send({
        type: C_API.ApiRequestType.network,
        action: C_API.ApiRequestAction.get,
      });
    }
  }, [isReady]);

  useEffect(() => {
    if (value && value.type === C_API.ApiRequestType.network) {
      dispatch({
        type: C_API.ApiRequestAction.set,
        value: value.payload,
      });
    }
  }, [value]);

  return (
    <>
      {network.map((user, i) => {
        return (
          <Accordion
            expanded={expanded === `user-${i}`}
            onChange={handleChange(`user-${i}`)}
            key={`userbox-${i}`}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3bh-content"
              id="panel3bh-header"
            >
              <Typography sx={{ flexGrow: 1 }}>{user.name}</Typography>
              {user.current && <StarIcon />}
            </AccordionSummary>
            {user.requested ? (
              <AccordionDetails key={`nodebox-${i}`}>
                <Typography>ADD user</Typography>
              </AccordionDetails>
            ) : (
              user.nodes.map((node, j) => {
                return (
                  <AccordionDetails key={`nodebox-${i}-${j}`}>
                    <Typography>
                      {node.current && <StarIcon />}
                      {node.name}
                    </Typography>
                  </AccordionDetails>
                );
              })
            )}
          </Accordion>
        );
      })}
    </>
  );
}

export default Network;
