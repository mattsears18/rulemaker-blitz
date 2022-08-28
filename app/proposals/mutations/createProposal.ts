import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const CreateProposal = z.object({
  name: z.string(),
})

export default resolver.pipe(resolver.zod(CreateProposal), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const proposal = await db.proposal.create({ data: input })

  return proposal
})
