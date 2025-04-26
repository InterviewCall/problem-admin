import { NextRequest, NextResponse } from 'next/server';

import problemService from '@/lib/problemServiceInstance';

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = await params;
        const response = await problemService.getProblem(id);

        // Define CORS headers
        const headers = {
            'Access-Control-Allow-Origin': '*', // Adjust the origin if necessary
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', // Allow necessary methods
            'Access-Control-Allow-Headers': 'Content-Type, Authorization', // Allow necessary headers
        };

        return NextResponse.json({
            success: true,
            message: 'Successfully fetched a problem',
            data: response,
            error: {}
        }, { 
            status: 200,
            headers
        });
    } catch (error) {
        // Define CORS headers
        const headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        };

        return NextResponse.json({
            success: false,
            message: 'Something went wrong',
            data: {},
            error
        }, { 
            status: 500,
            headers
        });
    }
}
