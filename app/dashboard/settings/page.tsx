import SettingsForm from '@/components/SettingsForm'
import prisma from '@/lib/db'
import { requireUser } from '@/lib/hooks'
import React from 'react'

async function page() {
  const session = await requireUser()
  await prisma.user.findUnique({
    where: { id: session?.user?.id },
    select:{name:true, email:true, image:true
    }
  })
  return (
    <>
    <SettingsForm email={session.user?.email as string} name={session.user?.name as string} image={session.user?.image as string}/>
    </>
  )
}

export default page