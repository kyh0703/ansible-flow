import type { OauthState } from 'generated/client'

export interface IOAuthRepository {
  findById(id: string): Promise<OauthState | null>
  create(state: Omit<OauthState, 'id'>): Promise<OauthState>
  delete(id: string): Promise<OauthState>
}
