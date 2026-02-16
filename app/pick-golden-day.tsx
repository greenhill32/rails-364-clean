import DateTimePicker from '@react-native-community/datetimepicker';
import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useGoldenDay } from '@/contexts/GoldenDayContext';
import Colors from '@/constants/colors';

export default function PickGoldenDayScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { setGoldenDay } = useGoldenDay();

  const handleContinue = () => {
    setGoldenDay(selectedDate.getMonth(), selectedDate.getDate());
    router.replace('/calendar');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.decorativeLine} />
          <Text style={styles.title}>Choose Your</Text>
          <Text style={styles.subtitle}>GOLDEN DAY</Text>
          <View style={styles.decorativeLine} />
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            Pick one special day of the year to say
          </Text>
          <Text style={[styles.description, styles.bold]}>
            Yes instead of no
          </Text>
        </View>

        <View style={styles.pickerContainer}>
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="inline"
            onChange={(event, date) => {
              if (date) setSelectedDate(date);
            }}
            accentColor="#D4AF37"
            themeVariant="dark"
            style={{ width: 320 }}
          />
        </View>

        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          You can change this later.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  decorativeLine: {
    width: 60,
    height: 1,
    backgroundColor: Colors.gold,
    opacity: 0.5,
    marginVertical: 8,
  },
  title: {
    fontSize: 36,
    fontWeight: '300',
    color: Colors.gold,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 18,
    color: Colors.gold,
    letterSpacing: 4,
  },
  descriptionContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 20,
    color: Colors.gold,
    textAlign: 'center',
    lineHeight: 28,
  },
  bold: {
    fontWeight: '600',
  },
  pickerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  continueButton: {
    backgroundColor: Colors.gold,
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: 20,
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.backgroundDark,
    letterSpacing: 2,
  },
  footerText: {
    fontSize: 13,
    color: Colors.gold,
    textAlign: 'center',
    opacity: 0.7,
    fontStyle: 'italic',
    marginTop: 16,
  },
});
