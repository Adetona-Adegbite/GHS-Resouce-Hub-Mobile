import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { Image, Platform, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "./screens/WelcomeScreen";
import Register from "./screens/Register";
import { Ionicons } from "@expo/vector-icons";
import Login from "./screens/Login";
import HomePage from "./screens/Home";
import { PaperProvider } from "react-native-paper";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SearchPage from "./screens/Search";
import { FontAwesome } from "@expo/vector-icons";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
function Home() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#27282C",

          height: Platform.OS == "ios" ? 100 : 70, // Change this to your desired color
          // borderColor: "black",
        },

        tabBarActiveTintColor: "#5DDC6B", // Active icon color
        tabBarInactiveTintColor: "#ccc", // Inactive icon color
        // tabBarShowLabel: false,
        tabBarLabelStyle: {
          fontSize: 13,
        },
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => {
            return <FontAwesome name="home" size={35} color={color} />;
          },
        }}
        name="home"
        component={HomePage}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => {
            return <FontAwesome name="search" size={30} color={color} />;
          },
        }}
        name="search"
        component={SearchPage}
      />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="welcome"
            component={WelcomeScreen}
          />
          <Stack.Screen
            options={({ navigation }) => ({
              headerShown: true,
              headerTransparent: true,
              headerTitle: () => (
                <Image
                  resizeMode="contain"
                  style={{ width: 120, height: 80, marginTop: 50 }}
                  source={require("./assets/app-assets/Logo.png")}
                />
              ),
              headerTitleAlign: "center",
              headerLeftContainerStyle: {
                paddingLeft: 10,
                height: 100,
              },
              headerLeft: () => (
                <Ionicons
                  onPress={() => navigation.goBack()}
                  name="arrow-back-outline"
                  size={35}
                  style={{ marginTop: 5 }}
                  color="#ccc"
                />
              ),
            })}
            name="register"
            component={Register}
          />
          <Stack.Screen
            options={({ navigation }) => ({
              headerShown: true,
              headerTransparent: true,
              headerTitle: () => (
                <Image
                  resizeMode="contain"
                  style={{ width: 120, height: 80, marginTop: 50 }}
                  source={require("./assets/app-assets/Logo.png")}
                />
              ),
              headerTitleAlign: "center",
              headerLeftContainerStyle: {
                paddingLeft: 10,
                height: 100,
              },
              headerLeft: () => (
                <Ionicons
                  onPress={() => navigation.goBack()}
                  name="arrow-back-outline"
                  size={35}
                  style={{ marginTop: 5 }}
                  color="#ccc"
                />
              ),
            })}
            name="login"
            component={Login}
          />
          <Stack.Screen
            name="main"
            component={Home}
            options={({ navigation }) => ({
              headerShown: true,
              headerTransparent: true,
              headerRightContainerStyle: {
                marginTop: "1%",
                position: "relative",
                right: 20,
                height: 100,
              },
              // headerRight: () => {
              //   return <FontAwesome name="sign-out" size={30} color="white" />;
              // },
              headerTitle: () => (
                <Image
                  resizeMode="contain"
                  style={{ width: 120, height: 80, marginTop: 50 }}
                  source={require("./assets/app-assets/Logo.png")}
                />
              ),
              headerTitleAlign: "center",
              headerLeftContainerStyle: {
                paddingLeft: 10,
                height: 100,
              },
              headerLeft: () => {
                return;
              },
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
