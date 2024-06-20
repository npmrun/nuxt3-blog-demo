import { z } from "zod";

const LoginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
});

LoginSchema.parse({ username: "Ludwig" });

// extract the inferred type
type LoginSchema = z.infer<typeof LoginSchema>;
// { username: string }