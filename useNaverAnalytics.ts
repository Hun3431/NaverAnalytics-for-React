import { useCallback } from "react";

/// 네이버 애널리틱스 React와 같은 SPA 프로젝트에서 사용할 수 있도록 커스텀으로 제작한 훅(ts에서 사용할 수 있도록 작성됨)
const useNASend = () => {
  const trackingId = "";
  const loadNaverAnalyticsScript = useCallback(() => {
    // 스크립트가 이미 로드되어 있지 않은 경우에만 추가
    if (!document.getElementById("naver-analytics-script")) {
      // 스크립트 요소 생성
      const script = document.createElement("script");
      script.id = "naver-analytics-script"; // 중복 로드를 방지하기 위한 id 설정
      script.src = "//wcs.naver.net/wcslog.js"; // 네이버 애널리틱스 스크립트 URL 지정
      script.async = true; // 비동기 설정

      // 스크립트 로드 완료 후 추적 초기화
      script.onload = () => {
        // window as any : 타입 체크 우회
        // (불러오는 네이버 애널리틱스 스크립트가 js로 되어있어서 ts에서 사용하기위해 필요함)
        if (!(window as any).wcs_add) {
          (window as any).wcs_add = {};
        }
        (window as any).wcs_add["wa"] = trackingId;
      };

      // 스크립트 요소 document head에 추가 -> 스크립트 로드됨.
      document.head.appendChild(script);
    }
  }, [trackingId]);

  /// 페이지 접속을 추적하는 함수
  const PageViewTrigger = useCallback(() => {
    // 스크립트가 없으면 스크립트를 헤더에 추가
    loadNaverAnalyticsScript();

    // 페이지뷰 추적 트리거
    if ((window as any).wcs) {
      (window as any).wcs_do();
    }
  }, []);

  /// 이벤트 발생을 추적하는 함수
  const EventTrigger = useCallback((category: string, label: string) => {
    // 스크립트가 없으면 스크립트를 헤더에 추가
    loadNaverAnalyticsScript();

    // 이벤트 발생 추적 트리거
    if ((window as any).wcs) {
      (window as any).wcs.event(category, label);
    }
  }, []);

  return { PageViewTrigger, EventTrigger };
};

export default useNASend;
