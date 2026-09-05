import { useState } from "react";
import type { SelectChangeEvent } from "@mui/material";
import type { ChangeEvent } from "react";
import { useAdminUserListQuery } from "../../queries/admin/useAdminUserQuery";
import type { AdminUserData } from "../../models/admin/AdminUserModel";
import { adjustPoint, forceWithdraw } from "../../api/admin/AdminUserApi";
import { updateMyInfo } from "../../api/authApi";
import { queryClient } from "../../config/queryClient";

export const useAdminUser = () => {
  const { data, isLoading } = useAdminUserListQuery();

  const userList = data?.members ?? [];

  const [keyword, setKeyword] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [useFlag, setUseFlag] = useState("all");
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUserData | null>(null);
  
  const [formState, setFormState] = useState({
    nickname: "",
    point: 0,
    isActive: true,
  });

  const filteredUsers = userList.filter((user) => {
    const nickname = user.nickname ?? "";
    const matchesKeyword = nickname.toLowerCase().includes(keyword.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesUsage =
      useFlag === "all" ||
      (useFlag === "active" && user.isActive) ||
      (useFlag === "inactive" && !user.isActive);

    return matchesKeyword && matchesRole && matchesUsage;
  });

  const paginatedUsers = filteredUsers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setKeyword(e.target.value);
    setPage(0);
  };

  const handleRoleFilterChange = (e: SelectChangeEvent) => {
    setRoleFilter(e.target.value);
    setPage(0);
  };

  const handleUsageChange = (e: SelectChangeEvent) => {
    setUseFlag(e.target.value);
    setPage(0);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const handleOpenEditDialog = (user: AdminUserData) => {
    setEditingUser(user);
    setFormState({
      nickname: user.nickname ?? "",
      point: user.point,
      isActive: user.isActive,
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingUser(null);
  };

  const handleFormChange = (field: string, value: any) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveUser = async () => {
    if (!editingUser) return;
    if (!formState.nickname.trim()) {
      alert("닉네임을 입력해주세요.");
      return;
    }

    try {
      const pointDiff = Number(formState.point) - editingUser.point;
      if (pointDiff !== 0) {
        await adjustPoint(editingUser.memberId, pointDiff);
      }

      if(formState.isActive !== editingUser.isActive) {
        await forceWithdraw(editingUser.memberId);
      }
    } catch (error) {
      console.error("회원 정보 수정 실패:", error);
      alert("회원 정보 수정 중 오류가 발생했습니다.");
    }

    alert("회원 정보 수정 완료");
    handleCloseDialog();

    queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
  };

  return {
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
    isLoading,
  };
};