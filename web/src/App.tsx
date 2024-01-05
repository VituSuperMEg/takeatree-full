import { If } from "./core/If"
import { Login } from "./pages/login"
import { useAuth } from "./state/auth"

export default function App () {

  const isAuthenticated = useAuth(state => state.isAuthenticated);
  const logout = useAuth(state => state.logout);

  return (
   <>
    <If test={!isAuthenticated}>
      <Login />
    </If>
    <If test={isAuthenticated}>
      <h1>Login com sucesso!</h1>
      <button onClick={() => logout()}>Sair</button>
    </If>
   </>
  )
}