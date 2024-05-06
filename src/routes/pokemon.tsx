import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/pokemon')({
  component: () => <div>Hello /pokemon!</div>
})