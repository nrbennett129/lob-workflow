export async function applyPagination (query, first, last) {
  const CopyQuery = query.toConstructor()
  let count
  if (first || last) {
    count = await new CopyQuery().estimatedDocumentCount()
    let limit = count
    let skip

    if (first && count > first) {
      limit = first
    }
    if (last && limit > last) {
      skip = limit - last
      limit = limit - skip
    }
    if (skip) {
      query.skip(skip)
    }
    if (limit) {
      query.limit(limit)
    }
  }

  return {
    // FIX: When using cursors these values are not correct all of the time
    // e.g. first: 1 after: 'FirstCursor' => hasPreviousPage = false (not correct)
    hasNextPage: Boolean(first && count > first),
    hasPreviousPage: Boolean(last && count > last)
  }
}

export function applyCursorsToFilter (filter, after, before) {
  if (after) {
    filter._id = {}
    filter._id.$lt = after
  }
  if (before) {
    filter._id = {}
    filter._id.$gt = before
  }
}
