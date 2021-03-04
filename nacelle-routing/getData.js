import dotenv from 'dotenv'
import fetch from 'isomorphic-unfetch'

dotenv.config()

const spaceID = process.env.NACELLE_SPACE_ID
const token = process.env.NACELLE_GRAPHQL_TOKEN
const version = process.env.NACELLE_API_VERSION || 'v2'

export default async (query) => {
  try {
    const res = await fetch(`https://hailfrequency.com/${version}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-nacelle-space-id': spaceID,
        'x-nacelle-space-token': token
      },
      body: JSON.stringify({ query })
    }).then((res) => res.json())

    return res.data
  } catch (err) {
    throw new Error(
      `Error while fetching data from Nacelle's Hail Frequency API:\n${err}`
    )
  }
}
