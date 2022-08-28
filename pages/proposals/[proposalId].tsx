import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "app/core/layouts/Layout"
import getProposal from "app/proposals/queries/getProposal"
import deleteProposal from "app/proposals/mutations/deleteProposal"

export const Proposal = () => {
  const router = useRouter()
  const proposalId = useParam("proposalId", "string")
  const [deleteProposalMutation] = useMutation(deleteProposal)
  const [proposal] = useQuery(getProposal, { id: proposalId })

  return (
    <>
      <Head>
        <title>Proposal {proposal.id}</title>
      </Head>

      <div>
        <h1>Proposal {proposal.id}</h1>
        <pre>{JSON.stringify(proposal, null, 2)}</pre>

        <Link href={Routes.EditProposalPage({ proposalId: proposal.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteProposalMutation({ id: proposal.id })
              await router.push(Routes.ProposalsPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowProposalPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.ProposalsPage()}>
          <a>Proposals</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Proposal />
      </Suspense>
    </div>
  )
}

ShowProposalPage.authenticate = true
ShowProposalPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowProposalPage
