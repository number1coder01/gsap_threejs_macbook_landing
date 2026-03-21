import NavBar from './components/NavBar'
import Hero from './components/Hero'
import ProductViewer from './components/ProductViewer'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
// ScrollTrigger -> let us animate things based on the scroll position 


gsap.registerPlugin(ScrollTrigger)
// this line will makes sure your gsap plugin is 
// mobily accessible across the entire application

const App = () => {
  return (
    <main> 
      <NavBar />
      <Hero />
      <ProductViewer />
    </main>
  )
}

export default App