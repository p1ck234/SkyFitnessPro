import ExersicesProgress from "./ExersicesProgress";

export const WorkoutBlock = () => {

  return (
    <>
      <h1 className="text-sm sm:text-lg md:text-xl lg:text-6xl font-medium mb-8 mt-10">Йога</h1>
      <nav className="">
        <h2 className="flex underline">
            <p className="text-3xl font-normal">Красота и здоровье /</p>
            <p className="text-3xl font-normal">Йога на каждый день /</p>
            <p className="text-3xl font-normal">2 день </p>
        </h2>
      </nav>
      <iframe className="mt-10 rounded-3xl"
        width="1150"
        height="639"
        src="https://www.youtube.com/embed/v-xTLFDhoD0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>{" "}
      <ExersicesProgress />
    </>
  );
};
