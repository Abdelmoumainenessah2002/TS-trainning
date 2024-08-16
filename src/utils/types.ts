export type Article = {
    id: number
    userId: number,
    title: string,
    body: string
}

export type JWTToken = {
  id: number;
  username: string;
  isAdmin: boolean;
};
 