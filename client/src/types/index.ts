export interface Question{
    id:string;
    title:string;
    description?:string;
    link?:string;
}

export interface Round{
    id:string;
    roundType:string;
    note?:string;
    questions:Question[];
}

export interface User{
    username:string;
    userId:string;
    courseId:string;
    yearOfPassingOut:number;
}

export interface Interview {
    id:string;
    authorId:string;
    companyName:string;
    yearOfInterview:number;
    role:string;
    CTCOffered?:number;
    user: User;
    interviewStatus:string;
    tags:Tag[];
    interviewRounds:Round[]
}

export interface Tag{
    id:string;
    tagName:string;
    tagInitials:string
}

export interface DeleteRound{
    roundId: string,
  roundIds: string[],
  setRoundIds: React.Dispatch<React.SetStateAction<string[]>>
}

export interface AddRound{
    roundIds: string[],
    setRoundIds: React.Dispatch<React.SetStateAction<string[]>>
}

export interface AddRoundQuestion{
    questionIds: string[],
    setQuestionIds: React.Dispatch<React.SetStateAction<string[]>>
}

export interface DeleteRoundQuestion{
    questionId: string,
    questionIds: string[],
    setQuestionIds: React.Dispatch<React.SetStateAction<string[]>>
}

export interface API{
    success:boolean;
    errMsg?:string;
    msg?:string;
}

export interface FetchInterviews extends API{
    data?:Interview[];
    totalCount?:number
}
export interface FetchUserInterviews extends API {
    data?:Interview[];
    showEditOptions?:boolean;
}

export interface FetchInterviewTags extends API {
    data?:{tagId:string;tagName:string}[]
}

export interface AxiosReturnType {
  success: boolean;
  isAuthenticated: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  errMsg?: string;
}