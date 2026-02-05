"use client"

import React from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function ReactQueryProvider({children}: React.PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      {/* The rest of your application */}
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default ReactQueryProvider