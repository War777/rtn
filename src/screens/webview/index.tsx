/* eslint-disable max-lines-per-function */
import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { Linking } from 'react-native';
import WebView from 'react-native-webview';

import { FocusAwareStatusBar, View } from '@/ui';

export const Webview = () => {
  const webViewRef = useRef<WebView | null>(null);
  const [printMessage, setPrintMessage] = useState('');
  const navigation = useNavigation();

  // const injectToWidget = `document.body.style.backgroundColor = 'blue'; true;`;

  const navigationButton = `
    document.getElementById('navegation_button').addEventListener('click', function() {
      window.ReactNativeWebView.postMessage('ButtonClicked');
    });
  `;

  const youtubeButton = `
  document.getElementById('external_link_button').addEventListener('click', function() {
    window.ReactNativeWebView.postMessage('external Link');
  });
`;
  // Abrir link externo a otra pagina
  const openYouTube = () => {
    const youtubeUrl = `https://www.youtube.com/watch?v=NaoNcERVF78&ab_channel=Bizarrap`;
    Linking.openURL(youtubeUrl);
  };

  // Mandar mensaje al widget, aun no funciona correctamente
  const sendMessageToWebview = () => {
    const message = 'Hola desde React Native';
    // const script = `window.postMessage('${message}', '*');`;

    if (webViewRef.current) {
      webViewRef.current.postMessage(message);
    }
  };

  // const buildMessage = (event: any) => {
  //   console.log('hola', event.nativeEvent.data);

  //   if (event.nativeEvent.data === 'ButtonClicked') {
  //     handleButtonClick();
  //   }

  //   const recivedMessage = event.nativeEvent.data;
  //   const text = JSON.parse(recivedMessage);
  //   setPrintMessage(text);
  // };

  console.log(printMessage, 'mensaje armado');

  // const sendMsgToPWA = () => {
  //   console.log('holllaaaaaaaaa 2');
  //   if (webViewRef?.current) {
  //     webViewRef?.current?.postMessage('Hi to React - from React native');
  //   }
  // };

  // funcion para ejecutar codigo de javaScript
  const executeJavaScript = (code: any) => {
    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(code);
    }
  };

  // Ejecutar un console en el widget
  // const logToConsole = () => {
  //   const code = "console.log('Hola desde React Native')";
  //   executeJavaScript(code);
  // };

  // navegar entre paginas, funcion para un botton del widget
  const handleButtonClick = () => {
    console.log('Botón en la página web ha sido clickeado');
    // @ts-ignore
    navigation.navigate('Style');
    // Aquí poner la navegación
    // debo de cambiar de pantalla
  };

  //

  // construire el mensaje que viene del widget
  const buildMessage = (event: any) => {
    console.log('hola', event.nativeEvent.data);
    const recivedMessage = event.nativeEvent.data;

    if (recivedMessage === 'ButtonClicked') {
      handleButtonClick();
      return;
    }

    if (recivedMessage === 'external Link') {
      openYouTube();
      return;
    }

    // if (typeof recivedMessage !== 'string') {
    console.log('no es un string');
    const text = JSON.parse(recivedMessage);
    setPrintMessage(text);
    // }
  };

  return (
    <>
      <FocusAwareStatusBar />
      <View className="flex-1  px-4 pt-10">
        <WebView
          style={{ flex: 1 }}
          ref={webViewRef} // Assign webview ref to the `webViewRef` while initial rendering
          onError={(syntheticEvent) =>
            console.log('Error de carga', syntheticEvent.nativeEvent)
          }
          source={{
            uri: 'http://localhost:8080/digitalProgramLoader.html',
          }}
          // renderLoading={() => <CustomLoader />}
          // mediaCapturePermissionGrantType="grant"
          originWhitelist={['*']}
          userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"
          startInLoadingState
          javaScriptEnabled
          domStorageEnabled
          cacheEnabled
          thirdPartyCookiesEnabled
          allowsProtectedMedia
          allowUniversalAccessFromFileURLs
          // allowsInlineMediaPlayback
          // mediaPlaybackRequiresUserAction={false}
          // injectedJavaScript={injectToWidget}
          onMessage={buildMessage}
          onLoadEnd={sendMessageToWebview} // de momento no muestra
          onLoad={() => {
            executeJavaScript(navigationButton);
            executeJavaScript(youtubeButton);
          }}
        />
      </View>
      {/* <View>
        <Text>hola este es un texto de prueba</Text>
        <Button label="para enviar" onPress={sendMessageToWebview} />
        <Button
          label="Activate Navigation"
          onPress={() => executeJavaScript(navigationButton)}
        />
        <Button
          label="Activate Youtube Button"
          onPress={() => executeJavaScript(youtubeButton)}
        />
        <Button label="Open Youtube Video" onPress={openYouTube} />
      </View> */}
    </>
  );
};
