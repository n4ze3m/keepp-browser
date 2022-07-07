import { Anchor, Button, Text, TextInput } from "@mantine/core"
import React from "react"
import { useMutation } from "react-query"
import { useNavigate } from "react-router-dom"

export default function LoginBody() {
  const navigate = useNavigate()
  const [token, setToken] = React.useState("")

  const onSubmit = () => {
    localStorage.setItem("token", token)
    navigate("/")
    return Promise.resolve()
  }

  const { mutateAsync: login, isLoading } = useMutation(onSubmit)

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          await login()
        }}>
        <TextInput
          value={token}
          onChange={(e) => setToken(e.target.value)}
          required
          placeholder="Keeppt token"
        />
        <Button loading={isLoading} type="submit" color="teal" mt="md">
          Login
        </Button>
      </form>
      <Text mt="md">
        You can find your keeppt token in the{" "}
        <Anchor target="_blank" href="https://keeppt-in.vercel.app/settings">
          Keeppt Settings
        </Anchor>
      </Text>
    </div>
  )
}
