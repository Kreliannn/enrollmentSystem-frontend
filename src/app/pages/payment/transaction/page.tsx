"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { backendUrl } from "@/app/utils/url"
import { useQuery } from "@tanstack/react-query"
import type { getTransactionInterface } from "@/app/types/transaction.type"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { User, CreditCard, Calendar, GraduationCap, Hash, Wallet } from "lucide-react"

export default function Page() {
  const [transaction, setTransaction] = useState<getTransactionInterface[]>([])

  const { data } = useQuery({
    queryKey: ["Transactions"],
    queryFn: () => axios.get(backendUrl("/transaction")),
  })

  useEffect(() => {
    data?.data && setTransaction(data.data)
  }, [data])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="w-full h-full">
      <div className="w-full h-32 bg-white shadow-sm border-b flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Transaction</h1>
          <p className="text-gray-600">View and manage student payment transactions</p>
        </div>
      </div>

      <div className="w-5/6 h-[550px] shadow-lg m-auto mt-10">
        <Card className="h-full">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Transaction History
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[420px]">
              <div className="space-y-4 p-6">
              {transaction.map((trans: any) => (
                <Card key={trans._id} className="border-l-4 border-l-green-500 mb-4">
                    <CardContent className="p-4 flex flex-wrap md:flex-nowrap items-center justify-between gap-4">
                    
                    <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-blue-500" />
                        <div>
                        <p className="font-semibold text-gray-900">{trans.student.name}</p>
                        <p className="text-xs text-gray-600">ID: {trans.student.studentId}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4 text-purple-500" />
                        <p className="text-sm text-gray-900">
                        {trans.student.course.toUpperCase()} - {trans.student.level} | Section: {trans.student.section}, {trans.student.sem}
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-orange-500" />
                        <p className="text-sm text-gray-900">{formatDate(trans.date)}</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Wallet className="h-4 w-4 text-green-600" />
                        <p className="text-sm text-gray-900 capitalize">{trans.mode}</p>
                    </div>

                    <Badge variant="secondary" className="bg-green-100 text-green-800 whitespace-nowrap">
                        {formatCurrency(trans.amount)}
                    </Badge>
                    </CardContent>
                </Card>
                ))}

              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
