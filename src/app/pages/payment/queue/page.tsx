"use client"

import { Button } from "@/components/ui/button"
import { Trash2, CheckCircle } from "lucide-react"

const queue = [
  { number: 1, studentId: "2025-1000" },
  { number: 2, studentId: "2025-1001" },
  { number: 3, studentId: "2025-1002" },
  { number: 1, studentId: "2025-1000" },
  { number: 2, studentId: "2025-1001" },
  { number: 3, studentId: "2025-1002" },
  { number: 1, studentId: "2025-1000" },
  { number: 2, studentId: "2025-1001" },
  { number: 3, studentId: "2025-1002" },
  { number: 1, studentId: "2025-1000" },
  { number: 2, studentId: "2025-1001" },
  { number: 3, studentId: "2025-1002" },
]

export default function Page() {
  const current = queue[0]

  return (
    <div className="w-full h-full">
      {/* Header */}
      <div className="w-full h-32 bg-white shadow-sm border-b flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Queue</h1>
          <p className="text-gray-600">Payment processing line</p>
        </div>
      </div>

      {/* Main Queue Section */}
      {queue.length != 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            {/* Current Queue */}
            <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col justify-between h-[550px]">
                {/* Header */}
                <div className="mb-4">
                    <h3 className="text-4xl font-semibold text-gray-800 text-center">Current Queue</h3>
                </div>

                {/* Number + Student */}
                <div className="text-center">
                    <h2 className="text-8xl font-bold text-blue-600" style={{fontSize : "150px"}}>{current.number}</h2>
                    <p className="mt-4 text-gray-500 text-xl">{current.studentId}</p>
                </div>

                {/* Buttons */}
                <div className="flex justify-center gap-4 mt-6">
                    <Button className="bg-green-600 hover:bg-green-700 text-white text-lg px-6 py-4">
                    <CheckCircle className="mr-2 h-6 w-6" />
                    Completed
                    </Button>
                    <Button variant="destructive" className="text-lg px-6 py-4">
                    <Trash2 className="mr-2 h-6 w-6" />
                    Void
                    </Button>
                </div>
                </div>

            {/* Queue List */}
            <div className="bg-white shadow-lg rounded-2xl p-6 h-[550px] overflow-auto">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Waiting Queue</h3>
            <div className="space-y-4">
                {queue.slice(1).map((item) => (
                <div
                    key={item.number}
                    className="flex justify-between items-center border rounded-xl px-4 py-3 shadow-lg"
                >
                    <p className="text-lg font-bold text-blue-700">#{item.number}</p>
                    <p className="text-sm text-gray-600">{item.studentId}</p>
               
                </div>
                ))}
                {queue.length <= 1 && (
                <p className="text-gray-500 text-sm">No more students in queue.</p>
                )}
            </div>
            </div>
        </div>
      )}
     
    </div>
  )
}
