import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const UpdateProposal = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateProposal),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const proposal = await db.proposal.update({ where: { id }, data })

    return proposal
  }
)
