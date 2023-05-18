import React, { useState } from "react";
import Avatar from "react-avatar-generator";

const AvatarGenerator = () => {
  const [seed, setSeed] = useState("");

  const handleGenerateAvatar = () => {
    // Generate a random seed for the avatar
    const randomSeed = Math.random().toString(36).substring(7);
    setSeed(randomSeed);
  };

  return (
    <div>
      <button onClick={handleGenerateAvatar}>Generate Avatar</button>
      <Avatar seed={seed} width={200} height={200} />
    </div>
  );
};

export default AvatarGenerator;
