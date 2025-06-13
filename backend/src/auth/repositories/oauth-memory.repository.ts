import { Injectable, NotFoundException } from '@nestjs/common'
import type { OauthState } from 'generated/client'
import { v4 as uuidv4 } from 'uuid'
import type { IOAuthRepository } from '../interfaces/oauth.repository'

@Injectable()
export class OAuthRepository implements IOAuthRepository {
  private readonly states: Map<string, OauthState> = new Map()

  findById(id: string): Promise<OauthState | null> {
    return Promise.resolve(this.states.get(id) ?? null)
  }

  create(state: Omit<OauthState, 'id'>): Promise<OauthState> {
    const id = uuidv4()
    this.states.set(id, { ...state, id })
    return Promise.resolve({ ...state, id })
  }

  delete(id: string): Promise<OauthState> {
    const state = this.states.get(id)
    if (!state) {
      throw new NotFoundException('State not found')
    }
    this.states.delete(id)
    return Promise.resolve(state)
  }
}
