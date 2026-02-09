import { Document, Model, model, models, Schema } from 'mongoose';

import { CodeStub } from '@/types';

export interface IProblemDescription {
    questionNumber: number
    problemTitle: string
    problemStatement: string
    codeStubs: CodeStub[] | null
    options: string[]
    correctOption?: string
    marks: number
}

export interface IProblemSet extends Document {
    problemTopic: string
    problemDescription: IProblemDescription[]
    problemLevel: string
}

const codeStubSchema = new Schema<CodeStub>({
    label: {
        type: String,
        required: true
    },

    language: {
        type: String,
        required: true
    },

    code: {
        type: String,
        required: true
    },
}, { _id: false });

const problemDescriptionSchema = new Schema<IProblemDescription>({
    questionNumber: {
        type: Number,
        required: true
    },
    problemTitle: {
        type: String,
        required: true
    },

    problemStatement: {
        type: String,
        required: true
    },

    codeStubs: {
        type: [codeStubSchema],
        default: null
    },

    options: {
        type: [String],
        required: true
    },

    correctOption: {
        type: String,
        required: true
    },

    marks: {
        type: Number,
        required: true
    }
});

const problemSchema = new Schema<IProblemSet>({
    problemTopic: {
        type: String,
        required: true
    },

    problemDescription: {
        type: [problemDescriptionSchema],
        default: []
    },

    problemLevel: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Problem: Model<IProblemSet> = models.Problem || model<IProblemSet>('Problem', problemSchema);

export default Problem;