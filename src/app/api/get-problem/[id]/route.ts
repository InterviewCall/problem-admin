import { NextRequest, NextResponse } from 'next/server';

import problemService from '@/lib/problemServiceInstance';

// Define CORS headers once
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const response = await problemService.getProblem(id);

    return NextResponse.json(
      {
        success: true,
        message: 'Successfully fetched a problem',
        data: response,
        error: {},
      },
      {
        status: 200,
        headers: corsHeaders,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Something went wrong',
        data: {},
        error,
      },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}
