import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

const windowHeight = Dimensions.get("screen").height;
const windowWidth = Dimensions.get("screen").width;

const groupByCategory = (data) => {
  return data.reduce((acc, item) => {
    const { category } = item;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});
};

const ScrollViewForCategory = ({ category, items, onPress }) => {
  return (
    <View style={styles.categoryContainer}>
      <Text style={styles.categoryTitle}>{category}</Text>
      <FlatList
        style={styles.scrollBox}
        horizontal
        data={items}
        renderItem={({ item }) => (
          <View key={item.id} style={styles.itemContainer}>
            <Pressable
              onPress={() =>
                onPress({
                  id: item.id,
                  title: item.title,
                  filePath: item.file_path,
                  image: item.cover_image_path,
                })
              }
            >
              <Image
                source={{
                  uri: `http://macolx.com/resource-hub-server/${item.cover_image_path}`,
                }}
                style={styles.itemImage}
                resizeMode="contain"
                onError={(e) => console.log(e)}
              />
              <Text style={styles.itemTitle}>{item.title}</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
};

export default function Home({ navigation }) {
  const [modalShow, setModalShow] = useState(false);
  const [modalCardData, setModalCardData] = useState();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const pressHandler = (data) => {
    console.log(data);
    setModalCardData(data);
    setModalShow(true);
  };

  useEffect(() => {
    async function checkUserId() {
      console.log("Checked");
      const userId = await AsyncStorage.getItem("user-id");
      if (!userId) {
        navigation.navigate("login");
      }
    }
    checkUserId();
  }, [navigation]);

  useEffect(() => {
    async function fetchFiles() {
      setLoading(true);
      try {
        const response = await fetch(
          "http://macolx.com/resource-hub-server/files"
        );
        const data = await response.json();
        const groupedData = groupByCategory(data);
        setItems(groupedData);
        console.log(groupedData);
      } catch (e) {
        alert(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchFiles();
  }, []);

  const handleDownloadAndShare = async (filePath) => {
    const fileName = filePath.split("/").pop();
    const fileUri = `${FileSystem.documentDirectory}${fileName}`;

    try {
      const downloadResumable = FileSystem.createDownloadResumable(
        `http://macolx.com/resource-hub-server/download/${filePath}`,
        fileUri
      );

      const { uri } = await downloadResumable.downloadAsync();

      console.log("Download complete: " + uri);

      // Share the downloaded file
      await Sharing.shareAsync(uri);
    } catch (e) {
      console.error(e);
      alert("Download failed.");
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView style={styles.page}>
        {Object.keys(items).map((category) => (
          <ScrollViewForCategory
            key={category}
            category={category}
            items={items[category]}
            onPress={pressHandler}
          />
        ))}
      </ScrollView>
      {modalShow && (
        <>
          <View
            style={{
              width: windowWidth,
              height: windowHeight,
              backgroundColor: "rgba(0,0,0,0.7)",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          >
            <Pressable
              onPress={() => setModalShow(false)}
              style={{ flex: 1 }}
            ></Pressable>
          </View>
          <View
            style={{
              width: "80%",
              height: "65%",
              backgroundColor: "white",
              position: "absolute",
              top: "20%",
              left: "10%",
              borderRadius: 10,
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
              padding: 5,
            }}
          >
            <Image
              source={{
                uri: `http://macolx.com/resource-hub-server/${modalCardData.image}`,
              }}
              style={{ width: "80%", height: "70%" }}
              resizeMode="contain"
            />
            <Text style={[styles.itemTitle, { color: "black" }]}>
              {modalCardData.title}
            </Text>
            <Button
              icon="download"
              mode="text"
              onPress={() => handleDownloadAndShare(modalCardData.filePath)}
              textColor="green"
            >
              Download and Share
            </Button>
          </View>
        </>
      )}
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
    paddingLeft: 15,
    marginTop: 130,
  },
  categoryContainer: {
    marginBottom: 5,
    height: 500,
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 15,
    color: "white",
  },
  scrollBox: {},
  itemContainer: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    height: "auto",
    height: 400,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
    color: "white",
  },
  itemImage: {
    width: 250,
    height: "100%",
    borderRadius: 10,
  },
  itemDescription: {
    fontSize: 14,
  },
});
