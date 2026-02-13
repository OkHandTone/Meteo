import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const [city, setCity] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (city.trim().length > 0) {
        router.push({ pathname: '/explore', params: { search: city } });
    } else {
        alert("Veuillez entrer une ville");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Mets - 🍵 - 💦</Text>
      
      <Image 
        source={{ uri: "https://imgs.search.brave.com/6FeVZQwwhsyQqVSTdwkVxkg329GvwahFHvOKPgrzR-g/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YTMuZ2lwaHkuY29t/L21lZGlhL3YxLlky/bGtQVGM1TUdJM05q/RXhNVzgwTjJvME1H/NTJjREZoY3poa01X/eDVPWFY1YUhKeU9U/ZHNlVEoyY1hKMFpE/SXlabWhzWlNabGNE/MTJNVjluYVdaelgz/TmxZWEpqYUNaamRE/MW4vZFEyQ2xKU0Z3/dTJ6TERLUDRVLzIw/MC5naWY.gif" }} 
        style={styles.image} 
        resizeMode="cover" 
      />

      <TextInput 
        style={styles.input} 
        placeholder="Rechercher une ville..." 
        placeholderTextColor="#888"
        value={city}
        onChangeText={setCity}
      />

      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Rechercher</Text>
      </TouchableOpacity>

      <Text style={styles.favoritesTitle}>Vos villes favorites :</Text>

      <View style={styles.favoritesContainer}>
        {["Paris", "Londres", "New York"].map((cityName, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.favoriteItem}
            onPress={() => router.push({ pathname: '/explore', params: { search: cityName } })}
          >
            <Text style={styles.favoriteText}>{cityName}</Text>
          </TouchableOpacity>
        ))}
      </View>

    </ScrollView>
  );
}


//style avec IA
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#E0F7FA',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#00796B',
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 15,
    marginBottom: 20,
    overflow: 'hidden',
  },
  input: {
    height: 50,
    borderColor: '#00796B',
    borderWidth: 2,
    width: '100%',
    paddingLeft: 15,
    marginBottom: 20,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    elevation: 2,
  },
  button: {
    backgroundColor: '#00796B',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  favoritesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#004D40',
  },
  favoritesContainer: {
    width: '100%',
  },
  favoriteItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#B2DFDB',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 5,
    elevation: 1,
    paddingLeft: 10,
  },
  favoriteText: {
    fontSize: 18,
    color: '#333',
  },
});