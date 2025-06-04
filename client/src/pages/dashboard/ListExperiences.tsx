import { FaBookmark } from "react-icons/fa6";

interface Interview {
  name: string;
  companyName: string;
  batch: string;
  numberOfRounds: number;
  ctcOffered: number;
  role: string;
  tags: string[];
}

const tempData: Interview[] = [
  {
    name: "Vinay Ojha",
    companyName: "Texsas Instruments",
    batch: "MCA-2026",
    numberOfRounds: 3,
    ctcOffered: 12,
    role: "SDE",
    tags: ["DSA", "ML", "OS"],
  },
  {
    name: "Vinay Ojha",
    companyName: "Texsas Instruments",
    batch: "MCA-2026",
    numberOfRounds: 3,
    ctcOffered: 12,
    role: "SDE",
    tags: ["DSA", "ML", "OS"],
  },
  {
    name: "Vinay Ojha",
    companyName: "Texsas Instruments",
    batch: "MCA-2026",
    numberOfRounds: 3,
    ctcOffered: 12,
    role: "SDE",
    tags: ["DSA", "ML", "OS"],
  },
  {
    name: "Vinay Ojha",
    companyName: "Texsas Instruments",
    batch: "MCA-2026",
    numberOfRounds: 3,
    ctcOffered: 12,
    role: "SDE",
    tags: ["DSA", "ML", "OS"],
  },
  {
    name: "Vinay Ojha",
    companyName: "Indus Tower",
    batch: "MCA-2026",
    numberOfRounds: 3,
    ctcOffered: 12,
    role: "QA",
    tags: ["DSA", "DBMS", "OS"],
  },
  {
    name: "Vinay Ojha",
    companyName: "Microsoft",
    batch: "MCA-2026",
    numberOfRounds: 3,
    ctcOffered: 12,
    role: "SDE",
    tags: ["DSA", "HLD", "Projects"],
  },
  {
    name: "Vinay Ojha",
    companyName: "Amazon",
    batch: "MCA-2026",
    numberOfRounds: 3,
    ctcOffered: 12,
    role: "SDET",
    tags: ["DSA", "System Design", "CN"],
  },
  {
    name: "Vinay Ojha",
    companyName: "Browser Stack",
    batch: "MCA-2026",
    numberOfRounds: 3,
    ctcOffered: 12,
    role: "DevOps",
    tags: ["DevOps", "Cloud", "Linux"],
  },
  {
    name: "Vinay Ojha",
    companyName: "Browser Stack",
    batch: "MCA-2026",
    numberOfRounds: 3,
    ctcOffered: 12,
    role: "DevOps",
    tags: ["DevOps", "Cloud", "Linux"],
  },
  {
    name: "Vinay Ojha",
    companyName: "Browser Stack",
    batch: "MCA-2026",
    numberOfRounds: 3,
    ctcOffered: 12,
    role: "DevOps",
    tags: ["DevOps", "Cloud", "Linux"],
  },
];

const ListExperiences = () => {
  return (
    <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 select-none">
      {tempData.map((data, index) => {
        return (
          <div
            key={index}
            className="px-4 py-2 flex flex-col bg-slate-800/90 rounded-md cursor-pointer"
          >
            {/* Company Name and save icon  */}
            <div className="pb-1 flex justify-between items-center border-b border-neutral-500/90">
              <span className="text-3xl font-mono font-semibold ">
                {data.companyName}
              </span>
              <span
                className={`${
                  index % 4 == 0 ? "text-yellow-500" : "text-slate-500"
                }`}
              >
                <FaBookmark className="h-6 w-6" />
              </span>
            </div>

            {/* Candidate name and batch  */}
            <div className="pt-2 flex gap-2">
              <div>
                <span className="font-mono font-semibold text-lg text-slate-400">
                  Candidate :{" "}
                </span>
                <span className="font-mono text-lg">{data.name}</span>
              </div>
              <span className="text-xs px-2 bg-teal-200 text-black rounded-sm flex justify-center items-center font-mono">
                {data.batch}
              </span>
            </div>

            {/* Offer Details  */}
            <div className="flex flex-col border-b border-neutral-500/90 pb-1">
              <div className="flex gap-2">
                <span className="font-mono font-semibold text-lg text-slate-400">Role : </span>
                <span className="font-mono text-lg">{data.role}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-mono font-semibold text-lg text-slate-400">
                  Number of Rounds :{" "}
                </span>
                <span className="font-mono text-lg">{data.numberOfRounds}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-mono font-semibold text-lg text-slate-400">
                  CTC Offered :{" "}
                </span>
                <span className="font-mono text-lg">{data.ctcOffered}</span>
              </div>
            </div>

            {/* Tags  */}
            <div className="pt-2 h-full flex items-center gap-4">
              {data.tags.map((tag, idx) => {
                return <span key={idx} className="bg-slate-700 text-slate-200 px-2 rounded-sm">{tag}</span>;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ListExperiences;
