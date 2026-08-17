import { Backdrop, CircularProgress, Stack, Typography } from "@mui/material";

export interface LoadingProps {
  isLoading: boolean;
  loadingMsg?: string;
  iconProps?: React.ReactNode; // icon, size, color, ...
  description?: string;
}

const CommonLoading = ({ loading }: { loading?: LoadingProps }) => {
  return (
    <Backdrop
      // open={isLocating}
      open={loading?.isLoading ?? false}
      sx={{
        zIndex: 9999,
        color: "#fff",
        backgroundColor: "rgba(0,0,0,0.25)",
      }}
    >
      <Stack spacing={2} sx={{ alignItems: "center" }}>
        <CircularProgress color="inherit" />

        <Typography sx={{ fontWeight: 600 }}>{loading?.loadingMsg}</Typography>
        <Typography
          sx={{ fontWeight: 300, whiteSpace: "pre-line", textAlign: "center" }}
        >
          {loading?.description}
        </Typography>
      </Stack>
    </Backdrop>
  );
};

export default CommonLoading;
