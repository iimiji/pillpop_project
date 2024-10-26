import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Modal, Alert, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps'; // react-native-maps 라이브러리 사용
import styles from './styles'; 
import { useNavigation } from '@react-navigation/native';

const Search = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [medications, setMedications] = useState([]);
  const [manualModalVisible, setManualModalVisible] = useState(false);
  const [pillName, setPillName] = useState('');
  const [pillFrequency, setPillFrequency] = useState(''); 
  const [pillDescription, setPillDescription] = useState('');
  const [pillImage, setPillImage] = useState(null);
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [medicationChoices, setMedicationChoices] = useState([]);
  const [choicesModalVisible, setChoicesModalVisible] = useState(false);
  
  // 모달을 통해 약국 검색하기 위한 상태 추가
  const [mapModalVisible, setMapModalVisible] = useState(false);
  const [pharmacies, setPharmacies] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);

  // FDA API search function
  const searchMedication = async () => {
    if (searchQuery.trim() === '') {
      Alert.alert('Error', 'Please enter a valid medication name.');
      return;
    }

    try {
      const response = await fetch(`https://api.fda.gov/drug/label.json?search=openfda.brand_name:${searchQuery}&limit=5`);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const medicationsList = data.results.map((fetchedMedication) => ({
          id: fetchedMedication.id || Math.random().toString(),
          name: fetchedMedication.openfda.brand_name ? fetchedMedication.openfda.brand_name[0] : 'No name available',
          description: fetchedMedication.description ? fetchedMedication.description[0] : 'No description available',
          isFavorite: false,
        }));

        if (medicationsList.length > 1) {
          setMedicationChoices(medicationsList);
          setChoicesModalVisible(true);
        } else {
          setSelectedMedication(medicationsList[0]);
          setInfoModalVisible(true);
        }
      } else {
        Alert.alert('No medications found.');
      }
    } catch (error) {
      console.error('API fetch error:', error);
      Alert.alert('Failed to fetch medication information.');
    }
  };

  const selectMedication = (medication) => {
    setSelectedMedication(medication);
    setInfoModalVisible(true);
    setChoicesModalVisible(false);
  };

  const renderMedicineChoices = () => {
    return medicationChoices.map((medication) => (
      <TouchableOpacity
        key={medication.id}
        style={styles.medicineChoiceButton}
        onPress={() => selectMedication(medication)}
      >
        <Text style={styles.medicineChoiceButtonText}>{medication.name}</Text>
      </TouchableOpacity>
    ));
  };

  const openManualAddModal = () => {
    setPillImage(null);
    setManualModalVisible(true);
  };

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Camera access is required');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setPillImage(result.uri);
    }
  };

  const openGallery = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Gallery access is required');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setPillImage(result.uri);
    }
  };

  const saveManualMedication = () => {
    if (!pillName || !pillFrequency || !pillDescription) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    const newMedication = {
      id: Math.random().toString(),
      name: pillName,
      frequency: pillFrequency,
      description: pillDescription,
      image: pillImage || 'https://via.placeholder.com/100',
      isFavorite: false,
    };

    setMedications([...medications, newMedication]);
    setManualModalVisible(false);
  };

  const saveSearchedMedication = () => {
    const shortDescription = selectedMedication.description.length > 100
      ? selectedMedication.description.substring(0, 100) + '...'
      : selectedMedication.description;

    const newMedication = {
      id: Math.random().toString(),
      name: selectedMedication.name,
      description: shortDescription,
      isFavorite: false,
      image: selectedMedication.openfda ? selectedMedication.openfda.image[0] : 'https://via.placeholder.com/100',
    };

    setMedications([...medications, newMedication]);
    setInfoModalVisible(false);
  };

  const toggleFavorite = (id) => {
    const updatedMedications = medications.map((med) =>
      med.id === id ? { ...med, isFavorite: !med.isFavorite } : med
    );
    setMedications(updatedMedications);
  };

  const toggleShowFavorites = () => {
    setShowFavoritesOnly(!showFavoritesOnly);
  };

  const renderMedicineItem = ({ item }) => (
    <View style={styles.medicineCard}>
      <Image source={{ uri: item.image }} style={styles.medicineImage} />
      <View style={styles.medicineInfo}>
        <Text style={styles.medicineName}>{item.name}</Text>
        <Text style={styles.medicineDescription}>Description: {item.description}</Text>
      </View>
      <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
        <MaterialIcons
          name={item.isFavorite ? 'star' : 'star-outline'}
          size={30}
          color={item.isFavorite ? '#FFD700' : '#878787'}
        />
      </TouchableOpacity>
    </View>
  );

  const displayedMedications = showFavoritesOnly
    ? medications.filter((med) => med.isFavorite)
    : medications;

  const findNearbyPharmacies = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access location was denied');
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    // 여기에 약국 검색 API를 호출하여 근처 약국 목록을 가져오는 로직 추가
    const response = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1500&type=pharmacy&key=YOUR_API_KEY`);
    const data = await response.json();

    // 약국 정보를 상태에 저장
    if (data.results) {
      setPharmacies(data.results);
      setCurrentLocation({ latitude, longitude });
      setMapModalVisible(true); // 약국 정보가 준비되면 모달을 열기
    } else {
      Alert.alert('No pharmacies found nearby.');
    } 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Search Tablet</Text>
      <View style={styles.searchHeader}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Tablet"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity onPress={searchMedication}>
          <MaterialIcons name="search" size={30} color="#4da6ff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={findNearbyPharmacies}>
          <MaterialIcons name="local-pharmacy" size={30} color="#4da6ff" />
        </TouchableOpacity>
      </View>

      <Modal visible={choicesModalVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Please choose a medication</Text>
            {renderMedicineChoices()}
            <TouchableOpacity style={styles.closeButton} onPress={() => setChoicesModalVisible(false)}>
              <MaterialIcons name="close" size={24} color="#878787" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <Text style={styles.sectionTitle}>Saved Medicines</Text>
        <TouchableOpacity onPress={toggleShowFavorites}>
          <MaterialIcons name={showFavoritesOnly ? 'star' : 'star-outline'} size={30} color="#FFD700" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={displayedMedications}
        renderItem={renderMedicineItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.medicineListContainer}
        numColumns={1}  // Single column layout
      />

      {/* Add Medication Button */}
      <TouchableOpacity style={styles.addButton} onPress={openManualAddModal}>
        <Text style={styles.addButtonText}>Add Medication</Text>
      </TouchableOpacity>

      {/* Manual Add Medication Modal */}
      <Modal visible={manualModalVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setManualModalVisible(false)}>
              <MaterialIcons name="close" size={24} color="#878787" />
            </TouchableOpacity>
            <Text style={styles.modalSubtitle}>Write medication name</Text>
            <TextInput
              style={styles.input}
              placeholder="Medication Name"
              value={pillName}
              onChangeText={setPillName}
            />
            <Text style={styles.modalSubtitle}>Enter the frequency of intake (e.g., once a day, twice a week)</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter frequency"
              value={pillFrequency}
              onChangeText={setPillFrequency}
            />
            <Text style={styles.modalSubtitle}>Enter any special instructions (e.g., take with food)</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter instructions"
              value={pillDescription}
              onChangeText={setPillDescription}
            />
            {/* Camera and Gallery buttons */}
            <View style={styles.cameraFileContainer}>
              <TouchableOpacity onPress={openCamera}>
                <MaterialIcons name="camera-alt" size={30} color="#428CF7" />
              </TouchableOpacity>
              <TouchableOpacity onPress={openGallery}>
                <MaterialIcons name="image" size={30} color="#428CF7" />
              </TouchableOpacity>
            </View>

            {/* Image or Placeholder */}
            {pillImage ? (
              <Image source={{ uri: pillImage }} style={{ width: 100, height: 100, marginTop: 20, borderRadius: 50 }} />
            ) : (
              <View style={{ width: 100, height: 100, backgroundColor: '#F5F5F5', borderRadius: 50, marginTop: 20 }} />
            )}

            {/* Save Medication Button */}
            <TouchableOpacity style={styles.saveButton} onPress={saveManualMedication}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Medication Info Modal */}
      <Modal visible={infoModalVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setInfoModalVisible(false)}>
              <MaterialIcons name="close" size={24} color="#878787" />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Medication Information</Text>
            <Text style={styles.medicineName}>
              Name: {selectedMedication?.name}
            </Text>
            <Text style={styles.medicineDescription}>
              Description: {selectedMedication?.description}
            </Text>

            {/* Save Searched Medication Button */}
            <TouchableOpacity style={styles.saveButton} onPress={saveSearchedMedication}>
              <Text style={styles.saveButtonText}>Save Medication</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalButton} onPress={() => setInfoModalVisible(false)}>
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Pharmacy Map Modal */}
      <Modal visible={mapModalVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setMapModalVisible(false)}>
              <MaterialIcons name="close" size={24} color="#878787" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Nearby Pharmacies</Text>

            <MapView
              style={{ width: '100%', height: 300 }}
              initialRegion={{
                latitude: currentLocation?.latitude || 37.78825, // Default latitude
                longitude: currentLocation?.longitude || -122.4324, // Default longitude
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              {pharmacies.map((pharmacy) => (
                <Marker
                  key={pharmacy.id}
                  coordinate={{
                    latitude: pharmacy.geometry.location.lat,
                    longitude: pharmacy.geometry.location.lng,
                  }}
                  title={pharmacy.name}
                />
              ))}
            </MapView>
          </View>
        </View>
      </Modal>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Home')}>
          <MaterialIcons name="home" size={24} color={styles.navButtonText.color} />
          <Text style={styles.navButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Calendar')}>
          <MaterialIcons name="calendar-today" size={24} color={styles.navButtonText.color} />
          <Text style={styles.navButtonText}>Calendar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Search')}>
          <MaterialIcons name="search" size={24} color={styles.navButtonText.color} />
          <Text style={styles.navButtonText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Profile')}>
          <MaterialIcons name="person" size={24} color={styles.navButtonText.color} />
          <Text style={styles.navButtonText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Search;
