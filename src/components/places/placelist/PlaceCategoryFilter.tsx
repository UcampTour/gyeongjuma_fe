import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { OperationStatus } from "../../../models/commonModel";

export type FilterOperationStatus = OperationStatus | "ALL";

interface PlaceCongestionFilterProps {
  selectedStatus: FilterOperationStatus;
  setSelectedStatus: (status: FilterOperationStatus) => void;
}

const PlaceCongestionFilter = ({
  selectedStatus,
  setSelectedStatus,
}: PlaceCongestionFilterProps) => {
  const { t } = useTranslation("places");

  const statuses: { status: FilterOperationStatus; label: string }[] = [
    { status: "ALL", label: t("status.all") },
    { status: OperationStatus.OPEN, label: t("status.open") },
    { status: OperationStatus.BREAK_TIME, label: t("status.breakTime") },
    { status: OperationStatus.CLOSED, label: t("status.closed") },
    { status: OperationStatus.NONE, label: t("status.none") },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        overflowX: "auto",
        whiteSpace: "nowrap",
        mb: 3,
        pb: 1,
        ":-webkit-scrollbar": { display: "none" },
      }}
    >
      {statuses.map((item) => {
        const isSelected = selectedStatus === item.status;
        return (
          <Box
            key={item.status}
            onClick={() => setSelectedStatus(item.status)}
            sx={{
              px: 2.2,
              py: 0.8,
              borderRadius: "20px",
              fontSize: "14px",
              fontWeight: "bold",
              cursor: "pointer",
              border: "1px solid",
              borderColor: isSelected ? "#8E7249" : "#E3DCCE",
              bgcolor: isSelected ? "#8E7249" : "#FFFFFF",
              color: isSelected ? "#FFFFFF" : "#7A7265",
              boxShadow: isSelected
                ? "0 2px 8px rgba(142,114,73,0.25)"
                : "none",
              transition: "all 0.2s",
            }}
          >
            {item.label}
          </Box>
        );
      })}
    </Box>
  );
};

export default PlaceCongestionFilter;