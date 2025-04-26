import ProblemRepository from '@/repositories/ProblemRepository';
import { FinalScoreReport, ProblemData, SectionBreakdown, UserAnswer } from '@/types';

class ProblemService {
    private problemRepository;

    constructor(problemRepository: ProblemRepository) {
        this.problemRepository = problemRepository;
    }

    async createProblem(data: ProblemData) {
        try {
            const problem = await this.problemRepository.createProblem(data);
            return problem;
        } catch (error) {
            throw error;
        }
    }

    async getAllProblems(flag?: number) {
        try {
            const problems = await this.problemRepository.getAllProblems(flag);
            return problems;
        } catch (error) {
            throw error;
        }
    }

    async getProblem(id: string) {
        try {
            const problem = await this.problemRepository.getProblem(id);
            return problem;
        } catch (error) {
            throw error;
        }
    }

    async migrateIdToQuestions() {
        try {
            console.log('calling from service');
            const problem = await this.problemRepository.migrateIdToQuestions();
            return problem;
        } catch (error) {
            throw error;
        }
    }

    async calculateScore(userAnswers: UserAnswer) {
        try {
            const allProblems = await this.getAllProblems(1);

            const topicMap = new Map<string, SectionBreakdown>();
            let totalMarks = 0;
            let obtainedMarks = 0;

            for(const problemSet of allProblems) {
                const topic = problemSet.problemTopic;

                for(const question of problemSet.problemDescription) {
                    const userAnswer = question.questionNumber in userAnswers ? userAnswers[question.questionNumber] : null;
                    const isCorrect = userAnswer != null && userAnswer == question.correctOption;
                    const marksAwarded = isCorrect ? question.marks : 0;

                    totalMarks += question.marks;
                    obtainedMarks += marksAwarded;

                    if(!topicMap.has(topic)) {
                        topicMap.set(topic, {
                            section: topic,
                            totalMarks: 0,
                            obtainedMarks: 0,
                            questions: []
                        });
                    }

                    const section = topicMap.get(topic)!;
                    section.totalMarks += question.marks;
                    section.obtainedMarks += marksAwarded;
                    section.questions.push({
                        questionNumber: question.questionNumber,
                        questionTitle: question.problemTitle,
                        isCorrect,
                        correctOption: question.correctOption!,
                        userAnswer,
                        marksAwarded,
                        marksTotal: question.marks
                    });
                }
            }

            const sections = Array.from(topicMap.values());

            const result: FinalScoreReport = {
                totalMarks,
                obtainedMarks,
                percentage: totalMarks > 0 ? Math.round((obtainedMarks / totalMarks) * 100) : 0,
                sections,
            };

            return result;
        } catch (error) {
            throw error;
        }
    }

}

export default ProblemService;