"use client"

import { useState } from "react"
import useSWR from "swr"
import { createClient } from "@/lib/supabase/client"

interface Guest {
  id: string
  name: string
  item: string
  created_at: string
}

async function fetchGuests(): Promise<Guest[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .order("created_at", { ascending: true })
  if (error) throw error
  return data ?? []
}

export function GuestList() {
  const { data: guests, error, isLoading, mutate } = useSWR("guests", fetchGuests)
  const [removingId, setRemovingId] = useState<string | null>(null)

  async function handleRemove(id: string) {
    setRemovingId(id)
    const supabase = createClient()
    const { error } = await supabase.from("guests").delete().eq("id", id)
    if (!error) {
      mutate()
    }
    setRemovingId(null)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12 text-muted-foreground text-sm">
        Loading guests...
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
        Failed to load guests. Please refresh the page.
      </div>
    )
  }

  if (!guests || guests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border py-12">
        <p className="text-muted-foreground text-sm">No guests yet</p>
        <p className="text-muted-foreground/70 text-xs">Add someone above to get started</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-sm font-semibold text-foreground">
          Guest List
        </h2>
        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
          {guests.length} {guests.length === 1 ? "guest" : "guests"}
        </span>
      </div>
      <ul className="flex flex-col gap-2" role="list">
        {guests.map((guest) => (
          <li
            key={guest.id}
            className="flex items-center justify-between gap-3 rounded-lg border border-border bg-card p-3 transition-colors hover:bg-accent/50"
          >
            <div className="flex flex-col gap-0.5 min-w-0">
              <span className="text-sm font-medium text-card-foreground truncate">
                {guest.name}
              </span>
              <span className="text-xs text-muted-foreground truncate">
                Bringing: {guest.item}
              </span>
            </div>
            <button
              onClick={() => handleRemove(guest.id)}
              disabled={removingId === guest.id}
              aria-label={`Remove ${guest.name}`}
              className="shrink-0 rounded-md px-2.5 py-1.5 text-xs font-medium text-destructive transition-colors hover:bg-destructive/10 disabled:opacity-50"
            >
              {removingId === guest.id ? "..." : "Remove"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
