import MenuBookIcon from "@mui/icons-material/MenuBook";
import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { PlaceListBase } from "../../models/PlaceModel";
import { useAuthStore } from "../../store/useAuthStore";
import CommonSegmentedTabs, {
  type SegmentedTabItem,
} from "../common/CommonSegmentedTabs";

export interface PlaceCommentProps {
  place: PlaceListBase | undefined;
}

type TabType = "EASY" | "NORMAL" | "HARD";

const PlaceCommentTab = ({ place }: PlaceCommentProps) => {
  const { t } = useTranslation();
  const { member } = useAuthStore();

  // 유저 난이도를 초기값으로 사용
  const [activeTab, setActiveTab] = useState<TabType>(
    (member?.difficulty as TabType) || "EASY",
  );

  // 로그인 정보가 늦게 들어오는 경우에도 유저 난이도로 변경
  useEffect(() => {
    if (member?.difficulty) {
      setActiveTab(member.difficulty as TabType);
    }
  }, [member?.difficulty]);

  const tabItems = [
    {
      value: "EASY",
      label: t("common:mode.easy"),
    },
    {
      value: "NORMAL",
      label: t("common:mode.normal"),
    },
    {
      value: "HARD",
      label: t("common:mode.hard"),
    },
  ] satisfies SegmentedTabItem<TabType>[];

  // 선택된 난이도에 맞는 해설 가져오기
  const commentData = (() => {
    switch (activeTab) {
      case "EASY":
        return place?.description?.easy || null;

      case "NORMAL":
        return place?.description?.normal || null;

      case "HARD":
        return place?.description?.hard || null;

      default:
        return null;
    }
  })();

  // 문장별 줄바꿈
  const description = commentData?.replace(/\.\s*/g, ".\n\n");

  return (
    <>
      <Box
        sx={{
          px: 1,
          mt: 2,
        }}
      >
        <CommonSegmentedTabs
          items={tabItems}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
      </Box>

      <Box
        sx={{
          p: 4,
          mt: 2,
          borderRadius: "24px",
          bgcolor: "#FCFBF8",
          border: "1px dashed #D9CDBD",
          textAlign: "left",
          whiteSpace: "pre-line",
        }}
      >
        {!description ? (
          <Stack sx={{ alignItems: "center", justifyContent: "center" }}>
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
              {t("places:detail.description.emptyState")}
            </Typography>
          </Stack>
        ) : (
          description
        )}
      </Box>
    </>
  );
};

export default PlaceCommentTab;
