import { queryClient } from "@/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";

export default function QueryClientProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
