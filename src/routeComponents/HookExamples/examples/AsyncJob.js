import * as React from 'react'
import { useState } from 'react'
import * as R from 'ramda'

import {
  Typography, TextField, Button, CircularProgress
} from '@material-ui/core'

const useAsyncJob = ({
  auto = false,
  asyncJob,
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
    executing: auto,
    reexecuting: false,
    executed: false,
  })

  return {
    error,
    data,
    executing,
    reexecuting,
    executed,
    executeAsyncJob: async (variables) => {
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
  }
}

const fetchPokemon = ({ id }) => {
  if (!id) return

  return fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`, {
    mode: 'cors'
  })
    .then(res => res.json())
    .then(R.objOf('data'))
    .catch(R.objOf('error'))
}

function AsyncJobExample() {
  const [inputValue, setInputValue] = useState('')
  const pokemonFetch = useAsyncJob({ asyncJob: fetchPokemon })

  return (
    <div style={{ margin: '50px auto', width: 800 }}>
      <Typography variant='h5' style={{ marginBottom: 20 }}>
        AsyncJob
      </Typography>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <TextField
          label="Pokemon ID"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={e => e.keyCode === 13 &&
            pokemonFetch.executeAsyncJob({ id: inputValue })
          }
          disabled={pokemonFetch.executing || pokemonFetch.reexecuting}
          style={{ marginRight: 10 }}
        />

        <Button
          color="primary"
          variant="contained"
          disabled={pokemonFetch.executing || pokemonFetch.reexecuting}
          onClick={e => {
            pokemonFetch.executeAsyncJob({ id: inputValue })
          }}
        >
          Fetch Pokemon!
        </Button>
      </div>

      <div style={{
        minHeight: 300,
        width: 500,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px dashed grey',
        margin: '20px auto 0'
      }}>
        {
          (pokemonFetch.executing ||
            pokemonFetch.reexecuting) && (
            <CircularProgress style={{ marginBottom: 10 }} />
          )
        }
        {
          pokemonFetch.data && (
            <div>
              <Typography variant='title'
                style={{ marginBottom: 20, fontWeight: 'bold' }}
              >
                {pokemonFetch.data.name}
              </Typography>
              <div>
                <img
                  src={pokemonFetch.data.sprites.front_default}
                  alt="front_dafault"
                />
                <img
                  src={pokemonFetch.data.sprites.back_default}
                  alt="back_dafault"
                />
              </div>
            </div>
          )
        }
        {
          pokemonFetch.error && (
            <Typography variant='h5' color="error">
              Oops, no Pokemon found!
            </Typography>
          )
        }
      </div>
    </div>
  )
}

export default AsyncJobExample