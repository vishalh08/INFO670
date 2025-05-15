import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { IconButton, Text } from "react-native-paper";

export default function PictureViewer({ image, caption, onBack }) {
  return (
    <View style={styles.container}>
      <IconButton
        icon="arrow-left"
        size={32}
        onPress={onBack}
        style={styles.backBtn}
      />
      <Image
        source={image}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.caption}>{caption}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", alignItems: "center" },
  backBtn: { alignSelf: "flex-start", marginLeft: 10, marginTop: 10 },
  image: { width: "90%", height: 300, marginVertical: 20 },
  caption: { fontSize: 18, fontWeight: "bold", textAlign: "center" },
});
