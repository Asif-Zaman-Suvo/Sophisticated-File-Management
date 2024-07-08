import { doLogout } from "@/app/actions";
import { Button } from "@mui/material";

const Logout = () => {
  return (
    <form action={doLogout}>
      <Button variant="contained" color="primary" sx={{ mt: 2 }} type="submit">
        Sign out
      </Button>
    </form>
  );
};

export default Logout;
