import { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "@/context/userContext";

interface PopSelectWorkoutsProps {
  workouts: any[];
  courseId: number;
  onClose: () => void;
}

export const PopSelectWorkouts = ({
  workouts,
  courseId,
  onClose,
}: PopSelectWorkoutsProps) => {
  const { user } = useUser(); 
  const navigate = useNavigate();
  const location = useLocation();
  const [progressData, setProgressData] = useState<any[]>([]);
  const [checkedWorkouts, setCheckedWorkouts] = useState<number[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(true);

  useEffect(() => {
    if (user) {
      const fetchProgressData = async () => {
        const db = getFirestore();
        const userRef = doc(db, "dataUsers", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          console.log("User data from Firestore:", userData);

          const courseProgress = userData.courses_progress.find(
            (course: any) => course.id_course === courseId
          );
          console.log("Course progress:", courseProgress);

          if (courseProgress) {
            setProgressData(courseProgress.workouts_progress);
          }
        }
      };

      fetchProgressData();
    }
  }, [user, courseId]);

  const toggleCheckbox = (id: number) => {
    setCheckedWorkouts((prevChecked) =>
      prevChecked.includes(id)
        ? prevChecked.filter((workoutId) => workoutId !== id)
        : [...prevChecked, id]
    );
  };

  const handleWorkoutSelect = (workoutId: number, isCompleted: boolean) => {
    if (!isCompleted) {
      navigate(`/workouts/${courseId}/${workoutId}`);
    }
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
    onClose();
  };

  const isWorkoutCompleted = (workoutId: number): boolean => {
    const workoutProgress = progressData.find(
      (progress) => progress.id_workout === workoutId
    );
    return workoutProgress?.completed || false;
  };

  if (!isModalVisible) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center z-50"
      onClick={handleBackgroundClick}
    >
      <div
        className="relative bg-white rounded-3xl shadow-xl w-80 p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <form className="flex flex-col items-center w-full rounded-xl">
          <h1 className="text-center text-3xl mb-6">Выберите тренировку</h1>
          <ul className="w-full flex flex-col overflow-y-auto max-h-[60vh] scrollbar-thin">
            {workouts.map((workout, index) => {
              const isCompleted = isWorkoutCompleted(workout.id);

              return (
                <li
                  key={workout.id}
                  className={`flex items-center mb-2 border-b border-gray-400 ${
                    isCompleted ? "cursor-not-allowed" : ""
                  }`}
                  onClick={() => handleWorkoutSelect(workout.id, isCompleted)}
                >
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isCompleted}
                      onChange={() => toggleCheckbox(workout.id)}
                      className="hidden"
                      disabled={isCompleted}
                    />
                    <span
                      className={` h-4 w-4 border border-black rounded-full mr-2 flex-shrink-0 flex justify-center items-center ${
                        isCompleted ? "bg-customGreen border-none" : "bg-white"
                      }`}
                    >
                      {isCompleted && (
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                      )}
                    </span>
                    <div>
                      <span className="text-xl">{workout.name}</span>
                      <p className="text-sm mb-2">{workout.url_desc}</p>
                    </div>
                  </label>
                </li>
              );
            })}
          </ul>
        </form>
      </div>
    </div>
  );
};
