'use client';

import { useParams } from "next/navigation";
import { useState,useEffect } from "react";
import { platformInterface } from "../api/[platform]/progress/route";
const Page = () => {
    const { platform } = useParams();
    const [state, setstate] = useState<platformInterface | null >(null);
    useEffect(() => {
        if(!platform) return;
        const getData=async()=>{
            const res=await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'  }/api/${platform}/progress`)
            const data=await res.json()
            console.log(data)
            setstate(data)
        }
        getData()
    }, [platform]);
    if (!state) {
        return (
            <div className="flex flex-col items-center justify-center h-screen text-center">
                <h1 className="text-3xl font-semibold text-red-500">Platform Not Found</h1>
                <p className="text-gray-600">Please provide a valid platform in the URL.</p>
            </div>
        );
    }
    const questionPercentage = () => {
        const stats = state.problems || [0, 1]; // Fallback to prevent errors
        return ((stats[0] * 100) / stats[1]).toFixed(2);
    };

    const ratingPercentage = () => {
        const stats = state;
        if (!stats) return 0;
        return (100 / (1 + Math.exp(-1 * stats.k * (stats.rating[0] - stats.mRating)))).toFixed(2);
    };

    const changeHandler=(e)=>{
        const {id:name,value}=e.target     
        setstate(prev=>{
            const arr=prev[name]
            const updatedArr=[value,arr[1]]
            return {...prev,[name]:updatedArr}
        })
       
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-5 bg-gray-50">
            <h1 className="text-4xl font-bold text-blue-600 capitalize mb-4">
                {platform} Stats
            </h1>
            <div className="w-full max-w-md space-y-4 bg-white p-6 shadow-md rounded-lg">
               
                <div>
                    <label htmlFor="q" className="block text-gray-700 font-medium mb-1">
                        No of Questions Solved:
                    </label>
                    <input
                        type="number"
                        id="problems"
                        className="w-full bg-gray-100 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={state.problems[0]}
                        onChange={changeHandler}
                    />
                </div>
                <div>
                    <label htmlFor="r" className="block text-gray-700 font-medium mb-1">
                        Rating:
                    </label>
                    <input
                        type="number"
                        id="rating"
                        className="w-full bg-gray-100 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={state.rating[0]}
                        onChange={changeHandler}
                    />
                </div>
                <div>
                    <button>
                        Calculate
                    </button>
                </div>
                <div className="mt-4">
                    <p className="text-lg font-medium text-gray-700">
                        Question Completion:{" "}
                        <span className="font-bold text-blue-500">
                            {questionPercentage()}%
                        </span>
                    </p>
                    <p className="text-lg font-medium text-gray-700">
                        Rating Efficiency:{" "}
                        <span className="font-bold text-blue-500">
                            {ratingPercentage()}%
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Page;
