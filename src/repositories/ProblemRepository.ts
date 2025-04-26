import mongoose, { HydratedDocument, Types } from 'mongoose';

import problemDb from '@/configs/db';
import Problem, { IProblemSet } from '@/models/Problem';
import { IProblemDescription, ProblemData } from '@/types';

class ProblemRepository {
    private problemModel;

    constructor() {
        problemDb.connect();
        this.problemModel = Problem;
    }

    async createProblem(data: ProblemData): Promise<IProblemSet> {
        const existingTopic = await this.problemModel.findOne({ problemTopic: data.problemTopic });
        
        if(existingTopic) {
            existingTopic.problemDescription.push(...data.problemDescription);
            await existingTopic.save();
            return existingTopic;
        }

        const problem = await this.problemModel.create(data);
        return problem;
    }

    async getAllProblems(flag?: number): Promise<IProblemSet[]> {
        if(flag != undefined) {
            const problems = await this.problemModel.find().lean();
            return problems;
        }

        const problems = await this.problemModel.find(
            {},
            {
              'problemDescription.correctOption': 0
            }
        );
        return problems;
    }

    async getProblem(id: string): Promise<IProblemSet | null> {
        const questionId = new Types.ObjectId(id);
        const problem = await this.problemModel.findOne(
            { 'problemDescription._id': questionId },
            {
                problemDescription: {
                    $elemMatch: { _id: questionId }
                },
            }
        ).lean();

        if(problem && problem.problemDescription && problem.problemDescription[0]) {
            delete problem.problemDescription[0].correctOption;
        }
        return problem;
    }

    async migrateIdToQuestions(): Promise<IProblemSet[]> {
        console.log('calling from repo');
        const existingProblems = await this.problemModel.find();

        for(const problem of existingProblems) {
            const updatedDescription = problem.problemDescription.map((desc) => ({
                ...(desc as HydratedDocument<IProblemDescription>).toObject(),
                _id: new mongoose.Types.ObjectId()
            }));

            problem.problemDescription = updatedDescription;
            problem.markModified('problemDescription');
            await problem.save();
        }

        return existingProblems;
    }

}

export default ProblemRepository;