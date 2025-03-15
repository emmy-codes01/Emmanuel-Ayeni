import React from 'react'
import Button from './Button'
import HomeButton from './HomeButton'

const ButtonGroup = () => {
  return (
      <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center items-center">
      <HomeButton />
      <Button />
    </div>
  )
}

export default ButtonGroup