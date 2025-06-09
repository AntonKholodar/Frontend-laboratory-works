import React from 'react'

function Profile({ user }) {
  if (!user) return null

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString()
  }

  const calculateAge = (dateOfBirth) => {
    const today = new Date()
    const birth = new Date(dateOfBirth)
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    
    return age
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold text-center mb-6">User Profile</h1>
      
      <div className="overflow-hidden">
        <table className="w-full border-collapse">
          <tbody>
            <tr className="border-b">
              <td className="py-3 px-4 bg-gray-50 font-medium text-gray-700 w-1/3">Name</td>
              <td className="py-3 px-4">{user.name}</td>
            </tr>
            <tr className="border-b">
              <td className="py-3 px-4 bg-gray-50 font-medium text-gray-700">Email</td>
              <td className="py-3 px-4">{user.email}</td>
            </tr>
            <tr className="border-b">
              <td className="py-3 px-4 bg-gray-50 font-medium text-gray-700">Gender</td>
              <td className="py-3 px-4">{user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}</td>
            </tr>
            <tr className="border-b">
              <td className="py-3 px-4 bg-gray-50 font-medium text-gray-700">Date of Birth</td>
              <td className="py-3 px-4">{formatDate(user.dateOfBirth)}</td>
            </tr>
            <tr className="border-b">
              <td className="py-3 px-4 bg-gray-50 font-medium text-gray-700">Age</td>
              <td className="py-3 px-4">{calculateAge(user.dateOfBirth)} years</td>
            </tr>
            <tr className="border-b">
              <td className="py-3 px-4 bg-gray-50 font-medium text-gray-700">User ID</td>
              <td className="py-3 px-4">{user.id}</td>
            </tr>
            <tr>
              <td className="py-3 px-4 bg-gray-50 font-medium text-gray-700">Registration Date</td>
              <td className="py-3 px-4">{formatDate(user.registeredAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Profile information is stored locally in your browser
        </p>
      </div>
    </div>
  )
}

export default Profile 