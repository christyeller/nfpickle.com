'use client'

import { useEffect, useState } from 'react'
import AdminHeader from '@/components/admin/AdminHeader'
import DataTable from '@/components/admin/DataTable'
import {
  donationTypeLabels,
  donationStatusLabels,
  paymentStatusLabels,
  type DonationType,
  type DonationStatus,
  type PaymentStatus,
  type Donation
} from '@/types'

export default function DonationsPage() {
  const [donations, setDonations] = useState<Donation[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchDonations()
  }, [])

  const fetchDonations = async () => {
    try {
      const res = await fetch('/api/donations')
      const data = await res.json()
      setDonations(data.donations)
    } catch (error) {
      console.error('Error fetching donations:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (donation: Donation) => {
    if (!confirm(`Are you sure you want to delete donation from ${donation.donorName}?`)) {
      return
    }

    try {
      const res = await fetch(`/api/donations?id=${donation.id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        setDonations(donations.filter((d) => d.id !== donation.id))
      }
    } catch (error) {
      console.error('Error deleting donation:', error)
    }
  }

  const columns = [
    {
      key: 'donorName',
      label: 'Donor',
    },
    {
      key: 'donorEmail',
      label: 'Email',
    },
    {
      key: 'amount',
      label: 'Amount',
      render: (donation: Donation) => (
        <span className="font-semibold">
          ${donation.amount.toFixed(2)}
        </span>
      ),
    },
    {
      key: 'donationType',
      label: 'Type',
      render: (donation: Donation) => (
        <span
          className={`px-2 py-1 text-xs rounded ${
            donation.donationType === 'recurring'
              ? 'bg-teal-100 text-teal-700'
              : 'bg-lime-100 text-lime-700'
          }`}
        >
          {donationTypeLabels[donation.donationType as DonationType]}
          {donation.frequency && ` (${donation.frequency})`}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (donation: Donation) => (
        <span
          className={`px-2 py-1 text-xs rounded ${
            donation.status === 'completed'
              ? 'bg-green-100 text-green-700'
              : donation.status === 'failed'
              ? 'bg-red-100 text-red-700'
              : donation.status === 'cancelled'
              ? 'bg-gray-100 text-gray-700'
              : 'bg-yellow-100 text-yellow-700'
          }`}
        >
          {donationStatusLabels[donation.status as DonationStatus]}
        </span>
      ),
    },
    {
      key: 'paymentStatus',
      label: 'Payment',
      render: (donation: Donation) => (
        <span className="text-xs text-gray-600">
          {paymentStatusLabels[donation.paymentStatus as PaymentStatus]}
        </span>
      ),
    },
    {
      key: 'createdAt',
      label: 'Date',
      render: (donation: Donation) => (
        new Date(donation.createdAt).toLocaleDateString()
      ),
    },
  ]

  // Calculate stats
  const totalDonations = donations.reduce((sum, d) =>
    d.status === 'completed' ? sum + d.amount : sum, 0
  )
  const recurringCount = donations.filter(d =>
    d.donationType === 'recurring' && d.status !== 'cancelled'
  ).length

  return (
    <div>
      <AdminHeader title="Donations" />

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-sm font-medium text-gray-600">Total Donations</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">
              {donations.length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-sm font-medium text-gray-600">Total Amount</p>
            <p className="text-3xl font-bold text-green-600 mt-1">
              ${totalDonations.toFixed(2)}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-sm font-medium text-gray-600">Active Recurring</p>
            <p className="text-3xl font-bold text-teal-600 mt-1">
              {recurringCount}
            </p>
          </div>
        </div>

        {/* Donations Table */}
        <div className="bg-white rounded-xl shadow-sm">
          {isLoading ? (
            <div className="p-12 text-center text-gray-500">Loading...</div>
          ) : (
            <DataTable
              columns={columns}
              data={donations}
              onDelete={handleDelete}
              emptyMessage="No donations yet"
            />
          )}
        </div>
      </div>
    </div>
  )
}
