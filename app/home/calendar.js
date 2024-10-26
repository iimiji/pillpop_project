import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from './styles'; 

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const daysInMonth = {
  Jan: 31, Feb: 29, Mar: 31, Apr: 30, May: 31, Jun: 30, Jul: 31, Aug: 31, Sep: 30, Oct: 31, Nov: 30, Dec: 31,
};

// Get the starting day of the month in 2024
const getStartDayOfMonth = (monthIndex) => {
  const year = 2024;
  const firstDay = new Date(year, monthIndex, 1).getDay(); // Get the weekday of the 1st day (0: Sunday, 1: Monday, etc.)
  return firstDay;
};

const Calendar = () => {
  const navigation = useNavigation();
  const [currentMonthIndex, setCurrentMonthIndex] = useState(9); // Default to October (index 9)
  const [selectedDate, setSelectedDate] = useState('October 15');
  const [medications, setMedications] = useState([
    { id: '1', time: '9:30 AM', name: 'Vitamin C', taken: true },
    { id: '2', time: '2:00 PM', name: 'Ibuprofen', taken: false },
    { id: '3', time: '8:00 PM', name: 'Aspirin', taken: false },
  ]);

  const currentMonth = months[currentMonthIndex];
  const totalDays = daysInMonth[currentMonth];
  const startDay = getStartDayOfMonth(currentMonthIndex);

  const handlePreviousMonth = () => {
    const newMonthIndex = (currentMonthIndex - 1 + months.length) % months.length;
    setCurrentMonthIndex(newMonthIndex);
  };

  const handleNextMonth = () => {
    const newMonthIndex = (currentMonthIndex + 1) % months.length;
    setCurrentMonthIndex(newMonthIndex);
  };

  const renderCalendarDays = () => {
    const daysArray = [];

    // Add blank slots for days before the 1st
    for (let i = 0; i < startDay; i++) {
      daysArray.push(<View key={`blank-${i}`} style={styles.blankDay}></View>);
    }

    // Add actual days of the month
    for (let day = 1; day <= totalDays; day++) {
      daysArray.push(
        <TouchableOpacity key={day} onPress={() => setSelectedDate(`${currentMonth} ${day}`)}>
          <Text style={selectedDate === `${currentMonth} ${day}` ? styles.dateSelected : styles.calendarDay}>
            {day}
          </Text>
        </TouchableOpacity>
      );
    }

    // If the last row has less than 7 days, add blank slots to complete the row
    const remainingDays = (startDay + totalDays) % 7;
    if (remainingDays !== 0) {
      for (let i = remainingDays; i < 7; i++) {
        daysArray.push(<View key={`blank-end-${i}`} style={styles.blankDay}></View>);
      }
    }

    return daysArray;
  };

  const renderMedicationItem = ({ item }) => (
    <View style={styles.medCard}>
      <Text style={styles.medTime}>{item.time}</Text>
      <View style={styles.medInfo}>
        <Text style={styles.medName}>{item.name}</Text>
      </View>
      <Text style={item.taken ? styles.calendarTaken : styles.calendarNotTaken}>
        {item.taken ? 'Taken' : 'Not Taken'}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Calendar Section */}
      <View style={styles.calendarContainer}>
        <View style={styles.calendarHeader}>
          <TouchableOpacity onPress={handlePreviousMonth}>
            <Text style={styles.arrow}>{"<"}</Text>
          </TouchableOpacity>
          <Text style={styles.month}>{currentMonth}</Text>
          <TouchableOpacity onPress={handleNextMonth}>
            <Text style={styles.arrow}>{">"}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.calendar}>
          <Text style={styles.calendarDayLabel}>Sun</Text>
          <Text style={styles.calendarDayLabel}>Mon</Text>
          <Text style={styles.calendarDayLabel}>Tue</Text>
          <Text style={styles.calendarDayLabel}>Wed</Text>
          <Text style={styles.calendarDayLabel}>Thu</Text>
          <Text style={styles.calendarDayLabel}>Fri</Text>
          <Text style={styles.calendarDayLabel}>Sat</Text>
        </View>
        <View style={styles.datesContainer}>
          {renderCalendarDays()}
        </View>
      </View>

      {/* Medication List Section */}
      <Text style={styles.sectionTitle}>Medication History</Text>
      <Text style={styles.dateTitle}>{selectedDate}</Text>
      <FlatList
        data={medications}
        renderItem={renderMedicationItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.medList}
      />

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

export default Calendar;
