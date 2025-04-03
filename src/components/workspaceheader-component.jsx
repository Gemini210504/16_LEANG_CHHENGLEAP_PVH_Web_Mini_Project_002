"use client";

import { useState } from "react";
import { Star } from "lucide-react"; // Assuming you are using the Star icon from lucide-react

export function WorkspaceHeader({
  workspaceId,
  workspaceName,
  isFavoriteInitial,
}) {
  const [isFavorite, setIsFavorite] = useState(isFavoriteInitial);

  const handleFavoriteClick = async () => {
    try {
      // Toggle the favorite status
      const newFavoriteStatus = !isFavorite;
      setIsFavorite(newFavoriteStatus);

      // Send the updated favorite status to the backend
      const response = await fetch(
        `http://96.9.81.187:8080/api/v1/workspace/${workspaceId}/favorite`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isFavorite: newFavoriteStatus }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update favorite status");
      }

      console.log("Workspace favorite status updated successfully");
    } catch (error) {
      console.error("Error updating favorite status:", error.message);
      // Optionally revert the state if the update fails
      setIsFavorite(!isFavorite);
    }
  };

  return (
    <div className="flex justify-between items-center">
      <p className="text-3xl font-medium">
        {workspaceName || "No workspace available"}
      </p>

      <span
        className="cursor-pointer"
        onClick={handleFavoriteClick}
        title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      >
        <Star color={isFavorite ? "gold" : "gray"} />
      </span>
    </div>
  );
}
