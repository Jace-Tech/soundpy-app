import {
  GB,
  KB,
  MAX_AUDIO_SIZE,
  MAX_VIDEO_SIZE,
  MB,
  MIN_AUDIO_SIZE,
} from "./constant";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const getSubName = (name: string) => {
  if (!name) return;
  // Check if username
  if (name.startsWith("@")) name = name.slice(1);

  const words = name.split(" ");
  if (words.length < 2) return name.toUpperCase().slice(0, 2);
  return words.map((word) => word.toUpperCase()[0]).join("");
};

export const getSlug = (name: string) => {
  const words = name.split(" ").map((word) => word.toLowerCase());
  if (words.length < 2) return name;
  return words.join("-");
};

export const getFileUrl = async (file: File | Blob) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  return await new Promise((resolve) => {
    reader.onloadend = () => {
      resolve(reader.result);
    };
  });
};

export const isObjectMatching = (obj1: any, obj2: any) => {
  const commonProps = {};
  for (const key in obj2) {
    if (key in obj1) {
      Object.defineProperty(commonProps, key, { value: obj1[key] });
    }
  }

  console.log({ commonProps });
};

export const getMappedValue = (
  value: number,
  base: number,
  mapper = 100
): number => {
  return Math.floor((mapper * value) / base);
};

export const convertNumber = (value: number): [number, string] => {
  const baseValueMap = {
    b: 1,
    kb: KB,
    mb: MB,
    gb: GB,
  };

  let base: "b" | "kb" | "gb" | "mb" = "b";
  if (value >= GB) {
    base = "gb";
  }

  if (value >= MB && value < GB) {
    base = "mb";
  }

  if (value >= KB && value < MB) {
    base = "kb";
  }
  const size = base === "b" ? "byte" : base;

  return [Math.floor(value / baseValueMap[base]), size];
};

export const handleFileUploadError = (file: File, contentType?: string) => {
  const type = file.type.split("/")[0];

  // CHECK IF SIZE IS WITHIN AUDIO SIZE RANGE
  if (type === "audio" && file?.size > MAX_AUDIO_SIZE) {
    return {
      error: "Max file size exceeded",
      message: `Max size for audio file is ${MAX_AUDIO_SIZE / MB}mb`,
    };
  }

  // CHECK IF IS A VALID AUDIO FILE
  if (type === "audio" && file?.size < MIN_AUDIO_SIZE) {
    const name = contentType ?? "audio";
    return { error: "Upload failed", message: `Please upload a valid ${name}` };
  }

  // CHECK IF SIZE IS WITHIN music-video SIZE RANGE
  if (type === "video" && file?.size > MAX_VIDEO_SIZE) {
    return {
      error: "Max file size exceeded",
      message: `Max size for music-video file is ${MAX_VIDEO_SIZE / MB}mb`,
    };
  }

  // CHECK IF IS A VALID VIDEO FILE
  if (type === "video" && file?.size < MIN_AUDIO_SIZE) {
    const name = "music-video";
    return { error: "Upload failed", message: `Please upload a valid ${name}` };
  }
};

export const getDuration = (secs: number) => {
  if(!secs) return [0, 0]
  secs = Math.round(secs)
  const minutes = Math.floor(secs / 60) || 0;
  const seconds = secs - (minutes * 60) || 0;
  return [minutes, seconds]
}

export const convertDurationToSeconds = (duration: number): number => {
  if(!duration) return 0 
  let [minutes, seconds] = (""+duration).split('.').map(n => +n)
  minutes = minutes * 60 
  seconds =  minutes + seconds
  return seconds
}

export const isEmpty = (value: any) => {
  if (!value) return true;
  if (Array.isArray(value) && value.length === 0) return true;
  if (typeof value === "object" && Object.keys(value).length === 0) return true;
  return false;
};

export const formatTime = (secs: number) => {
  const [minutes, seconds] = getDuration(secs) as number[]
  return minutes + ":" + ("" + seconds).padStart(2, "0");
};

export const formatNumber = (num: number) => {
  if (num < 1000) {
    return num.toString();
  } else if (num < 1000000) {
    return (num / 1000).toFixed(1) + 'k';
  } else if (num < 1000000000) {
    return (num / 1000000).toFixed(1) + 'm';
  } else {
    return (num / 1000000000).toFixed(1) + 'b';
  }
}