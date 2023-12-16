import Button from "@mui/material/Button";
import { useState } from "react";
import ExportKeyModal from "./parts/export-key";
import Typography from "@mui/material/Typography";

function User() {
  const [modal, setModal] = useState(false);

  return (
    <>
      <ExportKeyModal
        open={modal}
        onclose={() => setModal(false)}
      ></ExportKeyModal>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        User page
      </Typography>
      <Button onClick={() => setModal(true)} sx={{ my: 3 }} variant="contained">
        Export key
      </Button>
    </>
  );
}

export default User;
