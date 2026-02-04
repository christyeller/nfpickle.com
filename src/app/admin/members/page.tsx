'use client'

import { useEffect, useState } from 'react'
import AdminHeader from '@/components/admin/AdminHeader'
import DataTable from '@/components/admin/DataTable'
import { formatDate } from '@/lib/utils'
import { skillLevelLabels, type SkillLevel } from '@/types'
import type { Member } from '@prisma/client'

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchMembers()
  }, [])

  const fetchMembers = async () => {
    try {
      const res = await fetch('/api/members')
      const data = await res.json()
      setMembers(data.members)
    } catch (error) {
      console.error('Error fetching members:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (member: Member) => {
    if (!confirm(`Are you sure you want to remove ${member.firstName} ${member.lastName}?`)) return

    try {
      const res = await fetch(`/api/members/${member.id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        setMembers(members.filter((m) => m.id !== member.id))
      }
    } catch (error) {
      console.error('Error deleting member:', error)
    }
  }

  const columns = [
    {
      key: 'name',
      label: 'Name',
      render: (member: Member) => `${member.firstName} ${member.lastName}`,
    },
    { key: 'email', label: 'Email' },
    {
      key: 'skillLevel',
      label: 'Skill Level',
      render: (member: Member) =>
        member.skillLevel
          ? skillLevelLabels[member.skillLevel as SkillLevel]
          : '-',
    },
    {
      key: 'joinedAt',
      label: 'Joined',
      render: (member: Member) => formatDate(member.joinedAt),
    },
  ]

  return (
    <div>
      <AdminHeader title="Members" />

      <div className="p-6">
        <div className="mb-6">
          <p className="text-gray-600">
            {members.length} total member{members.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm">
          {isLoading ? (
            <div className="p-12 text-center text-gray-500">Loading...</div>
          ) : (
            <DataTable
              columns={columns}
              data={members}
              onDelete={handleDelete}
              emptyMessage="No members yet"
            />
          )}
        </div>
      </div>
    </div>
  )
}
