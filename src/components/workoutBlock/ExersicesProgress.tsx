import { useCourses } from "@/context/courseContext";

const ExersicesProgress = () => {
  const { progress } = useCourses();
  return (
    <>
        <div className="border rounded-3xl bg-white p-14 shadow-lg mt-12 mb-12">
          <h1 className="font-medium mb-3 text-3xl">Упражнения тренировки 2</h1>
          <div className="grid grid-cols-3 gap-5 text-lg"> 
            <div>
              <p>Наклоны вперед {progress}%</p>
              <div className="mb-6 h-1 w-full bg-neutral-200 dark:bg-neutral-600">
                <div
                  className="h-1 bg-custumBlue"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
            <div>
              <p>Наклоны вперед {progress}%</p>
              <div className="mb-6 h-1 w-full bg-neutral-200 dark:bg-neutral-600">
                <div
                  className="h-1 bg-custumBlue"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
            <div>
              <p>Наклоны вперед {progress}%</p>
              <div className="mb-6 h-1 w-full bg-neutral-200 dark:bg-neutral-600">
                <div
                  className="h-1 bg-custumBlue"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
            <div>
              <p>Наклоны назад {progress}%</p>
              <div className="mb-6 h-1 w-full bg-neutral-200 dark:bg-neutral-600">
                <div
                  className="h-1 bg-custumBlue"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
            <div>
              <p>Наклоны назад {progress}%</p>
              <div className="mb-6 h-1 w-full bg-neutral-200 dark:bg-neutral-600">
                <div
                  className="h-1 bg-custumBlue"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
            <div>
              <p>Наклоны назад {progress}%</p>
              <div className="mb-6 h-1 w-full bg-neutral-200 dark:bg-neutral-600">
                <div
                  className="h-1 bg-custumBlue"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
            <div>
              <p>Поднятие ног, согнутых в коленях {progress}%</p>
              <div className="mb-6 h-1 w-full bg-neutral-200 dark:bg-neutral-600">
                <div
                  className="h-1 bg-custumBlue"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
            <div>
              <p>Поднятие ног, согнутых в коленях {progress}%</p>
              <div className="mb-6 h-1 w-full bg-neutral-200 dark:bg-neutral-600">
                <div
                  className="h-1 bg-custumBlue"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
            <div>
              <p>Поднятие ног, согнутых в коленях {progress}%</p>
              <div className="mb-6 h-1 w-full bg-neutral-200 dark:bg-neutral-600">
                <div
                  className="h-1 bg-custumBlue"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
          <button className="bg-customGreenCurse font-medium text-black text-lg py-2 px-4 rounded-3xl w-80 h-14 mt-10">
            Заполнить свой прогресс
          </button>
        </div>
    </>
  );
};

export default ExersicesProgress;
