import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import EditProfileModal from './editProfileModal';
import SettingsModal from './settingsModal';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './styles'; 
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [isEditProfileVisible, setEditProfileVisible] = useState(false);
  const [isSettingsVisible, setSettingsVisible] = useState(false);
  const [isTimeModalVisible, setTimeModalVisible] = useState(false);
  const [alarmTimes, setAlarmTimes] = useState({
    Morning: new Date(),
    Lunch: new Date(),
    Dinner: new Date(),
  });

  const [isTimePickerVisible, setTimePickerVisible] = useState({
    Morning: false,
    Lunch: false,
    Dinner: false,
  });

  const handleTimeChange = (timePeriod, event, selectedTime) => {
    const newTime = selectedTime || alarmTimes[timePeriod];
    setAlarmTimes((prevTimes) => ({
      ...prevTimes,
      [timePeriod]: newTime,
    }));
    setTimePickerVisible((prevState) => ({
      ...prevState,
      [timePeriod]: false,
    }));
  };

  const toggleTimePicker = (timePeriod) => {
    setTimePickerVisible((prevState) => ({
      ...prevState,
      [timePeriod]: !prevState[timePeriod],
    }));
  };

  const saveAlarmTimes = () => {
    console.log('Saved Alarm Times:', alarmTimes);
    setTimeModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.profileImage} />
        <Text style={styles.profileName}>User Name</Text>
        <Text style={styles.profileAge}>24 years</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => setEditProfileVisible(true)}>
        <MaterialIcons name="edit" size={20} color="#4da6ff" style={styles.icon} />
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => setSettingsVisible(true)}>
        <MaterialIcons name="settings" size={20} color="#4da6ff" style={styles.icon} />
        <Text style={styles.buttonText}>Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => setTimeModalVisible(true)}>
        <MaterialIcons name="access-time" size={20} color="#4da6ff" style={styles.icon} />
        <Text style={styles.buttonText}>Adjust Alarm Times</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <MaterialIcons name="logout" size={20} color="#4da6ff" style={styles.icon} />
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>

      <Modal visible={isEditProfileVisible} transparent={true} animationType="slide">
        <EditProfileModal onClose={() => setEditProfileVisible(false)} />
      </Modal>

      <Modal visible={isSettingsVisible} transparent={true} animationType="slide">
        <SettingsModal onClose={() => setSettingsVisible(false)} />
      </Modal>

      <Modal visible={isTimeModalVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Adjust Alarm Times</Text>

            {/* Morning Time Picker */}
            <TouchableOpacity onPress={() => toggleTimePicker('Morning')}>
              <Text style={styles.timeOption}>
                Morning: {alarmTimes.Morning.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </TouchableOpacity>
            {isTimePickerVisible.Morning && (
              <DateTimePicker
                value={alarmTimes.Morning}
                mode="time"
                display="default"
                onChange={(event, selectedTime) => handleTimeChange('Morning', event, selectedTime)}
              />
            )}

            {/* Lunch Time Picker */}
            <TouchableOpacity onPress={() => toggleTimePicker('Lunch')}>
              <Text style={styles.timeOption}>
                Lunch: {alarmTimes.Lunch.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </TouchableOpacity>
            {isTimePickerVisible.Lunch && (
              <DateTimePicker
                value={alarmTimes.Lunch}
                mode="time"
                display="default"
                onChange={(event, selectedTime) => handleTimeChange('Lunch', event, selectedTime)}
              />
            )}

            {/* Dinner Time Picker */}
            <TouchableOpacity onPress={() => toggleTimePicker('Dinner')}>
              <Text style={styles.timeOption}>
                Dinner: {alarmTimes.Dinner.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </TouchableOpacity>
            {isTimePickerVisible.Dinner && (
              <DateTimePicker
                value={alarmTimes.Dinner}
                mode="time"
                display="default"
                onChange={(event, selectedTime) => handleTimeChange('Dinner', event, selectedTime)}
              />
            )}

            <TouchableOpacity style={styles.modalButton} onPress={saveAlarmTimes}>
              <Text style={styles.modalButtonText}>Save Times</Text>
            </TouchableOpacity>
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
}
