import React, { useState, useEffect } from "react";
import "./App.scss";
import Messages from "./components/Messages";
import Input from "./components/Input";

type Message = {
  member: {
    username: string;
    color: string;
    id?: string;
  };
  text: string;
};

const randomName = (): string => {
  const adjectives: string[] = [
    "autumn",
    "hidden",
    "bitter",
    "misty",
    "silent",
    "empty",
    "dry",
    "dark",
    "summer",
    "icy",
    "delicate",
    "quiet",
    "white",
    "cool",
    "spring",
    "winter",
    "patient",
    "twilight",
    "dawn",
    "crimson",
    "wispy",
    "weathered",
    "blue",
    "billowing",
    "broken",
    "cold",
    "damp",
    "falling",
    "frosty",
    "green",
    "long",
    "late",
    "lingering",
    "bold",
    "little",
    "morning",
    "muddy",
    "old",
    "red",
    "rough",
    "still",
    "small",
    "sparkling",
    "throbbing",
    "shy",
    "wandering",
    "withered",
    "wild",
    "black",
    "young",
    "holy",
    "solitary",
    "fragrant",
    "aged",
    "snowy",
    "proud",
    "floral",
    "restless",
    "divine",
    "polished",
    "ancient",
    "purple",
    "lively",
    "nameless",
  ];
  const nouns: string[] = [
    "waterfall",
    "river",
    "breeze",
    "moon",
    "rain",
    "wind",
    "sea",
    "morning",
    "snow",
    "lake",
    "sunset",
    "pine",
    "shadow",
    "leaf",
    "dawn",
    "glitter",
    "forest",
    "hill",
    "cloud",
    "meadow",
    "sun",
    "glade",
    "bird",
    "brook",
    "butterfly",
    "bush",
    "dew",
    "dust",
    "field",
    "fire",
    "flower",
    "firefly",
    "feather",
    "grass",
    "haze",
    "mountain",
    "night",
    "pond",
    "darkness",
    "snowflake",
    "silence",
    "sound",
    "sky",
    "shape",
    "surf",
    "thunder",
    "violet",
    "water",
    "wildflower",
    "wave",
    "water",
    "resonance",
    "sun",
    "wood",
    "dream",
    "cherry",
    "tree",
    "fog",
    "frost",
    "voice",
    "paper",
    "frog",
    "smoke",
    "star",
  ];
  const adjective: string =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun: string = nouns[Math.floor(Math.random() * nouns.length)];
  return adjective + noun;
};

const randomColor = (): string => {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
};

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [member, setMember] = useState<{
    username: string;
    color: string;
    id?: string;
  }>({
    username: randomName(),
    color: randomColor(),
  });
  const [drone, setDrone] = useState<any>(null);

  useEffect(() => {
    let isSubscribed = true;

    const droneInstance = new window.Scaledrone("gHMFr0wugwnulvic", {
      data: member,
    });

    droneInstance.on("open", (error: any) => {
      if (error) {
        return console.error(error);
      }
      const updatedMember = { ...member };
      updatedMember.id = droneInstance.clientId;
      setMember(updatedMember);
    });

    const room = droneInstance.subscribe("observable-room");
    const onData = (data: string, member: any) => {
      if (isSubscribed) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { member, text: data },
        ]);
      }
    };
    room.on("data", onData);

    setDrone(droneInstance);

    return () => {
      isSubscribed = false;
      room.off("data", onData);
      droneInstance.close();
    };
  }, []);

  const onSendMessage = (message: string) => {
    drone.publish({
      room: "observable-room",
      message,
    });
  };

  return (
    <div className="App">
      <div className="App__header">
        <h1>My Chat App</h1>
      </div>
      <Messages messages={messages} currentMember={member} />
      <Input onSendMessage={onSendMessage} />
    </div>
  );
};

export default App;
