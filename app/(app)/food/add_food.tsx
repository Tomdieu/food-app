import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import useFoodStore from "../../../hooks/useFood";
import { router } from "expo-router";
import { Camera, CameraType } from "expo-camera";
import { db } from "../../../lib/db";
const FoodForm = () => {
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [description, setDescription] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [image, setImage] = useState(null);
  const { addFood } = useFoodStore();

  // const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);

  const [permission, requestPermission] = Camera.useCameraPermissions();

  useEffect(() => {
    (async () => {
      requestPermission();
    })();
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     const { status } = await Camera.requestPermissionsAsync();
  //     setHasCameraPermission(status === "granted");
  //   })();
  // }, []);

  const handleAddIngredient = () => {
    if (ingredient) {
      setIngredients([
        ...ingredients,
        { id: Math.random() * 5000, name: ingredient },
      ]);
      setIngredient("");
    }
  };

  const selectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access media library is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.assets) {
      setImage(result.assets[0].uri);
    }
  };

  const takePicture = async () => {
    if (camera) {
      let photo = await camera.takePictureAsync();
      setImage(photo.uri);
    }
  };

  const handleAddFood = () => {
    const newFood = {
      name,
      calories: parseFloat(calories),
      description,
      ingredients,
      id: Math.floor(Math.random() * 255),
      image,
    };

    addFood(newFood);

    setName("");
    setCalories("");
    setDescription("");
    setIngredients([]);
    setImage(null);

    router.push("/food/foods");
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>Add Food</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Calories"
          value={calories}
          onChangeText={setCalories}
          keyboardType="numeric"
        />
        <TextInput
          style={{
            ...styles.input,
            padding: 2,
            marginTop: 3,
            paddingVertical: 1,
          }}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={3}
        />
        <TouchableOpacity style={styles.imagePicker} onPress={selectImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.selectedImage} />
          ) : (
            <Text>Select an Image</Text>
          )}
        </TouchableOpacity>

        {permission?.granted && (
          <View style={styles.cameraContainer}>
            <Camera
              ref={(ref) => setCamera(ref)}
              style={styles.cameraPreview}
              type={CameraType.back}
            />
            <TouchableOpacity style={styles.cameraButton} onPress={takePicture}>
              <Text style={styles.cameraButtonText}>Take Picture</Text>
            </TouchableOpacity>
          </View>
        )}

        <TextInput
          style={styles.input}
          placeholder="Ingredient"
          value={ingredient}
          onChangeText={setIngredient}
          onSubmitEditing={handleAddIngredient}
        />
        <TouchableOpacity
          style={styles.addIngredientButton}
          onPress={handleAddIngredient}
        >
          <Text style={styles.addIngredientButtonText}>Add Ingredient</Text>
        </TouchableOpacity>

        <Text style={styles.ingredientsList}>
          Ingredients: {ingredients.join(", ")}
        </Text>
        <TouchableOpacity style={styles.addFoodButton} onPress={handleAddFood}>
          <Text style={styles.addFoodButtonText}>Add Food</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 9,
    borderRadius: 5,
    marginVertical: 3,
  },
  ingredientsList: {
    marginTop: 10,
  },
  imagePicker: {
    alignItems: "center",
    marginTop: 10,
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  selectedImage: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    aspectRatio: 16 / 9,
  },
  cameraContainer: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    overflow: "hidden",
  },
  cameraPreview: {
    width: "100%",
    height: 200,
  },
  cameraButton: {
    backgroundColor: "#000",
    padding: 8,
  },
  cameraButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  addIngredientButton: {
    backgroundColor: "#000",
    padding: 8,
    borderRadius: 5,
    marginTop: 10,
    paddingVertical: 12,
  },
  addIngredientButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  addFoodButton: {
    backgroundColor: "#000",
    padding: 8,
    borderRadius: 5,
    marginTop: 10,
    paddingVertical: 12,
    marginBottom: 5,
  },
  addFoodButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default FoodForm;
