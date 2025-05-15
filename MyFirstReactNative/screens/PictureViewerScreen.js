import React from "react";
import PictureViewer from "../components/PictureViewer";

export default function PictureViewerScreen({ route, navigation }) {
  const { image, caption } = route.params;
  return (
    <PictureViewer
      image={image}
      caption={caption}
      onBack={() => navigation.goBack()}
    />
  );
}
