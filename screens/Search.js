import React, { useState } from "react";
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
  Modal,
} from "react-native";
import { Button, Searchbar } from "react-native-paper";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

const windowHeight = Dimensions.get("screen").height;
const windowWidth = Dimensions.get("screen").width;

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalItem, setModalItem] = useState(null);

  const searchHandler = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://ghc-resource-hub-backend.adaptable.app/search?query=${encodeURIComponent(
          searchQuery
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Search request failed");
      }

      const data = await response.json();
      console.log("Search Result: ", data);
      setSearchResults(data);
    } catch (error) {
      alert("An error occurred: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadAndShare = async (item) => {
    const fileName = item.file_path.split("/").pop();
    const fileUri = `${FileSystem.documentDirectory}${fileName}`;

    try {
      const downloadResumable = FileSystem.createDownloadResumable(
        `https://ghc-resource-hub-backend.adaptable.app/download/${item.file_path}`,
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
        <Searchbar
          onSubmitEditing={searchHandler}
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={{
            width: "80%",
            alignSelf: "center",
            marginTop: 40,
            marginBottom: 15,
          }}
        />
        {loading ? (
          <ActivityIndicator size="large" color="#00ff00" />
        ) : (
          <View style={styles.resultsContainer}>
            {searchResults.length > 0 ? (
              searchResults.map((item) => (
                <View key={item.id} style={styles.itemContainer}>
                  <Pressable
                    onPress={() => {
                      setModalItem(item);
                      setModalVisible(true);
                    }}
                  >
                    <Image
                      source={{
                        uri: `https://ghc-resource-hub-backend.adaptable.app/${item.cover_image_path}`,
                      }}
                      style={styles.itemImage}
                      resizeMode="contain"
                    />
                    <Text style={styles.itemTitle}>{item.title}</Text>
                  </Pressable>
                </View>
              ))
            ) : (
              <Text style={styles.noResultsText}>No results found</Text>
            )}
          </View>
        )}
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image
              source={{
                uri: `https://ghc-resource-hub-backend.adaptable.app/${modalItem?.cover_image_path}`,
              }}
              style={styles.modalImage}
              resizeMode="contain"
            />
            <Text style={styles.itemTitle}>{modalItem?.title}</Text>
            <Button
              icon="download"
              mode="text"
              onPress={() => handleDownloadAndShare(modalItem)}
              textColor="green"
            >
              Download and Share
            </Button>
            <Button
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              Close
            </Button>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#4D5057",
  },
  page: {
    flex: 1,
    marginTop: 120,
  },
  resultsContainer: {
    padding: 10,
  },
  itemContainer: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    backgroundColor: "white",
    width: windowWidth * 0.6,
    alignSelf: "center",
    height: 350,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
    color: "black",
  },
  itemImage: {
    width: "100%",
    height: "90%",
    borderRadius: 10,
  },
  noResultsText: {
    textAlign: "center",
    color: "white",
    fontSize: 18,
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalImage: {
    width: 250,
    height: 250,
    borderRadius: 10,
  },
});

export default SearchPage;
