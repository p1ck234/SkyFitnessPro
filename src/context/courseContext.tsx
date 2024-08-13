// courseContext.tsx

import React, { createContext, useContext, useEffect, useState } from "react";
import { getCourses } from "@/services/firestoreService";

interface Course {
  id: string;
  name: string;
  img: string;
  imgMobile: string;
  days: number;
  range: string;
  good_for_you: string[];
  directions: string[];
  description: string[];
}

interface CourseContextType {
  courses: Course[];
  loading: boolean;
  error: string | null;
  progress: number | null;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress]=useState<number>(25)
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const fetchedCourses = await getCourses();
        setCourses(fetchedCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setError("Failed to load courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []); 
  
  return (
    <CourseContext.Provider value={{ courses, loading, error, progress }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourses = (): CourseContextType => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error("useCourses must be used within a CourseProvider");
  }
  return context;
};
