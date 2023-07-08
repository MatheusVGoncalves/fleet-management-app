import { Container, Slogan, Title } from './styles';
import backgroundImg from '../../assets/background.png'
import { Button } from '../../components/Button';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google'
import { ANDROID_CLIENT_ID, IOS_CLIENT_ID } from '@env';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Realm, useApp } from '@realm/react';

WebBrowser.maybeCompleteAuthSession();

export default function SignIn() {
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const app = useApp();

  const [_, response, googleSignIn] = Google.useAuthRequest({
    androidClientId: ANDROID_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    scopes: ['profile', 'email']
  });


  function handleGoogleSignIn() {
    setIsAuthenticating(true);

    googleSignIn().then((response) => {
      if(response.type !== 'success') {
        setIsAuthenticating(false)
      }
    })
  }

  useEffect(() => {
    if(response?.type === 'success') {
      if(response.authentication?.idToken){

       const credentials = Realm.Credentials.jwt(response.authentication.idToken);

       app.logIn(credentials).catch((error) => {
       console.log(error);
       Alert.alert('Entrar', 'Não foi possível conectar-se à sua conta Google.')
       setIsAuthenticating(false);

       })

      } else {
        Alert.alert('Entrar', 'Não foi possível conectar-se à sua conta Google.')
        setIsAuthenticating(false);
      }
    }
  }, [response])

  return (
   <Container source={backgroundImg}>
    <Title>Ignite Fleet</Title>
    <Slogan>Gestão de uso de veículos</Slogan>
    <Button 
    title='Entrar com Google' 
    onPress={handleGoogleSignIn} 
    isLoading={isAuthenticating}
    />
   </Container>
  );
}


