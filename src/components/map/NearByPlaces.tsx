import { Typography } from "@mui/material";
import React from "react";

const NearByPlaces = () => {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        주변 장소
      </Typography>
      <Typography variant="body1">
        현재 위치를 기준으로 주변에 있는 장소들을 보여줍니다.
      </Typography>
    </div>
  );
};

export default NearByPlaces;
