export type ReactionType = "like" | "insightful" | "supportive" | "exciting" | "interested" | "curious"

export type Reaction = {
  type: ReactionType
  emoji: string
  label: string
}

export type CompanyPost = {
  post_id: string
  company_id: number
  company_name: string
  company_image?: string
  title: string
  content: string
  cover_image?: string
  created_at: string
}

export type PostReactions = {
  [key: string]: number
}

export type UserReaction = {
  type: ReactionType | null
}
