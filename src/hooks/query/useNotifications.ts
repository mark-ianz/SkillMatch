import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { Notification } from "@/types/notification.types";

// Fetch notifications
export function useNotifications(limit: number = 50) {
  return useQuery({
    queryKey: ["notifications", limit],
    queryFn: async () => {
      const response = await api.get<Notification[]>(`/notifications?limit=${limit}`);
      return response.data;
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });
}

// Mark notification as read
export function useMarkNotificationAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (notification_id: string) => {
      const response = await api.patch("/notifications", { notification_id });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}

// Mark all notifications as read
export function useMarkAllNotificationsAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await api.patch("/notifications", { mark_all: true });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}
