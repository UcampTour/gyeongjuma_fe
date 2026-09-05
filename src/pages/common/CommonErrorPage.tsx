import { Box, Button, Typography } from "@mui/material";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const CommonErrorPage = () => {
  const error = useRouteError();

  console.error(error);

  const getErrorMessage = () => {
    if (isRouteErrorResponse(error)) {
      return `${error.status} ${error.statusText}`;
    }

    if (error instanceof Error) {
      return error.message;
    }

    return "알 수 없는 오류가 발생했습니다.";
  };

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        px: 3,
        textAlign: "center",
        bgcolor: "#F9F6EE",
      }}
    >
      <Typography
        sx={{
          fontSize: "1.2rem",
          fontWeight: 700,
          color: "#4A443C",
          mb: 1,
        }}
      >
        문제가 발생했어요 😢
      </Typography>

      <Typography
        sx={{
          fontSize: "0.9rem",
          color: "#8A8278",
          mb: 1,
        }}
      >
        잠시 후 다시 시도해 주세요.
      </Typography>

      {import.meta.env.DEV && (
        <Box
          sx={{
            mt: 1,
            mb: 3,
            px: 2,
            py: 1.5,
            width: "100%",
            maxWidth: "400px",
            bgcolor: "#F0ECE4",
            borderRadius: "10px",
            textAlign: "left",
            overflow: "auto",
          }}
        >
          <Typography
            component="pre"
            sx={{
              m: 0,
              fontSize: "0.75rem",
              color: "#6B6258",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {getErrorMessage()}
          </Typography>
        </Box>
      )}

      <Button
        variant="contained"
        onClick={() => (window.location.href = "/")}
        sx={{
          borderRadius: "12px",
          bgcolor: "#A08E73",
          boxShadow: "none",
          "&:hover": {
            bgcolor: "#8E7D64",
            boxShadow: "none",
          },
        }}
      >
        홈으로 이동
      </Button>
    </Box>
  );
};

export default CommonErrorPage;
