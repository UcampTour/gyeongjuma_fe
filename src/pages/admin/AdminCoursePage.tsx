// AdminCoursePage.tsx
import { Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PlaceSearchDialog from "../../components/admin/quiz/PlaceSearchDialog";
import { AdminCourseTable } from "../../components/admin/course/AdminCourseTable";
import { AdminCourseFilter } from "../../components/admin/course/AdminCourseFilter";
import { AdminCourseDialog } from "../../components/admin/course/AdminCourseDialog";
import { useAdminCourse } from "../../hooks/admin/useAdminCourse";

const AdminCoursePage = () => {
  const {
    filter,
    setFilter,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    dialogMode,
    openDialog,
    openPlaceSearch,
    setOpenPlaceSearch,
    filteredCourses,
    paginatedCourses,
    formType,
    setFormType,
    formIsUse,
    setFormIsUse,
    formPlaces,
    currentLanguage,
    currentCourseName,
    currentDescription,
    supportedLanguages,
    setCurrentLanguage,
    handleFieldChange,
    handleOpenCreateDialog,
    handleOpenEditDialog,
    handleCloseDialog,
    handleSelectPlace,
    handleRemovePlace,
    handleMovePlace,
    handleSaveCourse,
    getTypeText,
  } = useAdminCourse();

  return (
    <Box sx={{ p: 2 }}>
      {/* 타이틀 */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 800 }}>코스 관리</Typography>
      </Box>

      {/* 검색 및 필터 컴포넌트 */}
      <AdminCourseFilter filter={filter} setFilter={setFilter} setPage={setPage} />

      {/* 테이블 컴포넌트 */}
      <AdminCourseTable
        paginatedCourses={paginatedCourses}
        filteredCoursesCount={filteredCourses.length}
        page={page}
        rowsPerPage={rowsPerPage}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
        handleOpenEditDialog={handleOpenEditDialog}
        getTypeText={getTypeText}
      />

      {/* 등록 버튼 */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button 
          onClick={handleOpenCreateDialog}
          variant="contained" 
          startIcon={<AddIcon />} 
          sx={{ bgcolor: "#AC8E61", "&:hover": { bgcolor: "#8f734a" } }}
        >
          코스 등록
        </Button>
      </Box>

      {/* 등록 / 수정 다이얼로그 컴포넌트 */}
      <AdminCourseDialog
        open={openDialog}
        dialogMode={dialogMode}
        formType={formType}
        setFormType={setFormType}
        formIsUse={formIsUse}
        setFormIsUse={setFormIsUse}
        formPlaces={formPlaces}
        currentLanguage={currentLanguage}
        currentCourseName={currentCourseName}
        currentDescription={currentDescription}
        supportedLanguages={supportedLanguages}
        setCurrentLanguage={setCurrentLanguage}
        handleFieldChange={handleFieldChange}
        handleCloseDialog={handleCloseDialog}
        handleSaveCourse={handleSaveCourse}
        setOpenPlaceSearch={setOpenPlaceSearch}
        handleMovePlace={handleMovePlace}
        handleRemovePlace={handleRemovePlace}
      />

      {/* 관광지 검색 팝업 호출 */}
      <PlaceSearchDialog
        open={openPlaceSearch}
        onClose={() => setOpenPlaceSearch(false)}
        handleSelectPlace={handleSelectPlace}
      />
    </Box>
  );
};

export default AdminCoursePage;