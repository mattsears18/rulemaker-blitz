import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const DeleteProposal = z.object({
  id: z.string(),
})

export default resolver.pipe(resolver.zod(DeleteProposal), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const proposal = await db.proposal.deleteMany({ where: { id } })

  return proposal
})
