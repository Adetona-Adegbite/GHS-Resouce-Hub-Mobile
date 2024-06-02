import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import * as SplashScreen from "expo-splash-screen";
import WelcomeScreenButton from "../components/WelcomeScreenButton";
import { initializeApplication } from "../tools/tools";

export default function WelcomeScreen({ navigation }) {
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
  useEffect(() => {
    initializeApplication();
    // prefetchImage();
  }, []);
  // const prefetchImage = async () => {
  //   await Image.prefetch(require("../assets/app-assets/library-image.jpg"));
  // };
  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    // Your app initialization code here

    // Call hideAsync() when your app is ready to hide the splash screen
    SplashScreen.hideAsync();
  }, []);
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.page}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            resizeMode="cover"
            source={require("../assets/app-assets/library-image.jpg")}
            blurRadius={1}
          />
          <LinearGradient
            colors={["transparent", "rgba(0, 0, 0, 0.8)"]}
            style={styles.gradient}
          />
        </View>
        <Text style={styles.welcomeText}>
          Welcome to <Text style={styles.brandText}>GHS resource Hub👋</Text>
        </Text>
        <Text style={styles.descriptionText}>
          The GHS Resource Hub is an application designed to provide easy access
          to a wide range of resources for the staff of the Ghana Health
          Services.
        </Text>
        <WelcomeScreenButton
          onPress={() => navigation.navigate("register")}
          bgColor="#3BC14A"
          text="Get Started"
        />
        <WelcomeScreenButton
          bgColor="#76787D"
          text="I already have an account"
          onPress={() => navigation.navigate("login")}
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
  },
  imageContainer: {
    width: "100%",
    height: "55%",
    position: "relative",
    top: -50,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "50%", // Adjust height as needed for the fade effect
  },
  welcomeText: {
    fontSize: 20,
    marginTop: -30,
    color: "white",
    fontFamily: "Montserrat_700Bold",
  },
  brandText: {
    fontFamily: "Montserrat_700Bold",
    color: "#3BC14A",
    fontSize: 24,
  },
  descriptionText: {
    fontSize: 15,
    color: "white",
    fontFamily: "Montserrat_400Regular",
    textAlign: "center",
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
  },
});
