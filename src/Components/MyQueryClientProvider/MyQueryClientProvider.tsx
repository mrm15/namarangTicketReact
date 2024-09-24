import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from '@tanstack/react-query'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


const queryClient = new QueryClient()

export default function MyQueryClientProvider({children}) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <div className={"ltr"}>
                {/*<ReactQueryDevtools initialIsOpen={false} />*/}
            </div>
        </QueryClientProvider>
    )
}