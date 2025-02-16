import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { IPoll, IOption } from "@/lib/types"

interface IPollResultsProps {
  polls: IPoll[]
  handleVote: (optionId: string) => void
}

export const PollResults = ({ polls, handleVote }: IPollResultsProps) => {
  return (
    <div className="space-y-4 w-1/2 mx-auto">
      {polls?.map((poll: IPoll) => (
        <Card key={poll.id}>
          <CardHeader>
            <CardTitle>{poll.question}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {poll.options.map((option: IOption) => {
                const totalVotes = poll.options.reduce(
                  (sum: number, opt: IOption) => sum + opt.votes,
                  0
                )
                const percentage =
                  totalVotes > 0
                    ? Math.round((option.votes / totalVotes) * 100)
                    : 0

                return (
                  <div key={option.id} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span>{option.text}</span>
                      <span>
                        {option.votes} votes ({percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <Button
                      onClick={() => handleVote(option.id)}
                      variant="outline"
                      className="w-full mt-1"
                    >
                      Vote
                    </Button>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
