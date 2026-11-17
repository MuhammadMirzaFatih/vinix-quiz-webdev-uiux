import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { apiClient } from '../api/client';

const ProgressContext = createContext(null);

export function ProgressProvider({ children }) {
  const [courses, setCourses] = useState([]);
  const [summary, setSummary] = useState({
    totalCourses: 10,
    passedCount: 0,
    percentage: 0,
    averageScore: 0,
    totalAttempts: 0
  });
  const [loading, setLoading] = useState(true);

  const fetchProgress = useCallback(async () => {
    try {
      setLoading(true);
      const [coursesData, summaryData] = await Promise.all([
        apiClient.getCourses(),
        apiClient.getUserProgress()
      ]);
      setCourses(coursesData);
      setSummary(summaryData);
    } catch (err) {
      console.error('Failed to load progress data', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  // Reset Progress function for testing purposes (very useful for mentor/evaluators)
  const resetProgress = () => {
    localStorage.removeItem('vinix7_progress_state');
    localStorage.removeItem('vinix7_attempts_state');
    fetchProgress();
  };

  // Instant unlock cheat for testing review purposes
  const unlockAllForDemo = () => {
    const map = {};
    for (let i = 1; i <= 10; i++) {
      map[`c${i}`] = { status: i <= 2 ? 'passed' : 'unlocked', bagianSelesai: [1, 2, 3], nilaiTerbaik: 85 };
    }
    localStorage.setItem('vinix7_progress_state', JSON.stringify(map));
    fetchProgress();
  };

  return (
    <ProgressContext.Provider value={{
      courses,
      summary,
      loading,
      refreshProgress: fetchProgress,
      resetProgress,
      unlockAllForDemo
    }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  return useContext(ProgressContext);
}
