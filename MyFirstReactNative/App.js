import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";

export default function App() {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [groceryList, setGroceryList] = useState([]);

  const addItem = () => {
    if (itemName.trim() === "" || quantity.trim() === "") {
      Alert.alert("Oops!", "Please enter both item name and quantity.");
      return;
    }

    const newItem = {
      key: Math.random().toString(),
      name: itemName,
      quantity: quantity,
    };

    setGroceryList((prevList) => [...prevList, newItem]);
    setItemName("");
    setQuantity("");
  };

  const deleteItem = (key) => {
    setGroceryList((prevList) => prevList.filter((item) => item.key !== key));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Grocery List</Text>

      <TextInput
        style={styles.input}
        placeholder="What do you need? (e.g. Apple)"
        placeholderTextColor="#aaa"
        value={itemName}
        onChangeText={setItemName}
      />
      <TextInput
        style={styles.input}
        placeholder="How much? (e.g. 3 lb)"
        placeholderTextColor="#aaa"
        value={quantity}
        onChangeText={setQuantity}
      />

      <View style={styles.buttonWrapper}>
        <Button
          title="Add to List"
          color="#4CAF50"
          onPress={addItem}
        />
      </View>

      <FlatList
        style={styles.list}
        data={groceryList}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            Your list is empty. Add something
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <View style={{ flex: 1 }}>
              <Text style={styles.itemText}>{item.name}</Text>
              <Text style={styles.quantityText}>Quantity: {item.quantity}</Text>
            </View>
            <Button
              title="Delete"
              color="#FF6B6B"
              onPress={() => deleteItem(item.key)}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
    backgroundColor: "#FBFFF9",
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 10,
  },
  buttonWrapper: {
    marginBottom: 20,
    borderRadius: 8,
    overflow: "hidden",
  },
  list: { flexGrow: 1 },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 14,
    marginBottom: 12,
    backgroundColor: "#E6F5EA",
    borderRadius: 10,
  },
  itemText: { fontSize: 18, fontWeight: "500", color: "#333" },
  quantityText: { fontSize: 16, color: "#666" },
  emptyText: {
    marginTop: 50,
    fontSize: 16,
    textAlign: "center",
    color: "#999",
  },
});
