import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TableTasks } from "./components/tableTasks/indes";

export function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <section className="min-h-screen flex flex-col justify-center items-center">
        <TableTasks />
      </section>
    </QueryClientProvider>
  );
}
