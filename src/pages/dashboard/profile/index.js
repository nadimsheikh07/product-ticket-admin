import DashboardLayout from '@/layouts/dashboard/DashboardLayout';
import React from 'react'

const AdminProfile = () => {
  return (
    <div>AdminProfile</div>
  )
}
AdminProfile.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default AdminProfile