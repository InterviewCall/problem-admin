'use client';

import 'katex/dist/katex.min.css';

import MDEditor from '@uiw/react-md-editor';
import axios from 'axios';
import { FC, FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import remarkMath from 'remark-math';

import { stubs } from '@/constants';
import { CodeStub } from '@/types';

import CodeEditor from '../CodeEditor/CodeEditor';
import Loader from '../Loader/Loader';

export const PROBLEM_LEVEL = [
    { label: 'Intermediate', value: 'Intermediate' },
    { label: 'Advanced', value: 'Advanced' },
];


const QuestionFields: FC = () => {
  const [showStubs, setShowStubs] = useState(false);
  const [options, setOptions] = useState<string[]>(['', '', '', '']);
  const [codeStubs, setCodeStubs] = useState<CodeStub[]>(stubs);
  const [topic, setTopic] = useState('');
  const [title, setTitle] = useState('');
  const [questionNumber, setQuestionNumber] = useState('');
  const [problemLevel, setProblemLevel] = useState('');
  const [statement, setStatement] = useState<string | undefined>('');
  const [correctOption, setCorrectOption] = useState('');
  const [marks, setMarks] = useState('');
  const [loading, setLoading] = useState(false);

  function handleOptions(index: number, value: string) {
    const updatedOption = [...options];
    updatedOption[index] = value;
    setOptions(updatedOption);
  }

  function handleCodeChange(index: number, code: string) {
    const updatedStubs = [...codeStubs];
    updatedStubs[index].code = code;
    setCodeStubs(updatedStubs);
  }

  function clear() {
    setTopic('');
    setTitle('');
    setStatement('');
    setCorrectOption('');
    setMarks('');
    setShowStubs(false);
    setOptions(['', '', '', '']);
    setCodeStubs(stubs);
    setQuestionNumber('');
    setProblemLevel('');
  }

  async function createProblem(e: FormEvent) {
    e.preventDefault();
    try {
        setLoading(true);
        await axios.post('/api/create-problem', {
            problemTopic: topic,
            problemDescription: [{
                problemTitle: title,
                problemStatement: statement,
                codeStubs: showStubs ? codeStubs : null,
                options,
                correctOption,
                marks: Number(marks),
                questionNumber: Number(questionNumber),
            }],
            problemLevel
        });
        setLoading(false);
        toast.success('Successfully created a problem');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const message = error.response.data.message;
        toast.error(message);
        setLoading(false);
    } finally {
        clear();
    }
  }

  return (
    <fieldset className='fieldset w-3/4 bg-[#f3f6f7] text-[#3d434b] border border-base-300 p-4 rounded-box mb-10'>
        {loading && <Loader />}
      <legend className='fieldset-legend text-[#3d434b] text-3xl'>
        Problem Details
      </legend>

      <form onSubmit={createProblem}>
        <label className='fieldset-label text-[#3d434b] text-xl'>Question Number</label>
        <input
          type='text'
          className='input bg-white w-full focus:border-blue-500'
          placeholder='Enter Question Number'
          value={questionNumber}
          onChange={(e) => setQuestionNumber(e.target.value)}
        />

        <label className='fieldset-label text-[#3d434b] text-xl'>
          Problem Level
        </label>

        <select
          className='input bg-white w-full focus:border-blue-500 cursor-pointer'
          value={problemLevel}
          onChange={(e) => setProblemLevel(e.target.value)}
        >
          <option value='' disabled className='text-gray-400'>
            Select Problem Level
          </option>

          {PROBLEM_LEVEL.map((level) => (
            <option key={level.value} value={level.value}>
              {level.label}
            </option>
          ))}
        </select>


        <label className='fieldset-label text-[#3d434b] text-xl'>Topic</label>
        <input
          type='text'
          className='input bg-white w-full focus:border-blue-500'
          placeholder='Enter Topic'
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />

        <label className='fieldset-label text-[#3d434b] text-xl'>Title</label>
        <input
          type='text'
          className='input bg-white w-full focus:border-blue-500'
          placeholder='Enter Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className='fieldset-label text-[#3d434b] text-xl'>Problem</label>
        {/* <input
          type='text'
          className='input bg-white w-full focus:border-blue-500'
          placeholder='Enter Problem Statement'
          value={statement}
          onChange={(e) => setStatement(e.target.value)}
        /> */}

        <div data-color-mode="light">
          <MDEditor 
          value={statement}
          onChange={setStatement}
          height={600}
          overflow
          previewOptions={{
            rehypePlugins: [rehypeRaw, rehypeKatex],
            remarkPlugins: [remarkMath]
          }}
        />
        </div>

        <div className='flex gap-x-3 mt-5'>
          <input
            type='checkbox'
            checked={showStubs}
            onChange={(e) => setShowStubs(e.target.checked)}
            className='checkbox checkbox-lg checkbox-accent'
          />
          <label className='fieldset-label text-[#3d434b] text-xl'>
            Do You Want Code Stubs
          </label>
        </div>

        {showStubs &&
          codeStubs.map((stub, index) => (
            <CodeEditor
              key={stub.label}
              languageLabel={stub.label}
              languageValue={stub.language}
              onCodeChange={(code) => handleCodeChange(index, code)}
            />
          ))}

        <label className='fieldset-label text-[#3d434b] text-xl mt-3'>
          Options
        </label>
        <div className='w-full flex gap-x-3'>
          {options.map((option, index) => (
            <input
              key={index}
              type='text'
              className='input bg-white focus:border-blue-500 w-[25%]'
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={(e) => handleOptions(index, e.target.value)}
            />
          ))}
        </div>

        <label className='fieldset-label text-[#3d434b] text-xl'>
          Correct Option
        </label>
        <input
          type='text'
          className='input bg-white w-full focus:border-blue-500'
          placeholder='Enter Correct Option'
          value={correctOption}
          onChange={(e) => setCorrectOption(e.target.value)}
        />

        <label className='fieldset-label text-[#3d434b] text-xl'>Marks</label>
        <input
          type='text'
          className='input bg-white w-full focus:border-blue-500'
          placeholder='Enter Marks'
          value={marks}
          onChange={(e) => setMarks(e.target.value)}
        />

        <button className='btn btn-success w-full mt-6' type='submit'>Create Problem</button>
      </form>
    </fieldset>
  );
};

export default QuestionFields;
