import { NextResponse } from 'next/server';

import problemService from '@/lib/problemServiceInstance';

export async function GET() {
    try {
        const response = await problemService.migrateIdToQuestions();
        return NextResponse.json({
            success: true,
            message: 'Successfully migrated id to all questions',
            data: response,
            error: {}
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Something went wrong',
            data: {},
            error
        });
    }
}