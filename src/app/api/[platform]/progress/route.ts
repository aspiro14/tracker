import { NextRequest, NextResponse } from "next/server";
export interface platformInterface {
    rating:number[],
    problems:number[],
    mRating:number,
    k:number
}

const data = {
    codeforces: {
        rating: [1249, 1600],
        problems: [150, 400],
        mRating: 1425,
        k: 0.015,
    },
    leetcode: {
        rating: [1765, 2200],
        problems: [350, 600],
        mRating: 1980,
        k: 0.01,
    },
};
export function GET(request:NextRequest): NextResponse {
    const url=request.nextUrl.pathname.split('/')
    const prop=url[url.length-2]
   // console.log(data[prop])
    return NextResponse.json(data[prop])
}