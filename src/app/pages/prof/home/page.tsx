"use client"
import { useProfStore } from "@/app/store/profStore"
import { Mail, Phone, BookUser, User } from "lucide-react"

export default function Page() {
  const { prof } = useProfStore()

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-white p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-stone-900 mb-6">👨‍🏫 Instructor Dashboard</h1>

        <div className="grid gap-6">
          <div className="flex items-center gap-4 p-5 bg-stone-50 rounded-xl shadow-sm">
            <User className="text-stone-600" />
            <div>
              <h2 className="text-sm text-gray-500">Full Name</h2>
              <p className="text-lg font-semibold text-gray-800">{prof?.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 bg-stone-50 rounded-xl shadow-sm">
            <Mail className="text-stone-600" />
            <div>
              <h2 className="text-sm text-gray-500">Email</h2>
              <p className="text-lg font-semibold text-gray-800">{prof?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 bg-stone-50 rounded-xl shadow-sm">
            <Phone className="text-stone-600" />
            <div>
              <h2 className="text-sm text-gray-500">Contact</h2>
              <p className="text-lg font-semibold text-gray-800">{prof?.contact}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 bg-stone-50 rounded-xl shadow-sm">
            <BookUser className="text-stone-600" />
            <div>
              <h2 className="text-sm text-gray-500">Handled Subjects</h2>
              <p className="text-lg font-semibold text-gray-800">
                {prof?.schedules?.length || 0} subjects
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
