import { doLogout } from "@/app/actions";
import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

const Logout = () => {
  return (
    <form action={doLogout}>
      <Button
        startIcon={<LogoutIcon />}
        variant="contained"
        color="success"
        sx={{ mt: 2 }}
        type="submit"
      >
        Sign out
      </Button>
    </form>
  );
};

export default Logout;
