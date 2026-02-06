import { NextRequest, NextResponse } from 'next/server';

import problemService from '@/lib/problemServiceInstance';

export async function OPTIONS() {
    return NextResponse.json({}, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // or specific domain
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
}

export async function POST(req: NextRequest) {
  try {
    const { userAnswers, problemLevel } = await req.json();
    const response = await problemService.calculateScore({problemLevel, userAnswers});

    return new NextResponse(
      JSON.stringify({
        success: true,
        message: 'Successfully fetched score',
        data: response,
        error: {}
      }),
      {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*', // Adjust as needed
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: 'Something went wrong',
        data: {},
        error
      }),
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Content-Type': 'application/json'
        }
      }
    );
  }
}