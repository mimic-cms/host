import { request } from '@octokit/request';

export const handler = async () => {
  const rand = Math.floor(Math.random() * 10)
  const result = await request('GET /repos/{owner}/{repo}/contents/{path}', {
    headers: {
      authorization: `token ${process.env.GITHUB_PAT}`,
    },
    owner: 'mimic-cms',
    repo: 'host',
    path: 'README.md'
  }).then(({ data: { sha }}) => {
    return request('PUT /repos/{owner}/{repo}/contents/{path}', {
      headers: {
        authorization: `token ${process.env.GITHUB_PAT}`,
      },
      owner: 'mimic-cms',
      repo: 'host',
      path: 'README.md',
      message: `chore: GH Connection Test ${rand}`,
      committer: {
        name: 'MimicCMS',
        email: 'mail.m.isaacs@gmail.com'
      },
      sha,
      content: btoa(`# host GH Connection Test ${rand}`)
    })
  })

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello World',
    }),
  }
}
