import { Tabs } from '@/pages/AdminPanel'
import { logoutAction } from '@/redux/actions/adminActions'
import React, { useState } from 'react'
import { BiLogOut } from 'react-icons/bi'
import { BsPeople, BsWindowStack } from 'react-icons/bs'
import { IoSettingsOutline } from 'react-icons/io5'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import ButtonLoadingSpinner from '../loader/ButtonLoadingSpinner'

const Tab = ({ activeTab, handleTabClick }: { activeTab: Tabs; handleTabClick: (param: Tabs) => void }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loggingOut, setLoggingOut] = useState(false)

  const handleLogout = async () => {
    setLoggingOut(true)
    await dispatch(logoutAction()).then(() => {
      navigate('/admin/signin')
    })
    setLoggingOut(false)
  }
  return (
    <div className='border-b border-gray-200 sticky top-0 left-0 z-30 bg-white rounded-md'>
      <ul className='flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500'>
        <li className='mr-2 flex items-center'>
          <span
            className={`cursor-pointer inline-flex items-center px-2 py-2 border-b-2 rounded-t-lg ${
              activeTab === Tabs.LOGS
                ? 'border-blue-500 bg-primary rounded-md text-white'
                : 'border-transparent hover:text-gray-600 hover:border-gray-300'
            }`}
            onClick={() => handleTabClick(Tabs.LOGS)}
          >
            <BsWindowStack className='mr-2 flex items-center' />
            Logs
          </span>
        </li>
        <li className='mr-2 flex items-center'>
          <span
            className={`cursor-pointer inline-flex items-center px-2 py-2 border-b-2 rounded-t-lg ${
              activeTab === Tabs.SETTINGS
                ? 'border-blue-500 bg-primary rounded-md text-white'
                : 'border-transparent hover:text-gray-600 hover:border-gray-300'
            }`}
            onClick={() => handleTabClick(Tabs.SETTINGS)}
          >
            <IoSettingsOutline className='mr-2 flex items-center' />
            Settings
          </span>
        </li>
        <li className='mr-2 flex items-center'>
          <span
            className={`cursor-pointer inline-flex items-center px-2 py-2 border-b-2 rounded-t-lg ${
              activeTab === Tabs.COMMUNITY_MANAGEMENT
                ? 'border-blue-500 bg-primary rounded-md text-white'
                : 'border-transparent hover:text-gray-600 hover:border-gray-300'
            }`}
            onClick={() => handleTabClick(Tabs.COMMUNITY_MANAGEMENT)}
          >
            <BsPeople className='mr-2 flex items-center' />
            Community Management
          </span>
        </li>
        <li className='mr-2 flex items-center'>
          <span
            className={`cursor-pointer inline-flex items-center px-2 py-2 border-b-2 rounded-t-lg ${
              activeTab === Tabs.LOGOUT
                ? 'border-blue-500 bg-primary rounded-md text-white'
                : 'border-transparent hover:text-red-600 hover:border-red-300'
            }`}
            onClick={handleLogout}
          >
            <BiLogOut className='mr-1' />
            <span className={`${activeTab === 'logout' ? 'group-hover:text-gray-500' : 'group-hover:text-red-600'}`}>
              {loggingOut ? <ButtonLoadingSpinner loadingText={'Logging out...'} /> : 'Logout'}
            </span>
          </span>
        </li>
      </ul>
    </div>
  )
}

export default Tab
