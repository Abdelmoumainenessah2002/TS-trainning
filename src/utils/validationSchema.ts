import { z } from "zod";
// Create a schema for the article
export const createArticleSchema = z.object({
  title: z
    .string({
      required_error:
        "Title is required and must be between 2 and 50 characters",
      invalid_type_error: "Title must be a string",
    })
    .min(2, { message: "Title should be at last 2 characters long" })
    .max(50, { message: "Title should be at most 50 characters long" }),
  description: z.string({
    required_error:
      "Description is required and must be between 10 and 200 characters",
    invalid_type_error: "Description must be a string",
  })
  .min(10, { message: "Description should be at last 10 characters long" })
  .max(200, { message: "Description should be at most 200 characters long" }),
});



// Create a schema for registering a user
export const registerSchema = z.object({
  email: z.string({
    required_error: "Email is required",
    invalid_type_error: "Email must be a string",
  })
  .email({ message: "Invalid email" }),

  password: z.string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string",
  })
  .min(6, { message: "Password should be at last 6 characters long" }),

  username: z.string({
    required_error: "Username is required",
    invalid_type_error: "Username must be a string",
  })
  .min(2, { message: "Username should be at last 2 characters long" })
  .max(50, { message: "Username should be at most 50 characters long" }),
});


// Create a schema for logging in a user
export const loginSchema = z.object({
  email: z.string({
    required_error: "Email is required",
    invalid_type_error: "Email must be a string",
  })
  .email({ message: "Invalid email" }),

  password: z.string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string",
  })
  .min(6, { message: "Password should be at last 6 characters long" }),
});


// Create a schema for updating a user
export const updateUserSchema = z.object({
  email: z.string({
    invalid_type_error: "Email must be a string",
  })
  .email({ message: "Invalid email" }),

  password: z.string({
    invalid_type_error: "Password must be a string",
  })
  .min(6, { message: "Password should be at last 6 characters long" }),

  username: z.string({
    invalid_type_error: "Username must be a string",
  })
  .min(2, { message: "Username should be at last 2 characters long" })
  .max(50, { message: "Username should be at most 50 characters long" }),
});


// Create a schema for creating a comment
export const createCommentSchema = z.object({
  text: z.string({
    required_error: "Text is required",
    invalid_type_error: "Text must be a string",
  })
  .min(2, { message: "Text should be at last 2 characters long" })
  .max(200, { message: "Text should be at most 200 characters long" }),

  articleId: z.number({
    required_error: "ArticleId is required",
    invalid_type_error: "ArticleId must be a number",
  }),
});