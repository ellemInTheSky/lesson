import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNekoImages } from "./store/slice/wifuSlice";

function App() {
  const dispatch = useDispatch();
  const { nekoImages, status, error } = useSelector((state) => state.anime);

  useEffect(() => {
    dispatch(fetchNekoImages());
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-purple-500 text-white p-6">
      <h1 className="text-4xl font-extrabold mb-6 drop-shadow-lg">
        Random anime girl Images
      </h1>
      {status === "loading" && (
        <p className="text-lg animate-pulse">Loading...</p>
      )}
      {status === "failed" && (
        <p className="text-lg text-red-400">Error: {error}</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
        {nekoImages.map((image, index) => (
          <div
            key={index}
            className="bg-gray-800 p-4 rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-300 flex flex-col items-center">
            <img
              src={image}
              alt="Neko Image"
              className="rounded-xl w-full h-60 object-cover shadow-md"
            />
            <p className="text-center text-sm mt-2 p-2 bg-gray-700 w-full rounded-b-2xl">
              girl image {index + 1}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
