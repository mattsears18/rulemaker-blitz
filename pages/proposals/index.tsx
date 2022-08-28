import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { usePaginatedQuery } from "@blitzjs/rpc"
import { useRouter } from "next/router"
import Layout from "app/core/layouts/Layout"
import getProposals from "app/proposals/queries/getProposals"

const ITEMS_PER_PAGE = 100

export const ProposalsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ proposals, hasMore }] = usePaginatedQuery(getProposals, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {proposals.map((proposal) => (
          <li key={proposal.id}>
            <Link href={Routes.ShowProposalPage({ proposalId: proposal.id })}>
              <a>{proposal.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const ProposalsPage = () => {
  return (
    <Layout>
      <Head>
        <title>Proposals</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewProposalPage()}>
            <a>Create Proposal</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <ProposalsList />
        </Suspense>
      </div>
    </Layout>
  )
}

export default ProposalsPage
