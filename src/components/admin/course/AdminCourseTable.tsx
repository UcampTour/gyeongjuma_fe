import React from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";

interface SelectedPlace {
  id: number;
  name: string;
}

interface CourseContentItem {
  courseContentId?: number;
  language: string;
  courseName: string;
  description: string;
}

interface CourseItem {
  id: number;
  type: "WALK" | "PUBLIC" | "DRIVE";
  isUse: boolean;
  places: SelectedPlace[];
  contents: CourseContentItem[];
}

interface AdminCourseTableProps {
  paginatedCourses: CourseItem[];
  filteredCoursesCount: number;
  page: number;
  rowsPerPage: number;
  setPage: (page: number) => void;
  setRowsPerPage: (rowsPerPage: number) => void;
  handleOpenEditDialog: (course: CourseItem) => void;
  getTypeText: (type: string) => string;
}

export const AdminCourseTable: React.FC<AdminCourseTableProps> = ({
  paginatedCourses,
  filteredCoursesCount,
  page,
  rowsPerPage,
  setPage,
  setRowsPerPage,
  handleOpenEditDialog,
  getTypeText,
}) => {
  return (
    <Paper sx={{ width: "100%", mb: 2, borderRadius: "12px", overflow: "hidden", border: "1px solid #E0E0E0" }} elevation={0}>
      <TableContainer>
        <Table sx={{ minWidth: 750 }} size="medium">
          <TableHead sx={{ bgcolor: "#F9F9F9" }}>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>NO</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>코스명 (KO)</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>코스 설명 (KO)</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>유형</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>장소 수</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>사용 여부</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>수정</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCourses.length > 0 ? (
              paginatedCourses.map((course, index) => {
                const koContent = course.contents?.find((c) => c.language === "KO") || course.contents?.[0];
                const courseName = koContent ? koContent.courseName : "";
                const description = koContent ? koContent.description : "";

                return (
                  <TableRow key={course.id} hover>
                    <TableCell align="center">{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>{courseName}</TableCell>
                    <TableCell sx={{ maxWidth: "300px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "text.secondary" }}>
                      {description}
                    </TableCell>
                    <TableCell align="center">{getTypeText(course.type)}</TableCell>
                    <TableCell align="center">{course.places.length}개</TableCell>
                    <TableCell align="center">{course.isUse ? "Y" : "N"}</TableCell>
                    <TableCell align="center">
                      <Button 
                        size="small" 
                        variant="outlined"
                        onClick={() => handleOpenEditDialog(course)}
                        sx={{ color: "#AC8E61", borderColor: "#AC8E61", minWidth: "48px", height: "28px", fontSize: "0.75rem" }}
                      >
                        수정
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 4, color: "text.secondary" }}>
                  검색된 코스가 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: "flex", justifyContent: "center", py: 1 }}>
        <TablePagination
          component="div"
          count={filteredCoursesCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
          rowsPerPageOptions={[5, 10, 25]}
          labelRowsPerPage="페이지당 행 수:"
          sx={{ "& .MuiTablePagination-toolbar": { pl: 0 }, "& .MuiTablePagination-spacer": { display: "none" } }}
        />
      </Box>
    </Paper>
  );
};