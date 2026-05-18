export interface Track {
  id: string;
  title: string;
  artist: string;
  src: string;
  duration: string;
}

export const TRACKS: Track[] = [
  {
    id: "midnight-protocol",
    title: "midnight.protocol",
    artist: "kut.os/audio",
    src: "/music/midnight-protocol.mp3",
    duration: "3:24",
  },
  {
    id: "terminal-drift",
    title: "terminal.drift",
    artist: "kut.os/audio",
    src: "/music/terminal-drift.mp3",
    duration: "2:58",
  },
  {
    id: "synthwave-debug",
    title: "synthwave.debug",
    artist: "kut.os/audio",
    src: "/music/synthwave-debug.mp3",
    duration: "3:41",
  },
  {
    id: "lofi-0x00",
    title: "lofi.0x00",
    artist: "kut.os/audio",
    src: "/music/lofi-0x00.mp3",
    duration: "4:02",
  },
];
