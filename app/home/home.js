import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Svg, Circle } from 'react-native-svg'; 
import styles from './styles'; 

export default function Home() {
  const [medications, setMedications] = useState([
    { id: '1', time: '9:00 AM', name: 'Vitamin C', taken: false, period: 'Morning' },
    { id: '2', time: '1:00 PM', name: 'Ibuprofen', taken: false, period: 'Lunch' },
    { id: '3', time: '8:00 PM', name: 'Aspirin', taken: false, period: 'Dinner' },
  ]);

  const [medicationList, setMedicationList] = useState([
    { id: '1', name: 'Vitamin C' },
    { id: '2', name: 'Ibuprofen' },
    { id: '3', name: 'Aspirin' },
  ]);

  const [takenCount, setTakenCount] = useState(0);
  const [alarmModalVisible, setAlarmModalVisible] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [selectedTimes, setSelectedTimes] = useState({
    Morning: false,
    Lunch: false,
    Dinner: false,
  });
  const [moreOptionsVisible, setMoreOptionsVisible] = useState(null);

  const defaultTimes = {
    Morning: '9:00 AM',
    Lunch: '1:00 PM',
    Dinner: '8:00 PM',
  };

  // Calculate taken medications
  useEffect(() => {
    const count = medications.filter((med) => med.taken).length;
    setTakenCount(count);
  }, [medications]);

  // Toggle medication taken status
  const toggleTaken = (id) => {
    setMedications((prevMedications) =>
      prevMedications.map((med) =>
        med.id === id ? { ...med, taken: !med.taken } : med
      )
    );
  };

  // Open add alarm modal
  const handleAddAlarm = () => {
    setAlarmModalVisible(true);
  };

  // Handle medication selection
  const handleSelectMedication = (medication) => {
    setSelectedMedication(medication);
  };

  // Toggle time selection
  const toggleTimeSelection = (timePeriod) => {
    setSelectedTimes((prevTimes) => ({
      ...prevTimes,
      [timePeriod]: !prevTimes[timePeriod],
    }));
  };

  // Save alarm
  const handleSaveAlarm = () => {
    if (!selectedMedication) {
      Alert.alert('Error', 'Please select a medication.');
      return;
    }

    const newAlarms = [];
    Object.keys(selectedTimes).forEach((timePeriod) => {
      if (selectedTimes[timePeriod]) {
        newAlarms.push({
          id: Math.random().toString(), 
          name: selectedMedication.name,
          time: defaultTimes[timePeriod],
          period: timePeriod,
          taken: false,
        });
      }
    });

    const updatedMedications = [...medications, ...newAlarms].sort((a, b) => {
      const convertTimeTo24HourFormat = (time) => {
        const [hourMinute, period] = time.split(' ');
        let [hour, minute] = hourMinute.split(':').map(Number);
        if (period === 'PM' && hour !== 12) hour += 12;
        if (period === 'AM' && hour === 12) hour = 0;
        return hour * 60 + minute;
      };

      const timeA = convertTimeTo24HourFormat(a.time);
      const timeB = convertTimeTo24HourFormat(b.time);

      if (timeA === timeB) return a.id > b.id ? -1 : 1;
      return timeA - timeB;
    });

    setMedications(updatedMedications);
    setAlarmModalVisible(false);
    setSelectedTimes({ Morning: false, Lunch: false, Dinner: false });
  };

  // Delete medication
  const handleDeleteMedication = (id) => {
    setMedications((prevMedications) =>
      prevMedications.filter((med) => med.id !== id)
    );
    setMoreOptionsVisible(null);
  };

  // Render medication item
  const renderMedicationItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.medPeriodContainer}>
        <Text style={styles.medPeriod}>{item.period}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.medTime}>{item.time}</Text>
          <TouchableOpacity onPress={() => setMoreOptionsVisible(item.id)}>
            <MaterialIcons name="more-vert" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.medContentContainer}>
        <View style={styles.leftSection}>
          <View style={styles.iconPlaceholder}></View>
          <View style={styles.medInfo}>
            <Text style={styles.medName}>{item.name}</Text>
            <Text style={styles.medDescription}>1 tablet after meals</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => toggleTaken(item.id)}>
          <Text style={[styles.takenStatus, item.taken ? styles.homeTaken : styles.homeNotTaken]}>
            {item.taken ? 'Taken' : 'Not Taken'}
          </Text>
        </TouchableOpacity>
      </View>
      {moreOptionsVisible === item.id && (
        <View style={styles.moreOptionsMenu}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setMoreOptionsVisible(null)}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() =>
              Alert.alert(
                'Delete Alarm',
                `Are you sure you want to delete the alarm for ${item.name}?`,
                [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'OK', onPress: () => handleDeleteMedication(item.id) },
                ]
              )
            }
          >
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  const progress = takenCount / medications.length;

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.topBarTitle}>Pillpop App</Text>
      </View>

      <View style={styles.header}>
        <Text style={styles.greeting}>Hey, [User]</Text>
        <Text style={styles.progressText}>
          {takenCount === medications.length ? "Well done!" : "Almost there, keep going!"}
        </Text>

        <View style={{ position: 'relative', justifyContent: 'center', alignItems: 'center' }}>
          <Svg height="100" width="100" style={{ position: 'absolute', zIndex: 1 }}>
            <Circle
              cx="50"
              cy="50"
              r="40"
              stroke="#428CF7"
              strokeWidth="10"
              fill="none"
              strokeDasharray={`${Math.PI * 2 * 40}`}
              strokeDashoffset={`${Math.PI * 2 * 40 * (1 - progress)}`}
            />
          </Svg>

          <View style={styles.progressCircle}>
            <Text style={styles.progress}>{takenCount}/{medications.length}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Today's Medications</Text>
      <FlatList
        data={medications}
        renderItem={renderMedicationItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />

      <TouchableOpacity style={styles.addButton} onPress={handleAddAlarm}>
        <Text style={styles.addButtonText}>Add Alarm</Text>
      </TouchableOpacity>

      {/* Alarm Modal */}
      <Modal visible={alarmModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Close Modal Button */}
            <TouchableOpacity style={styles.closeButton} onPress={() => setAlarmModalVisible(false)}>
              <MaterialIcons name="close" size={24} color="#878787" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Select Medication</Text>
            
            {/* Medication Selection List */}
            <FlatList
              data={medicationList}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleSelectMedication(item)}>
                  <Text
                    style={[
                      styles.modalItemText,
                      selectedMedication && selectedMedication.id === item.id
                        ? styles.selectedMedication
                        : null,
                    ]}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
            />

            {/* Time Selection */}
            {selectedMedication && (
              <View style={styles.timeSelectionContainer}>
                <TouchableOpacity onPress={() => toggleTimeSelection('Morning')}>
                  <Text style={selectedTimes.Morning ? styles.selectedTime : styles.timeOption}>
                    Morning (9:00 AM)
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleTimeSelection('Lunch')}>
                  <Text style={selectedTimes.Lunch ? styles.selectedTime : styles.timeOption}>
                    Lunch (1:00 PM)
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleTimeSelection('Dinner')}>
                  <Text style={selectedTimes.Dinner ? styles.selectedTime : styles.timeOption}>
                    Dinner (8:00 PM)
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Save Alarm Button */}
            {selectedMedication && (
              <TouchableOpacity style={styles.modalButton} onPress={handleSaveAlarm}>
                <Text style={styles.modalButtonText}>Save Alarm</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton}>
          <MaterialIcons name="home" size={24} color={styles.navButtonText.color} />
          <Text style={styles.navButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <MaterialIcons name="calendar-today" size={24} color={styles.navButtonText.color} />
          <Text style={styles.navButtonText}>Calendar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <MaterialIcons name="search" size={24} color={styles.navButtonText.color} />
          <Text style={styles.navButtonText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <MaterialIcons name="person" size={24} color={styles.navButtonText.color} />
          <Text style={styles.navButtonText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}