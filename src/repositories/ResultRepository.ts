import Result from '@/models/Result';
import { CandidateResult } from '@/types';

class ResultRepository {
    private resultModel;

    constructor() {
        this.resultModel = Result;
    }

    async createResult(candidateName: string, candidateEmail: string, candidateResult: CandidateResult) {
        const result = await this.resultModel.create({
            candidateName,
            candidateEmail,
            result: candidateResult
        });

        return result;
    }

    async getResult(candidateEmail: string) {
        const result = await this.resultModel.findOne({ candidateEmail }).lean();
        if(!result) {
            throw { message: 'No result available with this email' };
        }
        return result;
    }

}

export default ResultRepository;