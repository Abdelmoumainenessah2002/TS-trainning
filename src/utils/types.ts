import { Article, Comment, User } from "@prisma/client";


export type JWTToken = {
  id: number;
  username: string;
  isAdmin: boolean;
};

export type CommentWithUser = Comment & {user: User};

export type SingleArticle = Article & {comments: CommentWithUser[]} 


