import { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { CongestionLevel } from "../../models/MapModel";
import type { TabItem } from "../../components/common/CommonChipTabs";
import CommonChipTabs from "../../components/common/CommonChipTabs";

export interface SiteDetailProps {
  siteId: string; //number;
}

const dummySiteDetail = {
  title: "경주역",
  enTitle: "Gyeongju Station (KTX)",
  imageList: [
    "https://picsum.photos/seed/bulguksa1/400/300",
    // "https://picsum.photos/seed/bulguksa2/400/300",
    // "https://picsum.photos/seed/bulguksa3/400/300",
  ],
  CongestionLevel: CongestionLevel.HIGH,
  status: "OPEN",
  isVisited: true,
};
const SiteDetailPage = ({ siteId }: SiteDetailProps) => {
  const [site, setSite] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    // siteId를 기반으로 API 호출하여 관광지 상세 정보를 가져오는 로직
    setSite(dummySiteDetail);
  }, []);

  const TABS: TabItem[] = [
    {
      label: "정보",
      value: "info",
    },
    {
      label: "해설",
      value: "commentary",
    },
    {
      label: "오디오",
      value: "audio",
    },
    {
      label: "퀴즈",
      value: "quiz",
    },
  ];
  return (
    <Box sx={{ padding: 3 }}>
      <Stack sx={{ mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          {site?.title ?? ""}
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          {site?.enTitle ?? ""}
        </Typography>
      </Stack>

      {site?.imageList?.length > 0 && (
        <Swiper
          spaceBetween={12}
          slidesPerView={site?.imageList.length > 1 ? 1.15 : 0}
          grabCursor
          style={{
            width: "100%",
            height: 220,
          }}
        >
          {site.imageList.map((img: string, index: number) => (
            <SwiperSlide key={index}>
              <Box
                component="img"
                src={img}
                alt={site.title}
                sx={{
                  width: "100%",
                  height: 220,
                  borderRadius: 3,
                  objectFit: "cover",
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <CommonChipTabs
        tabs={TABS}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <Box>
        {activeTab === 0 && (
          <>
            <p>관광지 이름: {site?.title ?? ""}</p>
            <p>혼잡도: {site?.CongestionLevel ?? ""}</p>
            <p>운영상태: {site?.status ?? ""}</p>
            <p>방문여부: {site?.isVisited ? "방문" : "미방문"}</p>
          </>
        )}

        {activeTab === 1 && <Box sx={{ height: "1200px" }}>해설 영역</Box>}

        {activeTab === 2 && <Box>오디오 영역</Box>}
        {activeTab === 3 && <Box>퀴즈 영역</Box>}
      </Box>
    </Box>
  );
};
export default SiteDetailPage;
