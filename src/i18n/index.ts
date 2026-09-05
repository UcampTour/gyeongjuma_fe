import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import commonKo from "./locales/ko/common.json";
import courseKo from "./locales/ko/course.json";
import homeKo from "./locales/ko/home.json";
import loginKo from "./locales/ko/login.json";
import mapKo from "./locales/ko/map.json";
import placesKo from "./locales/ko/places.json";
import profileKo from "./locales/ko/profile.json";
import quizKo from "./locales/ko/quiz.json";

import commonEn from "./locales/en/common.json";
import courseEn from "./locales/en/course.json";
import homeEn from "./locales/en/home.json";
import mapEn from "./locales/en/map.json";
import placesEn from "./locales/en/places.json";

i18n
  // 브라우저 언어 자동 감지
  // ex) ko-KR -> ko, en-US -> en
  // .use(LanguageDetector)
  .use(initReactI18next) // i18next를 React와 연결

  // i18n 초기 설정
  .init({
    // 언어별 번역 리소스 등록
    resources: {
      ko: {
        common: commonKo,
        map: mapKo,
        places: placesKo,
        quiz: quizKo,
        course: courseKo,
        home: homeKo,
        login: loginKo,
        profile: profileKo,
      },
      en: {
        common: commonEn,
        map: mapEn,
        places: placesEn,
        home: homeEn,
        course: courseEn,
      },
      // ... more 일단 한글,영어만 추가
    },

    // 감지된 언어가 없거나 지원하지 않는 언어일 경우 기본 언어
    fallbackLng: "ko",

    // useTranslation() 사용 시 기본 namespace
    // ex) t("nav.home")
    // => common:nav.home
    defaultNS: "common",

    // 프로젝트에서 사용하는 namespace 목록
    ns: ["common", "map", "places", "quiz", "login", "profile", "home"], // *.json 확장

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
