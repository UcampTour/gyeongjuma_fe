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
import loginEn from "./locales/en/login.json";
import mapEn from "./locales/en/map.json";
import placesEn from "./locales/en/places.json";
import profileEn from "./locales/en/profile.json";
import quizEn from "./locales/en/quiz.json";

import commonJa from "./locales/ja/common.json";
import courseJa from "./locales/ja/course.json";
import homeJa from "./locales/ja/home.json";
import loginJa from "./locales/ja/login.json";
import mapJa from "./locales/ja/map.json";
import placesJa from "./locales/ja/places.json";
import profileJa from "./locales/ja/profile.json";
import quizJa from "./locales/ja/quiz.json";

import commonZh from "./locales/zh/common.json";
import courseZh from "./locales/zh/course.json";
import homeZh from "./locales/zh/home.json";
import loginZh from "./locales/zh/login.json";
import mapZh from "./locales/zh/map.json";
import placesZh from "./locales/zh/places.json";
import profileZh from "./locales/zh/profile.json";
import quizZh from "./locales/zh/quiz.json";

i18n
  // 브라우저 언어 자동 감지
  // ex) ko-KR -> ko, en-US -> en
  // .use(LanguageDetector)
  .use(initReactI18next)

  .init({
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
        quiz: quizEn,
        course: courseEn,
        home: homeEn,
        login: loginEn,
        profile: profileEn,
      },

      ja: {
        common: commonJa,
        map: mapJa,
        places: placesJa,
        quiz: quizJa,
        course: courseJa,
        home: homeJa,
        login: loginJa,
        profile: profileJa,
      },

      zh: {
        common: commonZh,
        map: mapZh,
        places: placesZh,
        quiz: quizZh,
        course: courseZh,
        home: homeZh,
        login: loginZh,
        profile: profileZh,
      },
    },

    // 지원하지 않는 언어일 경우 한국어 사용
    fallbackLng: "ko",

    // 기본 namespace
    defaultNS: "common",

    // 프로젝트에서 사용하는 namespace 목록
    ns: [
      "common",
      "map",
      "places",
      "quiz",
      "course",
      "home",
      "login",
      "profile",
    ],

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
