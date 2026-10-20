'use client'
import { supabaseBrowser } from '@/lib/supabase/client'

export default function Login() {
  async function loginDiscord() {
    const supabase = supabaseBrowser()
    await supabase.auth.signInWithOAuth({
      provider: 'discord',
      options: { redirectTo: `${window.location.origin}/auth/callback`, scopes: 'identify' },
    })
  }

  return (
    <main className="center">
      <div className="card">
        <div className="logo"><i>V</i>VALDEUD <span>OS</span></div>
        <h1>Connexion</h1>
        <p>Connecte-toi avec ton compte Discord pour accéder à ton espace.</p>
        <button className="btn" onClick={loginDiscord}>Se connecter avec Discord</button>
      </div>
    </main>
  )
}
