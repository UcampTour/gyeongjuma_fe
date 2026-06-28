import { useEffect, useState } from "react";
import { CongestionLevel } from "../../models/MapModel";
import { Box } from "@mui/material";

export interface SiteDetailProps {
  siteId: string; //number;
}
const SiteDetailPage = ({ siteId }: SiteDetailProps) => {
  const [site, setSite] = useState<any | null>(null);

  useEffect(() => {
    // siteId를 기반으로 API 호출하여 관광지 상세 정보를 가져오는 로직
    console.log("here");
    setSite({
      title: "경주역",
      CongestionLevel: "HIGH",
      status: "OPEN",
      isVisited: true,
    });
  }, []);
  return (
    <Box sx={{ padding: 3 }}>
      <h1>관광지 상세 페이지 테스트</h1>
      <p>관광지 이름: {site?.title ?? ""}</p>
      <p>혼잡도: {site?.congestion ?? ""}</p>
      <p>운영상태: {site?.status ?? ""}</p>
      <p>방문여부: {site?.isVisited ? "방문" : "미방문"}</p>
    </Box>
  );
};
export default SiteDetailPage;
