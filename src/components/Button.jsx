import React from 'react'

const Button = ({
    children,
    type='button', //aa sariya ne default value agar koi kuch hor dega fer ehnu overwrite kr skde
    bgColor='bg-blue-600',
    textColor ='text-white',
    className='',
    ...props //others properties agar kise ne de ditiya fer ohnu spread krdo
}) => {
  return (
    //javascript da code binaa curly bracket to nahi likhskde
    <button className={`px-4 py-2 rounded-lg ${bgColor} 
    ${textColor} ${className}`} {...props}>
        {children}
        {/* {children} //text ee hega ek hisab da, pave text ee kehdo */}
    </button>
  )
}

export default Button