const envToken = import.meta.env.VITE_VIDEOSDK_TOKEN;
const isEnvTokenValid = envToken && envToken.startsWith('ey');

if (!isEnvTokenValid) {
  console.warn("⚠️ Invalid or missing VITE_VIDEOSDK_TOKEN in .env. Using fallback valid token.");
} else {
  console.log("✅ Using VITE_VIDEOSDK_TOKEN from .env");
}

export const VIDEOSDK_TOKEN = isEnvTokenValid
  ? envToken 
  : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiIwYTA5MGYwNC0zZDNkLTQyMzItYWZkMS02MTMyZTlmNjJiNzgiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIiwiYWxsb3dfbW9kIl0sImlhdCI6MTc2NTg4Mjc5MSwiZXhwIjoxNzY4NDc0NzkxfQ.WWBF3r_DjjCMSKbbjtpToyf1jJ0haG6B-G0Onk5zfV4";

export const API_BASE_URL = "https://api.videosdk.live/v2";

export const ROOM_A_ID = "room-a";
export const ROOM_B_ID = "room-b";

export const createMeeting = async ({ token }) => {
  const res = await fetch(`${API_BASE_URL}/rooms`, {
    method: "POST",
    headers: {
      authorization: `${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });   
  
  const { roomId } = await res.json();
  return roomId;
};

export const validateMeeting = async ({ roomId, token }) => {
  const url = `${API_BASE_URL}/rooms/validate/${roomId}`;
  
  const res = await fetch(url, {
    method: "GET",
    headers: {
      authorization: `${token}`,
      "Content-Type": "application/json",
    },
  });
  
  if (res.status === 400) {
    const data = await res.text();
    return { isValid: false, message: data };
  }
  
  const data = await res.json();
  return { isValid: data.roomId === roomId, message: "Room is valid" };
};
