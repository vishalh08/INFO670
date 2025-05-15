import React from "react";
import { TouchableOpacity } from "react-native";
import { Card, Text } from "react-native-paper";

export default function GalleryItem({ image, caption, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ flex: 1, margin: 5 }}
    >
      <Card>
        <Card.Cover
          source={image}
          style={{ height: 120 }}
        />
        <Card.Content>
          <Text style={{ fontSize: 12, marginTop: 8 }}>{caption}</Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
}
