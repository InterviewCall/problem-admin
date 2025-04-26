import { Document, Model, model, models, Schema } from 'mongoose';

import { CandidateResult, QuestionBreakdown, SectionBreakdown } from '@/types';

export interface IResult extends Document {
    candidateEmail: string
    candidateName: string
    result: CandidateResult
}

const questionBreakdownSchema = new Schema<QuestionBreakdown>({
    questionNumber: {
        type: Number,
        required: true
    },

    questionTitle: {
        type: String,
        required: true
    },

    isCorrect: {
        type: Boolean,
        required: true
    },

    userAnswer: {
        type: String,
        default: null
    },

    correctOption: {
        type: String,
        required: true
    },

    marksAwarded: {
        type: Number,
        required: true
    },

    marksTotal: {
        type: Number,
        required: true
    }
}, { _id: false });

const sectionBreakDownSchema = new Schema<SectionBreakdown>({
    section: {
        type: String,
        required: true
    },

    totalMarks: {
        type: Number,
        required: true
    },

    obtainedMarks: {
        type: Number,
        required: true
    },

    questions: {
        type: [questionBreakdownSchema],
        required: true
    }
}, { _id: false });

const finalScoreReposrtSchema = new Schema<CandidateResult>({
    totalMarks: {
        type: Number,
        required: true
    },

    obtainedMarks: {
        type: Number,
        required: true
    },

    percentage: {
        type: Number,
        required: true
    },

    takenOn: {
        type: String,
        required: true
    },

    timeTaken: {
        type: String,
        required: true
    },

    invitedBy: {
        type: String,
        required: true
    },

    invitedOn: {
        type: String,
        required: true
    },

    workExperience: {
        type: String,
        required: true
    },

    sections: {
        type: [sectionBreakDownSchema],
        required: true
    }
}, { _id: false });

const resultSchema = new Schema<IResult>({
    candidateEmail: {
        type: String,
        required: true,
        index: true
    },

    candidateName: {
        type: String,
        required: true
    },

    result: {
        type: finalScoreReposrtSchema,
        required: true
    }
});

const Result: Model<IResult> = models.Result || model<IResult>('Result', resultSchema);

export default Result;