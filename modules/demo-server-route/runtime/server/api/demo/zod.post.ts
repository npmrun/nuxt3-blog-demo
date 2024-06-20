import { z } from 'zod'

const userSchema = z.object({
    name: z.string({
        required_error: 'name is requwwired',
        invalid_type_error: "That's not a string!"
    }), //.default('Guest'),
    email: z.string({
        required_error: 'email is requwwired',
        invalid_type_error: "That's not a string!"
    }).email({ message: "Invalid email address" }),
}).required()

const querySchema = z.object({
	id: z.coerce.number({
		required_error: 'id必须填写',
		invalid_type_error: "id字段无效类型",
		// errorMap(issue, { defaultError }) {
		// 	if (issue.code === "invalid_type" && issue.received === "nan") {
		// 		return { message: "id不是数字类型" }
		// 	}
		// 	return { message: defaultError }
		// }
	}).min(1, { message: "id不能为空" })
})
// https://nuxt.com/docs/guide/directory-structure/server#body-handling
// https://unjs.io/blog/2023-08-15-h3-towards-the-edge-of-the-web#runtime-type-safe-request-utils
export default defineEventHandler({
    onRequest: defineRequestMiddleware(() => {
        // Do anything you want here like authentication, rate limiting, etc.
        console.log("onRequest");
        // Never return anything from onRequest to avoid to close the connection
    }),
    onBeforeResponse: defineResponseMiddleware(() => {
        // Do anything you want here like logging, collecting metrics, or output compression, etc.
        console.log("onResponse");
        // Never return anything from onResponse to avoid to close the connection
    }),
    handler: async (event) => {
        const result = await readValidatedBody(event, body => userSchema.safeParse(body)) // or `.parse` to directly throw an error
        if (!result.success) {
            throw sendError(event, createError({
                statusCode: 500,
                data: result.error.issues,
                statusMessage: "参数校验失败",
            }))
        }

        // User object is validated and typed!
        return 111
    }
})