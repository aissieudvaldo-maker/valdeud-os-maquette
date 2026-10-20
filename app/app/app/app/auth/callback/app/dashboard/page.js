import { redirect } from 'next/navigation'
import { supabaseServer } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

const ROLES = { admin: 'Administrateur', manager: 'Manager', va: 'VA' }
const STATUTS = { pending: 'En attente de validation', active: 'Actif', suspended: 'Suspendu' }

export default async function Dashboard() {
  const supabase = supabaseServer()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/')

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()

  async function signOut() {
    'use server'
    const s = supabaseServer()
    await s.auth.signOut()
    redirect('/')
  }

  const status = profile?.status ?? 'pending'

  return (
    <main className="center">
      <div className="card">
        <div className="logo"><i>V</i>VALDEUD <span>OS</span></div>
        <h1>Bienvenue {profile?.display_name ?? ''}</h1>
        <p>Rôle : <strong>{ROLES[profile?.role] ?? 'VA'}</strong></p>
        <span className={`badge ${status}`}>{STATUTS[status]}</span>
        {status === 'pending' && (
          <p>Ton compte doit être validé par un manager ou l’administrateur avant que tu accèdes à l’outil.</p>
        )}
        {status === 'active' && <p>Connexion réussie. Les modules arrivent à l’étape suivante.</p>}
        <form action={signOut}><button className="btn ghost">Se déconnecter</button></form>
      </div>
    </main>
  )
}
