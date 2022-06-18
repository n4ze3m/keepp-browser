import { Button, Textarea } from "@mantine/core"

export default function SaveKeep() {
  return (
    <div
      style={{
        marginTop: "10px"
      }}>
      <Textarea
        placeholder="Add a note"
        mb="sm"
        autosize
        minRows={5}
        maxRows={9}
      />
      <Button color={"teal"} fullWidth>
        Save
      </Button>
    </div>
  )
}
