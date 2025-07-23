import React from 'react'
import { requireAuth } from '../uitls/requireAuth';
export async function profileLoader({request}) {
  const pathname = new URL(request.url).pathname;
  await requireAuth({redirectTo:pathname});
  return null;
}
export default function Profile() {
  return (
    <div>
      <h1>Profile</h1>
    </div>
  )
}
