import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, GoalDispatch } from '../store/Store';
import { Goal, toggelStatus, removeGoals } from '../store/GoalSlice';

const ListGoals: React.FC = () => {
  const { goals } = useSelector((state: RootState) => state.goals);
  const today = new Date().toISOString().split("T")[0];
  const dispatch = useDispatch<GoalDispatch>();

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

  return (
    <View style={styles.container}>
      {goals.map((eachgoal) => (
        <View key={eachgoal.id} style={styles.goalCard}>
          <Text style={styles.goalName}>{eachgoal.name}</Text>
          <Button
            title={eachgoal.completedDates.includes(today) ? "Marked Complete" : "Mark Completed"}
            onPress={() => dispatch(toggelStatus({ id: eachgoal.id, date: today }))}
          />
          <View style={{ marginVertical: 5 }} />
          <Button
            title="Remove"
            color="red"
            onPress={() => dispatch(removeGoals({ id: eachgoal.id }))}
          />
          <Text style={styles.streakText}>Current Streak: {getStreak(eachgoal)} days</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  goalCard: {
    marginBottom: 20,
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  goalName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  streakText: {
    marginTop: 10,
    fontStyle: 'italic',
  },
});

export default ListGoals;
