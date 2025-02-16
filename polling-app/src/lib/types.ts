export interface IPoll {
  id: string
  question: string
  options: IOption[]
}

export interface IOption {
  id: string
  text: string
  votes: number
  pollId: string
}
