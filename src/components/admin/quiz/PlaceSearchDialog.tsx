import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { useState } from "react";
import { useAdminPlaceListQuery } from "../../../queries/admin/useAdminPlaceQuery";

interface PlaceSearchDialogProps {
  open: boolean;
  onClose: () => void;
  handleSelectPlace: (place: { id: number; name: string }) => void;
}

const PlaceSearchDialog = ({ open, onClose, handleSelectPlace }: PlaceSearchDialogProps) => {
  const { data, isLoading } = useAdminPlaceListQuery();
  const placeData = data?.places ?? [];

  const [searchKeyword, setSearchKeyword] = useState("");

  // language가 "ko"이면서 검색 키워드가 포함된 장소만 필터링
  const filteredPlaces = placeData.filter((place: any) => {
    const isKorean = place?.language === "ko";
    const matchesKeyword = place?.placeName?.toLowerCase().includes((searchKeyword || "").toLowerCase());
    return isKorean && matchesKeyword;
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 700 }}>관광지 선택</DialogTitle>
      <DialogContent dividers sx={{ minHeight: "400px", p: 3, pt: 2 }}>
        <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
          <TextField
            size="small"
            fullWidth
            placeholder="관광지명을 검색하세요"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </Box>

        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer component={Paper} sx={{ boxShadow: "none", border: "1px solid #E0E0E0" }}>
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow sx={{ bgcolor: "#F9FAFB" }}>
                  <TableCell sx={{ width: "30%", fontWeight: 700, color: "#4B5563" }}>ID</TableCell>
                  <TableCell sx={{ width: "70%", fontWeight: 700, color: "#4B5563" }}>관광지명</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredPlaces.length > 0 ? (
                  filteredPlaces.map((place) => (
                    <TableRow
                      key={place.placeId}
                      hover
                      onClick={() => handleSelectPlace({ id: place.placeId, name: place.placeName })}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell sx={{ color: "text.secondary" }}>{place.placeId}</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>{place.placeName}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2} align="center" sx={{ py: 4, color: "text.secondary" }}>
                      검색된 관광지가 없습니다.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          닫기
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PlaceSearchDialog;