export interface Role {
    mmu: MMU
    prompt: Prompt
}

export interface Prompt {
    name: string
    content: string
}

export interface MMU {
    avatar: string
    description: string
    id: number
    role_name: string
}