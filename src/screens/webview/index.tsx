import React from 'react';
import { Text } from 'react-native';
import WebView from 'react-native-webview';

import { FocusAwareStatusBar, View } from '@/ui';

export const Webview = () => {
  // const webViewRef = useRef(null);

  return (
    <>
      <FocusAwareStatusBar />
      <View className="flex-1  px-4 pt-10">
        {/* <TextVariants />
          <ColorVariants />
          <InputVariants />
          <ButtonVariants /> */}
        <WebView
          // source={{ uri: 'https://reactnative.dev/' }}
          style={{ flex: 1 }}
          // ref={webViewRef} // Assign webview ref to the `webViewRef` while initial rendering
          onError={(syntheticEvent) =>
            console.log('Error de carga', syntheticEvent.nativeEvent)
          }
          source={{
            uri: 'https://starter.obytes.com/getting-started/create-new-app/',
          }}
          // style={{ height: 'auto' }}
          // renderLoading={() => <CustomLoader />}
          // mediaCapturePermissionGrantType="grant"
          userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"
          // startInLoadingState
          // javaScriptEnabled
          // domStorageEnabled
          // cacheEnabled
          // thirdPartyCookiesEnabled
          // allowsProtectedMedia
          // allowUniversalAccessFromFileURLs
          // allowsInlineMediaPlayback
          // mediaPlaybackRequiresUserAction={false}
          onMessage={(event) => console.log(event)}
          onLoadEnd={() => console.log('hola mundo 2')}
        />
      </View>
      <View>
        <Text>hola este es un texto de prueba</Text>
      </View>
    </>
  );
};
