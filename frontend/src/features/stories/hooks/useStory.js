import { useState } from "react";
import { getStories, uploadStory } from "../services/story.api";

export function useStory() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGetStories = async () => {
    setLoading(true);
    try {
      const data = await getStories();
      console.log(data.story)
      if (data.story) {
        setStories(data.story);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadStory = async (file) => {
    setLoading(true);
    try {
      await uploadStory(file);
      await handleGetStories(); // Refresh after upload
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      alert("Error uploading story: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return { stories, loading, error, handleGetStories, handleUploadStory };
}
