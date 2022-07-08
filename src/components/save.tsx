import { ActionIcon, Anchor, Button, Text, Textarea } from "@mantine/core"
import { useForm } from "@mantine/hooks"
import { gql } from "graphql-request"
import { useMutation } from "react-query"

import useLocal from "~utils/useLocal"

const mutation = gql`
  mutation InsertKeep($user_id: ID!, $note: String!) {
    insertKeeps(user_id: $user_id, note: $note) {
      created_at
    }
  }
`
const endpoint = "https://langford.stepzen.net/api/keeppt/__graphql"i

export default function SaveKeep() {
  const { value: userId, remove } = useLocal("token")

  const form = useForm({
    initialValues: {
      note: ""
    }
  })

  const onFormSubit = async (e: any) => {
    let variables = {
      ...e,
      user_id: userId
    }

    await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization:
          "apikey langford::stepzen.net+1000::7cd83a30b35ab571b850b49d37e9f1579b2a78b479be820d2ff2ce919561e2a5",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: mutation,
        variables: variables
      })
    })
  }

  const { mutateAsync: saveNote, isLoading: isSaving } = useMutation(
    onFormSubit,
    {
      onSuccess: () => {
        form.reset()
      }
    }
  )

  return (
    <div
      style={{
        marginTop: "10px"
      }}>
      {userId && (
        <ActionIcon
          onClick={() => remove()}
          title="Logout"
          mb="md"
          color="red"
          size="md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </ActionIcon>
      )}
      <form onSubmit={form.onSubmit((values) => saveNote(values))}>
        <Textarea
          placeholder="Add a note"
          mb="sm"
          autosize
          minRows={5}
          maxRows={9}
          {...form.getInputProps("note")}
        />
        <Button
          disabled={!userId}
          loading={isSaving}
          type="submit"
          color={"teal"}
          fullWidth>
          Save
        </Button>
      </form>
      {!userId && (
        <Text mt="md" color="red">
          Oh no, look like you are not connected to the keeppt app.{" "}
          <Anchor
            target={"_blank"}
            href="https://keeppt-in.vercel.app/settings">
            Connect to keeppt
          </Anchor>{" "}
          and try again.
        </Text>
      )}
    </div>
  )
}
