'use client';

import { useRouter } from 'next/navigation';
import { FC, useContext, useEffect } from 'react';

import QuestionFields from '@/components/QuestionFields/QuestionFields';
import { UserContext } from '@/contexts/UserContext';

const MainPage: FC = () => {
    const { userDetails } = useContext(UserContext);
    const router = useRouter();

    useEffect(() => {
        if(!userDetails) router.replace('/login');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userDetails]);
    return (
        <div className='bg-white h-screen flex flex-col items-center overflow-y-scroll'>
            <h1 className="text-4xl font-bold text-blue-600 mb-6">
                Create a new problem
            </h1>
            <QuestionFields />
        </div>
    );
};

export default MainPage;