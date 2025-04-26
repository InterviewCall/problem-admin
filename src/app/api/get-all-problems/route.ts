import { NextResponse } from 'next/server';

import problemService from '@/lib/problemServiceInstance';

export async function GET() {
  try {
    const response = await problemService.getAllProblems();
    
    return new NextResponse(JSON.stringify({
      success: true,
      message: 'Successfully got all problems',
      data: response,
      error: {}
    }), {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // or a specific origin
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      }
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({
      success: false,
      message: 'Something went wrong',
      data: {},
      error
    }), {
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      }
    });
  }
}
