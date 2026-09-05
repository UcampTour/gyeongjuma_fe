import i18n from "../../i18n";

export enum CourseType {
  ALL = "ALL",
  WALK = "WALK",
  TRANSIT = "TRANSIT",
  DRIVE = "DRIVE",
}

export interface CourseFilter {
  type: CourseType;
  label: string;
  emoji: string;
}

export const courseFilters: CourseFilter[] = [
  {
    type: CourseType.ALL,
    label: i18n.t("course:tabLabel.ALL  "),
    emoji: "🌟",
  },
  {
    type: CourseType.WALK,
    label: i18n.t("course:tabLabel.WALK"),
    emoji: "🚶",
  },
  {
    type: CourseType.TRANSIT,
    label: i18n.t("course:tabLabel.TRANSIT"),
    emoji: "🚌",
  },
  {
    type: CourseType.DRIVE,
    label: i18n.t("course:tabLabel.DRIVE"),
    emoji: "🚗",
  },
];

export const getCourseTypeLabel = (type: CourseType): string => {
  const item = courseFilters.find((filter) => filter.type === type);
  return item
    ? `${item.emoji} ${i18n.t(`course:tabLabel.${item.type.toUpperCase()}`)}`
    : "";
};
