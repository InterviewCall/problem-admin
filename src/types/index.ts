import { Document } from 'mongoose';

export interface CodeStub {
    label: string
    language: string
    code: string
}

export interface IProblemDescription {
    questionNumber: number
    problemTitle: string
    problemStatement: string
    codeStubs: CodeStub[] | null
    options: string[]
    correctOption: string
    marks: number
}

export interface IProblemSet extends Document {
    problemTopic: string
    problemDescription: IProblemDescription[]
}

export interface ProblemData {
    problemTopic: string
    problemDescription: IProblemDescription[]
    problemLevel: string
}

// export interface IProblemDescriptionWithOptionalCorrectOption extends IProblemDescription {
//     correctOption?: string; // Mark as optional for the deletion operation
// }

export type UserAnswer = Record<number, string>

export interface QuestionBreakdown {
    questionNumber: number
    questionTitle: string
    isCorrect: boolean
    correctOption: string
    userAnswer: string | null
    marksAwarded: number
    marksTotal: number
}

export interface SectionBreakdown {
    section: string
    totalMarks: number 
    obtainedMarks: number
    questions: QuestionBreakdown[]
}

export interface FinalScoreReport {
    totalMarks: number
    obtainedMarks: number
    percentage: number
    sections: SectionBreakdown[]
}

export interface CandidateResult extends FinalScoreReport {
    takenOn: string
    timeTaken: string
    invitedBy: string
    invitedOn: string
    workExperience: string
}

export interface ScoreData {
    candidateName: string
    candidateEmail: string
    invitedBy: string
    workExperience: string
    timeTaken: string
    takenOn: string
    invitedOn: string
}

export interface ErrorResponse {
    success: false
    message: string
    data: unknown
    error: unknown 
}

export type Lang = 'javascript' | 'python' | 'java' | 'cpp';

export interface User {
    _id: string
    userEmail: string
    userType: string
}

export interface UserResponse {
    data: User
}