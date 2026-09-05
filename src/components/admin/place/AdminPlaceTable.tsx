import type { ChangeEvent } from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from "@mui/material";
import type { PlaceItem } from "../../../hooks/admin/useAdminPlace";

interface AdminPlaceTableProps {
  paginatedPlaces: PlaceItem[];
  selectedPlaceId: number;
  totalCount: number;
  page: number;
  rowsPerPage: number;
  onSelectPlace: (place: PlaceItem) => void;
  onChangePage: (_: unknown, newPage: number) => void;
  onChangeRowsPerPage: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const AdminPlaceTable = ({
  paginatedPlaces,
  selectedPlaceId,
  totalCount,
  page,
  rowsPerPage,
  onSelectPlace,
  onChangePage,
  onChangeRowsPerPage,
}: AdminPlaceTableProps) => {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: "12px", border: "1px solid #E0E0E0", boxShadow: "none" }}>
      <Table sx={{ minWidth: 450 }}>
        <TableHead sx={{ bgcolor: "#FAFAFA" }}>
          <TableRow>
            <TableCell align="center" sx={{ fontWeight: 700, width: "50px" }}>No.</TableCell>
            <TableCell align="center" sx={{ fontWeight: 700, width: "80px" }}>ID</TableCell>
            <TableCell align="center" sx={{ fontWeight: 700, width: "140px" }}>관광지 이름</TableCell>
            <TableCell align="center" sx={{ fontWeight: 700, width: "110px" }}>언어</TableCell>
            <TableCell align="center" sx={{ fontWeight: 700, width: "100px" }}>사용 여부</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedPlaces.length > 0 ? (
            paginatedPlaces.map((place, index) => {
              const isSelected = selectedPlaceId === place.placeId;
              return (
                <TableRow 
                  key={place.placeId}
                  onClick={() => onSelectPlace(place)}
                  sx={{ 
                    cursor: "pointer", 
                    bgcolor: isSelected ? "rgba(172, 142, 97, 0.08)" : "inherit",
                    "&:hover": { bgcolor: "rgba(0, 0, 0, 0.04)" } 
                  }}
                >
                  <TableCell align="center" sx={{ color: "text.secondary" }}>
                    {page * rowsPerPage + index + 1}
                  </TableCell>
                  <TableCell align="center">{place.placeId}</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700 }}>{place.placeName}</TableCell>
                  <TableCell align="center">{place.language}</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600, color: place.isActive ? "success.main" : "error.main" }}>
                    {place.isActive ? "활성 (Y)" : "비활성 (N)"}
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center" sx={{ py: 4, color: "text.secondary" }}>
                검색된 관광지가 없습니다.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={totalCount}
        page={page}
        onPageChange={onChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={onChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        labelRowsPerPage="행 수:"
      />
    </TableContainer>
  );
};