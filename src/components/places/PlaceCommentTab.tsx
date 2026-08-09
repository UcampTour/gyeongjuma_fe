import MenuBookIcon from "@mui/icons-material/MenuBook";
import { Box, Typography } from "@mui/material";
import type { PlaceListBase } from "../../models/PlaceModel";

export interface PlaceCommentProps {
  place: PlaceListBase | undefined;
}
const PlaceCommentTab = ({ place }: PlaceCommentProps) => {
  const description = place?.description?.replace(/\.\s*/g, ".\n\n");

  return (
    <Box
      sx={{
        mt: 2,
        p: 4,
        borderRadius: "24px",
        bgcolor: "#FCFBF8",
        border: "1px dashed #D9CDBD",
        textAlign: "left",
        whiteSpace: "pre-line",
      }}
    >
      {place?.description === null || place?.description === "" ? (
        <>
          <MenuBookIcon
            sx={{
              fontSize: 64,
              color: "#C7B8A3",
              mb: 2,
            }}
          />
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "0.975rem",
              color: "#5A534A",
            }}
          >
            아직 준비된 해설이 없어요.
          </Typography>
        </>
      ) : (
        description
      )}
    </Box>
  );
};

export default PlaceCommentTab;
