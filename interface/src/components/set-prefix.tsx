import { useState, useContext } from "react";
import { AppContext } from "../context";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Typography>
          <TextField
            id="standard-basic"
            label="Set prefix"
            variant="standard"
            onChange={(e) => setValue(e.target.value)}
          />
        </CardContent>
        <CardActions>
          <Button size="small" onClick={saveValue} disabled={value.length < 3}>
            Next
          </Button>
          <Button size="small" disabled>
            Exit
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
}

export default SetPrefix;
