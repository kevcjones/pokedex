/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as SearchImport } from './routes/search'
import { Route as PokemonImport } from './routes/pokemon'
import { Route as IndexImport } from './routes/index'
import { Route as PokedataIndexImport } from './routes/pokedata/index'
import { Route as PokedataPokemonIdImport } from './routes/pokedata/$pokemonId'

// Create/Update Routes

const SearchRoute = SearchImport.update({
  path: '/search',
  getParentRoute: () => rootRoute,
} as any)

const PokemonRoute = PokemonImport.update({
  path: '/pokemon',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const PokedataIndexRoute = PokedataIndexImport.update({
  path: '/pokedata/',
  getParentRoute: () => rootRoute,
} as any)

const PokedataPokemonIdRoute = PokedataPokemonIdImport.update({
  path: '/pokedata/$pokemonId',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/pokemon': {
      preLoaderRoute: typeof PokemonImport
      parentRoute: typeof rootRoute
    }
    '/search': {
      preLoaderRoute: typeof SearchImport
      parentRoute: typeof rootRoute
    }
    '/pokedata/$pokemonId': {
      preLoaderRoute: typeof PokedataPokemonIdImport
      parentRoute: typeof rootRoute
    }
    '/pokedata/': {
      preLoaderRoute: typeof PokedataIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  PokemonRoute,
  SearchRoute,
  PokedataPokemonIdRoute,
  PokedataIndexRoute,
])

/* prettier-ignore-end */
