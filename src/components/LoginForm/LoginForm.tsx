import { doSocialLogin } from "@/app/actions";
import { Button } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

const LoginForm = () => {
  return (
    <form action={doSocialLogin}>
      <Button
        style={{
          backgroundColor: "black",
        }}
        startIcon={<GitHubIcon />}
        sx={{ mt: 2 }}
        variant="contained"
        type="submit"
        name="action"
        value="github"
      >
        SIGN IN WITH GITHUB
      </Button>
    </form>
  );
};

export default LoginForm;
