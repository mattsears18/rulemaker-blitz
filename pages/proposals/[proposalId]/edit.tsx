import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "app/core/layouts/Layout"
import getProposal from "app/proposals/queries/getProposal"
import updateProposal from "app/proposals/mutations/updateProposal"
import { ProposalForm, FORM_ERROR } from "app/proposals/components/ProposalForm"

export const EditProposal = () => {
  const router = useRouter()
  const proposalId = useParam("proposalId", "number")
  const [proposal, { setQueryData }] = useQuery(
    getProposal,
    { id: proposalId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateProposalMutation] = useMutation(updateProposal)

  return (
    <>
      <Head>
        <title>Edit Proposal {proposal.id}</title>
      </Head>

      <div>
        <h1>Edit Proposal {proposal.id}</h1>
        <pre>{JSON.stringify(proposal, null, 2)}</pre>

        <ProposalForm
          submitText="Update Proposal"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateProposal}
          initialValues={proposal}
          onSubmit={async (values) => {
            try {
              const updated = await updateProposalMutation({
                id: proposal.id,
                ...values,
              })
              await setQueryData(updated)
              await router.push(Routes.ShowProposalPage({ proposalId: updated.id }))
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditProposalPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditProposal />
      </Suspense>

      <p>
        <Link href={Routes.ProposalsPage()}>
          <a>Proposals</a>
        </Link>
      </p>
    </div>
  )
}

EditProposalPage.authenticate = true
EditProposalPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditProposalPage
