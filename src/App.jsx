
import { AppFooter } from './cmps/AppFooter'
import { AppHeader } from './cmps/AppHeader'
import { ToDoList } from './pages/ToDoList'

import './assets/styles/main.scss'

function App() {

  return (
    <div className='main-container'>
      <AppHeader />
      <ToDoList />
      <AppFooter />
    </div>
  )
}

export default App
