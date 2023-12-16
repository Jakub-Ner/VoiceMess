import React, { useEffect, useState } from "react";
import { Image, Linking, StyleSheet, TouchableHighlight, View } from "react-native";
import * as Facebook from "expo-auth-session/providers/facebook";
import * as WebBrowser from "expo-web-browser";
import { Button, Layout, Text } from "@ui-kitten/components";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({navigation}) {


  const [user, setUser] = useState(null);
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: "288958650780252",
  });

  const navigateContacts = () => {
    navigation.navigate('contacts', {facebookId: user.id, name: user.name, picture: user.picture.data.url});
  };

  const redirectToPolicy = () => {
    Linking.openURL('https://elevenlabs.io/privacy').then(r => console.log(r)).catch(err => console.log(err));
  };
  useEffect(() => {
    if (response && response.type === "success" && response.authentication) {
      (async () => {
        const userInfoResponse = await fetch(
          `https://graph.facebook.com/me?access_token=${response.authentication.accessToken}&fields=id,name,picture.type(large)`
        );
        const userInfo = await userInfoResponse.json();
        setUser(userInfo);
        // console.log(JSON.stringify(userInfo, null, 2));
      })();
    }
  }, [response]);

  const handlePressAsync = async () => {
    const result = await promptAsync();
    if (result.type !== "success") {
      alert("Uh oh, something went wrong");
      return (<></>);
    }
  };
  useEffect(() => {
    if (user) {
      navigateContacts();
    }
  }, [user, navigation]);

  return (
    <Layout style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.logo}/>
      <Text category='h1'>VoiceMess</Text>
      <Text category='h4'>Twój prywatny lektor SMS'ów</Text>
      {/*<Text style={{width: '70%', marginTop:'15%'}} category='h5'>Klonuj i dobieraj głosy, które będą czytać Ci SMSy.</Text>*/}
      <Button
        style={styles.button}
        disabled={!request}
        onPress={handlePressAsync}
      >
        <Text>Zaloguj się przez Facebooka*</Text>
      </Button>
      <TouchableHighlight onPress={redirectToPolicy}>
        <View>
          <Text>
            <Text>*Logując się akceptujesz </Text>
            <Text style={{textDecorationLine: 'underline'}} onPress={redirectToPolicy}>regulamin</Text>
            </Text>
        </View>
      </TouchableHighlight>
    </Layout>
)
}

function Profile({
  user
}) {
  return (
    <Layout style={styles.container}>
      <Image source={{uri: user.picture.data.url}} style={styles.image}/>
      <Text style={styles.name}>{user.name}</Text>
      <Text>ID: {user.id}</Text>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
      alignItems
  :
    "center",
  }
,
  logo: {
    width: 100,
      height
  :
    100,
      borderRadius
  :
    50,
      margin
  :
    '3%',
      justifyContent
  :
    'center',
      alignSelf
  :
    'center',
      marginBottom
  :
    '10%',
  }
,
  profile: {
    alignItems: "center",
  }
,
  name: {
    fontSize: 20,
  }
,
  image: {
    width: 100,
      height
  :
    100,
      borderRadius
  :
    50,
  }
,
  button: {
    width: '60%',
      marginTop
  :
    '40%',
      marginBottom
  :
    '10%'
  }
,

});
