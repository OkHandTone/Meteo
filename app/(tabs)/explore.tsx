import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function TabTwoScreen() {
  const [city, setCity] = useState("Lille");
  // const [city, setCity] = useState<any>(null);
  const [weather, setWeather] = useState<any>(null);
  const { search } = useLocalSearchParams(); 
  const API_KEY = "86b213e747384342a67150923263001";

  const fetchWeather = async (cityName: string) => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityName}&days=7&lang=fr`
      );
      const data = await response.json();
      
      if (data.error) {
         console.log("Erreur API ou ville inconnue");
         return;
      }

      if (data.current) {
        setWeather(data);
        setCity(cityName);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (search) {
        fetchWeather(search.toString());
    } else {
        fetchWeather(city);
    }
  }, [search]);

  if (!weather)
    return <View style={styles.page}><Text style={{marginTop: 50, textAlign:'center'}}>Chargement...</Text></View>;

  const jours = weather.forecast.forecastday;


  // IIIIIIIICCCCCCCCCCCIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII

const addToFavorites = async () => {
    try {
      const existingFavs = await AsyncStorage.getItem('favorites');
      let newFavs = existingFavs ? JSON.parse(existingFavs) : [];

      if (!newFavs.includes(city)) {
        newFavs.push(city);
        await AsyncStorage.setItem('favorites', JSON.stringify(newFavs));
        console.log("Ville ajoutée aux favoris");
      } else {
        console.log("Ville déjà dans les favoris");
      }
    } catch (e) {
      console.error("Erreur lors de l'ajout aux favoris", e);
    }
  };

const getNomJour = (dateStr: string) => {
    const date = new Date(dateStr + 'T12:00:00');
    const options: Intl.DateTimeFormatOptions = { weekday: 'short' };
    const nom = date.toLocaleDateString('fr-FR', options); 
    return nom.charAt(0).toUpperCase() + nom.slice(1);
};

  return (
    <ScrollView style={styles.page}>

      <View style={styles.banner}>
        <View>
    <Text style={styles.titre}>{weather.location.name}</Text>
    <Text style={{ color: '#004D40', fontSize: 14 }}>
      Heure locale : {weather.location.localtime.split(' ')[1]}
    </Text>

    <TouchableOpacity onPress={addToFavorites}>
                <Text style={{color: '#E65100', fontWeight: 'bold', marginTop: 5}}>★ Ajouter aux favoris</Text>
    </TouchableOpacity>


  </View>
        <TextInput
          style={styles.rechercher}
          placeholder="Rechercher 🔎"
          placeholderTextColor="#00796B"
          defaultValue={city}
          onSubmitEditing={(e) => fetchWeather(e.nativeEvent.text)}
        />
      </View>

      <View style={styles.contenu}>
        <Text style={styles.temperature}>{Math.round(weather.current.temp_c)}°C</Text>
        <View style={styles.description}>
          <Text style={{fontSize: 20, color: '#00796B', marginRight: 10}}>
             {weather.current.condition.text}
          </Text>
          <Image
            source={{ uri: `https:${weather.current.condition.icon}` }}
            style={{ width: 64, height: 64 }}
          />
        </View>
      </View>

      <View style={styles.tableau_semaines}>
        <View style={styles.ligne_tableau}>
          <Text style={[styles.jour_semaine, { fontWeight: 'bold' }]}>Jour</Text>
          <Text style={[styles.temperature_jour, { fontWeight: 'bold' }]}>Temp.</Text>
          <View style={styles.conteneur_logo}>
             <Text style={[styles.logo_semaine, { fontWeight: 'bold', textAlign:'right' }]}>Météo</Text>
          </View>
        </View>

        {jours.map((jour: any, index: number) => (
          <View key={index} style={styles.ligne_tableau}>
            <Text style={styles.jour_semaine}>{getNomJour(jour.date)}</Text>
            <Text style={styles.temperature_jour}>{Math.round(jour.day.avgtemp_c)}°C</Text>
            <View style={styles.conteneur_logo}>
              <Image 
                style={styles.logo} 
                source={{ uri: `https:${jour.day.condition.icon}` }} 
              />
            </View>
          </View>
        ))}

      </View>

    </ScrollView>
  );
}

//style avec IA
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#E0F7FA',
    flex: 1
  },

  banner: {
    marginTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },

  titre: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00796B',
    maxWidth: '45%'
  },

  rechercher: {
    height: 40,
    borderColor: '#00796B',
    borderWidth: 1,
    width: '50%',
    paddingLeft: 15,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    color: '#00796B'
  },

  contenu: {
    marginTop: 30,
    alignItems: 'center'
  },

  temperature: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#00796B'
  },

  description: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  tableau_semaines: {
    marginTop: 30,
    marginHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 50
  },

  ligne_tableau: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#B2EBF2'
  },

  jour_semaine: { 
    fontSize: 16, 
    color: '#004D40', 
    flex: 1 
  },

  temperature_jour: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#00796B', 
    flex: 1, 
    textAlign: 'center' 
  },

  logo_semaine: { 
    fontSize: 16, 
    color: '#004D40', 
  },

  conteneur_logo: { 
    flex: 1, 
    alignItems: 'flex-end' 
  },

  logo: { 
    width: 40, 
    height: 40 
  },
});