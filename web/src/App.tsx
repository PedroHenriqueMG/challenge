import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TableTasks } from "./components/tableTasks/indes";

export function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <TableTasks />
    </QueryClientProvider>
  );
}
