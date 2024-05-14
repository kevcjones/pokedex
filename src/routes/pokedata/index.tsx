import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/pokedata/')({
  component: () => <div>Hello /pokedata/!</div>
})