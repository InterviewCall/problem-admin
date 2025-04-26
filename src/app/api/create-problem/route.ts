import { NextRequest, NextResponse } from 'next/server';

import problemService from '@/lib/problemServiceInstance';

export async function POST(req: NextRequest) {
    try {
        const { problemTopic, problemDescription } = await req.json();
        const response = await problemService.createProblem({
            problemTopic,
            problemDescription
        });

        return NextResponse.json({
            success: true,
            message: 'Successfully created a problem',
            data: response,
            error: {}
        }, { status: 201 });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Something went wrong',
            data: {},
            error
        }, { status: 500 });
    }
}