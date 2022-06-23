import React, {useState, useEffect} from 'react'

import { Skeleton } from 'skeleton-loading-react'
import 'skeleton-loading-react/dist/index.css'

interface TestProps {
  user: {
    avatar: string
    name: string
    description: string
  }
}

const App = () => {
  const [isLoading, setIsLoading] = useState(true)

  const Test: React.FC<TestProps> = ({user, children}) => {
    return ( 
        <div style={{padding: 12, width: 400}}>
            <header style={{display: 'flex', alignItems: 'center', marginBottom: 8}}>    
                <img 
                    src={user.avatar} 
                    alt={user.name} 
                    style={{width: 32, height: 32, borderRadius: '50%', marginRight: 8}}
                />
                <p style={{margin: 0}}>{user.name}</p>
            </header>
            <p>{user.description}</p>
            {children}
        </div>
    )
    }

  useEffect(()=>{
    setTimeout(()=>{
      setIsLoading(false)
    },2000)
  },[])

  const fakeUser = {
    name: 'Jonathan Doestar',
    avatar: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Lorem ipsum dolor sit'
  }

  const user = {
    name: 'Filipe Pfluck',
    avatar: 'https://avatars.githubusercontent.com/u/62773200?v=4',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Lorem ipsum dolor sit'
  }

  return <Skeleton 
    isLoading={isLoading} 
    exampleProps={{user: fakeUser}}
  >
    <Test user={user}>
    </Test>
  </Skeleton>
}

export default App
