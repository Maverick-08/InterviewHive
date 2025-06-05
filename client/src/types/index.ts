export interface Question{
    title:string;
    description?:string;
    link?:string;
}

export interface InterviewTags{
    topic:string;
}

export interface Round{
    roundName:string;
    roundType:string;
    note?:string;
    questions:Question[];
}

export interface Interview {
  candidate: string;
  companyName: string;
  batch: string;
  yearOfPassingOut: number;
  numberOfRounds: number;
  ctcOffered: number;
  role: string;
  tags: string[];
  allRounds: Round[];
}