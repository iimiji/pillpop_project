import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // 공통 컨테이너 스타일
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#EBF3FF', // 배경색
  },

  headerContainer: {
    paddingTop: 44,
    paddingBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#428CF7', // 기본 강조색
  },
  topBar: {
    backgroundColor: '#428CF7', // Top bar color
    padding: 15,
    alignItems: 'center',
  },
  topBarTitle: {
    color: '#FFFFFF', // White text for the title
    fontSize: 20,
    fontWeight: 'bold',
  },
  // Add this to your styles.js
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF', // Bottom nav bar color
    position: 'absolute', // Ensure it stays at the bottom
    bottom: 0,
    left: 0,
    right: 0,
    height: 60, // Set a specific height for the bottom nav bar
    elevation: 5, // Optional: Shadow effect for Android
},
  navButton: {
    padding: 10,
    alignItems: 'center',
  },
  
  navButtonText: {
    color: '#428CF7', // Color for the nav button text
    fontSize: 16,
  },

  bottomNavText: {
    fontSize: 16,
    color: '#428CF7', // Color for navigation items
  },

  // 홈 화면 스타일
  header: {
    backgroundColor: '#EBF3FF', // 밝은 톤 강조색
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 14,
    color: '#000000', // 검정색 텍스트
    marginBottom: 10,
  },
  progressText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#428CF7', // 검정색 텍스트
    marginBottom: 20,
  },
  progressCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#ffffff', // 기본 강조색
    justifyContent: 'center',
    alignItems: 'center',
  },
  progress: {
    color: '#428CF7', // 흰색 텍스트
    fontWeight: 'bold',
    fontSize: 18,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000000', // 검정색 텍스트
  },
  list: {
    paddingBottom: 20,
  },

  // 홈 화면의 약물 카드 스타일
  card: {
    backgroundColor: '#FFFFFF', // 흰색 카드 배경
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 2,
  },
  medPeriodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  medPeriod: {
    fontSize: 16,
    color: '#428CF7', // 기본 강조색
    fontWeight: 'bold',
  },
  medTime: {
    fontSize: 14,
    color: '#878787', // 중간 톤 텍스트
  },
  medContentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#878787', // 중간 톤 아이콘 배경색
    marginRight: 15,
  },
  medInfo: {
    justifyContent: 'flex-start',
  },
  medName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000', // 검정색 텍스트
  },
  medDescription: {
    fontSize: 12,
    color: '#878787', // 중간 톤 텍스트
  },
  takenStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    width: 90,
    textAlign: 'center',
  },
  homeTaken: {
    color: '#428CF7', // 기본 강조색
    borderColor: '#428CF7', // 기본 강조색
  },
  homeNotTaken: {
    color: '#878787', // 중간 톤 색상
    borderColor: '#878787', // 중간 톤 색상
  },

  // 캘린더 화면 스타일
  calendarContainer: {
    backgroundColor: '#428CF7', // 밝은 톤 배경색
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  arrow: {
    fontSize: 20,
    color: '#ffffff', // 기본 강조색
  },
  month: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff', // 기본 강조색
  },
  calendar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  calendarDayLabel: {
    fontSize: 14,
    color: '#EBF3FF', // 요일 레이블 텍스트
    width: 40,
    textAlign: 'center',
  },
    // 캘린더 날짜 정렬 관련 스타일 추가
  calendarDay: {
    fontSize: 14,
    color: '#EBF3FF',
    width: 40,
    height: 40,
    textAlign: 'center',
    lineHeight: 40,  // 텍스트가 박스 안에서 세로로 중앙 정렬되도록
    marginBottom: 5,
    marginHorizontal: 2,
  },
  // 빈칸 스타일
  blankDay: {
    width: 40,
    height: 40,
    marginBottom: 5,
    marginHorizontal: 2,  // 빈칸도 날짜와 동일한 간격으로 유지
  },
  datesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  dateSelected: {
    fontSize: 16,
    color: '#428CF7', // 흰색 텍스트 (선택된 상태)
    backgroundColor: '#ffffff', // 선택된 상태의 배경색
    borderRadius: 10, // 선택된 상태의 둥근 테두리
    width: 40, // 선택된 날짜 박스의 너비
    height: 40, // 선택된 날짜 박스의 높이
    textAlign: 'center', // 텍스트 중앙 정렬
    lineHeight: 40, // 세로로 중앙 정렬
    marginBottom: 5,
  },
  dateUnselected: {
    fontSize: 16,
    color: '#333', // 일반 날짜 텍스트 색상
    backgroundColor: '#F5F5F5', // 일반 날짜 배경색
    borderRadius: 20, // 둥근 모서리
    width: 40, // 날짜 박스의 너비 (선택되지 않은 상태)
    height: 40, // 날짜 박스의 높이 (선택되지 않은 상태)
    textAlign: 'center', // 텍스트 중앙 정렬
    lineHeight: 40, // 세로로 중앙 정렬
    marginBottom: 5,
  },
  dateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#428CF7', // 기본 강조색
  },
  medList: {
    paddingBottom: 20,
  },
  medCard: {
    backgroundColor: '#FFFFFF', // 흰색 카드 배경
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  calendarTaken: {
    color: '#428CF7', // 기본 강조색
    fontWeight: 'bold',
  },
  calendarNotTaken: {
    color: '#878787', // 중간 톤 색상
    fontWeight: 'bold',
  },

  // SearchScreen 스타일
  searchInput: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Search 배경
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  searchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between', // This keeps elements spaced out
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative', // To allow absolute positioning of icons if needed
    paddingHorizontal: 10, // Added padding to create space between icons and the edges
  },
  cameraIcon: {
    marginVertical: 10,
    color: '#428CF7', // 기본 강조색
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: '#F5F5F5',
    borderRadius: 50,
    marginTop: 20,
  },
  medicineListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', // Ensure spacing between the cards
    paddingBottom: 20, // Padding at the bottom of the container
    paddingTop: 20,
  },
  medicineList: {
    paddingBottom: 20,
    paddingTop: 20,
    borderRadius: 10,
  },
  medicineChoiceList: {
    width: '100%',
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#F5F5F5', // 선택지 배경색
  },
  medicineChoiceItem: {
    padding: 15,
    borderBottomColor: '#428CF7',
    borderBottomWidth: 1,
    width: '80%',  // 텍스트 컨테이너가 모달의 80%를 차지
    alignSelf: 'center',  // 중앙에 맞춤
    textAlign: 'center',
    color: '#428CF7',
    fontWeight: 'bold',
    flexWrap: 'wrap',  // 텍스트가 모달의 너비를 넘어가면 줄바꿈되도록 설정
  },
  selectedMedication: {
    backgroundColor: '#428CF7', // Highlight the selected medication
    color: '#FFFFFF', // White text for the selected medication
    padding: 10,
    borderRadius: 10,
    textAlign: 'center',
    marginVertical: 5,
  },
  medicineChoiceButton: {
    backgroundColor: '#428CF7', // 버튼 배경색
    padding: 12,  // 버튼 내부 패딩
    borderRadius: 8, // 둥근 테두리
    marginVertical: 5,  // 버튼 사이 간격
    width: '80%',  // 버튼 너비
    alignSelf: 'center', // 중앙 정렬
  },
  medicineChoiceButtonText: {
    color: '#FFFFFF',  // 버튼 텍스트 색상 (흰색)
    fontSize: 14,  // 텍스트 크기
    //fontWeight: 'bold',  // 굵은 텍스트
    textAlign: 'center',  // 텍스트 중앙 정렬
  },
  // styles.js에 새로운 스타일 추가
  medicineImage: {
    width: 60,
    height: 60,
    borderRadius: 30,  // Ensure circular shape
    marginRight: 15,
    resizeMode: 'cover',  // Ensures the image covers the container without distortion
  },
  medicineInfo: {
    flex: 1,  // Allow the text to take up the remaining space
    justifyContent: 'center',  // Vertically center the text
  },
  medicineName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#428CF7',
    textAlign: 'center',
    paddingBottom: 10,
  }, 
  medicineDescription: {
    fontSize: 12,
    color: '#878787',
    textAlign: 'center',
    paddingBottom: 10,
  },
  medicineCard: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    width: '100%',  // Full width for single-column layout
    alignItems: 'center',
    justifyContent: 'space-between',  // Adjust content spacing
    flexDirection: 'row',  // Align image and text in a row
    borderColor: '#EBF3FF',
    borderWidth: 1,
    height: 120,  // Adjust the height for a consistent look
  },
  addButton: {
    position: 'absolute', // Ensure it is positioned absolutely
    bottom: 70, // This should be greater than the height of the bottomNav (60) to keep it above it
    alignSelf: 'center', // Center the button horizontally
    backgroundColor: '#4da6ff', // Light blue color
    padding: 12, // More padding for a larger button
    borderRadius: 10,
    width: '80%', // Make button responsive
    alignItems: 'center', // Center the text inside the button
},
  addButtonText: {
    color: '#ffffff', // White text
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    alignSelf: 'center',
  },
  savedIcon: {
    color: '#428CF7', // 기본 강조색
  },
  unsavedIcon: {
    color: '#878787', // 중간 톤 색상
  },
  moreOptionsMenu: {
    backgroundColor: '#428CF7',
    padding: 10,
    borderRadius: 10,
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 1,
    //borderWidth: 1,
  },
  moreOptionsButton: {
    backgroundColor: '#FFFFFF', // White background for buttons
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10, // Added margin between the buttons
    width: '100%', // Full width button for better touch targets
  },
  cancelButton: {
    backgroundColor: '#FFFFFF', // White background for Cancel
    borderColor: '#878787', // Grey border for Cancel
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10, // Space between Cancel and Delete
    width: '100%', // Full width for better touch targets
  },
  deleteButton: {
    backgroundColor: '#FFFFFF', // Red background for Delete
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%', // Full width for better touch targets
  },
  moreOptionsText: {
    fontSize: 14,
    color: '#ffffff', // 기본 강조색
  },
  cancelText: {
    color: '#878787', // Grey text for Cancel button
    fontSize: 14,
    fontWeight: 'bold',
  },
  deleteText: {
    color: '#878787', // White text for Delete button
    fontSize: 14,
    fontWeight: 'bold',
  },
  // 프로필 화면 스타일
  profileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#878787', // 중간 톤 색상
    marginBottom: 10,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000000', // 검정색 텍스트
  },
  profileAge: {
    fontSize: 16,
    color: '#878787', // 중간 톤 텍스트
  },
  button: {
    backgroundColor: '#ffffff', // 버튼 배경
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#428CF7', // 기본 강조색
  },
  icon: {
    marginRight: 10,
    color: '#878787', // 중간 톤 아이콘 색상
  },

  // Modal 스타일
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 투명 배경
  },
  modalContent: {
    backgroundColor: '#FFFFFF', 
    padding: 20,
    borderRadius: 15,
    width: '85%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,  // Android용 그림자 효과
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    color: '#878787', // 중간 톤 아이콘 색상
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#000000', // 검정색 텍스트
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#878787',  // 기본 강조색
    marginBottom: 10,
    textAlign: 'left',
    fontWeight: 'bold',
    width: '100%',
  },
  scrollableModalContent: {
    maxHeight: 300, // Limit the height to make it scrollable
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  selectedTimeContainer: {
    marginTop: 10,
  },
  // 선택되지 않은 시간 버튼 스타일
  timeOption: {
    backgroundColor: '#F5F5F5', // 선택되지 않은 버튼 배경색
    color: '#000000', // 선택되지 않은 버튼 텍스트 색상
    padding: 12,
    borderRadius: 10,
    textAlign: 'center',
    marginVertical: 5,
    width: '80%',
    alignSelf: 'center', // 버튼 중앙 정렬
  },
  // 선택된 시간 버튼 스타일 (HomeScreen 및 ProfileScreen)
  selectedTime: {
    backgroundColor: '#428CF7', // 선택된 버튼 배경색
    color: '#FFFFFF', // 선택된 버튼 텍스트 색상
    padding: 12,
    borderRadius: 10,
    textAlign: 'center',
    marginVertical: 5,
    width: '80%',
    alignSelf: 'center', // 버튼 중앙 정렬
  },
  // 모달 버튼 스타일
  modalButtonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  modalButton: {
    backgroundColor: '#428CF7', // 버튼 배경
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    width: '90%', // 버튼 너비를 반응형으로 조정
    alignItems: 'center',
  },
  modalButtonText: {
      color: '#FFFFFF', // Button text color
      fontWeight: 'bold',
      fontSize: 16,
  },
  modalItemText: {
    fontSize: 16,
    padding: 10,
    color: '#000000', // Black text
    textAlign: 'center',
  },
  // 모달 내에서 약물 수동 추가를 위한 입력 필드 스타일
  modalInput: {
    borderWidth: 1,
    borderColor: '#878787',
    borderRadius: 8, // 부드러운 테두리
    padding: 12,  // 충분한 패딩 추가
    marginBottom: 15,
    width: '100%',
  },
  // 모달 내에서 알약 색상 선택을 위한 팔레트 스타일
  colorPalette: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  colorBox: {
    width: 30,
    height: 30,
    borderRadius: 5,
    marginHorizontal: 5,
  },

  // 모양 선택을 위한 컨테이너
  shapeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },


  // EditProfileModal 스타일
  inputContainer: {
    marginBottom: 15,
    flexDirection: 'column',
    alignItems: 'stretch',
    width: '100%',
  },
  label: {
    fontSize: 14,
    color: '#878787', // 중간 톤 텍스트
    marginBottom: 5,
  },
  input: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#EBF3FF', // 밝은 톤 배경색
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },

  starIcon: {
    color: '#FFD700', // Gold color for favorited items
    marginRight: 2, // Space between the icon and other elements
  },
  unstarIcon: {
    color: '#878787', // Grey color for unfavorited items
    marginRight: 2, 
  },
  topRightIcon: {
  position: 'absolute',
  top: 80, // Adjust as needed
  right: 30, // Adjust as needed
  zIndex: 1000, // Ensure it appears on top
  },


  // SettingsModal 스타일
  settingsOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#EBF3FF', // 밝은 톤 배경색
    borderRadius: 10,
    width: '100%',
    justifyContent: 'space-between',
  },
  settingsItemText: {
    fontSize: 16,
    color: '#428CF7', // 기본 강조색
  },
  saveButton: {
    backgroundColor: '#428CF7',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
    width: '90%',
    alignSelf: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
    // Add this container style for the Camera and File buttons
  cameraFileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 20,
  },



});

export default styles;