"use client"

import { useState, useEffect } from "react"

import { IPoll } from "@/lib/types"
import { CreatePoll } from "@/components/CreatePoll"
import { PollResults } from "@/components/PollResults"

export default function Home() {
  const [question, setQuestion] = useState<string>("")
  const [options, setOptions] = useState<string[]>([])
  const [polls, setPolls] = useState<IPoll[]>([])

  const fetchPolls = async () => {
    const response = await fetch("/api/v1/polls")
    const data = await response.json()
    setPolls(data)
  }

  // Fetch polls every 5 seconds
  useEffect(() => {
    fetchPolls()

    const interval = setInterval(fetchPolls, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleCreatePoll = async (e: React.FormEvent) => {
    e.preventDefault()

    const response = await fetch("/api/v1/polls", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question,
        options: options.filter((opt: string) => opt.trim() !== ""),
      }),
    })

    if (response.ok) {
      setQuestion("")
      setOptions([])
    }
  }

  const handleVote = async (optionId: string) => {
    await fetch("/api/v1/polls/vote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ optionId }),
    })
  }

  return (
    <div className="container mx-auto p-4 px-40">
      <CreatePoll
        handleCreatePoll={handleCreatePoll}
        question={question}
        setQuestion={setQuestion}
        options={options}
        setOptions={setOptions}
      />
      <PollResults polls={polls} handleVote={handleVote} />
    </div>
  )
}
