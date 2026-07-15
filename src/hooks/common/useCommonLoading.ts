import type { LoadingProps } from "../../components/common/CommonLoading";

export const useCommonLoading = (...loadings: (LoadingProps | undefined)[]) => {
  return (
    loadings.find((item) => item?.isLoading) ?? {
      isLoading: false,
    }
  );
};
