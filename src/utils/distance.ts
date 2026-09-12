/**
 * 거리를 사용자에게 보여줄 형식으로 변환
 * - 1000m 미만: xxx m
 * - 1000m 이상: x.x km
 */

export const formatDistance = (distance: number) => {
  return `${distance.toFixed(1)}km`;
};
