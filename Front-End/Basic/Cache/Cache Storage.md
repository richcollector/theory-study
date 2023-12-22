## Cache Storage (Service Worker)

- 캐싱 대상

  주로 프로그레시브 웹 앱(PWA)과 같은 고급 웹 애플리케이션에서 동적이고 복잡한 캐싱이 필요한 경우에 사용됩니다. 자체적으로 캐시 정책을 정의하고 관리할 수 있습니다.

- 캐시 위치

  브라우저의 백그라운드에서 실행되는 Service Worker 스레드에서 동작하며, 브라우저 캐시와는 별도의 저장소를 가집니다.

- 동작 방식

  Service Worker는 프로그래밍 방식으로 웹 페이지 요청과 응답을 가로채고, 캐싱 정책에 따라 캐시를 저장하고 반환합니다. 개발자가 직접 캐시 정책을 결정할 수 있어 더 세밀한 제어가 가능합니다.

- 사용법

  Service Worker는 개발자가 직접 제어할 수 있습니다. 웹 앱에 포함된 JavaScript 파일 내에서 Service Worker를 등록하고, fetch 이벤트 등을 사용하여 캐싱 로직을 구현할 수 있습니다. Service Worker를 사용하려면 HTTPS 환경이 필요합니다.

캐시 디렉토리는 주로 브라우저가 자동으로 처리하는 정적 자원의 캐싱에 사용되며, Service Worker의 캐시는 동적이고 고급 웹 애플리케이션에서 프로그래밍 방식으로 제어할 수 있는 캐싱에 사용됩니다.

### 캐시 스토리지 저장 및 읽어오기

1. 캐시 생성을 위해 caches.open(캐시이름) 메서드를 사용합니다.

2. 캐시 저장은 cache.put(url, 새로 생성된 응답)을 사용합니다.

3. 캐시 불러오기는 cache.match(url)을 사용합니다.

```jsx
//cache.js

export async function setCachedData(cacheName, url, response) {
  const cacheStorage = await caches.open(cacheName);
  const init = {
    headers: {
      "Content-Type": "application/json, application/json; charset=utf-8",
      "content-length": "2",
    },
  };
  const clonedResponse = new Response(JSON.stringify(response), init);
  await cacheStorage.put(url, clonedResponse);

  return;
}

export async function getCachedData(cacheName, url) {
  try {
    const cacheStorage = await caches.open(cacheName);
    const cachedResponse = await cacheStorage.match(url);

    if (!cachedResponse || !cachedResponse.ok) {
      return false;
    }

    return await cachedResponse.json();
  } catch (error) {
    console.error("Error while getting data from cache:", error);
    return false;
  }
}
```

```jsx
//searchAPI.js

import { AxiosError } from "axios";
import { axiosInstance } from "./axiosInstance";
import { getCachedData, setCachedData } from "../utils/cache";

const searchKeyword = async (keyword) => {
  try {
    const cacheName = `cache_${keyword}`;
    const url = `https://api.clinicaltrialskorea.com/api/v1/search-conditions/?name=${keyword}`;

    let cachedData = await getCachedData(cacheName, url);

    if (cachedData) {
      return cachedData;
    }

    const response = await axiosInstance.get("/search-conditions", {
      params: { name: keyword },
    });

    await setCachedData(cacheName, url, response);

    console.info("calling api");
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response;
    }
    console.error("Error while searching for keyword:", error);
    return { data: [] }; // 빈 배열로 감싸서 반환
  }
};

const searchApi = {
  searchKeyword,
};

export default searchApi;
```

- API 호출을 줄위기 위한 디바운스 호출

```jsx
//SearchBox.jsx

import React, { useState } from "react";
import searchApi from "../api/seachAPI";
import ResultList from "./ResultList";

export default function SearchBox() {
  const [searchText, setSearchText] = useState("");
  const [result, setResult] = useState([]);

  // fix: 검색창에 입력 텍스트 없을 때 호출 막아야함
  const handleChange = async (e) => {
    setSearchText(e.target.value);
    if (searchText.length > 0) {
      const res = await searchApi.searchKeyword(e.target.value);
      setResult(res.data);
    }
  };

  return (
    <div className="flex flex-col w-72 m-auto mt-10">
      <div className="flex rounded-md overflow-hidden">
        <input
          className="p-3 flex-grow"
          type="text"
          value={searchText}
          onChange={handleChange}
        />
        <button className="bg-blue-600 text-white p-3">검색</button>
      </div>
      {searchText.length > 0 ? <ResultList result={result} /> : null}
    </div>
  );
}
```

```jsx
// debounce.js

export const debounce = (callback, delay) => {
  let timerId;
  return (...args) => {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};
```

### 참고자료

- [캐시 스토리지(cache storage) 설정, 에러 해결(clone is not a function)](https://always-hyeppy.tistory.com/35)
