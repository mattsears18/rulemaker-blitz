import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"

interface GetProposalsInput
  extends Pick<Prisma.ProposalFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetProposalsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: proposals,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.proposal.count({ where }),
      query: (paginateArgs) => db.proposal.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      proposals,
      nextPage,
      hasMore,
      count,
    }
  }
)
