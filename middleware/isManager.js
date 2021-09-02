export default function({ $rights, $auth, redirect }) {
  if (!($auth.user.role_id & $rights.manager)) return redirect("/");
}
