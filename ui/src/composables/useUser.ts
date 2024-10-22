import { useQuery, queryOptions } from '@tanstack/vue-query'
import { getCurrentUser } from '@/lib/services/userServices'

export const userQueryOptions = queryOptions({
  queryKey: ['get-current-user'],
  queryFn: getCurrentUser,
  staleTime: Infinity,
})

export function useCurrentUser() {
  return useQuery(userQueryOptions)
}
