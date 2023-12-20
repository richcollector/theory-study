## Web View

프레임워크에 내장된 웹 브라우저 컴포넌트로 뷰(View)의 형태로 앱에 임베딩하는 것을 말합니다.
쉽게 말해서, App에서 웹브라우저를 이용해 화면을 보여주는 방식을 뜻합니다.
(인스타그램에서 링크를 클릭하면 내장된 브라우저로 화면을 보여주는 방식)

### 리액트 네이티브에서 웹뷰 만들기

#### 설치

`$ npm install --save react-native-webview`

- 설치 후 ios

  `cd ios && pod install && ..`

#### 웹뷰를 보여줄 스크린 생성

WebView에 width와 height를 지정하지 않으면 화면이 보이지 않습니다. 디바이스 크기에 꽉차게 들어가게 Dimensions를 import하여 크기를 지정해줍니다.

```jsx
import React from "react";
import { SafeAreaView, StyleSheet, Dimensions } from "react-native";
import WebView from "react-native-webview";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Webview = () => {
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={ref}
        style={styles.webview}
        source={{ uri: "https://naver.com" }}
        onNavigationStateChange={(e) => setNavState(e)}
      />
    </SafeAreaView>
  );
};

export default Webview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  webview: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
  },
});
```

#### Navigation

Home 스크린에서 버튼을 클릭하며 웹뷰가 나오게 하기 위해서 네이게이션을 셋팅해줍니다.

```jsx
// Navigator.js
(...)

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({navigation}) => ({
          // headerShown: false,
          title: 'Home',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Text>Drawer</Text>
            </TouchableOpacity>
          ),
        })}
      />

      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{title: 'Detail'}}
      />
      <Stack.Screen name="Web" component={Webview} />
    </Stack.Navigator>
  );
};

(...)
```

```jsx
// HomeScreen.js

(...)

const HomeScreen = ({navigation}) => {
  const [userInfo, setUserInfo] = useState(false);

  return (
    <SafeAreaView>
      <Text>Home</Text>
      <Button
        title="네이버로 이동"
        onPress={() => navigation.navigate('Web')}
      />
    </SafeAreaView>
  );
};
```

#### Back Button

홈에서 버튼을 클릭하면 웹뷰 컴포넌트로 이동해서 네이버 페이지를 보여줍니다.

성공적으로 웹뷰를 불러왔으나 웹뷰에서 뉴스를 클릭해서 이동하고 뒤로가기 버튼(Home)을 클릭하면 네이버 홈으로 이동하는게 아니라 앱의 HomeScreen으로 이동하고 웹뷰가 종료됩니다.

물리적인 백버튼이 있는 안드로이드에서도 마찬가지로 뒤로가기 버튼을 클릭하면 웹뷰가 종료됩니다.

이 문제를 해결하는 방법으로는 헤더에 있는 백버튼에 새로운 이벤트를 지정해줘야합니다.

```jsx
// Webview.js
import { HeaderBackButton } from "@react-navigation/elements";

const Webview = ({ navigation }) => {
  const ref = useRef(null);
  const [navState, setNavState] = useState();

  useEffect(() => {
    const canGoBack = navState.canGoBack;

    const onPress = () => {
      if (canGoBack) {
        ref.current.goBack();
        return true;
      } else {
        return false;
      }
    };

    navigation.setOptions({
      headerLeft: () =>
        canGoBack ? <HeaderBackButton onPress={onPress} /> : null,
    });

    // 안드로이드 백 버튼(물리적 버튼)을 누르면 웹뷰가 종료되지 않고 바로 전 화면으로 넘어가게 하기 위함.

    BackHandler.addEventListener("hardwareBackPress", onPress);

    // clean up
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", onPress);
    };
  }, [navState.canGoBack]);

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={ref}
        style={styles.webview}
        source={{ uri: "https://naver.com" }}
        onNavigationStateChange={(e) => setNavState(e)}
      />
    </SafeAreaView>
  );
};
```

- onNavigationStateChange

  react-native-webview에서 제공하는 API입니다.

```jsx
<WebView
  source={{ uri: "https://reactnative.dev" }}
  onNavigationStateChange={(navState) => {
    // Keep track of going back navigation within component
    this.canGoBack = navState.canGoBack;
  }}
/>
```

- navState

```js
canGoBack
canGoForward
loading
navigationType (iOS only)
target
title
url
```

navState를 콘솔에 출력하면 아래와 같이 나옵니다. 이 객체안에 canGoBack를 사용해서 뒤로가기 버튼의 이벤트를 생성하면 됩니다.

#### BackHandler

**Only for Android**

공식문서에 따르면 BackHandler.addEventListener는 이벤트 리스너를 생성하고 NativeEventSubscription를 리턴합니다. 이 NativeEventSubscription는 NativeEventSubscription.remove 메소드를 사용해서 clean-up 되어야합니다.

```jsx
import React, { useEffect } from "react";
import { Text, View, StyleSheet, BackHandler, Alert } from "react-native";

const App = () => {
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Click Back button!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default App;
```

### 용어설명

- 임베딩

  일반적으로 어떤 것을 다른 것 안에 내포시키는 것을 의미합니다. 컴퓨터 과학 및 소프트웨어 개발의 맥락에서 "임베딩"이란 특정한 기술이나 요소를 다른 시스템이나 프레임워크에 내장시키는 것을 말합니다.

### 참고자료

- [[React-native] 리액트 네이티브에서 웹뷰 만들기](https://velog.io/@chloedev/React-native-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EB%84%A4%EC%9D%B4%ED%8B%B0%EB%B8%8C%EC%97%90%EC%84%9C-%EC%9B%B9%EB%B7%B0-%EB%A7%8C%EB%93%A4%EA%B8%B0)
