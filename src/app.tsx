import { AppShell, Footer, Text } from "@mantine/core"
import { MemoryRouter } from "react-router-dom"

import { Routing } from "~page"

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
            by Keeppt
          </Text>
        </Footer>
      }>
      <MemoryRouter>
        <Routing />
      </MemoryRouter>
    </AppShell>
  )
}
