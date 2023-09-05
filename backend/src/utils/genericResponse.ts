const response = (status: number, message: any) => ({ status, message })
const responseWithMessage = (status: number, message: any) => ({
  status,
  message: { message },
})

export { response, responseWithMessage }
