import { readFileSync, writeFileSync } from "node:fs";

const source = readFileSync("/Users/vipinw/Downloads/gennex-complete.jsx", "utf8");
const app = source
  .replace('import { useState, useEffect, useRef } from "react";\n', "")
  .replace(/import \{[^]+?\} from "lucide-react";\n/, "")
  .replace(/import gennexLogo from ".\/assets\/gennex\/gennex-logo\.png";\n/, "")
  .replace(/import gennexNameBoard from ".\/assets\/gennex\/name-board\.jpg";\n/, "")
  .replace(/import gennexReception from ".\/assets\/gennex\/reception\.jpg";\n/, "")
  .replace(/import gennexReceptionWide from ".\/assets\/gennex\/reception-raw\.jpg";\n/, "")
  .replace(/import gennexInstrumentRoom from ".\/assets\/gennex\/instrument-room\.jpg";\n/, "")
  .replace(/import gennexCourseCategories from ".\/assets\/gennex\/course-categories\.png";\n/, "")
  .replace(/import gennexMascot from ".\/assets\/gennex\/gennex-mascot\.jpeg";\n/, "")
  .replace(/import gennexSummerCampPoster from ".\/assets\/gennex\/summer-camp-poster\.jpg";\n/, "")
  .replace(/import gennexCertificate from ".\/assets\/gennex\/certificate\.jpg";\n/, "")
  .replace(/import gennexDrumsStudent from ".\/assets\/gennex\/drums-student\.jpg";\n/, "")
  .replace(/import gennexExams from ".\/assets\/gennex\/exams\.jpg";\n/, "")
  .replace(/import gennexInstrumentRoomAlt from ".\/assets\/gennex\/instrument-room-2\.jpg";\n/, "")
  .replace(/import gennexReceptionTwo from ".\/assets\/gennex\/reception-2\.jpg";\n/, "")
  .replace(/import gennexStudentsOne from ".\/assets\/gennex\/students-1\.jpg";\n/, "")
  .replace(/import courseBharatanatyam from ".\/assets\/gennex\/course-bharatanatyam\.jpeg";\n/, "")
  .replace(/import courseDance from ".\/assets\/gennex\/course-dance\.jpeg";\n/, "")
  .replace(/import courseDrums from ".\/assets\/gennex\/course-drums\.jpeg";\n/, "")
  .replace(/import courseGuitar from ".\/assets\/gennex\/course-guitar\.jpeg";\n/, "")
  .replace(/import coursePiano from ".\/assets\/gennex\/course-piano\.jpeg";\n/, "")
  .replace(/import courseViolin from ".\/assets\/gennex\/course-violin\.jpeg";\n/, "")
  .replace(/import courseVocal from ".\/assets\/gennex\/course-vocal\.jpeg";\n/, "")
  .replace(/import courseYoga from ".\/assets\/gennex\/course-yoga\.jpeg";\n/, "")
  .replace(/import courseZumba from ".\/assets\/gennex\/course-zumba\.jpeg";\n/, "")
  .replace("export default function App()", "function App()");

const preview = `import React, { useState, useEffect, useRef } from "https://esm.sh/react@18.2.0";
import { createRoot } from "https://esm.sh/react-dom@18.2.0/client";
import { Send, Phone, Mail, MapPin, Star, ChevronLeft, ChevronRight, ChevronDown, Search, Instagram, Facebook, Play, Award, Users, BookOpen, GraduationCap, ClipboardCheck, ShieldCheck, Clock, Heart, PenTool, Layout, CheckCircle, ExternalLink } from "https://esm.sh/lucide-react@0.468.0?deps=react@18.2.0";
const gennexLogo = "./assets/gennex/gennex-logo.png";
const gennexNameBoard = "./assets/gennex/name-board.jpg";
const gennexReception = "./assets/gennex/reception.jpg";
const gennexReceptionWide = "./assets/gennex/reception-raw.jpg";
const gennexInstrumentRoom = "./assets/gennex/instrument-room.jpg";
const gennexCourseCategories = "./assets/gennex/course-categories.png";
const gennexMascot = "./assets/gennex/gennex-mascot.jpeg";
const gennexSummerCampPoster = "./assets/gennex/summer-camp-poster.jpg";
const gennexCertificate = "./assets/gennex/certificate.jpg";
const gennexDrumsStudent = "./assets/gennex/drums-student.jpg";
const gennexExams = "./assets/gennex/exams.jpg";
const gennexInstrumentRoomAlt = "./assets/gennex/instrument-room-2.jpg";
const gennexReceptionTwo = "./assets/gennex/reception-2.jpg";
const gennexStudentsOne = "./assets/gennex/students-1.jpg";
const courseBharatanatyam = "./assets/gennex/course-bharatanatyam.jpeg";
const courseDance = "./assets/gennex/course-dance.jpeg";
const courseDrums = "./assets/gennex/course-drums.jpeg";
const courseGuitar = "./assets/gennex/course-guitar.jpeg";
const coursePiano = "./assets/gennex/course-piano.jpeg";
const courseViolin = "./assets/gennex/course-violin.jpeg";
const courseVocal = "./assets/gennex/course-vocal.jpeg";
const courseYoga = "./assets/gennex/course-yoga.jpeg";
const courseZumba = "./assets/gennex/course-zumba.jpeg";

${app}

createRoot(document.getElementById("root")).render(<App />);
`;

writeFileSync("gennex-preview-app.jsx", preview);
