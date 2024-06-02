import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
export default function WelcomeScreenButton({ text, bgColor, onPress }) {
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  });
  return (
    <Pressable
      onPress={onPress}
      style={[styles.buttonContainer, { backgroundColor: bgColor }]}
    >
      <Text style={styles.buttonContainerText}>{text}</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  buttonContainer: {
    width: "80%",
    height: "9%",
    marginVertical: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainerText: {
    fontSize: 14,
    color: "white",
    fontFamily: "Montserrat_700Bold",
  },
});
