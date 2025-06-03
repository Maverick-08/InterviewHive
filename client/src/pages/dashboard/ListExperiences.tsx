

interface Interview{
    name:string;
    companyName:string;
    role:string;
    tags:string[];
}

const tempData:Interview[] = [
  {
    name: "Vinay Ojha",
    companyName: "Texsas Instruments",
    role: "SDE",
    tags: ["DSA", "ML", "OS"],
  },
  {
    name: "Vinay Ojha",
    companyName: "Indus Tower",
    role: "QA",
    tags: ["DSA", "DBMS", "OS"],
  },
  {
    name: "Vinay Ojha",
    companyName: "Microsoft",
    role: "SDE",
    tags: ["DSA", "HLD", "Projects"],
  },
  {
    name: "Vinay Ojha",
    companyName: "Amazon",
    role: "SDET",
    tags: ["DSA", "System Design", "CN"],
  },
  {
    name: "Vinay Ojha",
    companyName: "Browser Stack",
    role: "DevOps",
    tags: ["DevOps", "Cloud", "Linux"],
  },
  {
    name: "Vinay Ojha",
    companyName: "Browser Stack",
    role: "DevOps",
    tags: ["DevOps", "Cloud", "Linux"],
  },
  {
    name: "Vinay Ojha",
    companyName: "Browser Stack",
    role: "DevOps",
    tags: ["DevOps", "Cloud", "Linux"],
  },
];

const colors = ["bg-sky-400","bg-green-400","bg-purple-400","bg-orange-400","bg-red-400"]

const ListExperiences = () => {
  return (
    <div>
      <div className="py-1 grid grid-cols-12 text-center font-mono text-lg font-bold border-b border-neutral-400">
        <div className="col-span-2">Sr.No</div>
        <div className="col-span-3">Name</div>
        <div className="col-span-3">Company Name</div>
        <div className="col-span-2 text-left">Role</div>
        <div className="col-span-2 text-left">Tags</div>
      </div>
      <div className="pt-4 flex flex-col gap-8 text-center overflow-hidden">
        {tempData.map((data,index) => {
            return(
                <div key={index} className="grid grid-cols-12 border-b border-neutral-400 py-4">
                    <div className="col-span-2">{index+1}</div>
                    <div className="col-span-3">{data.name}</div>
                    <div className="col-span-3">{data.companyName}</div>
                    <div className="col-span-2 text-left">{data.role}</div>
                    <div className="col-span-2 flex gap-2">{data.tags.map((tag,idx) => {
                        return(
                            <span key={idx} className={`px-2 py-0.5 text-sm text-gray-200 rounded-sm ${colors[idx%colors.length]}`}>{tag}</span>
                        )
                    })}</div>
                </div>
            )
        })}
      </div>
    </div>
  );
};

export default ListExperiences;
