/**
 * 두 위경도 좌표 간의 직선 거리(km)를 계산 (하버사인 공식)
 */
export const getDistance = (userLat: number, userLon: number, targetLat: number, targetLon: number): number => {
  const R = 6371; // 지구 반지름 (km)
  const dLat = ((targetLat - userLat) * Math.PI) / 180;
  const dLon = ((targetLon - userLon) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((userLat * Math.PI) / 180) *
      Math.cos((targetLat * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};