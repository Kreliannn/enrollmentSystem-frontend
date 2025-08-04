"use client"
 import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { backendUrl } from "@/app/utils/url";
import axios from "axios";

export default function Page() {



    const [summary, setSummary] = useState({
      courses: 0,
      sections: 0,
      students: 0,
      instructors: 0,
    });


    const { data } = useQuery({
        queryKey : ["adminData"],
        queryFn : () => axios.get(backendUrl("/admin"))
      })
    
      useEffect(() => { data?.data && setSummary(data.data) }, [data])
  
    return (
      <div className="w-full h-full">
        {/* Header */}
        <div className="w-full h-32 bg-white shadow-sm border-b flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage your system overview below</p>
          </div>
        </div>
  
        {/* Stats Section */}
        <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <h2 className="text-sm text-gray-500">Available Courses</h2>
            <p className="text-3xl font-bold text-blue-600">{summary.courses}</p>
          </div>
  
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <h2 className="text-sm text-gray-500">Sections</h2>
            <p className="text-3xl font-bold text-green-600">{summary.sections}</p>
          </div>
  
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <h2 className="text-sm text-gray-500">Students</h2>
            <p className="text-3xl font-bold text-purple-600">{summary.students}</p>
          </div>
  
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <h2 className="text-sm text-gray-500">Instructors</h2>
            <p className="text-3xl font-bold text-pink-600">{summary.instructors}</p>
          </div>
        </div>
      </div>
    )
  }
  