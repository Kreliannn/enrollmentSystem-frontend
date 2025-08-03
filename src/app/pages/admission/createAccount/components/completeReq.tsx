"use client"
import { Button } from "@/components/ui/button"
import { getStudentInterface } from "@/app/types/student.type"
import { Printer, CheckCircle } from "lucide-react"

export function CompleteReqForm( {student, setStudent} : {student : getStudentInterface, setStudent : (student : getStudentInterface | null) => void}) {

  const printForm = () => {
    setStudent(null)
    window.print()
  }



  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full print:shadow-none print:rounded-none print:max-w-none">
        {/* Print-friendly form content */}
        <div className="p-8 print:p-12" id="admission-form">
          {/* Header */}
          <div className="text-center border-b-2 border-gray-300 pb-6 mb-8">
            <h1 className="text-xl font-bold text-gray-800 mb-2">NCST</h1>
          </div>

          {/* Document Title */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <h2 className="text-lg font-bold text-gray-800">ADMISSION CONFIRMATION</h2>
            </div>
            <p className="text-sm text-gray-600">Certificate of Requirements Completion</p>
          </div>



          {/* Student Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Full Name</label>
                <p className="text-lg font-semibold text-gray-800">{student.name}</p>
              </div>
              
              <div className="border-b border-gray-200 pb-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Student ID</label>
                <p className="text-lg font-semibold text-gray-800">{student.studentId}</p>
              </div>
              
              <div className="border-b border-gray-200 pb-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Gender</label>
                <p className="text-lg text-gray-800">{student.gender}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Course/Program</label>
                <p className="text-lg font-semibold text-gray-800">{student.course}</p>
              </div>
              
              <div className="border-b border-gray-200 pb-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Level</label>
                <p className="text-lg text-gray-800">{student.level}</p>
              </div>
              
              <div className="border-b border-gray-200 pb-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Semester</label>
                <p className="text-lg text-gray-800">{student.sem}</p>
              </div>
            </div>
          </div>

       
          {/* Footer Information */}
          <div className="border-t-2 border-gray-300 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <p className="text-xs text-gray-500 mb-1">Date of Confirmation</p>
                <p className="font-semibold text-gray-800">{currentDate}</p>
              </div>
              
              <div>
                <p className="text-xs text-gray-500 mb-1">Next Step</p>
                <p className="font-semibold text-gray-800">Proceed to Enrollment</p>
              </div>
              
              <div>
                <p className="text-xs text-gray-500 mb-1">Valid Until</p>
                <p className="font-semibold text-gray-800">End of Registration Period</p>
              </div>
            </div>
          </div>

    
        

    
        </div>

        {/* Action Buttons - Hidden when printing */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 print:hidden">
          <Button onClick={printForm} className="flex items-center gap-2">
            <Printer className="w-4 h-4" />
            Print Form
          </Button>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          body {
            margin: 0;
            padding: 0;
            font-size: 12pt;
            line-height: 1.4;
          }
          
          .print\\:hidden {
            display: none !important;
          }
          
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          
          .print\\:rounded-none {
            border-radius: 0 !important;
          }
          
          .print\\:max-w-none {
            max-width: none !important;
          }
          
          .print\\:p-12 {
            padding: 3rem !important;
          }
          
          .print\\:bg-white {
            background-color: white !important;
          }
          
          .print\\:bg-gray-50 {
            background-color: #f9fafb !important;
          }
          
          .print\\:border {
            border: 1px solid #d1d5db !important;
          }
          
          .print\\:mt-16 {
            margin-top: 4rem !important;
          }
        }
      `}</style>
    </div>
  )
}