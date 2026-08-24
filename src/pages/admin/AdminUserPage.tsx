import { Box, Typography } from "@mui/material";
import { AdminUserTable } from "../../components/admin/user/AdminUserTable";
import { AdminUserSearchFilter } from "../../components/admin/user/AdminUserSearchFilter";
import { AdminUserEditDialog } from "../../components/admin/user/AdminUserEditDialog";
import { useAdminUser } from "../../hooks/admin/useAdminUser";

const AdminUserPage = () => {
  const {
    keyword,
    roleFilter,
    useFlag,
    page,
    rowsPerPage,
    openDialog,
    formState,
    filteredUsers,
    paginatedUsers,
    handleSearchChange,
    handleRoleFilterChange,
    handleUsageChange,
    handleChangePage,
    handleChangeRowsPerPage,
    handleOpenEditDialog,
    handleCloseDialog,
    handleFormChange,
    handleSaveUser,
  } = useAdminUser();

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 800 }}>
          회원 관리
        </Typography>
      </Box>

      <AdminUserSearchFilter
        keyword={keyword}
        roleFilter={roleFilter}
        useFlag={useFlag}
        onSearchChange={handleSearchChange}
        onRoleFilterChange={handleRoleFilterChange}
        onUsageChange={handleUsageChange}
      />

      <AdminUserTable
        users={filteredUsers}
        paginatedUsers={paginatedUsers}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        onOpenEditDialog={handleOpenEditDialog}
      />

      <AdminUserEditDialog
        open={openDialog}
        formState={formState}
        onClose={handleCloseDialog}
        onFormChange={handleFormChange}
        onSave={handleSaveUser}
      />
    </Box>
  );
};

export default AdminUserPage;