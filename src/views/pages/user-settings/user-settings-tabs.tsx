'use client'

// React Imports
import { useEffect } from 'react'

// Third-party Imports
import { parseAsString, useQueryState } from 'nuqs'

// Component Imports
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import UserGeneral from '@/views/pages/user-settings/general'
import Workspace from '@/views/pages/user-settings/workspace'

const tabs = [
  {
    name: 'General',
    value: 'general',
    content: <UserGeneral />
  },
  {
    name: 'Workspace',
    value: 'workspace',
    content: <Workspace />
  }
]

const UserSettingsTabs = () => {
  const [activeSetting, setActiveSetting] = useQueryState(
    'setting',
    parseAsString.withDefault('general').withOptions({
      history: 'push',
      shallow: true,
      clearOnDefault: false
    })
  )

  useEffect(() => {
    setActiveSetting(activeSetting)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='w-full'>
      <Tabs
        value={activeSetting}
        onValueChange={value => {
          setActiveSetting(value)
        }}
      >
        <div className='overflow-x-auto sm:overflow-visible'>
          <TabsList variant='settings'>
            {tabs.map(tab => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {tabs.map(tab => (
          <TabsContent key={tab.value} value={tab.value}>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

export default UserSettingsTabs
