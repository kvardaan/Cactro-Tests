import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ICreatePollProps {
  handleCreatePoll: (e: React.FormEvent) => Promise<void>
  question: string
  setQuestion: React.Dispatch<React.SetStateAction<string>>
  options: string[]
  setOptions: React.Dispatch<React.SetStateAction<string[]>>
}

export const CreatePoll = ({
  handleCreatePoll,
  question,
  setQuestion,
  options,
  setOptions,
}: ICreatePollProps) => {
  return (
    <Card className="mb-8 w-1/2 mx-auto">
      <CardHeader>
        <CardTitle>Create New Poll</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleCreatePoll} className="space-y-4">
          <Input
            placeholder="Enter your question"
            value={question}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setQuestion(e.target.value)
            }
            className="mb-4"
          />

          {options.map((option, index) => (
            <div key={index} className="flex gap-2">
              <Input
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const newOptions = [...options]
                  newOptions[index] = e.target.value
                  setOptions(newOptions)
                }}
              />
              {index >= 2 && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() =>
                    setOptions(options.filter((_, i) => i !== index))
                  }
                >
                  Remove
                </Button>
              )}
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={() => setOptions([...options, ""])}
          >
            Add Option
          </Button>

          <Button type="submit" className="w-full">
            Create Poll
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
