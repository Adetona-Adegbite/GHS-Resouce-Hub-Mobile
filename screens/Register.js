import {
  Alert,
  Button,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import * as SplashScreen from "expo-splash-screen";
import WelcomeScreenButton from "../components/WelcomeScreenButton";
import { useState, useEffect } from "react";
import { registerRequestHandler } from "../tools/tools";

export default function Register({ navigation }) {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  });

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    // Your app initialization code here

    // Call hideAsync() when your app is ready to hide the splash screen
    SplashScreen.hideAsync();
  }, []);
  useEffect(() => {
    async function checkUserId() {
      console.log("Checked");
      const userId = await AsyncStorage.getItem("user-id");
      if (userId) {
        navigation.navigate("main");
      }
    }
    checkUserId();
  }, [navigation]);
  const emailChangeHandler = (text) => {
    setEmail(text.toLowerCase());
  };
  const emailPasswordTriggerHandler = async () => {
    try {
      const response = await registerRequestHandler(email);
      setEmail("");
      setEmailSent(true);
      setTimeout(() => {
        navigation.navigate("login");
      }, 5000);
    } catch (e) {
      Alert.alert(e);
    }
  };
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.page}>
        <Text style={styles.headerText}>Create an Account 🔐</Text>
        <Text style={styles.descriptionText}>
          Enter a valid email address. An email would be sent to that email
          address that contains your login password.
        </Text>
        {emailSent ? (
          <Text
            style={{
              fontFamily: "Montserrat_400Regular",
              color: "white",
              marginTop: 100,
              width: "90%",
              textAlign: "center",
            }}
          >
            An email has been sent to your "email address" containing your
            password. Use the password and login with your email
          </Text>
        ) : (
          <>
            <View style={styles.inputBoxContainer}>
              <Text style={styles.inputBoxText}>Email</Text>
              <TextInput
                style={styles.inputBoxInputBox}
                keyboardType="email-address"
                value={email}
                onChangeText={emailChangeHandler}
              />
            </View>
            <WelcomeScreenButton
              onPress={emailPasswordTriggerHandler}
              bgColor="#3BC14A"
              text="Create Account"
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#4D5057",
  },
  page: {
    flex: 1,
    alignItems: "center",
    paddingLeft: 15,
    marginTop: Platform.OS == "android" && 35,
  },
  headerText: {
    fontSize: 28,
    color: "white",
    alignSelf: "flex-start",
    fontFamily: "Montserrat_700Bold",
    marginTop: 100,
  },
  descriptionText: {
    fontSize: 15,
    color: "#ccc",
    alignSelf: "flex-start",
    marginTop: 10,
    fontFamily: "Montserrat_400Regular",
  },
  inputBoxContainer: {
    width: "100%",
    marginTop: 70,
    marginBottom: 50,
  },
  inputBoxText: {
    fontSize: 13,
    fontFamily: "Montserrat_400Regular",
    color: "white",
  },
  inputBoxInputBox: {
    color: "white",
    fontSize: 15,
    fontFamily: "Montserrat_700Bold",
    borderBottomColor: "#3BC14A",
    borderBottomWidth: 2,
    height: 40,
    width: "95%",
  },
});
