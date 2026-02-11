"use client"

import React from "react"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useSWRConfig } from "swr"

export function AddGuestForm() {
  const [name, setName] = useState("")
  const [item, setItem] = useState("")
  const [loading, setLoading] = useState(false)
  const { mutate } = useSWRConfig()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !item.trim()) return

    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase
      .from("guests")
      .insert({ name: name.trim(), item: item.trim() })
    if (!error) {
      setName("")
      setItem("")
      mutate("guests")
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="guest-name" className="text-sm font-medium text-foreground">
          Guest name
        </label>
        <input
          id="guest-name"
          type="text"
          placeholder="e.g. Sarah"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-lg border border-input bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          required
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="guest-item" className="text-sm font-medium text-foreground">
          Bringing
        </label>
        <input
          id="guest-item"
          type="text"
          placeholder="e.g. Mac & Cheese"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          className="rounded-lg border border-input bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          required
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="mt-1 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
      >
        {loading ? "Adding..." : "Add Guest"}
      </button>
    </form>
  )
}
