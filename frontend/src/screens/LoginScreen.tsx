import { useEffect, useState } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import * as Facebook from "expo-auth-session/providers/facebook";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({navigation}) {
  const [user, setUser] = useState(null);
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: "288958650780252",
  });

  const navigateContacts = () => {
    navigation.navigate('contacts', {facebookId: user.id, name: user.name, picture: user.picture.data.url});
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
      <Button
        disabled={!request}
        title="Sign in with Facebook"
        onPress={handlePressAsync}
      />
    )
}

function Profile({user}) {
  return (
    <View style={styles.profile}>
      <Image source={{uri: user.picture.data.url}} style={styles.image}/>
      <Text style={styles.name}>{user.name}</Text>
      <Text>ID: {user.id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  profile: {
    alignItems: "center",
  },
  name: {
    fontSize: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
