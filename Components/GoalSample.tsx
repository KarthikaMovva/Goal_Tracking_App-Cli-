import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { GoalDispatch, RootState } from '../store/Store';
import { fetchGoals, Goal } from '../store/GoalSlice';

const GoalSample: React.FC = () => {
  const dispatch = useDispatch<GoalDispatch>();
  const { goals, isLoading, error } = useSelector((state: RootState) => state.goals);

  useEffect(() => {
    dispatch(fetchGoals());
  }, []);

  const getCompletedToday = () => {
    const today = new Date().toISOString().split("T")[0];
    return goals.filter(goal => goal.completedDates.includes(today)).length;
  };

  const getStreak = (goal: Goal) => {
    let streak = 0;
    const currDate = new Date();
    while (true) {
      const dateString = currDate.toISOString().split("T")[0];
      if (goal.completedDates.includes(dateString)) {
        streak++;
        currDate.setDate(currDate.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  };

  const getLongestStreak = () => {
    return Math.max(...goals.map(getStreak), 0);
  };

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Loading Goals...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>📋 Goal Summary</Text>
      <Text style={styles.label}>Total Goals: <Text style={styles.value}>{goals.length}</Text></Text>
      <Text style={styles.label}>Completed Today: <Text style={styles.value}>{getCompletedToday()}</Text></Text>
      <Text style={styles.label}>Longest Streak: <Text style={styles.value}>{getLongestStreak()} days</Text></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  value: {
    fontWeight: 'bold',
    color: '#007AFF',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default GoalSample;
