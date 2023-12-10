import { C_Connection } from "@dogma-project/constants-meta";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";

type SettingsDhtProps = {
  setter: (value: number) => void;
  value: number;
  label: string;
};

export default function SettingsDht(props: SettingsDhtProps) {
  return (
    <FormControl fullWidth>
      <InputLabel variant="standard" htmlFor="dht-switch">
        {props.label}
      </InputLabel>
      <NativeSelect
        value={props.value}
        onChange={(e) => props.setter(Number(e.target.value))}
        inputProps={{
          name: "age",
          id: "dht-switch",
        }}
        sx={{
          my: 3,
        }}
      >
        <option value={C_Connection.Group.all}>All</option>
        <option value={C_Connection.Group.friends}>Friends</option>
        <option value={C_Connection.Group.selfUser}>Self nodes</option>
        <option value={C_Connection.Group.nobody}>Nobody</option>
      </NativeSelect>
    </FormControl>
  );
}
