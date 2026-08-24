import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { useState, useEffect } from "react";

interface PlaceSearchDialogProps {
  open: boolean;
  onClose: () => void;
  handleSelectPlace: (place: { id: number; name: string }) => void;
}

const PlaceSearchDialog = ({ open, onClose, handleSelectPlace }: PlaceSearchDialogProps) => {
  const [places, setPlaces] = useState<any[]>([]);
  const [isLoadingPlaces, setIsLoadingPlaces] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    if (open) {
      setIsLoadingPlaces(true);
      searchKeyword;
      try {
        setTimeout(() => {
          setPlaces([
            { id: 101, name: "불국사" },
            { id: 102, name: "석굴암" },
            { id: 103, name: "첨성대" },
            { id: 104, name: "동궁과 월지" },
            { id: 105, name: "대릉원" },
          ]);
          setIsLoadingPlaces(false);
        }, 500);
      } catch (error) {
        console.error("관광지 목록을 불러오는데 실패했습니다.", error);
        setIsLoadingPlaces(false);
      }
    } else {
      // 닫힐 때 검색어 초기화
      setSearchKeyword("");
    }
  }, [open]);

  // 검색 필터링
  const filteredPlaces = places.filter((place) =>
    place.name.includes(searchKeyword)
  );

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

        {isLoadingPlaces ? (
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
                      key={place.id}
                      hover
                      onClick={() => handleSelectPlace(place)}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell sx={{ color: "text.secondary" }}>{place.id}</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>{place.name}</TableCell>
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