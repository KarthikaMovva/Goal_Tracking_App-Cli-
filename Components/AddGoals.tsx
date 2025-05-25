import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Alert,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useDispatch } from 'react-redux';
import { GoalDispatch } from '../store/Store';
import { addGoal } from '../store/GoalSlice';

const AddGoals: React.FC = () => {
  const [goal, setGoal] = useState<string>('');
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const dispatch = useDispatch<GoalDispatch>();

  const handleSave = () => {
    if (!goal.trim()) {
      Alert.alert('Validation', 'Please enter a goal.');
      return;
    }
    dispatch(addGoal({ name: goal, GoalPeriod: period }));
    Alert.alert('Goal Saved', `Goal: ${goal}\nPeriod: ${period}`);
    setGoal('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <Text style={styles.title}>Add Your Goal</Text>

              <Text style={styles.label}>Enter Goal</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., Study for 2 hours"
                value={goal}
                onChangeText={setGoal}
              />

              <Text style={styles.label}>Select Period</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={period}
                  onValueChange={(itemValue) => setPeriod(itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label="Daily" value="daily" />
                  <Picker.Item label="Weekly" value="weekly" />
                  <Picker.Item label="Monthly" value="monthly" />
                </Picker>
              </View>

              <View style={styles.buttonContainer}>
                <Button title="Save Goal" onPress={handleSave} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddGoals;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 25,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: '#444',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 30,
    backgroundColor: '#f9f9f9',
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  buttonContainer: {
    marginTop: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
});
