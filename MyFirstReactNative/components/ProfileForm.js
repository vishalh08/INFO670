import React, { useState, useEffect } from "react";
import { View, StyleSheet, KeyboardAvoidingView } from "react-native";
import {
  TextInput,
  Button,
  HelperText,
  Text,
  RadioButton,
  Menu,
} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GENDERS = ["Male", "Female", "Other"];
const MAJORS = [
  "Computer Science",
  "Information Technology",
  "Software Engineering",
  "Data Science",
  "Cybersecurity",
];

export default function ProfileForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [major, setMajor] = useState("");
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const [majorMenuVisible, setMajorMenuVisible] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("profile").then((data) => {
      if (data) {
        const profile = JSON.parse(data);
        setName(profile.name || "");
        setEmail(profile.email || "");
        setGender(profile.gender || "");
        setMajor(profile.major || "");
      }
    });
  }, []);

  const validate = () => {
    let errs = {};
    if (!name.trim()) errs.name = "Name is required";
    if (!email.trim()) errs.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email))
      errs.email = "Email format is invalid";
    if (!gender) errs.gender = "Select a gender";
    if (!major) errs.major = "Select a major";
    return errs;
  };

  const handleSave = async () => {
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSaving(true);
      await AsyncStorage.setItem(
        "profile",
        JSON.stringify({ name, email, gender, major })
      );
      setSaving(false);
      alert("Profile saved!");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <TextInput
        label="Name"
        value={name}
        onChangeText={setName}
        error={!!errors.name}
        mode="outlined"
        style={styles.input}
      />
      <HelperText
        type="error"
        visible={!!errors.name}
      >
        {errors.name}
      </HelperText>

      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        error={!!errors.email}
        mode="outlined"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <HelperText
        type="error"
        visible={!!errors.email}
      >
        {errors.email}
      </HelperText>

      <View style={styles.genderContainer}>
        <Text style={styles.genderLabel}>Gender</Text>
        <RadioButton.Group
          onValueChange={setGender}
          value={gender}
        >
          {GENDERS.map((g) => (
            <View
              key={g}
              style={styles.radioRow}
            >
              <RadioButton value={g} />
              <Text style={styles.radioText}>{g}</Text>
            </View>
          ))}
        </RadioButton.Group>
        <HelperText
          type="error"
          visible={!!errors.gender}
        >
          {errors.gender}
        </HelperText>
      </View>

      <View style={styles.majorContainer}>
        <Text style={styles.majorLabel}>Major</Text>
        <Menu
          visible={majorMenuVisible}
          onDismiss={() => setMajorMenuVisible(false)}
          anchor={
            <Button
              mode="outlined"
              icon="chevron-down"
              contentStyle={styles.dropdownContent}
              labelStyle={styles.dropdownLabel}
              onPress={() => setMajorMenuVisible(true)}
              style={styles.dropdownButton}
            >
              {major || "Select Major"}
            </Button>
          }
        >
          {MAJORS.map((m) => (
            <Menu.Item
              key={m}
              onPress={() => {
                setMajor(m);
                setMajorMenuVisible(false);
              }}
              title={m}
            />
          ))}
        </Menu>
        <HelperText
          type="error"
          visible={!!errors.major}
        >
          {errors.major}
        </HelperText>
      </View>

      <Button
        mode="contained"
        onPress={handleSave}
        loading={saving}
        style={{ marginTop: 20 }}
      >
        Save
      </Button>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  input: {
    marginBottom: 10,
    borderRadius: 4,
  },
  genderContainer: {
    marginVertical: 10,
  },
  genderLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  radioRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  radioText: {
    fontSize: 16,
  },
  majorContainer: {
    marginVertical: 10,
  },
  majorLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  dropdownButton: {
    marginBottom: 10,
    justifyContent: "center",
    borderRadius: 4,
  },
  dropdownContent: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownLabel: {
    flex: 1,
    textAlign: "left",
  },
});
