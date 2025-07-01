import { useNavigate } from 'react-router-dom'
import WhiteButton from './WhiteButton'

const ContentNotAccessible = () => {
    const navigate = useNavigate();
  return (
    <div className='flex justify-center items-center gap-4'>
      <p>Please complete your profile inorder to access this feature.</p>
      <WhiteButton onClick={()=>navigate("/profile")} text="Complete Profile"/>
    </div>
  )
}

export default ContentNotAccessible
