import { useState, useContext } from "react";
import { AppContext } from "../context";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InitScreenActions from "./modules/parts/init-screen-actions";

function SetPrefix({
  setPrefix,
}: {
  setPrefix: React.Dispatch<React.SetStateAction<string | undefined>>;
}) {
  const { apiRequest } = useContext(AppContext);

  const [value, setValue] = useState("");

  const saveValue = () => {
    apiRequest("POST", "/core/prefix", {
      params: { prefix: value },
      cb: () => {
        setPrefix(value);
      },
    });
  };

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
          <TextField
            id="standard-basic"
            label="Set prefix"
            variant="standard"
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
