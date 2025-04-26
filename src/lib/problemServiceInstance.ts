import ProblemRepository from '@/repositories/ProblemRepository';
import ProblemService from '@/services/ProblemService';

const problemService = new ProblemService(new ProblemRepository());

export default problemService;