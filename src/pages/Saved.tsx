import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "../Components/components/ui/skeleton";

interface Bookmark {
  index: number;
  title: string;
  description: string;
  skills: string;
}

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await fetch(
          `https://project-rec-backend.vercel.app/api/bookmark/?username=${username}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch bookmarks");
        }
        const data = await response.json();
        setBookmarks(data.data);
      } finally {
        setLoading(false);
      }
    };
    fetchBookmarks();
  }, []);

  const handleDelete = async (index: number) => {
    try {
      const response = await fetch(
        "https://project-rec-backend.vercel.app/api/bookmark/",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            index: index,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete bookmark");
      }

      setBookmarks(bookmarks.filter((bookmark) => bookmark.index !== index));
    } catch (error) {
      console.error("Error deleting bookmark:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen p-6">
      <h4 className="mt-2 mb-5 text-gray-500">Saved Projects...</h4>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-lg border border-gray-200"
            >
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      ) : bookmarks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarks.map((bookmark) => (
            <div
              key={bookmark.index}
              className="bg-white cursor-pointer p-4 rounded-lg shadow-lg border border-gray-200"
              onClick={() => navigate(`/project/${bookmark.index}`)}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-bold text-gray-700">
                  {bookmark.title}
                </h3>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(bookmark.index);
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={20} />
                </button>
              </div>
              <p className="text-gray-600">
                {bookmark.description.length > 100
                  ? `${bookmark.description.substring(0, 100)}...`
                  : bookmark.description}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No bookmarks found.</p>
      )}
    </div>
  );
}
