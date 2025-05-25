import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export interface Goal {
  id: string;
  name: string;
  GoalPeriod: "daily" | "weekly" | "monthly";
  completedDates: string[];
  createdAt: string;
}

interface GoalsState {
  goals: Goal[];
  isLoading: boolean;
  error: string | null;
}

const initialState: GoalsState = {
  goals: [],
  isLoading: false,
  error: null,
};


export const fetchGoals = createAsyncThunk("goals/fetchGoals", async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const mockGoals: Goal[] = [
    {
      id: "1",
      name: "Read",
      GoalPeriod: "daily",
      completedDates: [],
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      name: "Exercise",
      GoalPeriod: "weekly",
      completedDates: [],
      createdAt: new Date().toISOString(),
    },
    {
      id: "3",
      name: "Code",
      GoalPeriod: "daily",
      completedDates: [],
      createdAt: new Date().toISOString(),
    },
  ];

  return mockGoals; 
});

const GoalSlice = createSlice({
  name: "goal",
  initialState,
  reducers: {
    addGoal: (
      state,
      action: PayloadAction<{ name: string; GoalPeriod: "daily" | "weekly" | "monthly" }>
    ) => {
      const newGoal: Goal = {
        id: Date.now().toString(),
        name: action.payload.name,
        GoalPeriod: action.payload.GoalPeriod,
        completedDates: [],
        createdAt: new Date().toISOString(),
      };
      state.goals.push(newGoal);
    },

    toggelStatus: (state, action: PayloadAction<{ id: string; date: string }>) => {
      const goal = state.goals.find((h) => h.id === action.payload.id);
      if (goal) {
        const index = goal.completedDates.indexOf(action.payload.date);
        if (index > -1) {
          goal.completedDates.splice(index, 1);
        } else {
          goal.completedDates.push(action.payload.date);
        }
      }
    },

    removeGoals: (state, action: PayloadAction<{ id: string }>) => {
      state.goals = state.goals.filter((goal) => goal.id !== action.payload.id);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchGoals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchGoals.fulfilled, (state, action: PayloadAction<Goal[]>) => {
        state.isLoading = false;
        state.goals = action.payload;
      })
      .addCase(fetchGoals.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch goals!!";
      });
  },
});

export const { addGoal, toggelStatus, removeGoals } = GoalSlice.actions;

export default GoalSlice.reducer;
