import { Platform,StatusBar } from "react-native";
import { Discussion } from "../hooks/useChat";
export const STATUS_BAR_HEIGHT = Platform.OS === 'android' ? StatusBar.currentHeight : 20; // Default status bar height

export const DISCUSSIONS:Discussion[] = [
    {
      id: 1,
      users: [{ id: 1, name: "User1" }, { id: 2, name: "User2" }],
      messages: [
        {
          id: 1,
          sender: { id: 1, name: "User1" },
          content: "Hello!",
          timestamp: 1632728400,
        },
        {
          id: 2,
          sender: { id: 2, name: "User2" },
          content: "Hi there!",
          timestamp: 1632728460,
        },
      ],
    },
    // Add more discussions here...
    {
      id: 2,
      users: [{ id: 3, name: "User3" }, { id: 4, name: "User4" }],
      messages: [
        {
          id: 3,
          sender: { id: 3, name: "User3" },
          content: "Hey!",
          timestamp: 1632728600,
        },
        {
          id: 4,
          sender: { id: 4, name: "User4" },
          content: "Hello!",
          timestamp: 1632728660,
        },
      ],
    },
    // Add more discussions here...
  ];

  export function getRandomUser(discussion:Discussion) {
    const users = discussion.users;
    const randomIndex = Math.floor(Math.random() * users.length);
    return users[randomIndex];
  }
  
  // Create a total of 30 discussions
  for (let i = 3; i <= 30; i++) {
    DISCUSSIONS.push({
      id: i,
      users: [
        { id: i * 2 - 1, name: `User${i * 2 - 1}` },
        { id: i * 2, name: `User${i * 2}` },
      ],
      messages: [],
    });
  }
  
  