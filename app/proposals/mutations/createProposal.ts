import { resolver } from "@blitzjs/rpc"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import getCurrentUser from "app/users/queries/getCurrentUser"
import db from "db"
import { z } from "zod"
import { Ctx } from "blitz"

const CreateProposal = z.object({
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(CreateProposal),
  resolver.authorize(),
  async (input, { session }: Ctx) => {
    if (!session.userId) {
      throw new Error("Authentication required")
    }

    const proposal = await db.proposal.create({
      data: { ...input, createdByUserId: session.userId },
    })

    return proposal
  }
)
