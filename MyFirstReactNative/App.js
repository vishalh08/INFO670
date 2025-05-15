import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PaperProvider } from "react-native-paper";
import GalleryScreen from "./screens/GalleryScreen";
import PictureViewerScreen from "./screens/PictureViewerScreen";
import ProfileScreen from "./screens/ProfileScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function GalleryStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="GalleryMain"
        component={GalleryScreen}
        options={{ title: "Gallery" }}
      />
      <Stack.Screen
        name="PictureViewer"
        component={PictureViewerScreen}
        options={{ title: "Picture" }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === "Gallery") iconName = "image-multiple";
              else if (route.name === "Profile") iconName = "account";
              return (
                <MaterialCommunityIcons
                  name={iconName}
                  size={size}
                  color={color}
                />
              );
            },
            headerShown: false,
          })}
        >
          <Tab.Screen
            name="Gallery"
            component={GalleryStack}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
