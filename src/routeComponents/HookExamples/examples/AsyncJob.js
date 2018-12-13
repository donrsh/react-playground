import * as React from 'react'
import { useState } from 'react'
import * as R from 'ramda'
import styled from 'styled-components'

import {
  Typography, TextField, Button, CircularProgress
} from '@material-ui/core'

const Styc = {
  InputRegion: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  ResultRegion: styled.div`
    width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px dashed grey;
    margin: 20px auto 0;
    padding: 30px;
    box-sizing: border-box;
  `,

  GithubAvatar: styled.img`
    width: 128px;
    height: 128px
  `
}

const useAsyncJob = ({
  auto = false,
  asyncJob,
  initVariables = []
} = {}) => {
  if (typeof asyncJob !== 'function') {
    throw new Error(`[useAsync] "executeAsync" must be a function`)
  }

  const [
    { error, data, executing, reexecuting, executed },
    setState
  ] = useState({
    error: null,
    data: null,
    executing: false,
    reexecuting: false,
    executed: false,
  })

  const executeAsyncJob = async (variables) => {
    setState(R.evolve({
      executing: executed ? R.F : R.T,
      reexecuting: executed ? R.T : R.F,
    }))

    const { error, data } = await asyncJob(variables)

    setState(R.evolve({
      data: Boolean(data) ? R.always(data) : R.always(null),
      error: Boolean(error) ? R.always(error) : R.always(null),
      executing: R.F,
      reexecuting: R.F,
      executed: R.T
    }))
  }

  if (auto && !executed && !executing) {
    executeAsyncJob(...initVariables)
  }

  return {
    error,
    data,
    executing,
    reexecuting,
    executed,
    executeAsyncJob
  }
}

const fetchIP = async () => {
  return fetch(`https://httpbin.org/ip`, {
    mode: 'cors'
  })
    .then(res => res.json())
    .then(R.objOf('data'))
    .catch(R.objOf('error'))
}

const fetchGithubUser = async ({ username }) => {
  if (!username) return
  return fetch(`https://api.github.com/users/${username}`, {
    mode: 'cors'
  })
    .then(res => {
      if (res.ok) return res.json()
      else throw new Error()
    })
    .then(R.objOf('data'))
    .catch(R.objOf('error'))
}

function AsyncJobExample() {
  const [usernameInput, setUsernameInput] = useState('')
  const IPFetch = useAsyncJob({ asyncJob: fetchIP, auto: true })
  const githubUserFetch = useAsyncJob({ asyncJob: fetchGithubUser })

  return (
    <div style={{ margin: '50px auto', width: 800 }}>
      <Typography variant='h5' style={{ marginBottom: 20 }}>
        AsyncJob
      </Typography>

      <div style={{ marginBottom: 40 }}>
        <Typography variant='h6'>
          with <code>auto = ture</code>
        </Typography>

        <Styc.InputRegion>
          <Button
            color="primary"
            variant="contained"
            disabled={IPFetch.executing || IPFetch.reexecuting}
            onClick={e => { IPFetch.executeAsyncJob() }}
          >
            Fetch IP!
          </Button>
        </Styc.InputRegion>

        <Styc.ResultRegion
          style={{ minHeight: 120 }}
        >
          {
            (IPFetch.executing ||
              IPFetch.reexecuting) && (
              <CircularProgress style={{ marginBottom: 10 }} />
            )
          }
          {
            IPFetch.data && (
              <Typography variant='h5' color="primary">
                Your IP is <b>{IPFetch.data.origin}</b>
              </Typography>
            )
          }
          {
            IPFetch.error && (
              <Typography variant='h5' color="error">
                Oops, fetch IP failed!
              </Typography>
            )
          }
        </Styc.ResultRegion>
      </div>

      <div>
        <Typography variant='h6'>
          with <code>auto = false</code>
        </Typography>

        <Styc.InputRegion>
          <TextField
            label="Github user (e.g. facebook)"
            value={usernameInput}
            onChange={e => setUsernameInput(e.target.value)}
            onKeyDown={e => e.keyCode === 13 &&
              githubUserFetch.executeAsyncJob({ username: usernameInput })
            }
            disabled={githubUserFetch.executing || githubUserFetch.reexecuting}
            style={{ marginRight: 10, width: 350 }}
          />

          <Button
            color="primary"
            variant="contained"
            disabled={githubUserFetch.executing || githubUserFetch.reexecuting}
            onClick={e => { githubUserFetch.executeAsyncJob({ username: usernameInput }) }}
          >
            Search
          </Button>
        </Styc.InputRegion>

        <Styc.ResultRegion
          style={{ minHeight: 120 }}
        >
          {
            (githubUserFetch.executing ||
              githubUserFetch.reexecuting) && (
              <CircularProgress style={{ marginBottom: 10 }} />
            )
          }
          {
            githubUserFetch.data && (
              <div style={{ padding: 30 }}>
                <Styc.GithubAvatar
                  src={githubUserFetch.data.avatar_url}
                  alt="avatar"
                />
              </div>
            )
          }
          {
            githubUserFetch.error && (
              <Typography variant='h5' color="error">
                Oops, github user not found!
              </Typography>
            )
          }
        </Styc.ResultRegion>
      </div>
    </div>
  )
}

export default AsyncJobExample