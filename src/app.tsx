import { AppShell, Footer, Text } from "@mantine/core"

import AddPage from "~page/add"

export default function App() {
  return (
    <AppShell
      fixed
      footer={
        <Footer height={60} p="md">
          <Text size="sm" weight={500}>
            Made with{" "}
            <span role="img" aria-label="heart">
              💖
            </span>{" "}
            by KeepIt
          </Text>
        </Footer>
      }>
      <AddPage />
    </AppShell>
  )
}
