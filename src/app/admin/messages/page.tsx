'use client'

import { useEffect, useState } from 'react'
import AdminHeader from '@/components/admin/AdminHeader'
import { formatDate } from '@/lib/utils'
import { Mail, MailOpen, Trash2 } from 'lucide-react'
import type { ContactSubmission } from '@prisma/client'

export default function MessagesPage() {
  const [messages, setMessages] = useState<ContactSubmission[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState<ContactSubmission | null>(null)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/contact')
      const data = await res.json()
      setMessages(data.messages)
    } catch (error) {
      console.error('Error fetching messages:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const markAsRead = async (message: ContactSubmission) => {
    try {
      await fetch('/api/contact', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: message.id, read: true }),
      })

      setMessages(
        messages.map((m) => (m.id === message.id ? { ...m, read: true } : m))
      )
    } catch (error) {
      console.error('Error updating message:', error)
    }
  }

  const handleDelete = async (message: ContactSubmission) => {
    if (!confirm('Are you sure you want to delete this message?')) return

    try {
      await fetch(`/api/contact?id=${message.id}`, {
        method: 'DELETE',
      })

      setMessages(messages.filter((m) => m.id !== message.id))
      if (selectedMessage?.id === message.id) {
        setSelectedMessage(null)
      }
    } catch (error) {
      console.error('Error deleting message:', error)
    }
  }

  const openMessage = (message: ContactSubmission) => {
    setSelectedMessage(message)
    if (!message.read) {
      markAsRead(message)
    }
  }

  const unreadCount = messages.filter((m) => !m.read).length

  return (
    <div>
      <AdminHeader title="Messages" />

      <div className="p-6">
        <div className="mb-6">
          <p className="text-gray-600">
            {messages.length} message{messages.length !== 1 ? 's' : ''}
            {unreadCount > 0 && (
              <span className="ml-2 text-secondary font-medium">
                ({unreadCount} unread)
              </span>
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {isLoading ? (
              <div className="p-12 text-center text-gray-500">Loading...</div>
            ) : messages.length === 0 ? (
              <div className="p-12 text-center text-gray-500">No messages yet</div>
            ) : (
              <ul className="divide-y">
                {messages.map((message) => (
                  <li
                    key={message.id}
                    onClick={() => openMessage(message)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedMessage?.id === message.id ? 'bg-primary/5' : ''
                    } ${!message.read ? 'bg-[#1A5F7A]/10' : ''}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        {message.read ? (
                          <MailOpen size={20} className="text-gray-400 mt-1" />
                        ) : (
                          <Mail size={20} className="text-primary mt-1" />
                        )}
                        <div>
                          <p className={`font-medium ${!message.read ? 'text-primary' : ''}`}>
                            {message.name}
                          </p>
                          <p className="text-sm text-gray-600">{message.email}</p>
                          <p className="text-sm text-gray-500 mt-1 truncate max-w-xs">
                            {message.subject || message.message.substring(0, 50)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">
                          {formatDate(message.createdAt)}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDelete(message)
                          }}
                          className="p-1 text-gray-400 hover:text-red-600"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            {selectedMessage ? (
              <div>
                <div className="border-b pb-4 mb-4">
                  <h2 className="text-lg font-semibold">{selectedMessage.name}</h2>
                  <p className="text-gray-600">{selectedMessage.email}</p>
                  <p className="text-sm text-gray-400 mt-1">
                    {formatDate(selectedMessage.createdAt)}
                  </p>
                </div>
                {selectedMessage.subject && (
                  <p className="font-medium mb-2">Subject: {selectedMessage.subject}</p>
                )}
                <div className="prose prose-sm max-w-none">
                  <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-12">
                Select a message to view
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
