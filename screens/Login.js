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
import { loginRequestHandler } from "../tools/tools";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DarkTheme } from "@react-navigation/native";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  });
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

  async function loginHandler() {
    try {
      const response = await loginRequestHandler(email, password);

      const data = await response;
      console.log(data);
      await AsyncStorage.setItem("user-id", JSON.stringify(data.user.id));
      navigation.navigate("main");
      console.log("logging in");
    } catch (e) {
      console.log("Error occured: ", e);
      Alert.alert("An error occured: Check if your password is coorect ");
    }
  }
  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    // Your app initialization code here

    // Call hideAsync() when your app is ready to hide the splash screen
    SplashScreen.hideAsync();
  }, []);
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.page}>
        <Text style={styles.headerText}>Hello There 👋</Text>
        <Text style={styles.descriptionText}>
          Please enter your email and password to sign in
        </Text>
        <View style={[styles.inputBoxContainer, { marginTop: 60 }]}>
          <Text style={styles.inputBoxText}>Email</Text>
          <TextInput
            style={styles.inputBoxInputBox}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={[styles.inputBoxContainer, { marginBottom: 40 }]}>
          <Text style={styles.inputBoxText}>Password</Text>
          <TextInput
            style={styles.inputBoxInputBox}
            keyboardType="visible-password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <WelcomeScreenButton
          onPress={loginHandler}
          bgColor="#3BC14A"
          text="Login"
        />
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
    marginTop: 30,
    marginBottom: 0,
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
