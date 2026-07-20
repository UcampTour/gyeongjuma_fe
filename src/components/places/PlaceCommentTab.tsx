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
        mt: 1.5,
        mb: 2,
        bgcolor: "rgba(255, 255, 255, 0.5)",
        border: "1px solid rgba(160, 142, 115, 0.15)",
        borderRadius: "32px",
        p: 2.5,
        pt: 3.5,
        boxShadow: "0 4px 20px rgba(160, 142, 115, 0.03)",
      }}
    >
      <Typography
        sx={{
          whiteSpace: "pre-line",
          lineHeight: 1.8,
        }}
      >
        {description}
      </Typography>
    </Box>
  );
};

export default PlaceCommentTab;
