import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import Layout from "app/core/layouts/Layout"
import createProposal from "app/proposals/mutations/createProposal"
import { ProposalForm, FORM_ERROR } from "app/proposals/components/ProposalForm"

const NewProposalPage = () => {
  const router = useRouter()
  const [createProposalMutation] = useMutation(createProposal)

  return (
    <Layout title={"Create New Proposal"}>
      <h1>Create New Proposal</h1>

      <ProposalForm
        submitText="Create Proposal"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateProposal}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const proposal = await createProposalMutation(values)
            await router.push(Routes.ShowProposalPage({ proposalId: proposal.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.ProposalsPage()}>
          <a>Proposals</a>
        </Link>
      </p>
    </Layout>
  )
}

NewProposalPage.authenticate = true

export default NewProposalPage
