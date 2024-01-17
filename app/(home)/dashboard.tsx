import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import usePersonStore from "../../hooks/useApp";
import { useProject } from "../../hooks/useProject";
import { FoodModel } from "../../models/Food";
import { HealthStatus } from "../../models/HealthStatus";
import { NCDPerson } from "../../models/NcdPerson";
import { AntDesign, MaterialIcons, MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";


const DashboardScreen = () => {
  const [foods, setFoods] = useState<FoodModel[]>([])
  const [healthStatuses, setHealthStatuses] = useState<HealthStatus[]>([])
  const [ncdPersons, setNcdPersons] = useState<NCDPerson[]>([])

  const { foodApp } = useProject()
  console.log(foodApp)
  useEffect(() => {
    FoodModel.getFoodsOfUser(foodApp.id).then((foods) => {
      console.log("Foods : ", foods)
      setFoods(foods);
    })
    HealthStatus.getHealthStatusOfPerson(foodApp.id).then((healthStatuses) => {
      console.log("Health Statuses : ", healthStatuses)
      setHealthStatuses(healthStatuses)
    })
    NCDPerson.getNcdOfPerson(foodApp.id).then((ncds) => {
      console.log("NCDs : ", ncds)
      setNcdPersons(ncds)
    })


  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <Text style={{ fontSize: 20, fontWeight: "800", margin: 10 }}>Dashboard</Text>
        <View style={{ paddingHorizontal: 5, margin: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: "800" }}>Foods</Text>
          {foods.map((food) => {
            return <View style={{ alignItems: "center", flexDirection: "row", marginBottom: 5, borderWidth: 1, borderRadius: 5, borderColor: "#ddd", paddingVertical: 8, paddingHorizontal: 5 }}>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
                  <MaterialCommunityIcons name="food" size={24} color={"#000"} />
                  <Text style={{ fontWeight: "800", fontSize: 18 }}>{food.name}</Text>
                </View>
                <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
                  <AntDesign name="calendar" size={24} color={"#000"} />
                  <Text style={{ fontSize: 18 }}>{new Date(food.date).toLocaleString()}</Text>
                </View>

              </View>
              <View>
                <TouchableOpacity style={styles.buttonContainer}>
                  <View style={styles.button}>
                    <MaterialIcons name="delete" size={24} color="#fff" />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          })}
        </View>
        <View style={{ paddingHorizontal: 5, margin: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: "800" }}>Health Status</Text>
          {healthStatuses.map((healthStatus) => {
            return <View style={{ alignItems: "center", flexDirection: "row", marginBottom: 5, borderWidth: 1, borderRadius: 5, borderColor: "#ddd", paddingVertical: 8, paddingHorizontal: 5 }}>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
                  <MaterialCommunityIcons name="heart-pulse" size={24} color={"#000"} />
                  <Text style={{ fontWeight: "800", fontSize: 18 }}>{healthStatus.feelingWell ? "Feeling Well" : "Not Feeling Well"}</Text>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
                  <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
                    <MaterialCommunityIcons name="human-male-height" size={16} />
                    <Text>{healthStatus.height} </Text>
                  </View>
                  <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
                    <FontAwesome5 name="weight-hanging" size={16} />
                    <Text>{healthStatus.weight} </Text>

                  </View>
                </View>
                <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
                  <AntDesign name="calendar" size={24} color={"#000"} />
                  <Text style={{ fontSize: 18 }}>{new Date(healthStatus.date).toLocaleString()}</Text>
                </View>
              </View>
              <View>
                <TouchableOpacity style={styles.buttonContainer}>
                  <View style={styles.button}>
                    <MaterialIcons name="delete" size={24} color="#fff" />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          })}
        </View>
        <View style={{ paddingHorizontal: 5, margin: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: "800" }}>Ncd</Text>
          {ncdPersons.map((ncdPerson) => {
            return <View style={{ alignItems: "center", flexDirection: "row", marginBottom: 5, borderWidth: 1, borderRadius: 5, borderColor: "#ddd", paddingVertical: 8, paddingHorizontal: 5 }}>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
                  <MaterialCommunityIcons name="bug" size={24} color={"#000"} />
                  <Text style={{ fontWeight: "800", fontSize: 18 }}>{ncdPerson.name}</Text>
                </View>
              </View>
              <View>
                <TouchableOpacity style={styles.buttonContainer}>
                  <View style={styles.button}>
                    <MaterialIcons name="delete" size={24} color="#fff" />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          })}

        </View>

      </ScrollView>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 8, //IOS
    elevation: 10, // Android
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#f56161', // Customize the button background color
    borderRadius: 10, // Add border radius for rounded corners
    padding: 10, // Add padding to the button
    alignItems: 'center', // Center the content horizontally
    justifyContent: 'center', // Center the content vertically
  },
});
