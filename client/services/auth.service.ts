interface LoginResponse {
  token: string
}

export const AuthService = {
  login: async (username: string, password: string): Promise<LoginResponse> => {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      }
    )

    if (!result.ok) throw new Error(result.statusText)

    return await result.json()
  },

  validateToken: async (token: string): Promise<boolean> => {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth?token=${token}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    if (!result.ok) throw new Error(result.statusText)

    return true
  },
}
