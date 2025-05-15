import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import GalleryItem from "../components/GalleryItem";

const IMAGES = [
  {
    id: "1",
    image: require("../assets/images/Glacier_National_Park.jpg"),
    caption: "Glacier National Park",
  },
  {
    id: "2",
    image: require("../assets/images/Grand_Canyon.jpg"),
    caption: "Grand Canyon",
  },
  {
    id: "3",
    image: require("../assets/images/grand_tetons.jpg"),
    caption: "Grand Tetons",
  },
  {
    id: "4",
    image: require("../assets/images/Monument_Valley.jpg"),
    caption: "Monument Valley",
  },
  {
    id: "5",
    image: require("../assets/images/Mount_Denali.jpg"),
    caption: "Mount Denali",
  },
  {
    id: "6",
    image: require("../assets/images/Mt_Rainier_National_Park.jpg"),
    caption: "Mt. Rainier National Park",
  },
  {
    id: "7",
    image: require("../assets/images/payette_national_forest.jpg"),
    caption: "Payette National Forest",
  },
  {
    id: "8",
    image: require("../assets/images/Saguaro_National_Park.jpg"),
    caption: "Saguaro National Park",
  },
  {
    id: "9",
    image: require("../assets/images/Yellowstone_National_Park.jpg"),
    caption: "Yellowstone National Park",
  },
  {
    id: "10",
    image: require("../assets/images/Yosemite.jpg"),
    caption: "Yosemite",
  },
];

export default function GalleryScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={IMAGES}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <GalleryItem
            image={item.image}
            caption={item.caption}
            onPress={() =>
              navigation.navigate("PictureViewer", {
                image: item.image,
                caption: item.caption,
              })
            }
          />
        )}
        contentContainerStyle={{ padding: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
});
