"use client"

import { SWRConfig } from "swr"
import { AddGuestForm } from "@/components/add-guest-form"
import { GuestList } from "@/components/guest-list"

export function PotluckApp() {
  return (
    <SWRConfig value={{ revalidateOnFocus: true }}>
      <div className="flex flex-col gap-8">
        <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold text-card-foreground">Add a Guest</h2>
          <AddGuestForm />
        </section>
        <section>
          <GuestList />
        </section>
      </div>
    </SWRConfig>
  )
}
