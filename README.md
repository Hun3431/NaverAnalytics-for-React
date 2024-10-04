# 개요

React Project에서 NaverAnalytics를 사용하려고 하였지만 SPA 특성상 index.html을 접속 최초에만 실행되기 때문에 공식적으로 제공하는 스크립트로는 페이지 접속 추적을 하기에는 제약이 있었음.

React Project에서 사용할 수 있도록 스크립트를 기반으로 제작하게 됨.

## 사용법

useNaverAnalytics.ts

```tsx
const useNASend = () => {
  const trackingId = "NaverAnalytics 아이디 기입";
  /* 생략 */
```

App.js

```tsx
import useNASend from "../hook/useNaverAnalytics";

const App = () => {
  const na = useNASend();

  // 페이지 접속을 추적하는 함수
  na.PageViewTrigger();

  const category = "이벤트 카테고리";
  const label = "이벤트 이름";
  // 이벤트 발생을 추적하는 함수
  na.EventTrigger(category, label);

  return <>{/* 생략 */}</>;
};
```

## 사용 예시

```tsx
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "../pages/main";
import Test from "../pages/test";
import useNASend from "../hooks/naverAnalytics";

// 페이지 변화를 추적하여 기록
const RouteTracker = () => {
  const location = useLocation();
  const na = useNASend();

  useEffect(() => {
    na.PageViewTrigger();
  }, [location]);

  return null;
};

const App = () => {
  return (
    <BrowserRouter>
      <RouteTracker />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
```
